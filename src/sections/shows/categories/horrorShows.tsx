import { m } from 'framer-motion';
import { _mock } from 'src/_mock';
import { varFade } from 'src/components/animate';
import { Box, Typography } from '@mui/material';

import CarouselShows from 'src/sections/extra/carousel-view/carousel-shows';

const HorrorShows = ({ dramaShowsData }: any) => {
  const dramaShows =
    dramaShowsData && dramaShowsData.results
      ? dramaShowsData.results.map((movie: any, index: number) => ({
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
          Horror TV shows
        </Typography>
        <CarouselShows data={dramaShows.slice(0, dramaShows.length)} />
      </Box>
    </m.div>
  );
};

export default HorrorShows;
