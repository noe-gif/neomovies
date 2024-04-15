import { m } from 'framer-motion';
import { _mock } from 'src/_mock';
import { varFade } from 'src/components/animate';
import { Box, Typography } from '@mui/material';

import CarouselCenterMode from 'src/sections/extra/carousel-view/carousel-center-mode';

const DiscoveryMovies = ({ discoveryMoviesData }: any) => {
  const discoveryMovies =
    discoveryMoviesData && discoveryMoviesData.results
      ? discoveryMoviesData.results.map((movie: any, index: number) => ({
          id: movie.id,
          loading: false,
        }))
      : [...Array(20)].map((_, index) => ({
          id: _mock.id(index),
          loading: true,
        }));

  return (
    <m.div variants={varFade().inDown}>
      <Box sx={{ p: 5, pb: 0 }}>
        <Typography variant="h3" sx={{ pb: 2, pl: 3 }}>
          Newest movies
        </Typography>
        <CarouselCenterMode data={discoveryMovies.slice(0, discoveryMovies.length)} />
      </Box>
    </m.div>
  );
};

export default DiscoveryMovies;
