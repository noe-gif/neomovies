'use client';

import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { _mock } from 'src/_mock';
import { useSettingsContext } from 'src/components/settings';
import { LottieRefCurrentProps } from 'lottie-react';
import { getMainTrailerLogo, getMainTrailerVideoContent } from 'src/api/discover';

import Footer from 'src/layouts/main/footer';
import Trailer from './categories/trailer';
import Container from '@mui/material/Container';
import HorrorMovies from './categories/horrorMovies';
import FamilyMovies from './categories/familyMovies';
import ActionMovies from './categories/actionMovies';
import TrailerBanner from './categories/trailerBanner';
import TopRatedMovies from './categories/topRatedMovies';
import DiscoveryMovies from './categories/discoveryMovies';
import AdventureMovies from './categories/adventureMovies';
import ScienceFiMovies from './categories/scienceFiMovies';

import {
  getActionMovies,
  getAdventureMovies,
  getDiscoveryMovies,
  getFamilyMovies,
  getHorrorMovies,
  getScienceFictionMovies,
  getTopRatedMovies,
} from 'src/api/movies';

import {
  getResponsiveTrailerHeights,
  trailerWrapperStyle,
  useWindowSize,
  wrapperStyle,
} from './responsivity';

// ----------------------------------------------------------------------

export default function MoviesView() {
  const { discoveryMoviesData } = getDiscoveryMovies();
  const { topRatedMoviesData } = getTopRatedMovies();
  const { actionMoviesData } = getActionMovies();
  const { adventureMoviesData } = getAdventureMovies();
  const { familyMoviesData } = getFamilyMovies();
  const { scienceFiMoviesData } = getScienceFictionMovies();
  const { horrorMoviesData } = getHorrorMovies();

  const { trailer } = getMainTrailerVideoContent(
    discoveryMoviesData && discoveryMoviesData.results ? discoveryMoviesData.results[2].id : 0
  );
  const { logo } = getMainTrailerLogo(
    discoveryMoviesData && discoveryMoviesData.results ? discoveryMoviesData.results[2].id : 0
  );
  const favouriteRef = useRef<LottieRefCurrentProps>(null);

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
        <DiscoveryMovies discoveryMoviesData={discoveryMoviesData} />
        <TopRatedMovies topRatedMoviesData={topRatedMoviesData} />
        <ActionMovies actionMoviesData={actionMoviesData} />
        <AdventureMovies adventureMoviesData={adventureMoviesData} />
        <FamilyMovies familyMoviesData={familyMoviesData} />
        <ScienceFiMovies scienceFiMoviesData={scienceFiMoviesData} />
        <HorrorMovies horrorMoviesData={horrorMoviesData} />
        <br />
        <Footer />
      </Box>
    </Container>
  );
}
