import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { _pricingPlans } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function PaymentSummary({
  sx,
  planId,
  ...other
}: { sx?: BoxProps } & { planId: string }) {
  const router = useRouter();
  const { user, updateUser } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState(false);

  if (user && user?.plan && user?.plan.id !== 0) {
    router.push(paths.dashboard.root);
  }

  const planInformation = _pricingPlans.find((plan) => plan.id === Number(planId));
  const handlePayment = () => {
    setIsloading(true);
    const userNewDataFormatting = {
      plan: {
        date: new Date(),
        id: Number(planId),
        name: planInformation?.subscription || 'plan',
      },
    };
    updateUser({
      ...user,
      ...userNewDataFormatting,
    });
    enqueueSnackbar('Update success!');
    // window.location.reload();
  };
  const renderPrice = (
    <Stack direction="row" justifyContent="flex-end">
      <Typography variant="h4">$</Typography>

      <Typography variant="h2">{planInformation?.price}</Typography>

      <Typography
        component="span"
        sx={{
          alignSelf: 'center',
          color: 'text.disabled',
          ml: 1,
          typography: 'body2',
        }}
      >
        / mo
      </Typography>
    </Stack>
  );

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>

          <Label color="error">{planInformation?.subscription.toUpperCase()}</Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Billed Monthly
          </Typography>
          <Switch defaultChecked />
        </Stack>

        {renderPrice}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Total Billed</Typography>

          <Typography variant="subtitle1">${planInformation?.price}*</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: 5, mb: 3 }}
        onClick={handlePayment}
        loading={isLoading}
      >
        Subscribe to plan
      </LoadingButton>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="solar:shield-check-bold" sx={{ color: 'success.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}
