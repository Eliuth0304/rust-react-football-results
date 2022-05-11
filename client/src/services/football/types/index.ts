import { League, Standing } from "./raw";

export type FootballResults = Omit<League, "standings"> & {
  standings: Array<Standing>;
};
