const initState = {
    USER: null,
    USER_ERROR: null
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
        default:
            return state
    }

}
export default userReducer