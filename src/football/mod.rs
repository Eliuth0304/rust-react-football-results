use color_eyre::Report;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub(crate) struct FootballResults(pub Value);

pub(crate) async fn fetch_results(client: &Client) -> Result<FootballResults, Report> {
    let football_api = match std::env::var("MODE").as_deref() {
        Ok("release") => "http://jwcooper.net/football",
        _ => "http://127.0.0.1:8001",
    };

    Ok(
        client
            .get(football_api)
            .send()
            .await? // Connection errors
            .error_for_status()? // HTTP errors
            .json()
            .await?, // Parsing errors
    )
}
