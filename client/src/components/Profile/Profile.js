import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core'
import {
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Button
} from '@material-ui/core';

import { GET_PROFILE } from '../../queries/getProfile';
import Loading from '../Loading';
import Error from '../Error';
import Favourite from '../Favourite';
import UserRecipe from '../UserRecipe';

const useStyles = makeStyles(theme => ({
    card: {
        margin: '1rem 0'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    likes: {
        padding: '0.5rem'
    },
    favs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
    },
    buttonDiv: {
        display: 'flex'
    }
}))

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-GB')
    const newTime = new Date(date).toLocaleTimeString('en-GB')
    return `${newDate} at ${newTime}`
}

const token = localStorage.getItem('token')

const Profile = () => {
    const classes = useStyles()

    const { data, loading, error } = useQuery(GET_PROFILE, { variables: { token } })

    if (loading) return <Loading />
    if (error) return <Error message={error.message} />

    if (data.getProfile) {
        const profile = data.getProfile
        const user = data.getProfile.user
        const favRecipes = data.getProfile.favRecipes
        const createdRecipes = data.getProfile.createdRecipes
        const noFavs = favRecipes.length === 0
        const noCreatedRecipes = createdRecipes.length === 0

        return (
            <>
                <Card classusername={classes.card}>
                    <CardContent>
                        < div className={classes.header} >
                            <Typography variant="h5" component="h2" >
                                {user.username}
                            </Typography>
                        </div >
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Email"
                                    secondary={user.email}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Join Date"
                                    secondary={formatDate(user.joinDate)}
                                />
                            </ListItem>
                        </List>
                        <Button
                            variant='contained'
                            color='primary'>
                            Do Something
                        </Button>
                    </CardContent>
                </Card>
                {noFavs ?
                    <div className={classes.favs}>
                        <Typography align='center' variant='h5'>
                            No Favourites
                        </Typography>
                    </div>
                    :
                    <div className={classes.favs}>
                        <Typography align='center' variant='h5'>
                            Favourites
                        </Typography>
                        {favRecipes.map(recipe => (
                            <Favourite
                                key={recipe._id}
                                user={user}
                                recipe={recipe} />
                        ))}
                    </div>
                }
                {noCreatedRecipes ?
                    <div className={classes.favs}>
                        <Typography align='center' variant='h5'>
                            No Created Recipes
                        </Typography>
                    </div>
                    :
                    <div className={classes.favs}>
                        <Typography align='center' variant='h5'>
                            User Created Recipes
                        </Typography>
                        {createdRecipes.map(recipe => (
                            <UserRecipe
                                user={user}
                                key={recipe._id}
                                createdRecipes={createdRecipes}
                                recipe={recipe} />
                        ))}
                    </div>
                }
            </>
        )
    } else {
        return (
            <p>Who knows ?</p>
        )
    }
}

export default Profile;