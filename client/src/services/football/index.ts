import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FootballResults } from "./types";
import { FootballResultsResponseRaw } from "./types/raw";

const baseUrl = import.meta.env.PROD
  ? "https://football-api.fly.dev/"
  : "http://localhost:8000";

export const footballResultsApi = createApi({
  reducerPath: "footballResults",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFootballResults: builder.query<FootballResults, void>({
      query: () => "football",
      transformResponse: (
        response: FootballResultsResponseRaw
      ): FootballResults => {
        let {
          response: [{ league }],
        } = response;

        return { ...league, standings: league.standings[0] };
      },
    }),
  }),
});

export const { useGetFootballResultsQuery } = footballResultsApi;
