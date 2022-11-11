mod handlers;

use axum::{extract::Extension, routing::get, Router};
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

use crate::{cache::Cached, football::FootballResults};

pub(crate) fn create() -> Router {
    Router::new()
        .route("/", get(handlers::hello_world))
        .route("/football", get(handlers::get_football_data))
        .route("/health", get(handlers::health_check))
        // The `Client` layer allows further forwards requests to be made
        .layer(Extension(reqwest::Client::new()))
        // The `Cached` layer allows for deduplicating requests and caching their responses
        .layer(Extension(Cached::<FootballResults>::new()))
        // Tracing layer used for local Jaeger analysis. See `src/trace.rs` for more details.
        .layer(TraceLayer::new_for_http())
        // The CORS layer allows the browser to make cross-origin requests.
        .layer(CorsLayer::new().allow_methods(Any).allow_origin(Any))
}
