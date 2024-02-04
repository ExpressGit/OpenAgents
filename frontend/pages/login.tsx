import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import toast from 'react-hot-toast';
import { userLoginApi } from '@/utils/app/user';
import { useRouter } from 'next/router';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {/* {'Copyright © '} */}
            {'Powered by '}
            <Link color="inherit" href="" target='_blank'>
                天机 Team
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    React.useEffect(() => {
        document.title = "天机——任务型交互式 Agent"
    }, [])

    React.useEffect(() => {
        // 如果user_id存在，则直接跳转到首页
        const userId = localStorage.getItem('user_id')
        if (userId) {
            router.push('/');
        }
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get('username')
        const password = data.get('password')

        if (!username || !password) {
            toast.error('请输入完整信息');
            return
        }

        // 校验用户名
        if (!(username.length >= 2 && username.length <= 10)) {
            setUsernameError(true);
            return;
        }

        // 校验密码
        if (!(password.length >= 6 && password.length <= 20)) {
            setPasswordError(true);
            return;
        }
        setIsLoading(true)
        const result = await userLoginApi({ username, password }).finally(() => setIsLoading(false))
        const { id } = result
        if (id) {
            toast.success('登录成功');
            localStorage.setItem('user_id', id);
            router.push('/');
        } else {
            toast.error('登录失败');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" className='w-screen h-screen flex flex-col justify-center'>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        登录
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={usernameError}
                            helperText={usernameError ? '请填写正确用户名! 长度: 2-10位' : ''}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="用户名"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            error={passwordError}
                            helperText={passwordError ? '请填写正确的密码! 长度: 6-20位' : ''}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="密码"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <LoadingButton
                            loading={isLoading}
                            className={`bg-[#1976D2]`}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            登录
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="/register" variant="body2" className=''>
                                    还没有账号？去注册
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}