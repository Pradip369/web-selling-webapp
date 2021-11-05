import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link, NavLink } from "react-router-dom"
import { IconButton, Menu, MenuItem } from '@mui/material';
import { logout_user } from './ApiAction/SendApiRequest';

const NavBar = ({ isAuthenticated }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        setAnchorEl(null);
        logout_user();
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='py-0' style={{ background: '#1a1a1a', zIndex: "1202" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' className='text-decoration-none' style={{ fontFamily: 'fantasy', color: 'orangered' }}>
                            Web ⇌ Selling
                        </Link>
                    </Typography>
                    {
                        isAuthenticated ?
                            <React.Fragment>
                                <IconButton onClick={handleClick} className='text-light'>
                                    <TableChartIcon />
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <NavLink to='/' exact activeClassName='nav__active_link' className='text-decoration-none link-dark'>
                                        <MenuItem onClick={handleClose}>
                                            Home
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to='/manage_website' activeClassName='nav__active_link' className='text-decoration-none link-dark'>
                                        <MenuItem onClick={handleClose}>
                                            Manage Website
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to='/my_profile' activeClassName='nav__active_link' className='text-decoration-none link-dark'>
                                        <MenuItem onClick={handleClose}>
                                            My Profile
                                        </MenuItem>
                                    </NavLink>
                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Link to='/login' className='text-decoration-none'>
                                    <Button color="info" variant='contained' size='small'>Login</Button>
                                </Link>
                                &nbsp;
                                <Link to='/register' className='text-decoration-none'>
                                    <Button color="success" variant='contained' size='small'>Register</Button>
                                </Link>
                            </React.Fragment>
                    }
                </Toolbar>
            </AppBar>
            <br />
        </Box>
    );
}

export default NavBar;