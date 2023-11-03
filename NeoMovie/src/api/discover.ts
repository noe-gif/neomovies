import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

export function getDiscoveryMovies() {
  const URL = endpoints.movies.discover;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getDiscoveryTvShows() {
  const URL = endpoints.shows.discover;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      newestTvShowsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getTopRatedMovies() {
  const URL = endpoints.discover.topRated;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      topRatedMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getPopularActors() {
  const URL = endpoints.discover.popularActors;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      popularActorsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getShowById(showId: number) {
  const SHOW = `/tv/${showId}`;

  const { data, isLoading, error, isValidating } = useSWR(SHOW, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getMovieById(movieId: number) {
  const MOVIE = `/movie/${movieId}`;

  const { data, isLoading, error, isValidating } = useSWR(MOVIE, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getMainTrailerVideoContent(movieId: number) {
  const MOVIE_TRAILER = `/movie/${movieId}` + endpoints.discover.trailer;

  const { data, isLoading, error, isValidating } = useSWR(MOVIE_TRAILER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      trailer: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getMainTrailerLogo(movieId: number) {
  const MOVIE_LOGO = `/movie/${movieId}` + endpoints.discover.logo;

  const { data, isLoading, error, isValidating } = useSWR(MOVIE_LOGO, fetcher);

  const memoizedValue = useMemo(
    () => ({
      logo: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getMainShowLogo(showId: number) {
  const SHOW_LOGO = `/tv/${showId}` + endpoints.discover.logo;

  const { data, isLoading, error, isValidating } = useSWR(SHOW_LOGO, fetcher);

  const memoizedValue = useMemo(
    () => ({
      logo: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}
