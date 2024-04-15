import Card from '@mui/material/Card';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  actors: {
    id: number;
    name: string;
    profilePic: string;
    loading: boolean;
  }[];
};

export default function CarouselBasic1({ actors }: Props) {
  const carousel = useCarousel({
    autoplay: true,
  });

  return (
    <Card>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {actors.map((actor) => (
          <>
            <Image
              key={actor.id}
              alt={actor.id.toString()}
              src={actor ? `https://image.tmdb.org/t/p/w500/${actor.profilePic}` : ''}
              ratio="1/1"
            />
            <Typography variant="h4" sx={{ p: 1 }}>
              {actor && actor.name ? actor.name : 'loading..'}
            </Typography>
          </>
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={actors.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
    </Card>
  );
}
