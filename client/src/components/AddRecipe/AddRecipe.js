import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useHistory, Redirect } from 'react-router-dom'
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

import updateUserCreatedRecipes from '../../updateCache/updateUserCreatedRecipes';
import { addRecipe as addRecipeHelper } from '../../updateCache/helpers';
import addRecipeToCache from '../../updateCache/addRecipeToCache'
import { ADD_RECIPE } from '../../mutations/addRecipe'
import getProfile from '../../auth/getProfile'


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
    const store = useApolloClient()
    const classes = useStyles()
    const [addRecipe] = useMutation(ADD_RECIPE)

    // handle change of all input box'x, update the state
    const handleChange = ({ target }) => {
        const { name, value } = target
        setState(state => ({
            ...state,
            [name]: value,
        })
        )
        setError(false)
    }

    // ensure all fields filled in to enable button
    const validateForm = () => {
        const { name, description, instructions, category } = state
        if (name && description && instructions && category) {
            return true
        } else {
            setError(true)
            return false
        }
    }

    // handle submit button click
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validateForm()) return
        // TODO: Set error state on form, invlaid fields
        const profile = getProfile(store)
        if (!profile) return <Redirect to='/' />
        // submit request to server with state info from form
        addRecipe({
            variables: {
                name: state.name,
                category: state.category,
                description: state.description,
                instructions: state.instructions
            },
            // optomistic update to the cache
            update: (store, { data: { addRecipe } }) => {
                addRecipeToCache(store, addRecipe)
                if (profile) {
                    const createdRecipes = profile.createdRecipes
                    // get user created recipes and update cache
                    const updatedUserCreatedRecipes = addRecipeHelper(createdRecipes, addRecipe)
                    updateUserCreatedRecipes(store, updatedUserCreatedRecipes)
                }
            }
        })
            .then(res => {
                return <Redirect to='/' />
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
                Add Recipe
            </Typography>
            <form noValidate className={classes.root} autoComplete='off'>
                <TextField
                    name="name"
                    label="Recipe Name"
                    value={state.name}
                    onChange={(event) => handleChange(event)}
                    variant="outlined"
                />
                <TextField
                    name="description"
                    label="Description"
                    value={state.description}
                    onChange={(event) => handleChange(event)}
                    variant="outlined"
                    multiline
                    rows={2}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        variant="outlined"
                        name='category'
                        value={state.category}
                        onChange={handleChange}
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
                    label="Instructions"
                    value={state.instructions}
                    onChange={(event) => handleChange(event)}
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