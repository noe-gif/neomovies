'use client';
import Footer from 'src/layouts/main/footer';
import Container from '@mui/material/Container';
import React, { useRef } from 'react';

import { Box } from '@mui/material';
import { _mock } from 'src/_mock';
import { useTheme } from '@mui/material/styles';
import { useSettingsContext } from 'src/components/settings';
import { LottieRefCurrentProps } from 'lottie-react';

import Trailer from './categories/trailer';
import ActionShows from './categories/actionShows';
import FamilyShows from './categories/familyShows';
import HorrorShows from './categories/horrorShows';
import TrailerBanner from './categories/trailerBanner';
import TopRatedShows from './categories/topRatedShows';
import DiscoveryShows from './categories/discoveryShows';
import AdventureShows from './categories/adventureShows';
import ScienceFiShows from './categories/scienceFiShows';

import {
  getDramaShows,
  getComedyShows,
  getActionShows,
  getTopRatedShows,
  getAnimationShows,
  getDiscoveryShows,
  getMainTrailerLogo,
  getDocumentariesShows,
  getMainTrailerVideoContent,
} from 'src/api/shows';

import {
  wrapperStyle,
  useWindowSize,
  trailerWrapperStyle,
  getResponsiveTrailerHeights,
} from './responsivity';

// ----------------------------------------------------------------------

export default function ShowsView() {
  const { discoveryShowsData } = getDiscoveryShows();
  const { topRatedShowsData } = getTopRatedShows();
  const { actionShowsData } = getActionShows();
  const { animationShowsData } = getAnimationShows();
  const { comedyShowsData } = getComedyShows();
  const { documentaryShowsData } = getDocumentariesShows();
  const { dramaShowsData } = getDramaShows();
  const favouriteRef = useRef<LottieRefCurrentProps>(null);

  const { trailer } = getMainTrailerVideoContent(
    discoveryShowsData && discoveryShowsData.results ? discoveryShowsData.results[0].id : 0
  );
  const { logo } = getMainTrailerLogo(
    discoveryShowsData && discoveryShowsData.results ? discoveryShowsData.results[0].id : 0
  );

  const [width, height] = useWindowSize();

  const settings = useSettingsContext();

  return (
    <Container
      style={{ padding: 0, overflow: 'hidden' }}
      maxWidth={settings.themeStretch ? false : 'xl'}
    >
      {trailer && trailer.results && trailer.results[0]?.key && logo && logo.logos ? (
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
        <DiscoveryShows discoveryShowsData={discoveryShowsData} />
        <TopRatedShows topRatedShowsData={topRatedShowsData} />
        <ActionShows actionShowsData={actionShowsData} />
        <AdventureShows animationShowsData={animationShowsData} />
        <FamilyShows comedyShowsData={comedyShowsData} />
        <ScienceFiShows documentaryShowsData={documentaryShowsData} />
        <HorrorShows dramaShowsData={dramaShowsData} />
        <br />
        <Footer />
      </Box>
    </Container>
  );
}
