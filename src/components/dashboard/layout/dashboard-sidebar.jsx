import React, { useEffect, useMemo } from 'react';

// Nextjs
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

// PropTypes
import PropTypes from 'prop-types';

// MUI
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';

// SVG Icons
import { Home as HomeIcon } from '../../../icons/home';

// Sidebar Component
import { DashboardSidebarSection } from './dashboard-sidebar-section';

// Scrollbar
import { Scrollbar } from '../../scrollbar';

// Logo from Public Dir
import DVHotelLogo from '../../../../public/Logo/HLogo.png';

const getSections = () => [
  {
    title: 'General',
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <HomeIcon fontSize='small' />,
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;

  const router = useRouter();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  });

  const sections = useMemo(() => getSections(), []);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}>
          <Box component={'div'}>
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
              <NextLink href='/' passHref>
                <a>
                  <Image src={DVHotelLogo} alt='DV Hotel' objectFit={'cover'} />
                </a>
              </NextLink>
            </Box>
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 0.5,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 1,
                  '& + &': {
                    mt: 1,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
            }}
          />
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) =>
              theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant='permanent'>
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'>
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
