import { Fragment } from 'react';

// Prop-Types
import PropTypes from 'prop-types';

// MUI
import { Box, Popover, Typography } from '@mui/material';

// SVG Icon
import { MailOpen as MailOpenIcon } from '../../../icons/mail-open';

// momentjs - to formate the time
import moment from 'moment';

// Scrollbar
import { Scrollbar } from '../../scrollbar';

export const NotificationsPopover = (props) => {
  const { anchorEl, onClose, open, notiMsg, handleMarkAsRead, ...other } =
    props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 380 } }}
      transitionDuration={0}
      {...other}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}>
        <Typography color='inherit' variant='h6'>
          Notifications
        </Typography>
      </Box>
      {notiMsg.length !== 0 ? (
        <Fragment>
          <Scrollbar>
            <Typography variant='subtitle1'>Msgs</Typography>
          </Scrollbar>
        </Fragment>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant='subtitle2'>
            There are no notifications
          </Typography>
        </Box>
      )}
    </Popover>
  );
};

NotificationsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
