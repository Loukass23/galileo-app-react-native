import axios from 'axios';
import {
  SET_RADIUS,
  VERIFY_ISSUE,
  SET_MARKER,
  CLEAR_MARKER,
  GET_ISSUES,
  ISSUES_LOADING,
  GET_ISSUES_ERROR,
  CLEAR_ERROR,
  NO_ISSUE_LOCATION
} from './actionTypes'


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
export const getIssuesLoading = () => {
  return {
    type: ISSUES_LOADING
  };
};

export const getIssues = () => {
  return async (dispatch, getState) => {
    dispatch(getIssuesLoading());

    const state = getState();
    const region = state.location.USER_POSITION;
    const token = await state.user.USER.token;

    //const radius = state.issues.RADIUS  //radius in m
    const radius = state.issues.RADIUS / 1000; //radius in km
    const URL = `http://kietz.herokuapp.com/api/issues?latitude=${region.latitude}
        &longitude=${region.longitude}&page=0&radius=${radius}`
    console.log(URL);

    //const response = await fetch(URL
    if (region && token) {
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
    else {
      dispatch({
        type: NO_ISSUE_LOCATION,

      })
    }
  }
};

export const verifyIssue = issueID => {
  return async (dispatch, getState) => {

    const state = getState();
    const { token } = state.user.USER;

    const URL = `http://kietz.herokuapp.com/api/issues/${issueID}/verify`
    const body = "{\n    \"category\": \"\",\n    \"description\": \"\",\n    \"imageUrls\": [\"\"],\n    \"latitude\":\"\",\n    \"longitude\": \"\"\n}"
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body
    });
    console.log('response :', response);
    if (response.ok) {
      dispatch({
        type: VERIFY_ISSUE
      })
    }
  };
};

export const postIssue = issue => {
  return async (dispatch, getState) => {
    const URL = "http://kietz.herokuapp.com/api/issues";
    const state = getState();
    const { token } = state.user.USER;

    const body =
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

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body
    });
    if (response.ok) {
      marker = await response.json()
      console.log('marker :', marker);

      dispatch(getIssues())
      dispatch(setMarker(marker))

    }
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


