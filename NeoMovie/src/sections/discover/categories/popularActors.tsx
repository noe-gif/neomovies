import { _mock } from 'src/_mock';
import { Box, Typography } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import CarouselBasic1 from 'src/sections/extra/carousel-view/carousel-basic-1';

const PopularActors = ({ popularActorsData }: any) => {
  const popularActors =
    popularActorsData && popularActorsData.results
      ? popularActorsData.results.map((actor: any, index: number) => ({
          id: actor.id,
          name: actor.name,
          profilePic: actor.profile_path,
          loading: false,
        }))
      : [...Array(4)].map((_, index) => ({
          id: _mock.id(index),
          poster: '',
          loading: true,
        }));

  return (
    <Box sx={{ p: 5, pb: 0 }}>
      <Typography variant="h3" sx={{ pb: 2, pl: 3 }}>
        Top actors
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={4}>
          <CarouselBasic1 actors={popularActors.slice(0, 4)} />
        </Grid>
        <Grid xs={12} sm={4}>
          <CarouselBasic1 actors={popularActors.slice(5, 9)} />
        </Grid>
        <Grid xs={12} sm={4}>
          <CarouselBasic1 actors={popularActors.slice(10, 15)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopularActors;
