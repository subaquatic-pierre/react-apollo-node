import React from 'react';
import { useApolloClient } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MenuItem } from '@material-ui/core';

import getUser from '../../auth/getUser';
import { siteTitle } from '../../utils/siteConfig';

const useStyles = makeStyles((theme) => ({
    root: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'white',
        flexGrow: 1,
        '& a': {
            textDecoration: 'none',
            textTransform: 'uppercase',
            color: 'white'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }

}));



const Navbar = () => {
    const classes = useStyles();
    const client = useApolloClient()
    const user = getUser(client)

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.replace('/')
    }

    const history = useHistory()

    const AuthNav = () => (
        <div aria-label='auth-nav'>
            <MenuItem onClick={() => { history.push('/add-recipe') }}>
                Add Recipe
            </MenuItem>
            <MenuItem onClick={() => { history.push('/profile') }}>
                {user.username.toUpperCase()}
            </MenuItem>
            <MenuItem name='logout-button' onClick={handleLogout}>
                Logout
            </MenuItem>
        </div >
    )

    const Nav = () => (
        <div aria-label='unauth-nav'>
            <Link to='/login'>
                <MenuItem color='inherit'>
                    Login
                </MenuItem>
            </Link>
            <Link to='/signup'>
                <MenuItem color='inherit'>
                    Signup
                </MenuItem>
            </Link>
        </div >
    )

    return (
        <div data-testid='navbar' className={classes.root}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <Link
                        to='/'
                        className={classes.title}
                    >
                        <Button color='inherit'>
                            <Typography component='h2' variant='h6'>
                                {siteTitle}
                            </Typography>
                        </Button>
                    </Link>

                    <MenuItem color='inherit' onClick={() => { history.push('/search') }}>
                        Search
                    </MenuItem>

                    {user ?
                        <AuthNav user={user} />
                        :
                        <Nav />
                    }
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default Navbar;