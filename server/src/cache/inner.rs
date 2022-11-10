use chrono::{NaiveTime, Timelike};
use std::sync::Weak;
use tokio::sync::broadcast::Sender;

use super::Cacheable;
use super::{CacheError, MissedCacheError};

#[derive(Debug)]
pub(super) struct CachedInner<T>
where
    T: Cacheable,
{
    pub last_fetched: Option<(NaiveTime, T)>,
    pub inflight: Option<Weak<Sender<Result<T, CacheError>>>>,
}

impl<T> CachedInner<T>
where
    T: Cacheable,
{
    pub fn get_value(&self) -> Result<T, MissedCacheError> {
        let now = chrono::offset::Utc::now().time();

        if let Some((fetched_at, value)) = self.last_fetched.as_ref() {
            if fetched_at.hour() == now.hour() {
                Ok(value.clone())
            } else {
                Err(MissedCacheError::Stale)
            }
        } else {
            Err(MissedCacheError::Missing)
        }
    }
}

// Manual impl necessary, else the parent struct thinks
// T: Default is a requirement, even though Option::default is None
impl<T> Default for CachedInner<T>
where
    T: Cacheable,
{
    fn default() -> Self {
        Self {
            last_fetched: None,
            inflight: None,
        }
    }
}
