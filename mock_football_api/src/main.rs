use axum::{response::Json, routing::get, Router, Server};
use serde_json::Value;
use std::{error::Error, net::SocketAddr};

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn Error>> {
    run_server().await?;

    Ok(())
}

async fn run_server() -> Result<(), Box<dyn Error>> {
    let addr = SocketAddr::from(([0, 0, 0, 0], 8001));
    println!("listening on {}", addr);

    let app = Router::new().route("/", get(get_mock_data));

    Server::bind(&addr).serve(app.into_make_service()).await?;

    Ok(())
}

async fn get_mock_data() -> Json<Value> {
    let sample_json = include_str!("sample_response.json");

    let sample_response: Value = serde_json::from_str(sample_json).unwrap();

    Json(sample_response)
}
