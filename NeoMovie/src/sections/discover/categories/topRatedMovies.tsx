import { _mock } from 'src/_mock';
import { Box, Typography } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import CarouselAnimation from 'src/sections/extra/carousel-view/carousel-animation';

const TopRatedMovies = ({ topRatedMoviesData }: any) => {
  const topRatedMovies =
    topRatedMoviesData && topRatedMoviesData.results
      ? topRatedMoviesData.results.map((movie: any, index: number) => ({
          id: movie.id,
          loading: false,
        }))
      : [...Array(4)].map((_, index) => ({
          id: _mock.id(index),
          poster: '',
          loading: true,
        }));

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h3" sx={{ pb: 2, pl: 3 }}>
        High quality images
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <CarouselAnimation data={topRatedMovies.slice(0, 4)} />
        </Grid>
        <Grid xs={12} sm={6}>
          <CarouselAnimation data={topRatedMovies.slice(5, 9)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopRatedMovies;
