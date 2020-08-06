import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom'
import {
    makeStyles,
    Paper,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core'

import { handleInputChange, validateRecipeForm } from '../../utils/formUtils'
import updateUserCreatedRecipes from '../../updateCache/updateUserCreatedRecipes';
import { addRecipe as addRecipeHelper } from '../../updateCache/helpers';
import addRecipeToCache from '../../updateCache/addRecipeToCache'
import { ADD_RECIPE } from '../../mutations/addRecipe'
import getProfile from '../../auth/getProfile'
import { GET_PROFILE } from '../../queries/getProfile';
import { getToken } from '../../utils/getToken';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& .MuiTextField-root': {
            marginTop: theme.spacing(2),
            width: '100%',
        },
    },
    formControl: {
        marginTop: theme.spacing(2),
        width: '50%'
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
    name: '',
    category: '',
    description: '',
    instructions: '',
}

const AddRecipe = () => {
    const [state, setState] = useState({ ...initialState })
    const [error, setError] = useState(false)
    const client = useApolloClient()
    const classes = useStyles()
    const [addRecipe] = useMutation(ADD_RECIPE)

    // handle submit button click
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validateRecipeForm(setError, state)) return
        // TODO: Set error state on form, invlaid fields
        const profile = getProfile(client)
        // if (!profile) window.location.assing('/')

        // submit request to server with state info from form
        addRecipe({
            variables: {
                name: state.name,
                category: state.category,
                description: state.description,
                instructions: state.instructions
            },
            // optomistic update to the cache
            update: (client, { data: { addRecipe } }) => {
                addRecipeToCache(client, addRecipe)
                if (profile) {
                    const createdRecipes = profile.createdRecipes
                    // get user created recipes and update cache
                    const updatedUserCreatedRecipes = addRecipeHelper(createdRecipes, addRecipe)
                    updateUserCreatedRecipes(client, updatedUserCreatedRecipes)
                }
            }
        })
            .then(res => {
                // console.log(res)
                // return window.location.assign(`/recipe/${res.data.addRecipe._id}`)
            }).catch(err => {
                console.log(err)
            })
    }

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         await client.query({
    //             query: GET_PROFILE,
    //             variables: {
    //                 token: getToken()
    //             }
    //         })
    //     }
    //     fetchProfile()
    // }, [])

    return (
        <Paper className={classes.paper}>
            <Typography
                variant='h5'
                component='h1'
                align='center'
                className={classes.heading}
            >
                Add Recipe
            </Typography>
            <form noValidate className={classes.root} autoComplete='off'>
                <TextField
                    name="name"
                    aria-label='name'
                    label="Recipe Name"
                    value={state.name}
                    onChange={(event) => handleInputChange(event, setState, setError)}
                    variant="outlined"
                />
                <TextField
                    name="description"
                    aria-label='description'
                    label="Description"
                    value={state.description}
                    onChange={(event) => handleInputChange(event, setState, setError)}
                    variant="outlined"
                    multiline
                    rows={2}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        variant="outlined"
                        name='category'
                        aria-label='category-select'
                        value={state.category}
                        onChange={(event) => handleInputChange(event, setState, setError)}
                        label="Category"
                    >
                        <MenuItem value='Breakfast'>Breakfast</MenuItem>
                        <MenuItem value='Lunch'>Lunch</MenuItem>
                        <MenuItem value='Dinner'>Dinner</MenuItem>
                        <MenuItem value='Snack'>Snack</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="instructions"
                    aria-label='instructions'
                    label="Instructions"
                    value={state.instructions}
                    onChange={(event) => handleInputChange(event, setState, setError)}
                    variant="outlined"
                    multiline
                    rows={10}
                />
                {error &&
                    <Typography >
                        Invalid form fields
                    </Typography>
                }
                <Button
                    variant="contained"
                    aria-label='submit-button'
                    color="primary"
                    className={classes.button}
                    onClick={(event) => handleSubmit(event)}
                    type='submit'
                >
                    Create
                </Button>
            </form>
        </Paper>
    )
}

export default AddRecipe;