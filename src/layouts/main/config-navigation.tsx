import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.contact,
  },
  {
    title: 'Pricing',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.pricing,
  },
];
