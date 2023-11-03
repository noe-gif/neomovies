import { memo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@mui/material';

import Iconify from 'src/components/iconify';

import { useSettingsContext } from 'src/components/settings';

import NavList from './nav-list';
import { AdressListProps, NavProps, NavGroupProps } from '../types';

// ----------------------------------------------------------------------

export const AdressList = ({ poi }: AdressListProps) => {
  const [isCreateBtnHover, setIsCreateBtnHover] = useState(false);
  const settings = useSettingsContext();

  return (
    <Box
      sx={{
        px: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        component="nav"
        id="adress-list-vertical"
        sx={{
          width: '100%',
          maxHeight: '330px',
          overflowY: 'scroll',
          px: 1,
          py: 1,
          borderRadius: 1,
        }}
        className={settings.themeMode === 'light' ? 'lightScrollBar' : 'darkScrollBar'}
      >
        {poi
          ? poi.map((adress: any, index: number) => (
              <ListItemButton
                key={index}
                href="#"
                sx={{
                  fontSize: 11,
                  marginBottom: 2,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'flex-start',
                  justifyContent: 'left',
                  color: (theme) => theme.palette.text.secondary,
                  borderRadius: 1,
                  boxShadow:
                    '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 14px -4px rgba(145, 158, 171, 0.12)',
                  transition: (theme) =>
                    theme.transitions.create(['color'], {
                      duration: theme.transitions.duration.shortest,
                    }),
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                <span
                  title={adress.label.length >= 28 ? adress.label : ''}
                  style={{ textAlign: 'left' }}
                >
                  <ListItemText
                    primary={
                      adress.label.length >= 28 ? adress.label.slice(0, 26) + '...' : adress.label
                    }
                  />
                </span>
              </ListItemButton>
            ))
          : [...Array(6)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  fontSize: 11,
                  marginBottom: 2,
                  height: 40,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  boxShadow:
                    '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                }}
                className={
                  settings.themeMode === 'light' ? 'shimmer-light-mode' : 'shimmer-dark-mode'
                }
              />
            ))}
      </Stack>
      <Iconify
        onMouseEnter={() => setIsCreateBtnHover(true)}
        onMouseLeave={() => setIsCreateBtnHover(false)}
        icon={'solar:add-square-bold-duotone'}
        width={30}
        style={{
          cursor: 'pointer',
        }}
        sx={{
          color: (theme) =>
            isCreateBtnHover ? theme.palette.primary.light : theme.palette.primary.main,
        }}
      />
    </Box>
  );
};

function NavSectionVertical({ data, slotProps, ...other }: NavProps) {
  return (
    <Stack component="nav" id="nav-section-vertical" {...other}>
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          subheader={group.subheader}
          items={group.items}
          slotProps={slotProps}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

function Group({ subheader, items, slotProps }: NavGroupProps) {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((list) => (
    <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
  ));

  return (
    <Stack sx={{ px: 2 }}>
      {subheader ? (
        <>
          <ListSubheader
            disableGutters
            disableSticky
            onClick={handleToggle}
            sx={{
              fontSize: 11,
              cursor: 'pointer',
              typography: 'overline',
              display: 'inline-flex',
              color: 'text.disabled',
              mb: `${slotProps?.gap || 4}px`,
              p: (theme) => theme.spacing(2, 1, 1, 1.5),
              transition: (theme) =>
                theme.transitions.create(['color'], {
                  duration: theme.transitions.duration.shortest,
                }),
              '&:hover': {
                color: 'text.primary',
              },
              ...slotProps?.subheader,
            }}
          >
            {subheader}
          </ListSubheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        renderContent
      )}
    </Stack>
  );
}
