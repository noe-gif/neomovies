import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';
import { useEffect, useRef, useState } from 'react';

import ReactCardFlip from 'react-card-flip';
import { getMainTrailerLogo, getMovieById } from 'src/api/discover';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

import { m } from 'framer-motion';
import { varFade, MotionViewport } from 'src/components/animate';

import { _mock } from 'src/_mock';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import favouriteAnimation from 'src/assets/animations/lotties/favourite.json';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import { DB } from 'src/auth/context/firebase/auth-provider';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: number;
    loading: boolean;
  }[];
  slidesToShow?: number;
};

export default function CarouselCenterMode({ data, slidesToShow = 5 }: Props) {
  const carousel = useCarousel({
    slidesToShow: slidesToShow,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
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
          {data ? (
            data.map((item) => (
              <Box key={item.id} sx={{ px: 1 }}>
                <CarouselItem item={item} />
              </Box>
            ))
          ) : (
            <></>
          )}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    id: number;
    loading: boolean;
  };
};

const findAndPlaceSeenMove = (savedMovies: any, movie: any) => {
  const exists = savedMovies.find((item: any) => item.id === movie.id);

  if (exists) {
    return savedMovies;
  }

  return [...savedMovies, movie];
};

const findAndPlaceSaveMove = (savedMovies: any, movie: any) => {
  const index = savedMovies.findIndex((item: any) => item.id === movie.id);

  if (index !== -1) {
    return savedMovies.splice(index, 1);
  }
  return savedMovies.concat(movie);
};
function CarouselItem({ item }: CarouselItemProps) {
  const { user } = useAuthContext();
  const theme = useTheme();
  const [isMovieCardFlipped, setIsMovieCardFlipped] = useState(false);
  const { logo } = getMainTrailerLogo(item.id);
  const { data } = getMovieById(item.id);
  const favouriteRef = useRef<LottieRefCurrentProps>(null);
  const { enqueueSnackbar } = useSnackbar();

  const seen = (movie: any) => {
    const userProfile = doc(collection(DB, 'users'), user?.uid);
    getDoc(userProfile)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setDoc(userProfile, {
            email: userData?.email,
            displayName: userData?.displayName,
            profileImage: userData?.profileImage || '',
            birthdate: userData?.birthdate,
            address: userData?.address,
            plan: userData?.plan,
            favourites: userData?.favourites,
            history: userData?.history ? findAndPlaceSeenMove(userData?.history, movie) : [movie],
          })
            .then(() => {})
            .catch((error: any) => {
              console.error(error.message);
            });
        }
      })
      .catch((error) => {
        console.error('Error getting user document:', error);
      });
  };

  const save = (movie: any) => {
    const userProfile = doc(collection(DB, 'users'), user?.uid);
    getDoc(userProfile)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setDoc(userProfile, {
            email: userData?.email,
            displayName: userData?.displayName,
            profileImage: userData?.profileImage || '',
            birthdate: userData?.birthdate,
            address: userData?.address,
            plan: userData?.plan,
            favourites: userData?.favourites
              ? findAndPlaceSaveMove(userData?.favourites, movie)
              : [movie],
          })
            .then(() => {
              enqueueSnackbar('Added to facourites!');
            })
            .catch((error: any) => {
              console.error(error.message);
            });
        }
      })
      .catch((error) => {
        console.error('Error getting user document:', error);
      });
  };

  return (
    <ReactCardFlip
      containerClassName="movie-flip-card"
      flipDirection="horizontal"
      isFlipped={isMovieCardFlipped}
    >
      <Paper
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          rel="noopener"
          onClick={() => {
            favouriteRef.current?.goToAndPlay(0, true);
            save(data);
          }}
          sx={{
            borderColor: 'text.primary',
            borderRadius: '50%',
            position: 'absolute',
            top: '82%',
            left: '75%',
            zIndex: 10,
            width: '20%',
            height: '15%',
            minWidth: '48px',
            padding: 0,
          }}
        >
          <Lottie
            animationData={favouriteAnimation}
            lottieRef={favouriteRef}
            autoPlay={false}
            loop={false}
            onDOMLoaded={() => {
              favouriteRef.current?.goToAndStop(0, true);
            }}
            onLoopComplete={() => {
              favouriteRef.current?.goToAndStop(0, true);
            }}
            // onComplete={() => {
            //   favouriteRef.current?.goToAndStop(0, true);
            // }}
            style={{ width: '100%', height: '100%', position: 'absolute', zIndex: '1' }}
          />
        </Button>

        <Image
          onClick={() => {
            setIsMovieCardFlipped(!isMovieCardFlipped);
            seen(data);
          }}
          alt={'title'}
          src={
            data && data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : ''
          }
          ratio="3/4"
        />
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
      <Paper
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => {
          setIsMovieCardFlipped(!isMovieCardFlipped);
        }}
      >
        <Image
          alt={'title'}
          src={
            data && data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : ''
          }
          ratio="3/4"
          style={{ opacity: 0 }}
        />
        <CardContent
          sx={{
            bottom: 0,
            zIndex: 9,
            width: '100%',
            height: '100%',
            textAlign: 'left',
            position: 'absolute',
            color: 'common.white',
            backgroundColor: '#202020',
          }}
        >
          {logo && logo.logos ? (
            <Box>
              <m.div variants={varFade().inDown}>
                <Typography variant="h4" sx={{ pb: 1 }}>
                  {data && data.original_title ? data.original_title : 'loading..'}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.4, pb: 2 }}>
                  {data && data.overview
                    ? data.overview.length >= 450
                      ? data.overview.slice(0, 450) + '...'
                      : data.overview.slice(0, 450)
                    : 'loading..'}
                </Typography>
                <br />
                <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                  {`Genre: ${
                    data && data.genres && data.genres[0]?.name ? data.genres[0].name : 'loading..'
                  }`}
                </Typography>
                <br />
                <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                  Ration:{' '}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color:
                        data && data.vote_average
                          ? data.vote_average >= 8
                            ? '#00F016'
                            : data.vote_average >= 6
                            ? '#FFEF4D'
                            : '#F04C00'
                          : '',
                    }}
                  >
                    {data && data.vote_average
                      ? parseFloat(data.vote_average.toFixed(1))
                      : 'loading..'}
                  </Typography>
                  /10
                </Typography>
              </m.div>

              <Image
                alt={'title'}
                src={`https://image.tmdb.org/t/p/w500/${
                  logo.logos?.length > 0 &&
                  logo.logos.find((item: any) => item.iso_639_1 === 'en')?.file_path
                    ? logo.logos.find((item: any) => item.iso_639_1 === 'en').file_path
                    : ''
                }`}
                style={{
                  position: 'absolute',
                  top: 30,
                  left: -50,
                  width: '35vw',
                  height: '35vh',
                  transform: 'rotate(-40deg)',
                  opacity: '0.05',
                  // objectFit: 'cover',
                }}
              />
              <Image
                alt={'title'}
                src={`https://image.tmdb.org/t/p/w500/${
                  logo.logos?.length > 0 &&
                  logo.logos.find((item: any) => item.iso_639_1 === 'en')?.file_path
                    ? logo.logos.find((item: any) => item.iso_639_1 === 'en').file_path
                    : ''
                }`}
                style={{
                  position: 'absolute',
                  top: '85%',
                  left: '55%',
                  width: '40%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ) : (
            <></>
          )}
        </CardContent>
      </Paper>
    </ReactCardFlip>
  );
}
