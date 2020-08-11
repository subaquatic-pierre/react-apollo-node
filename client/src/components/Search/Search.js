import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import {
    makeStyles,
    Paper,
    Typography,
    TextField,
    Card,
    CardContent,
} from '@material-ui/core'

import Error from '../Error'
import { RECIPE_SEARCH } from '../../queries/recipeSearch'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTextField-root': {
            marginTop: theme.spacing(2),
            width: '70%',
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    likes: {
        padding: '0.5rem'
    },
    card: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: '1rem',
        paddingBottom: '3rem'
    },
    button: {
        marginTop: '2rem'
    },

}))

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchData, setSearchData] = useState([])
    const [search, { error }] = useLazyQuery(RECIPE_SEARCH,
        {
            variables: { searchTerm: searchTerm },
            onCompleted: data => {
                try {
                    setSearchData(data.recipeSearch)
                }
                catch (err) {
                    console.log('no data found')
                }
            }
        })
    const classes = useStyles()

    // handle change of all input box'x, update the state
    const handleChange = ({ target }) => {
        const { value } = target
        setSearchTerm(value)
        search()
    }

    const handleRefetch = () => {
        if (searchData.called) {
            searchDataRes.refetch({ variables: { searchTerm: searchTerm } }).then(res => {
                setSearchData(res.data.recipeSearch)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    if (error) return <Error message={error.message} />

    const SearchRecipeCard = ({ recipe }) => {
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
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Typography
                    variant='h5'
                    component='h1'
                    align='center'
                    className={classes.heading}
                >
                    Search
            </Typography>
                <form noValidate className={classes.root} autoComplete='off'>
                    <TextField
                        name="search"
                        label="Enter search term"
                        placeholder='Enter search term'
                        type='search'
                        value={searchTerm}
                        onChange={(event) => handleChange(event)}
                        variant="outlined"
                        onBlur={handleRefetch}
                    />
                </form>
            </Paper>
            {searchData.map(recipe => (
                <SearchRecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </>
    )
}

export default Search;