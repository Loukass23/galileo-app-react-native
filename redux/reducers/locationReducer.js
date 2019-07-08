const initState = {
    USER_POSITION: null,
    // {
    //     latitude: 1,
    //     longitude: 1,
    //     latitudeDelta: 1,
    //     longitudeDelta: 1
    // },
    STATUS: "",
    ADDRESS: null,
    POI_LOCATION: null,
    POI_ADDRESS: null
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
        case 'SET_ADDRESS':
            console.log('Address: ', action.payload)
            return {
                ...state,
                ADDRESS: action.payload
            }
        case 'SET_POI_LOCATION':
            return {
                ...state,
                POI_LOCATION: action.payload
            }
        case 'SET_POI_ADDRESS':
            console.log('POI Address: ', action.payload)
            return {
                ...state,
                POI_ADDRESS: action.payload
            }
        default:
            return state
    }

}
export default locationReducer