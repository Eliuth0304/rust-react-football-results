use reqwest::Client;

const FOOTBALL_API: &str = "https://jwcooper.net/football";

pub(crate) async fn fetch_results(client: &Client) -> Result<String, anyhow::Error> {
    client
        .get(FOOTBALL_API)
        .send()
        .await?
        .text()
        .await
        .map_err(anyhow::Error::from)
}
