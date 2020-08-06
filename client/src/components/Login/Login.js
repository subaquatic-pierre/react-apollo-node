import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { Redirect } from 'react-router-dom'
import {
    makeStyles,
    Paper,
    Typography,
    Button,
    TextField
} from '@material-ui/core'

import { handleInputChange, handleLoginSubmit } from '../../utils/formUtils'
import { LOGIN_USER } from '../../mutations/loginUser'
import { GET_PROFILE } from '../../queries/getProfile';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTextField-root': {
            marginTop: theme.spacing(2),
            width: '70%',
        },
    },
    paper: {
        padding: '1rem',
        paddingBottom: '3rem'
    },
    button: {
        marginTop: '2rem'
    }
}))

const initialState = {
    username: '',
    password: '',
}

const Login = () => {
    const [state, setState] = useState({ ...initialState })
    const [error, setError] = useState(false)
    const classes = useStyles()
    const [loginUser] = useMutation(LOGIN_USER)
    const client = useApolloClient()

    return (
        <Paper className={classes.paper}>
            <Typography
                variant='h5'
                component='h1'
                align='center'
                className={classes.heading}
            >
                Login
            </Typography>
            <form noValidate className={classes.root} autoComplete='off'>
                <TextField
                    name="username"
                    label="Username"
                    value={state.username}
                    onChange={(event) => handleInputChange(event, setState, setError)}
                    variant="outlined"
                />
                <TextField
                    name="password"
                    label="Password"
                    value={state.password}
                    onChange={(event) => handleInputChange(event, setState, setError)}
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(event) => handleLoginSubmit(event, loginUser, state, client)}
                    type='submit'
                >
                    Login
                </Button>
            </form>
        </Paper>
    )
}

export default Login;