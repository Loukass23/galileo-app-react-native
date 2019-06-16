const initState = {
    authErr: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login failed')
            return {
                ...state,
                authErr: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authErr: null
            }
        case 'SIGNOUT_SUCESS':
            console.log('signout success')
            return state
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state,
                authErr: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup faild')
            return {
                ...state,
                authErr: action.err.message
            }
        default:
            return state
    }

}
export default authReducer