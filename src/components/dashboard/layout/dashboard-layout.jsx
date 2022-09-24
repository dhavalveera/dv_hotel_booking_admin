import { useState } from 'react';

// PropTypes
import PropTypes from 'prop-types';

import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';

// MUI
import { Box, styled } from '@mui/material';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}>
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
