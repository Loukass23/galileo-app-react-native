import axios from 'axios';
import { SET_RADIUS } from './actionTypes'

export const setRadius = (radius) => {
    return (dispatch) => {
        dispatch({
            type: SET_RADIUS,
            payload: radius
        })

    }
}

export const getIssues = (radius, region) => {
    return (dispatch) => {
        return axios.get(`http://kietz.herokuapp.com/api/issues?latitude=${region.latitude}
        &longitude=${region.latitude}&page=0&radius=${radius}&size=10`)
            .then((res) => {
                dispatch({
                    type: 'GET_ISSUES',
                    user: res.data
                })
            }).catch((err) => {
                console.log(err)
                dispatch({
                    type: 'GET_ISSUES_ERROR',
                    err
                })
            })
    }

}

