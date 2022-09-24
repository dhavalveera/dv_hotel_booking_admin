import React, { Fragment } from 'react';

// Nextjs
import Head from 'next/head';

// MUI
import { Box, Container, Grid, Typography } from '@mui/material';

// AuthGuard
import { AuthGuard } from '../../components/authentication/auth-guard';

// Dashboard Layout
import { DashboardLayout } from '../../components/dashboard/layout/dashboard-layout';

// Momentjs
import moment from 'moment';

const DashboardPage = () => {
  const currTime = moment().format('HH');

  return (
    <Fragment>
      <Head>
        <title>Dashboard | DV Hotel</title>
      </Head>

      <Box component={'main'} sx={{ flexGrow: 1, py: 5 }}>
        <Container maxWidth={'xl'}>
          <Box sx={{ mb: 5 }}>
            <Grid container justifyContent='space-between' spacing={3}>
              <Grid item>
                {/* <Typography variant='h4'>Good Morning</Typography> */}
                {currTime >= 0 && currTime < 12 ? (
                  <Typography variant='h4'>Good Morning</Typography>
                ) : (
                  ' '
                )}
                {currTime >= 12 && currTime < 16 ? (
                  <Typography variant='h4'>Good Afternoon</Typography>
                ) : (
                  ' '
                )}
                {currTime >= 16 && currTime < 21 ? (
                  <Typography variant='h4'>Good Evening</Typography>
                ) : (
                  ' '
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

DashboardPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default DashboardPage;
