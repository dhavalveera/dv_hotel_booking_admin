import React, { useEffect, useState } from 'react';

// Nextjs
import { useRouter } from 'next/router';

// PropTypes
import PropTypes from 'prop-types';

// useAuth Context
import { useAuth } from '../../hooks/use-auth';

export const GuestGuard = (props) => {
  const { children } = props;

  const auth = useAuth();

  const router = useRouter();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.isAuthenticated) {
      router.push('/dashboard');
    } else {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};
