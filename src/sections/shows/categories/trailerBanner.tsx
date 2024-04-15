import React from 'react';
import Lottie from 'lottie-react';

import Container from '@mui/material/Container';
import Image from 'src/components/image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { m } from 'framer-motion';
import { _mock } from 'src/_mock';
import { useTheme } from '@mui/material/styles';

import favouriteAnimation from 'src/assets/animations/lotties/favourite.json';
const TrailerBanner = ({ logo, favouriteRef }: any) => {
  const theme = useTheme();

  const responsiveStyles = {
    p: 1,
    position: 'absolute',
    top: '40%',
    left: '2%',
    [theme.breakpoints.between(500, 800)]: {
      left: '3%',
      top: '20%',
    },
    [theme.breakpoints.between(800, 1100)]: {
      left: '3%',
      top: '30%',
    },
    [theme.breakpoints.between(1100, 1300)]: {
      left: '2%',
      top: '30%',
    },
    [theme.breakpoints.between(1300, 1500)]: {
      left: '1%',
      top: '40%',
    },
    [theme.breakpoints.up(1500)]: {
      left: '2%',
      top: '45%',
    },
  };

  const imageStyles = {
    pb: 2,
    width: '50%',
    [theme.breakpoints.between(500, 800)]: {
      width: '30%',
    },
    [theme.breakpoints.between(900, 1100)]: {
      width: '40%',
    },
    [theme.breakpoints.between(1200, 1400)]: {
      width: '50%',
    },
    [theme.breakpoints.up(1500)]: {
      width: '60%',
    },
  };
  return (
    <Container sx={responsiveStyles}>
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Image
          alt={logo.logos.find((item: any) => item.iso_639_1 === 'en').iso_639_1}
          src={`https://image.tmdb.org/t/p/w500/${
            logo.logos.find((item: any) => item.iso_639_1 === 'en')?.file_path
              ? logo.logos.find((item: any) => item.iso_639_1 === 'en')?.file_path
              : ''
          }`}
          sx={imageStyles}
        />
      </m.div>
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction={{ xs: 'row', sm: 'row' }}
          justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
          sx={{ pt: 0 }}
        >
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            rel="noopener"
            onClick={() => {
              favouriteRef.current?.goToAndPlay(0, true);
            }}
            sx={{
              borderColor: 'text.primary',
              borderRadius: '50%',
              width: '68px',
              height: '68px',
              minWidth: '48px',
              padding: 0,
            }}
          >
            <Lottie
              animationData={favouriteAnimation}
              lottieRef={favouriteRef}
              autoPlay={false}
              loop={false}
              onDOMLoaded={() => {
                favouriteRef.current?.goToAndStop(0, true);
              }}
              onLoopComplete={() => {
                favouriteRef.current?.goToAndStop(0, true);
              }}
              style={{ width: '60px', height: '60px', position: 'absolute', zIndex: '1' }}
            />
          </Button>
        </Stack>
      </m.div>
    </Container>
  );
};

export default TrailerBanner;
