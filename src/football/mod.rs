use axum::http::HeaderValue;
use color_eyre::Report;
use hyper::HeaderMap;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::env;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub(crate) struct FootballResults(pub Value);

const BASE_URL: &str = "https://v3.football.api-sports.io/standings";

pub(crate) async fn fetch_results(client: &Client) -> Result<FootballResults, Report> {
    let in_production = env::var("ENVIRONMENT").as_deref() == Ok("production");

    let upstream_api_url = if in_production {
        BASE_URL
    } else {
        "http://127.0.0.1:8001"
    };

    let mut headers = HeaderMap::new();

    if in_production {
        let host = "v3.football.api-sports.io".parse()?;
        let key = {
            let mut key: HeaderValue = env::var("RAPIDAPI_KEY")?.parse()?;
            key.set_sensitive(true);
            key
        };

        headers.insert("x-rapidapi-host", host);
        headers.insert("x-rapidapi-key", key);
    }

    Ok(
        client
            .get(upstream_api_url)
            .headers(headers)
            .send()
            .await? // Connection errors
            .error_for_status()? // HTTP errors
            .json()
            .await?, // Parsing errors
    )
}
