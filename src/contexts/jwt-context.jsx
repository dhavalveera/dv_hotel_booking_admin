import { createContext, useEffect, useReducer } from 'react';
import { authApi } from '../api/auth-api';

// PropTypes
import PropTypes from 'prop-types';

const initialState = {
  isAuthenticated: false,
  inInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  platform: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const userpayload = window.localStorage.getItem('userpayload');

        if (userpayload) {
          const user = await authApi.me(userpayload);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const userpayload = await authApi.login({ email, password });

    const user = await authApi.me(userpayload);

    localStorage.setItem('userpayload', JSON.stringify(userpayload));

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    localStorage.clear();

    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, password) => {
    const userpayload = await authApi.register({ email, password });
    // console.log('userpayload', userpayload);
    const user = await authApi.me(userpayload);

    localStorage.setItem('accessToken', userpayload.token);
    localStorage.setItem(
      'userpayload',
      JSON.stringify(userpayload.userDetails)
    );
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
