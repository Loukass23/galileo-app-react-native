import { SET_USER } from './actionTypes'
import { SET_USER_INFO } from './actionTypes'

export const registerUser = (user) => {
    return async dispatch => {
        dispatch({
            type: SET_USER_INFO,
            payload: { loading: true, message: "Registering User" }
        })
        console.log(user, 'user');
        //const string = `{\n\t\"name\": \"${user.name}\",\n\t\"email\": \"${user.email}\",\n\t\"username\": \"${user.email}\",\n\t\"password\": \"OAuth_generic\"\n}`
        const string = '{\n\t\"name\": \"' + user.name + '\",\n\t\"email\": \"' + user.email + '\",\n\t\"username\": \"' + user.name + '",\n\t\"password\": \"OAuth_generic\"\n}'

        const rawResponse = await fetch('http://kietz.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: string
        });
        const { username } = await rawResponse.json();
        dispatch(login({
            username,
            password: 'OAuth_generic'
        })
        )

    }
}

export const login = ({ username, password }) => {
    return async dispatch => {
        dispatch({
            type: SET_USER_INFO,
            payload: { loading: true, message: "Connecting User to the database" }
        })

        const string = `{\n\t\"username\": \"${username}\",\n\t\"password\": \"${password}\"\n}`
        const rawResponse = await fetch('http://kietz.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: string

        });
        const { token } = await rawResponse.json();
        console.log(token)
        dispatch({
            type: SET_USER,
            payload: {
                username,
                token
            }
        })
        dispatch({
            type: SET_USER_INFO,
            payload: { loading: false, message: "", logged: true }
        })

    }
}

