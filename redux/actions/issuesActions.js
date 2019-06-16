//import axios from 'axios';

export const setRadius = (radius) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_RADIUS',
            payload: radius
        })

    }

}

// export const getIgData = () => {
//     return (dispatch) => {
//         Instafeed(options).then((res) => {
//             dispatch({
//                 type: 'GET_IG_DATA',
//                 user: res.data
//             })
//         }).catch((err) => {
//             console.log(err)
//             dispatch({
//                 type: 'GET_IG_ERROR',
//                 err
//             })
//         })
//     }

// }

