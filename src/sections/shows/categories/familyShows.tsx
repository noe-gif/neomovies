import { m } from 'framer-motion';
import { _mock } from 'src/_mock';
import { varFade } from 'src/components/animate';
import { Box, Typography } from '@mui/material';

import CarouselShows from 'src/sections/extra/carousel-view/carousel-shows';

const FamilyShows = ({ comedyShowsData }: any) => {
  const comedyShows =
    comedyShowsData && comedyShowsData.results
      ? comedyShowsData.results.map((movie: any, index: number) => ({
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
          Family TV shows
        </Typography>
        <CarouselShows data={comedyShows.slice(0, comedyShows.length)} />
      </Box>
    </m.div>
  );
};

export default FamilyShows;
