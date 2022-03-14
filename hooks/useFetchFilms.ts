import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import fetchFilms from "../fetchFilms";
import fetchGenres from "../fetchGenres";

const useFetchFilms = (query?: string) => {
  const [films, setFilms] = useState([]);

  // fetch data
  const {
    isLoading,
    isSuccess,
    isError,
    data: filmsData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery(
    "films",
    ({ pageParam = 1 }) => fetchFilms({ query, page: pageParam }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      getPreviousPageParam: (lastPage) =>
        lastPage.page > 1 ? lastPage.page - 1 : undefined,
    },
  );

  const { data: genresData } = useQuery("genres", fetchGenres);

  useEffect(() => {
    refetch();
  }, [query]);

  useEffect(() => {
    if (!filmsData || !genresData) return;

    const { genres } = genresData;

    setFilms(
      filmsData.pages
        .map((page) => page.results)
        .flat()
        .map((film) => ({
          ...film,
          // new property for parsed genres for film
          genres: film.genre_ids.map((genreId) =>
            genres.find((genre) => genre.id === genreId),
          ),
        })),
    );
  }, [filmsData, genresData]);

  // exposed to the consumer of this hook
  return {
    isLoading,
    isSuccess,
    isError,
    error,
    films,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  };
};

export default useFetchFilms;
