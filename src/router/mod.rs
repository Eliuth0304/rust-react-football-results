mod handlers;

use crate::cache::CachedLatestFootballResults;
use axum::{extract::Extension, routing::get, Router};

pub(crate) fn create() -> Router {
    Router::new()
        .route("/", get(handlers::hello_world))
        .route("/football", get(handlers::get_football_data))
        .route("/health", get(handlers::health_check))
        .layer(Extension(reqwest::Client::new()))
        .layer(Extension(CachedLatestFootballResults::default()))
}
