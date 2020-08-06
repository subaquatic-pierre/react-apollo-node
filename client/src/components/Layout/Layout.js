import React from 'react';
import { useQuery } from '@apollo/client';
import { CssBaseline, Container, makeStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core';

import Navbar from '../Navbar';
import Footer from '../Footer';
import Error from '../Error';
import Loading from '../Loading'

import theme from '../../theme'

import { GET_USER } from '../../queries/getUser';

const token = localStorage.getItem('token')

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: '1rem',
        marginBottom: '1rem'
    }
}))



const Layout = ({ children }) => {
    const classes = useStyles()

    // get user data with token from local storage
    const { data, loading, error } = useQuery(GET_USER, { variables: { token: token ? token : '' } })

    if (error) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Container
                    maxWidth='sm'
                    className={classes.container}>
                    <Error message={error.message} />
                </Container>
                <Footer />
            </ThemeProvider>
        )
    }

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Container
                    maxWidth='sm'
                    className={classes.container}>
                    <Loading />
                </Container>
                <Footer />
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container
                maxWidth='sm'
                className={classes.container}>
                {children}
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Layout;