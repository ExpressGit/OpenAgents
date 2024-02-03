import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { userRegisterApi } from '@/utils/app/user';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const router = useRouter();

    const isEmailValid = (email: string) => {
        // 用邮箱格式正则校验
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email');
        const password = data.get('password');
        const username = data.get('userName');

        if (!email || !password || !username) {
            toast.error('Please fill in all fields');
            return
        }

        // 校验用户名
        if (!(username.length >= 2 && username.length <= 10)) {
            setUsernameError(true);
            return;
        }

        // 校验邮箱
        if (!isEmailValid(email)) {
            setEmailError(true);
            return
        }

        // 校验密码
        if (!(password.length >= 6 && password.length <= 20)) {
            setPasswordError(true);
            return;
        }

        setUsernameError(false);
        setEmailError(false)
        setPasswordError(false)

        setIsLoading(true)
        const result = await userRegisterApi({ username, email, password }).finally(() => setIsLoading(false));
        const { id } = result || {}
        if (id) {
            toast.success('Register Success, Redirect to Login Page in 3 Seconds');
            setTimeout(() => {
                router.push('/login')
            }, 3000);
        } else {
            toast.error('Register Failed');
        }

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" className='w-screen h-screen flex flex-col justify-center'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={usernameError}
                                    helperText={usernameError ? 'Please Input Correct Username! Length: 2-10' : ''}
                                    autoComplete="user-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={emailError}
                                    helperText={emailError ? 'Please Input Correct Email!' : ''}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={passwordError}
                                    helperText={passwordError ? 'Please Input Correct Password! Length: 6-20' : ''}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <LoadingButton
                            loading={isLoading}
                            className={`bg-[#1976D2]`}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider >
    );
}