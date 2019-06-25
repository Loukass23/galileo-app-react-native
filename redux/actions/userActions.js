import { SET_USER } from './actionTypes'
import { SET_USER_INFO } from './actionTypes'
import { SecureStore } from 'expo';



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
export const logout = () => {
    return async dispatch => {

        removeStorageToken()

        dispatch({
            type: SET_USER,
            payload: null
        })
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

        setStorageToken(token, username);

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


export const getStorageToken = () => {
    return async dispatch => {
        try {
            const token = await SecureStore.getItemAsync('secure_token');
            const username = await SecureStore.getItemAsync('username');
            const date = await SecureStore.getItemAsync('timestamp');

            const now = new Date()
            const dateToken = new Date(date)
            const ageTokenMinutes = (now - dateToken) / 60000;
            console.log('Age Token (min):', ageTokenMinutes);
            if (ageTokenMinutes <= 60) {
                if (username && token) {
                    dispatch({
                        type: SET_USER,
                        payload: {
                            username,
                            token
                        }
                    })
                }
            }
            else {
                removeStorageToken()
                console.log('Token too old');
            }


        } catch (e) {
            console.log('No token found', e)
        }
    }
}

setStorageToken = async (token, username) => {
    const date = new Date()
    try {
        await SecureStore.setItemAsync('secure_token', token);
        await SecureStore.setItemAsync('username', username);
        await SecureStore.setItemAsync('timestamp', date.toISOString());
    } catch (e) {
        console.log('failed to set storage token', e);
    }

    console.log('set storage token')
}

removeStorageToken = async () => {

    try {
        await SecureStore.deleteItemAsync('secure_token');
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('timestamp');
    } catch (e) {
        console.log('failed to delete storage token', e);
    }

    console.log('deleted storage token')
}

