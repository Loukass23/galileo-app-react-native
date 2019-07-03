const initState = {
    PICTURE_FILE: null,
    PICTURE_LOCATION: null,
    PICTURE_LOADER: false,
    CATEGORY: null
};

const postIssueReducer = (state = initState, action) => {
    switch (action.type) {
        case "CLEAR_POST":
            console.log("Cancelled ");
            return {
                ...state,
                PICTURE_FILE: null,
                CATEGORY: null

            };
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
        case "SET_CATEGORY":
            console.log("Category ", action.payload);
            return {
                ...state,
                CATEGORY: action.payload
            };
        default:
            return state;
    }
};
export default postIssueReducer;
