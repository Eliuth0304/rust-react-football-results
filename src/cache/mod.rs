mod error;
mod inner;

pub(crate) use error::CacheError;

use color_eyre::eyre::eyre;
use inner::CachedInner;
use parking_lot::Mutex;
use std::{
    future::Future,
    pin::Pin,
    sync::{Arc, Weak},
    time::{Duration, Instant},
};
use tokio::sync::broadcast;

pub(crate) type BoxFut<'a, O> = Pin<Box<dyn Future<Output = O> + Send + 'a>>;

#[derive(Clone, Debug, Default)]
pub(crate) struct Cached<T> {
    inner: Arc<Mutex<CachedInner<T>>>,
    refresh_interval: Duration,
}

impl<T> Cached<T>
where
    T: Clone + Send + Sync + 'static,
{
    pub fn new(refresh_interval: Duration) -> Self {
        Self {
            inner: Default::default(),
            refresh_interval,
        }
    }

    pub async fn get_cached<F, E>(&self, f: F) -> Result<T, CacheError>
    where
        F: FnOnce() -> BoxFut<'static, Result<T, E>> + Send + 'static,
        E: std::fmt::Display + 'static,
    {
        let mut rx = {
            let mut inner = self.inner.lock();

            if let Some((fetched_at, value)) = inner.last_fetched.as_ref() {
                if fetched_at.elapsed() < self.refresh_interval {
                    return Ok(value.clone());
                }
            }

            if let Some(inflight) = inner.inflight.as_ref().and_then(Weak::upgrade) {
                inflight.subscribe()
            } else {
                let (tx, rx) = broadcast::channel::<Result<T, CacheError>>(1);
                let tx = Arc::new(tx);

                inner.inflight = Some(Arc::downgrade(&tx));

                let inner = self.inner.clone();

                let fut = f();

                tokio::spawn(async move {
                    let result = fut.await;

                    let mut inner = inner.lock();
                    inner.inflight = None;

                    let _ = match result {
                        Ok(result) => {
                            inner.last_fetched.replace((Instant::now(), result.clone()));

                            tx.send(Ok(result))
                        }
                        Err(err) => tx.send(Err(CacheError::new(err.to_string()))),
                    };
                });

                rx
            }
        };

        // If we haven't already returned by here, we're waiting for an in-flight request

        Ok(rx
            .recv()
            .await
            .map_err(|_| eyre!("In-flight request died"))??)
    }
}
