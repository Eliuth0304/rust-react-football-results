use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    football_api::run_server().await?;

    Ok(())
}
