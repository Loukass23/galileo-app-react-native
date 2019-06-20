import { SET_USER } from './actionTypes'



export const registerUser = (user) => {
    return async dispatch => {
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
        console.log(username)
        dispatch(login({
            username,
            password: 'OAuth_generic'
        }))

    }
}

export const login = ({ username, password }) => {
    return async dispatch => {
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
    }
}

