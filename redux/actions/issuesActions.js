import axios from 'axios';
import { SET_RADIUS } from './actionTypes'
import { SET_MARKER } from './actionTypes'
import { CLEAR_MARKER } from './actionTypes'
import { GET_ISSUES } from './actionTypes'
import { ISSUES_LOADING } from './actionTypes'
import { GET_ISSUES_ERROR } from './actionTypes'
import { START_TIMER } from 'redux-timer';



export const setRadius = (radius) => {
    return (dispatch) => {
        dispatch({
            type: SET_RADIUS,
            payload: radius
        })

    }
}
export const setMarker = (marker) => {
    return (dispatch) => {
        dispatch({
            type: SET_MARKER,
            payload: marker
        })

    }
}
export const clearMarker = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_MARKER,

        })

    }
}
//Cities loading
export const getIssuesLoading = () => {
    return {
        type: ISSUES_LOADING
    };
};
export const getIssues = (radius, region, token) => {
    return (dispatch) => {
        dispatch(getIssuesLoading());
        const URL = `http://kietz.herokuapp.com/api/issues?latitude=${region.latitude}
        &longitude=${region.latitude}&page=0&radius=${radius}&size=10`

        return axios.get(URL, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {

                dispatch({
                    type: GET_ISSUES,
                    payload: res.data
                })
            }).catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_ISSUES_ERROR,
                    payload: err
                })
            })
    }

}




export const startTimer = () => async dispatch => {
    dispatch({
        type: START_TIMER,
        payload: {
            name: 'getIssueTimer',
            action: async () => {
                dispatch(getIssues());
            },
            interval: 5000,
            runImmediately: false
        }
    });
};