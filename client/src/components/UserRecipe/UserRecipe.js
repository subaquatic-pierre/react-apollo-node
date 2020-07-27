import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom'
import {
    makeStyles,
    Typography,
    Card,
    List,
    ListItem,
    ListItemText,
    CardContent,
    Button,
} from '@material-ui/core'

import { DELETE_RECIPE } from '../../mutations/deleteRecipe';

import { ADD_LIKE } from '../../mutations/addLike'

import updateUserCreatedRecipes from '../../updateCache/updateUserCreatedRecipes';
import updateAllRecipes from '../../updateCache/updateAllRecipes';
import updateFavs from '../../updateCache/updateUserFavs';

import {
    removeRecipe,
    checkRecipeLiked,
    getFavourites,
    addRecipe,
    getAllRecipes
} from '../../updateCache/helpers';


const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        '& a': {
            textDecoration: 'none',
        },
    },
    likes: {
        padding: '0.5rem'
    },
    card: {
        marginTop: theme.spacing(2),
        minWidth: '80%'
    },
    buttonDiv: {
        display: 'flex',
        '& button': {
            marginRight: '1rem'
        }
    }
}))

const UserRecipes = ({ recipe, createdRecipes, user }) => {
    const [deleteRecipe] = useMutation(DELETE_RECIPE)
    const classes = useStyles()

    // get list of current user likes
    const favs = getFavourites(user)

    // check if recipe is in current user likes
    let liked = checkRecipeLiked(favs, recipe._id)

    // create like and unlike mutations
    const [addLike] = useMutation(ADD_LIKE)

    const handleLikeClick = (recipeId) => {
        liked = !liked
        addLike({
            variables: { id: recipeId },
            update: (store, data) => {
                // add recipe to current recipes
                const favourites = user.favourites
                const newRecipe = { __typename: "Recipe", _id: recipeId }
                const newFavs = addRecipe(favourites, newRecipe)

                // update `getUser` query with optomistic response
                updateFavs(store, newFavs)
            }
        })
    }

    // handle change of all input box'x, update the state
    const handleDeleteRecipe = (recipeId) => {
        deleteRecipe({
            variables: { id: recipeId },
            update: (store, data) => {
                // get all recipes from current cache, only update if root query on cache
                const rootRecipes = getAllRecipes(store)
                if (rootRecipes) {
                    const updatedRootRecipes = removeRecipe(rootRecipes, recipeId)
                    updateAllRecipes(store, updatedRootRecipes)
                }

                // get user created recipes and update cache
                const updatedUserCreatedRecipes = removeRecipe(createdRecipes, recipeId)
                updateUserCreatedRecipes(store, updatedUserCreatedRecipes)

                // remove recipe from user liked recipes if its liked
                if (liked) {
                    const newFavs = removeRecipe(favs, recipeId)
                    updateFavs(store, newFavs)
                }
            }
        })
    }

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
                </List>
                <div className={classes.buttonDiv}>
                    {!liked ?
                        <Button
                            color='default'
                            variant='contained'
                            onClick={() => handleLikeClick(recipe._id)}
                            className={classes.button}>
                            Like
                        </Button >
                        :
                        null
                    }
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={() => handleDeleteRecipe(recipe._id)}
                        className={classes.button}>
                        Delete
                </Button>
                </div>
            </CardContent>
        </Card >
    )
}

export default UserRecipes;