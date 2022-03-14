import Constants from "expo-constants";
import axios from "axios";
import queryString from "query-string";
import { BASE_URL } from "./constants";

export default async () => {
  const url = queryString.stringifyUrl(
    {
      url: `${BASE_URL}/genre/movie/list`,
      query: {
        api_key: Constants.manifest?.extra?.moviesDbAPIKey,
        language: "en-US",
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
