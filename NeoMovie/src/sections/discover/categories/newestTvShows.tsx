import { m } from 'framer-motion';
import { _mock } from 'src/_mock';
import { varFade } from 'src/components/animate';
import { Box, Typography } from '@mui/material';

import CarouselCenterMode from 'src/sections/extra/carousel-view/carousel-center-mode';
import CarouselNewestTvShows from 'src/sections/extra/carousel-view/carousel-newest-tv-shows';

const NewestTvShows = ({ newestTvShowsData }: any) => {
  const newestTvShows =
    newestTvShowsData && newestTvShowsData.results
      ? newestTvShowsData.results.map((tvShow: any, index: number) => ({
          id: tvShow.id,
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
          Newest Tv shows
        </Typography>
        <CarouselNewestTvShows data={newestTvShows.slice(8, 16)} />
      </Box>
    </m.div>
  );
};

export default NewestTvShows;
