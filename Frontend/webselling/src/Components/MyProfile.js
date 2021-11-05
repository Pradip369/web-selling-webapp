import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import FaceRetouchingNaturalRoundedIcon from '@mui/icons-material/FaceRetouchingNaturalRounded';
import { authContext } from '../ContextApi/contextManage';
import { profile_update } from './ApiAction/SendApiRequest';
import { Link } from 'react-router-dom';

const theme = createTheme();

export default function MyProfile() {

    const [value, setValue] = React.useState({ edit: false })
    const { state } = React.useContext(authContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('uid', state.auth.id)
        profile_update(data)
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'orangered' }}>
                        <FaceRetouchingNaturalRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        My Profile
                    </Typography>
                    <Box method='post' component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            size='small'
                            defaultValue={state.auth.username}
                            autoFocus
                            disabled={!(value.edit)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            autoComplete="email"
                            size='small'
                            defaultValue={state.auth.email}
                            disabled={!(value.edit)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="First Name"
                            name="first_name"
                            size='small'
                            defaultValue={state.auth.first_name}
                            disabled={!(value.edit)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            size='small'
                            defaultValue={state.auth.last_name}
                            disabled={!(value.edit)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Last Login"
                            name="last_login"
                            size='small'
                            defaultValue={state.auth.last_login}
                            disabled
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Join Date"
                            size='small'
                            defaultValue={state.auth.date_joined}
                            disabled
                        />

                        {value.edit &&
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                        }
                    </Box>
                    {!value.edit &&
                        <Button
                            type='button'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'orange' }}
                            color='warning'
                            onClick={() => setValue({ ...value, edit: true })}
                        >
                            Edit Profile
                        </Button>
                    }
                    <Link to='/' className='text-decoration-none mb-5'>
                        Home
                    </Link>
                </Box>
            </Container>
        </ThemeProvider>
    );
}