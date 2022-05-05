mod handlers;

use crate::{cache::Cached, football::FootballResults};
use axum::{extract::Extension, routing::get, Router};
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

pub(crate) fn create() -> Router {
    let cors_layer = CorsLayer::new().allow_methods(Any).allow_origin(Any);

    Router::new()
        .route("/", get(handlers::hello_world))
        .route("/football", get(handlers::get_football_data))
        .route("/health", get(handlers::health_check))
        .layer(Extension(reqwest::Client::new()))
        .layer(Extension(Cached::<FootballResults>::new()))
        .layer(TraceLayer::new_for_http())
        .layer(cors_layer)
}
