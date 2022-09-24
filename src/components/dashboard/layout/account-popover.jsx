// Nextjs
import { useRouter } from 'next/router';

// PropTypes
import PropTypes from 'prop-types';

// Toast
import toast from 'react-hot-toast';

// MUI
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// useAuth Hook
import { useAuth } from '../../../hooks/use-auth';

// SVG Icons
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';

// Utils Func
import { getInitials } from '../../../utils/get-initials';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;

  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      onClose?.();
      await logout();
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  let adminRole;
  if (typeof window !== undefined) {
    adminRole = localStorage.getItem('adminRole');
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}>
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
        }}>
        <Avatar
          src={getInitials('DV')}
          sx={{
            height: 40,
            width: 40,
          }}>
          <UserCircleIcon fontSize='small' />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}>
          <Typography variant='body1'>{'DV Admin'}</Typography>
        </Box>
      </Box>
      {/* <Divider /> */}
      <Box sx={{ my: 1 }}>
        {/* <NextLink
          href="/dashboard/social/profile"
          passHref
        >
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography variant="body1">
                  Profile
                </Typography>
              )}
            />
          </MenuItem>
        </NextLink> */}
        {/* <NextLink
          href="/dashboard/account"
          passHref
        >
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography variant="body1">
                  Settings
                </Typography>
              )}
            />
          </MenuItem>
        </NextLink> */}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
