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
    const classes = useStyles()
    const [loginUser] = useMutation(LOGIN_USER)
    const client = useApolloClient()
    // handle change of all input box'x, update the state
    const handleChange = ({ target }) => {
        const { name, value } = target
        setState(state => ({
            ...state,
            [name]: value
        })
        )
    }

    // ensure all fields filled in to enable button
    const validateForm = () => {
        const { username, password } = state
        if (username && password) {
            return true
        } else {
            return false
        }
    }

    // handle submit button click
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validateForm()) return


        // submit request to server with state info from from
        loginUser({ variables: { ...state } })
            .then(async res => {
                localStorage.setItem('token', res.data.loginUser.token)
                await client.query({
                    query: GET_PROFILE,
                    variables: { token: res.data.loginUser.token }
                })
                window.location.assign('/')
            }).catch(err => {
                console.log(err)
            })
    }


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
                    onChange={(event) => handleChange(event)}
                    variant="outlined"
                />
                <TextField
                    name="password"
                    label="Password"
                    value={state.password}
                    onChange={(event) => handleChange(event)}
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(event) => handleSubmit(event)}
                    type='submit'
                >
                    Login
                </Button>
            </form>
        </Paper>
    )
}

export default Login;