import { useRef, useState, Fragment, useEffect, useCallback } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
} from '@mui/material';

// SVG Icons
import { Menu as MenuIcon } from '../../../icons/menu';
import { Bell as BellIcon } from '../../../icons/bell';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';

// Navbar Components
import { NotificationsPopover } from './notifications-popover';
import { AccountPopover } from './account-popover';

// Utils
import { getInitials } from '../../../utils/get-initials';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

const NotificationsButton = () => {
  const anchorRef = useRef(null);

  const [unread, setUnread] = useState(0);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  // Temporary
  const [notiMsg, setNotiMsg] = useState([]);

  const handleMarkAsRead = () => {};

  return (
    <Fragment>
      <Tooltip title='Notifications'>
        <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleOpenPopover}>
          <Badge color='error' badgeContent={unread}>
            <BellIcon fontSize='small' />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
        notiMsg={notiMsg}
        handleMarkAsRead={handleMarkAsRead}
      />
    </Fragment>
  );
};

const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <Fragment>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2,
        }}>
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={getInitials('DV')}>
          <UserCircleIcon fontSize='small' />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </Fragment>
  );
};

export const DashboardNavbar = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <Fragment>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}>
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}>
            <MenuIcon fontSize='small' />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <NotificationsButton />

          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </Fragment>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
