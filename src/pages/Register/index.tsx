import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, LinearProgress, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme(); // Usar el tema actual

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [passwordTimeout, setPasswordTimeout] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const validateForm = (data: FormData) => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
    };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.get('firstName')) {
      newErrors.firstName = t('FIRST_NAME_REQUIRED');
      isValid = false;
    }
    if (!data.get('lastName')) {
      newErrors.lastName = t('LAST_NAME_REQUIRED');
      isValid = false;
    }

    if (!data.get('birthDate')) {
      newErrors.birthDate = t('BIRTH_DATE_REQUIRED');
      isValid = false;
    }

    const email = data.get('email') as string;
    const confirmEmail = data.get('confirmEmail') as string;

    if (!email) {
      newErrors.email = t('EMAIL_REQUIRED');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = t('EMAIL_INVALID');
      isValid = false;
    }

    if (confirmEmail !== email) {
      newErrors.confirmEmail = t('EMAILS_DO_NOT_MATCH');
      isValid = false;
    }

    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    if (!password) {
      newErrors.password = t('PASSWORD_REQUIRED');
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = t('PASSWORD_TOO_SHORT');
      isValid = false;
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = t('PASSWORDS_DO_NOT_MATCH');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;
    return (strength / 4) * 100;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
    setShowPasswordStrength(true);

    if (passwordTimeout) {
      clearTimeout(passwordTimeout);
    }

    const timeout = setTimeout(() => {
      setShowPasswordStrength(false);
    }, 5000);

    setPasswordTimeout(timeout as unknown as number);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (validateForm(data)) {
      console.log({
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        confirmEmail: data.get('confirmEmail'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword'),
        birthDate: data.get('birthDate'),
      });
    }
  };

  const onLoginClick = () => {
    navigate('/auth/login');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 100) return theme.palette.success.main;  // Verde
    if (passwordStrength >= 75) return theme.palette.warning.main;    // Amarillo
    return theme.palette.error.main;                                   // Rojo
  };

  const availableLanguages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  const languagesToShow = availableLanguages.filter(
    (lang) => lang.code !== i18n.language
  );

  const handleLanguageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('REGISTER')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t('FIRST_NAME')}
                autoFocus
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={t('LAST_NAME')}
                name="lastName"
                autoComplete="family-name"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="birthDate"
                label={t('BIRTH_DATE')}
                name="birthDate"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.birthDate}
                helperText={errors.birthDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t('EMAIL_ADDRESS_PLACEHOLDER')}
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmEmail"
                label={t('CONFIRM_EMAIL_ADDRESS')}
                name="confirmEmail"
                autoComplete="email"
                error={!!errors.confirmEmail}
                helperText={errors.confirmEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t('PASSWORD_PLACEHOLDER')}
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
                onChange={handlePasswordChange}
              />
              {showPasswordStrength && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    {passwordStrength === 100
                      ? t('PASSWORD_STRONG')
                      : passwordStrength >= 75
                        ? t('PASSWORD_MODERATE')
                        : t('PASSWORD_WEAK')}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: theme.palette.background.default, // Fondo del tema
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getPasswordStrengthColor(), // Color dinámico
                      },
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label={t('CONFIRM_PASSWORD_PLACEHOLDER')}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('REGISTER')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={onLoginClick}>
                {t('ALREADY_HAVE_AN_ACCOUNT')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Botón de selección de idioma */}
      <Tooltip title={t('CHANGE_LANGUAGE')} aria-label="change-language">
        <IconButton
          color="inherit"
          aria-label="change-language"
          onClick={handleLanguageMenuClick}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {languagesToShow.map((lang) => (
          <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default RegisterPage;