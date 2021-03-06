import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom'

import { GET_USER } from '../queries/getUser';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getToken } from '../utils/getToken'

const token = getToken()

const withAuth = Component => props => {
    // get user data with token from local storage
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { token: token ? token : '' },
    })

    if (loading) {
        return <Loading />
    } else if (data && data.getUser !== null) {
        return <Component {...props} />
    } else if (error) {
        return <Error message={error.message} />
    } else {
        return <Redirect to='/' />
    }
}

export default withAuth;