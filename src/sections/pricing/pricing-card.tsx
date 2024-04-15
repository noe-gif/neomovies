import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import { CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import Link from 'next/link';

// ----------------------------------------------------------------------

// type Props = CardProps & {
//   card: {
//     userPlanId: number;
//     planId: number;
//     subscription: string;
//     price: number;
//     caption: string;
//     labelAction: string;
//     lists: string[];
//   };
//   index: number;
// };

export default function PricingCard({ card, userPlanId, planId, sx, ...other }: any) {
  const { subscription, price, caption, lists, labelAction } = card;

  const basic = subscription === 'Eco';

  const starter = subscription === 'Standard';

  const premium = subscription === 'Premium';

  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box sx={{ width: 48, height: 48 }}>
        {basic && <PlanFreeIcon />}
        {starter && <PlanStarterIcon />}
        {premium && <PlanPremiumIcon />}
      </Box>

      {starter && <Label color="info">POPULAR</Label>}
    </Stack>
  );

  const renderSubscription = (
    <Stack spacing={1}>
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {subscription}
      </Typography>
      <Typography variant="subtitle2">{caption}</Typography>
    </Stack>
  );

  const renderPrice = (
    <Stack direction="row">
      <Typography variant="h4">$</Typography>

      <Typography variant="h2">{price}</Typography>

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

  const renderList = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
        <a color="inherit">All</a>
      </Stack>

      {lists.map((item: any) => (
        <Stack
          key={item}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'body2',
          }}
        >
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
          {item}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.primary.darker,
        boxShadow: (theme) => ({
          xs: theme.customShadows.card,
          md: 'none',
        }),
        ...(starter && {
          borderTopRightRadius: { md: 0 },
          borderBottomRightRadius: { md: 0 },
        }),
        ...((starter || premium) && {
          boxShadow: (theme) => ({
            xs: theme.customShadows.card,
            md: `-40px 40px 80px 0px ${alpha(
              theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
              0.16
            )}`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {renderIcon}

      {renderSubscription}

      {renderPrice}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderList}

      {userPlanId === planId ? (
        <Button
          fullWidth
          size="large"
          variant="contained"
          color={starter ? 'primary' : 'inherit'}
          disabled={true}
        >
          {labelAction}
        </Button>
      ) : (
        <Link href={{ pathname: paths.payment, query: { planId: planId } }}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color={starter ? 'primary' : 'inherit'}
          >
            {labelAction}
          </Button>
        </Link>
      )}
    </Stack>
  );
}
