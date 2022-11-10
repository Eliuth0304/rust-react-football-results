use std::fmt::Display;

use color_eyre::Report;
use tokio::sync::broadcast::error::RecvError;

#[derive(Clone, Debug, thiserror::Error)]
#[error("{0}")]
pub(crate) struct CacheError(String);

impl CacheError {
    pub fn new(err: impl Display) -> Self {
        Self(err.to_string())
    }
}

impl From<Report> for CacheError {
    fn from(err: Report) -> Self {
        Self::new(err)
    }
}

impl From<RecvError> for CacheError {
    fn from(err: RecvError) -> Self {
        Self::new(err)
    }
}

#[derive(Clone, Debug, thiserror::Error)]
#[error("Attempted to get value from cache, but result was stale.")]
pub(super) enum MissedCacheError {
    Missing,
    Stale,
}
