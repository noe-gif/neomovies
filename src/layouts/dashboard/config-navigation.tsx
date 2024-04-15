import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const customIcon = (name: string) => <Iconify icon={name} />;

const ICONS = {
  blog: icon('ic_blog'),
  user: icon('ic_user'),
  movies: customIcon('solar:tv-bold-duotone'),
  shows: customIcon('material-symbols:tv-remote'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // DISCOVER
      // ----------------------------------------------------------------------
      {
        subheader: 'General',
        items: [
          {
            title: 'Menu',
            path: paths.dashboard.root,
            icon: ICONS.blog,
          },
        ],
      },

      // CATALOG PAGES
      // ----------------------------------------------------------------------
      {
        subheader: 'Catalog',
        items: [
          {
            title: 'Movies',
            path: paths.dashboard.movies,
            icon: ICONS.movies,
          },
          {
            title: 'Show',
            path: paths.dashboard.shows,
            icon: ICONS.shows,
          },
        ],
      },

      {
        subheader: 'User',
        items: [
          // USER
          {
            title: 'Profile',
            path: paths.dashboard.account,
            icon: ICONS.user,
          },
        ],
      },
    ],
    []
  );

  return data;
}
