import { Location, Permissions } from 'expo';
import { googleAPIkey } from '../../constants/config'
import { START_TIMER } from 'redux-timer';
import {
    SET_USER_LOCATION,
    SET_USER_LOCATION_STATUS,
    SET_ADDRESS,
    SET_POI_LOCATION,
    SET_POI_ADDRESS
} from './actionTypes'
import { getIssues } from './issuesActions';



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
            dispatch(getAddress(region, 'user'));

            dispatch({
                type: SET_USER_LOCATION,
                payload: region
            })

            dispatch(getIssues())
        }

    }
}
export const setPOIlocation = (region) => {
    return (dispatch) => {
        dispatch(getAddress(region, 'POI'));
        dispatch({
            type: SET_POI_LOCATION,
            payload: region
        })
    }
}

export const getAddress = (region, type) => {
    return (dispatch) => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + region.latitude + ',' + region.longitude + '&key=' + googleAPIkey)
            .then((response) => response.json())
            .then((responseJson) => {
                const array = responseJson.results[0].address_components
                const address = {
                    formatted: responseJson.results[0].formatted_address,
                    city: array[array.length - 3].short_name,
                    country: array[array.length - 2].short_name
                }
                if (type === 'user') {
                    dispatch({
                        type: SET_ADDRESS,
                        payload: address
                    })
                }
                else {
                    dispatch({
                        type: SET_POI_ADDRESS,
                        payload: address
                    })
                }

            })
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