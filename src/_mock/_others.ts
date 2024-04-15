import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _pricingPlans = [
  {
    id: 1,
    subscription: 'Eco',
    price: 1.99,
    caption: 'Forever',
    lists: ['Great video quality', '1080p resolution', 'TV, computer, mobile'],
    labelAction: 'Choose Eco',
  },
  {
    id: 2,
    subscription: 'Standard',
    price: 4.99,
    caption: 'Saving $24 a year',
    lists: [
      'Great video quality',
      '1080p resolution',
      'TV, computer, mobile',
      'Recommandation',
      'Interviews',
    ],
    labelAction: 'Choose Standard',
  },
  {
    id: 3,
    subscription: 'Premium',
    price: 9.99,
    caption: 'Saving $124 a year',
    lists: [
      'Great video quality',
      '1080p resolution',
      'TV, computer, mobile',
      'New recommandation',
      'Interviews',
      'license',
      '4K+HDR',
    ],
    labelAction: 'Choose Premium',
  },
];
