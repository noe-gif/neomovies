import Grid from '@mui/material/Unstable_Grid2';

import { IPaymentCard } from 'src/types/payment';
import { IAddressItem } from 'src/types/address';
import { IUserAccountBillingHistory } from 'src/types/user';

import AccountBillingPlan from './account-billing-plan';
import AccountBillingPayment from './account-billing-payment';
import AccountBillingHistory from './account-billing-history';

// ----------------------------------------------------------------------

type Props = {
  plans: {
    id: number;
    subscription: string;
    price: number;
  }[];
  cards: IPaymentCard[];
};

export default function AccountBilling({ cards, plans }: Props) {
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <AccountBillingPlan plans={plans} cardList={cards} />

        <AccountBillingPayment cards={cards} />
      </Grid>

      <Grid xs={12} md={4}>
        <AccountBillingHistory />
      </Grid>
    </Grid>
  );
}
