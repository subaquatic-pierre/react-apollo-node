import React from 'react'
import { useQuery, useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core'
import {
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@material-ui/core';

import { GET_ALL_RECIPES } from '../../queries/allRecipes'
import Loading from '../Loading';
import Error from '../Error';

const useStyles = makeStyles(theme => ({
    card: {
        '& a': {
            textDecoration: 'none',
        },
        margin: '1rem 0'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        height: '300px',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    likes: {
        padding: '0.5rem'
    }
}))

const Recipes = () => {
    const { loading, error, data } = useQuery(GET_ALL_RECIPES)
    const classes = useStyles()

    if (loading) return <Loading />
    if (error) return <Error message={error.message} />

    const RecipeCard = ({ recipe }) => {
        return (
            <Card className={classes.card}>
                <CardContent>
                    <div className={classes.header}>
                        <Link to={`/recipe/${recipe._id}`}>
                            <Typography variant="h5" component="h2" >
                                {recipe.name}
                            </Typography>
                        </Link>
                        <Typography className={classes.likes}>
                            Likes: {recipe.likes}
                        </Typography>
                    </div>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Category"
                                secondary={recipe.category} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Description"
                                secondary={recipe.description} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Creator"
                                secondary={recipe.username} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Instructions"
                                secondary={recipe.instructions} />
                        </ListItem>
                    </List>
                </CardContent>
            </Card >
        )
    }

    return (
        <>
            {loading &&
                (<div className={classes.loading}>
                    <CircularProgress />
                </div>)}
            {
                data &&
                data.getAllRecipes.map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))
            }
        </>
    )

}

export default Recipes;