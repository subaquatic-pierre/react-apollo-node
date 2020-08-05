import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Recipes from './components/Recipes';
import Search from './components/Search';
import AddRecipe from './components/AddRecipe';
import Profile from './components/Profile';
import Recipe from './components/Recipe';
import withAuth from './auth/withAuth'
import authRedirect from './auth/authRedirect'

const BaseRouter = () => (
    <Switch>
        <Route path='/' exact component={Recipes} />
        <Route path='/search' component={Search} />
        <Route path='/add-recipe' component={withAuth(AddRecipe)} />
        <Route path='/recipe/:id' component={Recipe} />
        <Route path='/profile' component={withAuth(Profile)} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
    </Switch>
)

export default BaseRouter