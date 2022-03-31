mod cache;
mod error;
mod football;
mod router;

use axum::Server;
use std::{error::Error, net::SocketAddr};

pub async fn run_server() -> Result<(), Box<dyn Error>> {
    let address: SocketAddr = "0.0.0.0:3779".parse()?;
    println!("Listening on http://{address}");

    let app = router::create();

    Server::bind(&address)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
