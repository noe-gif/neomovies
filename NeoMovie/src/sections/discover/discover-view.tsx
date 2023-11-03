'use client';
import React, { useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';

import Container from '@mui/material/Container';

import { _mock } from 'src/_mock';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

import {
  getResponsiveTrailerHeights,
  trailerWrapperStyle,
  useWindowSize,
  wrapperStyle,
} from './responsivity';
import {
  getDiscoveryMovies,
  getDiscoveryTvShows,
  getMainTrailerVideoContent,
  getMainTrailerLogo,
  getTopRatedMovies,
  getPopularActors,
} from 'src/api/discover';

import Footer from 'src/layouts/main/footer';

import { useAuthContext } from 'src/auth/hooks';
import { isUserUnauthorized, redirectUser } from './security';
import NewestMovies from './categories/newestMovies';
import TopRatedMovies from './categories/topRatedMovies';
import PopularActors from './categories/popularActors';
import TrailerBanner from './categories/trailerBanner';
import Trailer from './categories/trailer';
import NewestTvShows from './categories/newestTvShows';

// ----------------------------------------------------------------------

export default function DiscoverView() {
  const { user } = useAuthContext();
  const { data } = getDiscoveryMovies();
  const { newestTvShowsData } = getDiscoveryTvShows();
  const { topRatedMoviesData } = getTopRatedMovies();
  const { popularActorsData } = getPopularActors();
  const { trailer } = getMainTrailerVideoContent(data && data.results ? data.results[0].id : 0);
  const { logo } = getMainTrailerLogo(data && data.results ? data.results[0].id : 0);
  const favouriteRef = useRef<LottieRefCurrentProps>(null);

  if (isUserUnauthorized(user)) {
    redirectUser();
  }

  const [width, height] = useWindowSize();

  const settings = useSettingsContext();

  return (
    <Container
      style={{ padding: 0, overflow: 'hidden' }}
      maxWidth={settings.themeStretch ? false : 'xl'}
    >
      {trailer && trailer.results && trailer.results[0].key && logo && logo.logos ? (
        <Box
          sx={{
            ...trailerWrapperStyle,
            height: `${width / getResponsiveTrailerHeights(width)}vh`,
          }}
        >
          <TrailerBanner logo={logo} favouriteRef={favouriteRef} />
          <Trailer trailer={trailer} />
        </Box>
      ) : (
        <></>
      )}

      <Box sx={wrapperStyle}>
        <NewestMovies />
        <TopRatedMovies topRatedMoviesData={topRatedMoviesData} />
        <PopularActors popularActorsData={popularActorsData} />
        <NewestTvShows newestTvShowsData={newestTvShowsData} />
        <br />
        <Footer />
      </Box>
    </Container>
  );
}
