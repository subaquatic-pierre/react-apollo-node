import React from 'react';
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

import { REMOVE_LIKE } from '../../mutations/removeLike';
import updateFavs from '../../updateCache/updateUserFavs';
import { removeRecipe } from '../../updateCache/helpers';


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
    }
}))

const Favourite = ({ user, recipe }) => {
    const recipeId = recipe._id
    const [removeLike] = useMutation(REMOVE_LIKE)
    const classes = useStyles()

    const handleUnlikeClick = () => {
        // if user already likes recipe choose to`removeLike` mutation else `addLike` mutation
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
                <Button
                    color='default'
                    variant='contained'
                    onClick={() => handleUnlikeClick(recipe._id)}
                    className={classes.button}>
                    Unlike
                </Button>
            </CardContent>
        </Card >
    )
}

export default Favourite;