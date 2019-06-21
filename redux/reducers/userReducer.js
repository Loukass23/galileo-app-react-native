const initState = {
    USER: null,
    USER_ERROR: null,
    USER_LOADING: false,
    USER_INFO:
    {
        loggedIn: false,
        loading: false,
        message: ""
    }
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER':
            console.log('User ', action.payload)
            return {
                ...state,
                USER: action.payload
            }
        case 'SET_USER_ERROR':
            console.log('User Error: ', action.payload)
            return {
                ...state,
                USER_ERROR: action.payload
            }
        case 'SET_USER_INFO':
            return {
                ...state,
                USER_INFO: action.payload
            }
        default:
            return state
    }

}
export default userReducer