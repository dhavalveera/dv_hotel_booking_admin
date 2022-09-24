import React, { useState } from 'react';

// Nextjs
import { useRouter } from 'next/router';

// Formik + Yup
import * as Yup from 'yup';
import { useFormik } from 'formik';

// MUI
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// Hooks
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

const JWTLogin = (props) => {
  const isMounted = useMounted();

  const router = useRouter();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login(values.email, values.password);

        if (isMounted()) {
          const returnUrl = router.query.returnUrl || '/dashboard';
          router.push(returnUrl);
        }
      } catch (err) {
        console.group('Login - Catch Block');
        console.log(err);
        console.groupEnd();

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <Box component={'form'} onSubmit={formik.handleSubmit} {...props}>
      <TextField
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label='Email Address'
        margin='normal'
        name='email'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type='email'
        value={formik.values.email}
      />

      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label='Password'
        margin='normal'
        name='password'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {showPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size='large'
          type='submit'
          variant='contained'>
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default JWTLogin;
