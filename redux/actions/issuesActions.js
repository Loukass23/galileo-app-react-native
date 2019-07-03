import axios from 'axios';
import { SET_RADIUS } from './actionTypes'
import { SET_MARKER } from './actionTypes'
import { CLEAR_MARKER } from './actionTypes'
import { GET_ISSUES } from './actionTypes'
import { ISSUES_LOADING } from './actionTypes'
import { GET_ISSUES_ERROR } from './actionTypes'
import { CLEAR_ERROR } from './actionTypes'







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
  return dispatch => {
    dispatch({
      type: CLEAR_MARKER
    });
  };
};
//Cities loading
export const getIssuesLoading = () => {
  return {
    type: ISSUES_LOADING
  };
};
export const getIssues = () => {
  return (dispatch, getState) => {
    dispatch(getIssuesLoading());

    const state = getState();
    const region = state.location.USER_POSITION;
    const token = state.user.USER.token;

    //const radius = state.issues.RADIUS  //radius in m
    const radius = state.issues.RADIUS / 1000; //radius in km


    const URL = `http://kietz.herokuapp.com/api/issues?latitude=${region.latitude}
        &longitude=${region.longitude}&page=0&radius=${radius}`
    console.log(URL);
    return axios.get(URL, { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_ISSUES,
          payload: res.data
        })
        setTimeout(() => dispatch(clearFetchMessage()), 10000);

      }).catch((err) => {
        console.log(err)
        dispatch({
          type: GET_ISSUES_ERROR,
          payload: err
        })
      })

  }

};



export const postIssue = issue => {
  return async (dispatch, getState) => {
    const URL = "http://kietz.herokuapp.com/api/issues";
    const state = getState();
    const { token } = state.user.USER;

    const string2 =
      '{\n    "category": "' +
      issue.category +
      '",\n    "description": "' +
      issue.description +
      '",\n    "imageUrls": [\n        "' +
      issue.imageUrls +
      '"\n    ],\n    "latitude": ' +
      issue.location.latitude +
      ',\n    "longitude": ' +
      issue.location.longitude +
      "\n}";

    const rawResponse = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: string2
    });
  };
};




export const clearFetchMessage = () => {
  return dispatch => {
    console.log('clear')
    dispatch({
      type: CLEAR_ERROR,
    })

  }
}


