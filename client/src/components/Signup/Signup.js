import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    makeStyles,
    Paper,
    Typography,
    Button,
    TextField
} from '@material-ui/core'

import { CREATE_USER } from '../../mutations/createUser'

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
    email: '',
    password: '',
    confirmPassword: ''
}

const Signup = () => {
    const [state, setState] = useState({ ...initialState })
    const classes = useStyles()
    const [createUser] = useMutation(CREATE_USER)

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
        const { username, email, password, confirmPassword } = state
        if (username && email && password && password === confirmPassword) {
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
        createUser({ variables: { ...state } })
            .then(res => {
                window.location.assign('/login')
                console.log(res)
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
                Sign Up
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
                    name="email"
                    label="Email"
                    value={state.email}
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
                <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    value={state.confirmPassword}
                    onChange={(event) => handleChange(event)}
                    type="password"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(event) => handleSubmit(event)}
                    type='submit'
                >
                    Submit
                </Button>
            </form>
        </Paper>
    )
}

export default Signup;