import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import { varFade, MotionContainer } from 'src/components/animate';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import { getMainTrailerLogo } from 'src/api/discover';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: number;
    loading: boolean;
  }[];
};

export default function CarouselAnimation({ data }: Props) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
  });

  return (
    <Card>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} item={item} active={index === carousel.currentIndex} />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={data.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    id: number;
    loading: boolean;
  };
  active: boolean;
};

function CarouselItem({ item, active }: CarouselItemProps) {
  const theme = useTheme();

  const { id, loading } = item;
  const { logo } = getMainTrailerLogo(item.id);

  const variants = theme.direction === 'rtl' ? varFade().inLeft : varFade().inRight;
  return (
    <Paper sx={{ position: 'relative' }}>
      <Image
        alt={id.toString()}
        style={{
          position: 'absolute',
          top: '45%',
          left: '5%',
          width: '50%',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 10,
        }}
        src={
          logo && logo.logos
            ? `https://image.tmdb.org/t/p/w500/${logo.logos.find(
                (item: any) => item.iso_639_1 === 'en'
              )?.file_path}`
            : ''
        }
      />

      <Image
        dir="ltr"
        alt={id.toString()}
        src={
          logo && logo.backdrops
            ? `https://image.tmdb.org/t/p/w500/${logo.backdrops[0]?.file_path}`
            : ''
        }
        ratio="16/9"
      />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      />

      <CardContent
        component={MotionContainer}
        animate={active}
        action
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: 720,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      ></CardContent>
    </Paper>
  );
}
