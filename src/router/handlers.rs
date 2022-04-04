use crate::football;
use crate::{cache::CachedLatestFootballResults, error::ReportError};
use axum::{extract::Extension, response::IntoResponse, Json};
use hyper::{Body, Response};
use std::time::{Duration, Instant};
use tracing::info;

#[tracing::instrument]
pub(crate) async fn get_football_data(
    client: Extension<reqwest::Client>,
    cached: Extension<CachedLatestFootballResults>,
) -> Result<impl IntoResponse, ReportError> {
    let mut cached_value = cached.value.lock().await;

    if let Some((cached_at, football_results)) = cached_value.as_ref() {
        if cached_at.elapsed() < Duration::from_secs(5) {
            info!("Found cached result!");
            return Ok(Json(football_results.clone()));
        } else {
            info!("Stale cache result.");
        }
    } else {
        info!("No cache result.");
    }

    let football_results = football::fetch_results(&client).await?;

    cached_value.replace((Instant::now(), football_results.clone()));

    Ok(Json(football_results))
}

#[tracing::instrument]
pub(crate) async fn health_check() -> Response<Body> {
    Default::default()
}

#[tracing::instrument]
pub(crate) async fn hello_world() -> &'static str {
    "Hello Football API World!"
}
