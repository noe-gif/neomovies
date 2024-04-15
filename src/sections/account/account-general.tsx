import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { m } from 'framer-motion';
import { varFade, MotionContainer } from 'src/components/animate';
import CarouselCenterMode from 'src/sections/extra/carousel-view/carousel-center-mode';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Container } from '@mui/system';
import { _mock } from 'src/_mock';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { user, updateUser, uploadFileToStorage, getFavourites } = useAuthContext();
  if (!user) {
    router.push(paths.auth.firebase.login);
  }
  const {
    displayName,
    email,
    profileImage,
    birthdate,
    address,
  }: {
    displayName: string;
    email: string;
    profileImage: any;
    birthdate: Date;
    country: string;
    address: {
      address: string;
      state: string;
      city: string;
      country: string;
      zipCode: number;
    };
  } = user;
  const [newDateValue, setNewDateValue] = useState<Date | null>(new Date());
  const [mappedFavourites, setMappedFavourites] = useState<{ id: number; loading: boolean }[]>([]);
  const [mappedHistory, setMappedHistory] = useState<{ id: number; loading: boolean }[]>([]);

  useEffect(() => {
    async function fetchFavs() {
      try {
        const userData = await getFavourites(user);
        if (userData) {
          setMappedFavourites(userData.favourites);
        } else {
          const loadingData = [...Array(20)].map((_, index) => ({
            id: Number(_mock.id(index)),
            loading: true,
          }));
          setMappedFavourites(loadingData);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }
    async function fetchHistory() {
      try {
        const userData = await getFavourites(user);
        if (userData) {
          setMappedHistory(userData.history);
        } else {
          const loadingData = [...Array(20)].map((_, index) => ({
            id: Number(_mock.id(index)),
            loading: true,
          }));
          setMappedHistory(loadingData);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }

    fetchHistory();
    fetchFavs();
  }, []);
  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    profileImage: Yup.mixed<any>().nullable().optional(),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.number().required('Zip code is required'),
  });

  const defaultValues = {
    displayName: displayName || '',
    email: email || '',
    profileImage: profileImage || null,
    address: address?.address || '',
    state: address?.state || '',
    city: address?.city || '',
    country: address?.country || '',
    zipCode: address?.zipCode || 0,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const downloadURL = await uploadFileToStorage(data?.profileImage, user);

      const userNewDataFormatting = {
        displayName: data?.displayName || displayName,
        email: data?.email || email,
        profileImage: downloadURL || profileImage,
        birthdate: newDateValue || birthdate,
        address: {
          address: data?.address || address?.address,
          state: data?.state || address?.state,
          city: data?.city || address?.city,
          country: data?.country || address?.country,
          zipCode: data?.zipCode || address?.zipCode,
        },
      };
      updateUser({
        ...user,
        ...userNewDataFormatting,
      });
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profileImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center', backgroundColor: 'black' }}>
              <RHFUploadAvatar
                name="profileImage"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <Button variant="soft" color="error" sx={{ mt: 3 }}>
                Delete User
              </Button>
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Card sx={{ p: 3, backgroundColor: 'black' }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="displayName" label="Name" />
                <RHFTextField name="email" label="Email Address" />
                <DesktopDatePicker
                  label="Birtdate"
                  value={newDateValue}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    setNewDateValue(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />

                <RHFTextField name="address" label="Address" />

                <RHFAutocomplete
                  name="country"
                  label="Country"
                  options={countries.map((country) => country.label)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    const { code, label, phone } = countries.filter(
                      (country) => country.label === option
                    )[0];

                    if (!label) {
                      return null;
                    }

                    return (
                      <li {...props} key={label}>
                        <Iconify
                          key={label}
                          icon={`circle-flags:${code.toLowerCase()}`}
                          width={28}
                          sx={{ mr: 1 }}
                        />
                        {label} ({code}) +{phone}
                      </li>
                    );
                  }}
                />

                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="city" label="City" />
                <RHFTextField name="zipCode" label="Zip/Code" />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <m.div variants={varFade().inDown}>
        <Box sx={{ p: 5, pb: 0 }}>
          <Typography variant="h3" sx={{ pb: 2, pl: 3 }}>
            Favourites
          </Typography>
          <CarouselCenterMode
            slidesToShow={mappedFavourites?.length <= 5 ? mappedFavourites.length : 5}
            data={mappedFavourites?.slice(0, mappedFavourites.length)}
          />
        </Box>
      </m.div>
      <m.div variants={varFade().inDown}>
        <Box sx={{ p: 5, pb: 0 }}>
          <Typography variant="h3" sx={{ pb: 2, pl: 3 }}>
            History
          </Typography>
          <CarouselCenterMode
            slidesToShow={mappedHistory?.length <= 5 ? mappedHistory.length : 5}
            data={mappedHistory?.slice(0, mappedHistory.length)}
          />
        </Box>
      </m.div>
      <br />
    </Container>
  );
}
