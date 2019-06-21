import { Location, Permissions } from 'expo';
import { START_TIMER } from 'redux-timer';
import { SET_USER_LOCATION } from './actionTypes'
import { SET_USER_LOCATION_STATUS } from './actionTypes'

export function getLocation() {
    return async dispatch => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            dispatch({
                type: SET_USER_LOCATION_STATUS,
                payload: 'Permission to access location was denied'
            })

        } else {
            dispatch({
                type: SET_USER_LOCATION_STATUS,
                payload: 'Permission to access location was granted'
            })

        }

        let location = await Location.getCurrentPositionAsync({})
        if (location) {
            const region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1
            };
            dispatch({
                type: SET_USER_LOCATION,
                payload: region
            })
        }

    }
}
export const startTimer = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: START_TIMER,
            payload: {
                name: 'getIssueTimer',
                action: async () => {

                    dispatch(getLocation());

                },
                interval: 10000,
                runImmediately: false
            }
        });
    }
}