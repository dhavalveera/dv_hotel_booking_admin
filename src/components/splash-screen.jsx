import { Box, styled } from '@mui/material';

const OZELogoSplash = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '75%',
  },
  [theme.breakpoints.down('md')]: {
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    width: '15%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '15%',
  },
}));

export const SplashScreen = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'neutral.900',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 2000,
    }}>
    <OZELogoSplash src='/Logo/HLogo.png' alt='DV Hotel Admin'></OZELogoSplash>
  </Box>
);
