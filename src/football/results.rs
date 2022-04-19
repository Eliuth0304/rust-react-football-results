use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(transparent)]
pub(crate) struct FootballResults {
    results: Vec<LeagueWrapper>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct LeagueWrapper {
    league: League,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct League {
    id: u32,
    name: String,
    country: String,
    logo: String,
    flag: String,
    season: u32,
    standings: Vec<Vec<Standing>>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct Standing {
    rank: u32,
    team: Team,
    points: i32,
    #[serde(rename(deserialize = "goalsDiff"))]
    goals_diff: i32,
    group: String,
    form: String,
    status: String,
    description: Option<String>,
    all: Form,
    home: Form,
    away: Form,
    update: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct Team {
    id: u32,
    name: String,
    logo: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct Form {
    played: u32,
    win: u32,
    draw: u32,
    lose: u32,
    goals: Goals,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct Goals {
    r#for: u32,
    against: u32,
}
