import '../styles/globals.css';

// Nextjs
import Head from 'next/head';
import Router from 'next/router';

// react-hot-toast
import { Toaster } from 'react-hot-toast';

// Redux
import { Provider as ReduxProvider } from 'react-redux';

// nProgress
import nProgress from 'nprogress';

// @emotion/react
import { CacheProvider } from '@emotion/react';

// MUI
import { CssBaseline, ThemeProvider } from '@mui/material';

// AuthContext
import { AuthConsumer, AuthProvider } from '../contexts/jwt-context';

// store of Redux
import { store } from '../store';

// Emotion Cache
import { createEmotionCache } from '../utils/create-emotion-cache';

// Theme
import { createTheme } from '../theme';

// redux-persist
import { PersistGate } from 'redux-persist/integration/react';

import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

// RTL
import { RTL } from '../components/rtl';

// Splash Screen
import { SplashScreen } from '../components/splash-screen';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>DV Hotel</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/Logo/HLogo.png' />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider>
            <ThemeProvider
              theme={createTheme({
                direction: 'ltr',
                responsiveFontSizes: true,
                mode: 'light',
              })}>
              <RTL direction={'ltr'}>
                <CssBaseline />
                <Toaster position='top-right' reverseOrder={false} />
                <AuthConsumer>
                  {(auth) =>
                    !auth.isInitialized ? (
                      <SplashScreen />
                    ) : (
                      getLayout(<Component {...pageProps} />)
                    )
                  }
                </AuthConsumer>
              </RTL>
            </ThemeProvider>
          </AuthProvider>
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
