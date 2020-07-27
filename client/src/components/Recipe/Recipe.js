import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core'
import { useParams } from 'react-router-dom';
import {
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Button
} from '@material-ui/core';

import { GET_RECIPE } from '../../queries/getRecipe'
import { REMOVE_LIKE } from '../../mutations/removeLike'
import { ADD_LIKE } from '../../mutations/addLike'
import updateFavs from '../../updateCache/updateUserFavs';
import { removeRecipe, addRecipe, checkRecipeLiked, getFavourites } from '../../updateCache/helpers';
import getUser from '../../auth/getUser'

const useStyles = makeStyles(theme => ({
    card: {
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

const Recipe = () => {
    const classes = useStyles()
    const client = useApolloClient()
    const user = getUser(client)

    // set initial state of liked to false, update in `useEffect` hook
    const [liked, setLiked] = useState(false)

    // create like and unlike mutations
    const [addLike] = useMutation(ADD_LIKE)
    const [removeLike] = useMutation(REMOVE_LIKE)

    // get recipe ID
    const params = useParams()
    const recipeId = params.id

    // make query to get recipe
    const { data, loading } = useQuery(GET_RECIPE,
        {
            variables: { id: recipeId },
            onError: (err) => {
                console.log(err)
            },
        }
    )

    const handleLikeClick = (recipeId) => {
        // if user already likes recipe choose to `removeLike` mutation else `addLike` mutation
        if (liked) {
            removeLike({
                variables: { id: recipeId },
                update: (store, data) => {
                    // remove recipe from current recipes
                    const recipes = user.favourites
                    const newFavs = removeRecipe(recipes, recipeId)

                    // update `getUser` query with optomistic response
                    updateFavs(store, newFavs)
                }
            })
        } else {
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
    }

    useEffect(() => {
        // get list of current user likes
        const favs = getFavourites(user)

        // check if recipe is in current user likes
        const checkIfLiked = checkRecipeLiked(favs, recipeId)

        // update state to reflect if user likes recipe
        setLiked(checkIfLiked)
    }, [user, liked, recipeId])

    return (
        <Card className={classes.card}>
            <CardContent>
                {loading ?
                    (<div className={classes.loading}>
                        <CircularProgress />
                    </div>)
                    :
                    <>
                        <div className={classes.header}>
                            <Typography variant="h5" component="h2" >
                                {data.getRecipe.name}
                            </Typography>
                            <Typography className={classes.likes}>
                                Likes: {data.getRecipe.likes}
                            </Typography>
                        </div>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Category"
                                    secondary={data.getRecipe.category}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Description"
                                    secondary={data.getRecipe.description}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Instructions"
                                    secondary={data.getRecipe.instructions} />
                            </ListItem>
                        </List>
                        {user &&
                            <>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={(id) => handleLikeClick(recipeId)}>
                                    {liked ? <span>Liked</span> : <span>Like</span>}
                                </Button>
                            </>
                        }
                    </>
                }
            </CardContent>
        </Card>
    )
}

export default Recipe;