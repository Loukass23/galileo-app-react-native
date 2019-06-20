const initState = {
    USER_POSITION:
    {
        latitude: 1,
        longitude: 1,
        latitudeDelta: 1,
        longitudeDelta: 1
    },
    STATUS: ""
}

const locationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER_LOCATION':
            console.log('User Position: ', action.payload)
            return {
                ...state,
                USER_POSITION: action.payload
            }
        case 'SET_USER_LOCATION_STATUS':
            console.log('Status: ', action.payload)
            return {
                ...state,
                STATUS: action.payload
            }
        default:
            return state
    }

}
export default locationReducer