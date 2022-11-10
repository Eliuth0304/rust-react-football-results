use std::env;

use axum::http::HeaderValue;
use chrono::{Datelike, Utc};
use color_eyre::Report;
use hyper::HeaderMap;
use lazy_static::lazy_static;
use reqwest::{Client, Url};
use serde::{Deserialize, Serialize};
use serde_json::Value;

lazy_static! {
    static ref API_URL: Url = {
        let mut api_url: Url = "https://v3.football.api-sports.io/standings"
            .parse()
            .unwrap();

        api_url.query_pairs_mut().append_pair("league", "39");

        let today = Utc::today();

        let current_year = today.year();
        let current_month = today.month();

        let season_year = if current_month < 8 {
            current_year - 1
        } else {
            current_year
        };

        api_url
            .query_pairs_mut()
            .append_pair("season", &season_year.to_string());

        api_url
    };
    static ref PRODUCTION_HEADERS: HeaderMap = {
        let mut headers = HeaderMap::new();

        if env::var("ENVIRONMENT").as_deref() == Ok("production") {
            let host = "v3.football.api-sports.io".parse().unwrap();
            let key = {
                let mut key: HeaderValue = env::var("RAPIDAPI_KEY").unwrap().parse().unwrap();
                key.set_sensitive(true);
                key
            };

            headers.insert("x-rapidapi-host", host);
            headers.insert("x-rapidapi-key", key);
        }

        headers
    };
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub(crate) struct FootballResults(pub Value);

pub(crate) async fn fetch_results(client: &Client) -> Result<FootballResults, Report> {
    let in_production = env::var("ENVIRONMENT").as_deref() == Ok("production");

    let upstream_api_url: Url = if in_production {
        API_URL.clone()
    } else {
        "http://127.0.0.1:8001".parse()?
    };

    let mut request = client.get(upstream_api_url);

    if in_production {
        request = request.headers(PRODUCTION_HEADERS.clone());
    }

    let response = request
        .send()
        .await? // Connection errors
        .error_for_status()? // HTTP errors
        .json()
        .await?; // Parsing errors

    Ok(response)
}
