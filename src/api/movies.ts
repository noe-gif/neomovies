import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, genre } from 'src/utils/axios';

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

export function getDiscoveryMovies() {
  const URL = endpoints.movies.discover;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      discoveryMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getTopRatedMovies() {
  const URL = endpoints.movies.topRated;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      topRatedMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getActionMovies() {
  const URL = endpoints.movies.discover + `?with_genres=${genre.movies.action}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      actionMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getAdventureMovies() {
  const URL = endpoints.movies.discover + `?with_genres=${genre.movies.adventure}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      adventureMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getFamilyMovies() {
  const URL = endpoints.movies.discover + `?with_genres=${genre.movies.family}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      familyMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getScienceFictionMovies() {
  const URL = endpoints.movies.discover + `?with_genres=${genre.movies.scienceFiction}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      scienceFiMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getHorrorMovies() {
  const URL = endpoints.movies.discover + `?with_genres=${genre.movies.horror}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      horrorMoviesData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}
