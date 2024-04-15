import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, genre } from 'src/utils/axios';

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

export function getDiscoveryShows() {
  const URL = endpoints.shows.topRated;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      discoveryShowsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getTopRatedShows() {
  const URL = endpoints.shows.discover;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      topRatedShowsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getMainTrailerVideoContent(showId: number) {
  const SHOW_TRAILER = `/tv/${showId}` + endpoints.shows.trailer;

  const { data, isLoading, error, isValidating } = useSWR(SHOW_TRAILER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      trailer: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getMainTrailerLogo(showId: number) {
  const MOVIE_LOGO = `/tv/${showId}` + endpoints.shows.logo;

  const { data, isLoading, error, isValidating } = useSWR(MOVIE_LOGO, fetcher);

  const memoizedValue = useMemo(
    () => ({
      logo: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getActionShows() {
  const URL = endpoints.shows.discover + `?with_genres=${genre.shows.actionAdventure}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      actionShowsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getAnimationShows() {
  const URL = endpoints.shows.discover + `?with_genres=${genre.shows.animation}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      animationShowsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getComedyShows() {
  const URL = endpoints.shows.discover + `?with_genres=${genre.shows.comedy}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      comedyShowsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getDocumentariesShows() {
  const URL = endpoints.shows.discover + `?with_genres=${genre.shows.documentary}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      documentaryShowsData: data,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function getDramaShows() {
  const URL = endpoints.shows.discover + `?with_genres=${genre.shows.drama}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      dramaShowsData: data,
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
