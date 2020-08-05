import React from 'react';
import {
    makeStyles,
    Card,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    error: {
        display: 'flex',
        justifyContent: 'center',
        height: '300px',
        alignItems: 'center'
    },
}))

const Error = ({ message }) => {
    const classes = useStyles()
    return (
        <Card>
            <div role='error' className={classes.error}>
                <h4>Error: </h4>
                <p> {message}</p>
            </div>
        </Card>
    )
}

export default Error;