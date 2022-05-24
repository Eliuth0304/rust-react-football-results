import { League, MatchInfo, Standing } from "./raw";

export type FootballResults = Omit<League, "standings"> & {
  standings: Array<Standing>;
};

export type { MatchInfo, Standing };
