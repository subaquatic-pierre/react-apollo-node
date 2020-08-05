import React from 'react';
import {
    makeStyles,
    Card,
    CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        height: '300px',
        alignItems: 'center'
    },
}))

const Loading = () => {
    const classes = useStyles()
    return (
        <Card>
            <div role='loading' className={classes.loading}>
                <CircularProgress />
            </div>
        </Card>
    )
}

export default Loading;