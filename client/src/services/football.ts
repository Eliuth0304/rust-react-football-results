import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FootballResults {}

const baseUrl = import.meta.env.PROD
  ? "https://football-jack.koyeb.app/"
  : "http://localhost:8000";

export const footballResultsApi = createApi({
  reducerPath: "footballResults",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFootballResults: builder.query<FootballResults, void>({
      query: () => "football",
    }),
  }),
});

export const { useGetFootballResultsQuery } = footballResultsApi;
