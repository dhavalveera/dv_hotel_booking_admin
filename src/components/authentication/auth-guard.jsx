import { useEffect, useState } from 'react';

// Nextjs
import { useRouter } from 'next/router';

// PropTypes
import PropTypes from 'prop-types';

// useAuth Hooks
import { useAuth } from '../../hooks/use-auth';

export const AuthGuard = (props) => {
  const { children } = props;

  const auth = useAuth();

  const router = useRouter();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!auth.isAuthenticated) {
      router.push({
        pathname: '/',
        query: {
          returnUrl: router.asPath,
        },
      });
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

AuthGuard.propTypes = {
  children: PropTypes.node,
};
