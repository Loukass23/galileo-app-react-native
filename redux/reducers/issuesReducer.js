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
    ISSUES: null,
    ERR: null,
    INITIAL_POSITION: {
        latitude: 52.529015,
        longitude: 13.395032,
        latitudeDelta: 1,
        longitudeDelta: 1
    },
    RADIUS: 100
}

const issuesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_RADIUS':
            console.log('Radius set: ', action.payload)
            return {
                ...state,
                RADIUS: action.payload
            }
        case 'GET_ISSUES':
            console.log('Retrieved issues', action.payload)
            return {
                ...state,
                ISSUES: action.payload
            }
        case 'GET_ISSUES_ERROR':
            console.log('Unable to retrieve issues', action.payload)
            return {
                ...state,
                ERR: action.payload
            }
        default:
            return state
    }

}
export default issuesReducer