use color_eyre::Report;
use reqwest::Client;

const FOOTBALL_API: &str = "https://jwcooper.net/football";

pub(crate) async fn fetch_results(client: &Client) -> Result<String, Report> {
    Ok(
        client
            .get(FOOTBALL_API)
            .send()
            .await? // Connection errors
            .error_for_status()? // HTTP errors
            .text()
            .await?, // Parsing errors
    )
}
