const initState = {
  PICTURE_FILE: null,
  PICTURE_LOCATION: null,
  PICTURE_LOADER: false
};

const pictureReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_PICTURE_FILE":
      console.log("Picture File ", action.payload);
      return {
        ...state,
        PICTURE_FILE: action.payload
      };
    case "SET_PICTURE_LOCATION":
      console.log("Picture Location ", action.payload);
      return {
        ...state,
        PICTURE_LOCATION: action.payload
      };
    case "SET_PICTURE_LOADER":
      // console.log("Picture Location ", action.payload);
      return {
        ...state,
        PICTURE_LOADER: action.payload
      };
    default:
      return state;
  }
};
export default pictureReducer;
