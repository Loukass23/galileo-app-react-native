const initState = {
    COORDS: [
        { lat: 52.529815, lon: 13.395032 },
        { lat: 52.529915, lon: 13.395032 },
        { lat: 52.531015, lon: 13.395032 },
        { lat: 52.529015, lon: 13.395032 },
        { lat: 52.529015, lon: 13.395032 },
        { lat: 52.1, lon: 13 },
        { lat: 52.2, lon: 13 },
        { lat: 52.3, lon: 13 },
        { lat: 52.4852006, lon: 13.37 }
    ],
    INITIAL_POSITION: {
        latitude: 52.529015,
        longitude: 13.395032,
        latitudeDelta: 1,
        longitudeDelta: 1
    },
    RADIUS: 100
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_RADIUS':
            console.log('Radius set: ', action.payload)
            return {
                ...state,
                RADIUS: action.payload
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