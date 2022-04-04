use std::{sync::Arc, time::Instant};
use tokio::sync::Mutex;

#[derive(Clone, Debug, Default)]
pub(crate) struct CachedLatestFootballResults {
    pub value: Arc<Mutex<Option<(Instant, String)>>>,
}
