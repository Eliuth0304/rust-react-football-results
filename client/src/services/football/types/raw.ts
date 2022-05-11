export interface FootballResultsResponseRaw {
  errors: Array<string>;
  get: string;
  paging: Paging;
  parameters: Parameters;
  response: Array<LeagueWrapper>;
  results: number;
}

interface Paging {
  current: number;
  total: number;
}

interface Parameters {
  league: string;
  season: string;
}

interface LeagueWrapper {
  league: League;
}

export interface League {
  country: string;
  flag: string;
  id: number;
  logo: string;
  name: string;
  season: number;
  standings: Array<Array<Standing>>;
}

export interface Standing {
  all: MatchInfo;
  away: MatchInfo;
  description: string;
  form: string;
  goalsDiff: number;
  group: string;
  home: MatchInfo;
  points: number;
  rank: number;
  status: string;
  team: Team;
  update: string;
}

interface MatchInfo {
  draw: number;
  goals: Goals;
  lose: number;
  played: number;
  win: number;
}

interface Goals {
  against: number;
  for: number;
}

interface Team {
  id: number;
  logo: string;
  name: string;
}
