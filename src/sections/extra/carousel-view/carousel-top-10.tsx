import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
    loading: boolean;
  }[];
};

export default function CarouselTopTen({ data }: Props) {
  const carousel = useCarousel({
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows
        filled
        icon="bxs:right-arrow"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <CarouselItem item={item} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    title: string;
    description: string;
    coverUrl: string;
    loading: boolean;
  };
};

function CarouselItem({ item }: CarouselItemProps) {
  const theme = useTheme();

  const { coverUrl, title } = item;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(0.95)',
        },
      }}
    >
      <Image alt={title} src={coverUrl} ratio="3/4" />
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          height: item.loading ? '100%' : '',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
        className={item.loading ? 'shimmer-dark-mode' : ''}
      >
        {item.loading ? (
          <></>
        ) : (
          <Link
            color="inherit"
            variant="overline"
            sx={{
              opacity: 0.72,
              alignItems: 'center',
              display: 'inline-flex',
              transition: theme.transitions.create(['opacity']),
              '&:hover': { opacity: 1 },
            }}
          >
            learn More
            <Iconify icon="eva:arrow-forward-fill" width={16} sx={{ ml: 1 }} />
          </Link>
        )}
      </CardContent>
    </Paper>
  );
}
