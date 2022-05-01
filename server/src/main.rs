mod cache;
mod error;
mod football;
mod router;
pub mod trace;

use axum::Server;
use std::{error::Error, net::SocketAddr};

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn Error>> {
    color_eyre::install()?;

    trace::setup()?;

    run_server().await?;

    trace::teardown();
    Ok(())
}

async fn run_server() -> Result<(), Box<dyn Error>> {
    let addr: SocketAddr = "0.0.0.0:8000".parse()?;
    tracing::info!("Listening on http://{}", addr);

    let app = router::create();

    Server::bind(&addr).serve(app.into_make_service()).await?;

    Ok(())
}
