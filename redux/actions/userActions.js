import axios from 'axios';
import qs from 'qs';



export const registerUser = (user) => {
    return dispatch => {
        console.log(user, 'user');
        const input = `name=${user.name}&email=${user.email}&username=${user.email}&password=OAuth_generic`


        //return axios(options)
        return axios({
            method: 'POST',
            url: 'http://kietz.herokuapp.com/signup',
            headers: {
                'Content-Type': 'application/json',
            },
            data: input
        })

            .then((res) => {
                console.log('response', res);
                // dispatch({
                //     type: GET_ISSUES,
                //     payload: res.data
                // })
            }).catch((err) => {
                console.log(err)
                // dispatch({
                //     type: GET_ISSUES_ERROR,
                //     payload: err
                // })
            })
        // axios({
        //     method: 'POST',
        //     url: 'kietz.herokuapp.com/signup',
        //     headers: { 'Content-Type': 'application/json' },
        //     data: {
        //         foo: {

        //             "name": user.name,
        //             "email": user.email,
        //             "username": user.email,
        //             "password": "OAuth_generic"

        //         }, // This is the body part in an axios call ^^
        //     }
        // })
        // const params = new URLSearchParams();
        // params.append('name', user.name);
        // params.append('email', user.email);
        // params.append('username', user.email);
        // params.append('password', 'OAuth_generic');
        // axios.post('/foo', params)

    }

}
export const login = (user) => {
    return async dispatch => {
        return
        axios({
            method: 'post',
            url: 'kietz.herokuapp.com/login',
            headers: { 'Content-Type': 'application/json' },
            data: {
                foo: {
                    "username": user.username,
                    "password": user.password
                }
            }
        })
            .then((res) => {
                console.log(res);
                // dispatch({
                //     type: GET_ISSUES,
                //     payload: res.data
                // })
            }).catch((err) => {
                console.log(err)
                // dispatch({
                //     type: GET_ISSUES_ERROR,
                //     payload: err
                // })
            })
    }

}