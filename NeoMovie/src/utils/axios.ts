import axios, { AxiosRequestConfig } from 'axios';

import { NEXT_PUBLIC_TMDP_BASE_URL, NEXT_PUBLIC_TMDP_AUTH } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosAuthInstance = axios.create({ baseURL: NEXT_PUBLIC_TMDP_BASE_URL });

axiosAuthInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { axiosAuthInstance };

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosAuthInstance.get(url, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_TMDP_AUTH}`,
    },
  });

  return res.data;
};

// ----------------------------------------------------------------------

export const genre = {
  movies: {
    action: 28,
    adventure: 12,
    family: 10751,
    scienceFiction: 878,
    horror: 27,
  },
  shows: {
    actionAdventure: 10759,
    comedy: 35,
    drama: 18,
    animation: 16,
    documentary: 99,
  },
};

export const endpoints = {
  discover: {
    discover: '/trending/all/week',
    trailer: '/videos',
    logo: '/images',
    topRated: '/movie/now_playing',
    popularActors: '/person/popular',
  },
  movies: {
    discover: '/discover/movie',
    topRated: '/movie/top_rated',
  },
  shows: {
    discover: '/discover/tv',
    topRated: '/tv/top_rated',
    trailer: '/videos',
    logo: '/images',
  },
};
