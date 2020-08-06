import { GET_PROFILE } from '../queries/getProfile';

export const handleInputChange = ({ target }, setState, setError) => {
    const { name, value } = target
    setState(state => ({
        ...state,
        [name]: value
    })
    )
    setError(false)
}

// ensure all fields filled in to enable button
export const validateLoginForm = (state, form) => {
    const { username, password } = state
    if (username && password) {
        return true
    } else {
        return false
    }
}

// handle submit button click
export const handleLoginSubmit = (event, loginUser, state, client) => {
    event.preventDefault()
    if (!validateLoginForm(state)) return


    // submit request to server with state info from from
    loginUser({ variables: { ...state } })
        .then(async res => {
            localStorage.setItem('token', res.data.loginUser.token)
            await client.query({
                query: GET_PROFILE,
                variables: { token: res.data.loginUser.token }
            })
            window.location.assign('/')
        }).catch(err => {
            console.log(err)
        })
}

export const validateRecipeForm = (setError, state) => {
    const { name, description, instructions, category } = state
    if (name && description && instructions && category) {
        return true
    } else {
        setError(true)
        return false
    }
}