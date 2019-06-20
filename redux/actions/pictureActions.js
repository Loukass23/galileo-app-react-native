import { SET_PICTURE_FILE } from "./actionTypes";
import { SET_PICTURE_LOCATION } from "./actionTypes";
import { SET_PICTURE_LOADER } from "./actionTypes";

export function setPictureFile(pictureURI) {
  console.log(pictureURI);
  return async dispatch => {
    dispatch({
      type: SET_PICTURE_FILE,
      payload: pictureURI
    });
  };
}

export function setPictureLocation(pictureLocation) {
  console.log(pictureLocation);
  return async dispatch => {
    dispatch({
      type: SET_PICTURE_LOCATION,
      payload: pictureLocation
    });
  };
}

export function setPictureLoader(loading) {
  // console.log(pictureLocation);
  return async dispatch => {
    dispatch({
      type: SET_PICTURE_LOADER,
      payload: loading
    });
  };
}
