import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import { IUserAccountBillingHistory } from 'src/types/user';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function AccountBillingHistory({}) {
  const showMore = useBoolean();
  const { user } = useAuthContext();

  return (
    <Card sx={{ backgroundColor: 'black' }}>
      <CardHeader title="Plan History" />

      <Stack spacing={1.5} sx={{ px: 3, pt: 3 }}>
        <Stack key={user.plan.id} direction="row" alignItems="center">
          <ListItemText
            primary={user.plan.name}
            secondary={new Date().toDateString()}
            primaryTypographyProps={{
              typography: 'body2',
            }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Stack alignItems="flex-start" sx={{ p: 2 }}>
        <Button
          size="small"
          color="inherit"
          startIcon={
            <Iconify
              icon={showMore.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          onClick={showMore.onToggle}
        >
          {showMore.value ? `Show Less` : `Show More`}
        </Button>
      </Stack>
    </Card>
  );
}
