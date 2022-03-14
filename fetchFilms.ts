import Constants from "expo-constants";
import axios from "axios";
import queryString from "query-string";
import { BASE_URL } from "./constants";

export default async ({ query, page }: { query?: string; page: number }) => {
  const url = queryString.stringifyUrl(
    {
      url: `${BASE_URL}/${query ? "search" : "discover"}/movie`,
      query: {
        api_key: Constants.manifest?.extra?.moviesDbAPIKey,
        language: "en-US",
        query,
        page,
        include_adult: false,
      },
    },
    {
      skipNull: true,
    },
  );

  // api response
  const response = await axios.get(url);

  return response.data;
};
