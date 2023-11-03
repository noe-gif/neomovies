import { m } from 'framer-motion';
import { _mock } from 'src/_mock';
import { varFade } from 'src/components/animate';
import { Box, Typography } from '@mui/material';

import CarouselShows from 'src/sections/extra/carousel-view/carousel-shows';

const DiscoveryShows = ({ discoveryShowsData }: any) => {
  const discoveryShows =
    discoveryShowsData && discoveryShowsData.results
      ? discoveryShowsData.results.map((movie: any, index: number) => ({
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
          Best shows
        </Typography>
        <CarouselShows data={discoveryShows.slice(0, discoveryShows.length)} />
      </Box>
    </m.div>
  );
};

export default DiscoveryShows;
