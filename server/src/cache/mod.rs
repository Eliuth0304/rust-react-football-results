mod error;
mod inner;

pub(crate) use error::*;

use color_eyre::eyre::eyre;
use inner::CachedInner;
use parking_lot::Mutex;
use std::{
    future::Future,
    pin::Pin,
    sync::{Arc, Weak},
};
use tokio::sync::broadcast;

pub(crate) type BoxFut<'a, O> = Pin<Box<dyn Future<Output = O> + Send + 'a>>;

#[derive(Clone, Debug, Default)]
pub(crate) struct Cached<T>
where
    T: Clone + Send + Sync + 'static,
{
    inner: Arc<Mutex<CachedInner<T>>>,
}

impl<T> Cached<T>
where
    T: Clone + Send + Sync + 'static,
{
    pub fn new() -> Self {
        Self {
            inner: Default::default(),
        }
    }

    pub async fn get_cached<F, E>(&self, f: F) -> Result<T, CacheError>
    where
        F: FnOnce() -> BoxFut<'static, Result<T, E>> + Send + 'static,
        E: std::fmt::Display + 'static,
    {
        let mut rx = {
            let mut inner = self.inner.lock();

            match inner.get_value() {
                Ok(value) => {
                    tracing::info!("Found a cached value!");
                    return Ok(value);
                }
                Err(MissedCacheError::Stale) => {
                    tracing::info!("Found a cached value, but it was stale.");
                }
                Err(MissedCacheError::Missing) => {
                    tracing::info!("No cached value found.");
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
                            let now = chrono::offset::Utc::now().time();

                            // Allow a small window of time after the hour for the backing API to update
                            let buffer = chrono::Duration::seconds(2);

                            inner.last_fetched.replace((now - buffer, result.clone()));

                            tx.send(Ok(result))
                        }
                        Err(err) => tx.send(Err(CacheError::new(err.to_string()))),
                    };
                });

                rx
            }
        };

        // If we haven't already returned by here, we're waiting for an in-flight request
        // that was launched by a prior call to this function.

        rx.recv()
            .await
            .map_err(|_| eyre!("In-flight request died"))?
    }
}
