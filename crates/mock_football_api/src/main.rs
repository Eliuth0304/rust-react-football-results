use axum::{response::Json, routing::get, Router, Server};
use serde_json::{json, Value};
use std::{error::Error, net::SocketAddr};

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn Error>> {
    run_server().await?;

    Ok(())
}

async fn run_server() -> Result<(), Box<dyn Error>> {
    let addr: SocketAddr = "0.0.0.0:8001".parse()?;

    let app = Router::new().route("/", get(get_mock_data));

    Server::bind(&addr).serve(app.into_make_service()).await?;

    Ok(())
}

async fn get_mock_data() -> Json<Value> {
    Json(json!({
      "get": "standings",
      "parameters": {
        "league": "39",
        "season": "2019"
      },
      "errors": [],
      "results": 1,
      "paging": {
        "current": 1,
        "total": 1
      },
      "response": [
        {
          "league": {
            "id": 39,
            "name": "Premier League",
            "country": "England",
            "logo": "https://media.api-sports.io/football/leagues/2.png",
            "flag": "https://media.api-sports.io/flags/gb.svg",
            "season": 2019,
            "standings": [
              [
                {
                  "rank": 1,
                  "team": {
                    "id": 40,
                    "name": "Liverpool",
                    "logo": "https://media.api-sports.io/football/teams/40.png"
                  },
                  "points": 70,
                  "goalsDiff": 41,
                  "group": "Premier League",
                  "form": "WWWWW",
                  "status": "same",
                  "description": "Promotion - Champions League (Group Stage)",
                  "all": {
                    "played": 24,
                    "win": 23,
                    "draw": 1,
                    "lose": 0,
                    "goals": {
                      "for": 56,
                      "against": 15
                    }
                  },
                  "home": {
                    "played": 12,
                    "win": 12,
                    "draw": 0,
                    "lose": 0,
                    "goals": {
                      "for": 31,
                      "against": 9
                    }
                  },
                  "away": {
                    "played": 12,
                    "win": 11,
                    "draw": 1,
                    "lose": 0,
                    "goals": {
                      "for": 25,
                      "against": 6
                    }
                  },
                  "update": "2020-01-29T00:00:00+00:00"
                }
              ]
            ]
          }
        }
      ]
    }))
}
