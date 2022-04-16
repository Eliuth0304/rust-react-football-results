use super::CacheError;
use std::time::Instant;
use tokio::sync::broadcast::Sender;

#[derive(Debug)]
pub(super) struct CachedInner<T> {
    pub last_fetched: Option<(Instant, T)>,
    pub inflight: Option<Sender<Result<T, CacheError>>>,
}

// Manual impl necessary, else the parent struct thinks
// T: Default is a requirement, even though Option::default is None
impl<T> Default for CachedInner<T> {
    fn default() -> Self {
        Self {
            last_fetched: None,
            inflight: None,
        }
    }
}
