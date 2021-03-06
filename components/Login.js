import { AppLoading, Constants, Facebook, Google } from 'expo';
import * as GoogleSignIn from 'expo-google-sign-in';
import { AppAuth } from 'expo-app-auth';
import AuthScreen from "./AuthScreen";
import { connect } from 'react-redux'
import { registerUser } from '../redux/actions/userActions'
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { googleOAuth, fbOAuth } from '../constants/config'

import React from 'react';
import {
    Image, Platform, Alert,
    StyleSheet, View,
} from 'react-native';

class Login extends React.Component {

    _handleGoogleLogin = async () => {
        try {
            const { type, user } = await Google.logInAsync(googleOAuth);

            switch (type) {
                case 'success': {


                    this.props.registerUser(user)
                    // Alert.alert(
                    //     'Logged in!',
                    //     `Hi ${user.name}!`,
                    // );
                    break;
                }
                case 'cancel': {
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    break;
                }
                default: {
                    Alert.alert(
                        'Oops!',
                        'Login failed!',
                    );
                }
            }
        } catch (e) {
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
        }
    };
    _handleFacebookLogin = async () => {
        try {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                fbOAuth, 
                { permissions: ['public_profile'] }
            );
            switch (type) {
                case 'success': {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                    const profile = await response.json();

                    const user = {
                        name: profile.name,
                        email: 'NoNeedFor@Email.com'
                    }
                    console.log(user)
                    this.props.registerUser(user)
                    // Alert.alert(
                    //     'Logged in!',
                    //     `Hi ${profile.name}!`,
                    // );
                    break;
                }
                case 'cancel': {
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    break;
                }
                default: {
                    Alert.alert(
                        'Oops!',
                        'Login failed!',
                    );
                }
            }
        } catch (e) {
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
        }
    };
    render() {
        return (
            <View style={styles.logInOption}>
                <FontAwesome onPress={this._handleFacebookLogin} name="facebook" size={50} style={{ color: Colors.primary }} />
                <FontAwesome onPress={this._handleGoogleLogin} name="google" size={50} style={{ color: Colors.primary }} />
                {/* 
                <Button style={styles.button}
                    title="Login with Facebook"
                    onPress={this._handleFacebookLogin}
                /> 
                <Button style={styles.button}
                    title="Login with Google"
                    onPress={this._handleGoogleLogin}
                />*/}
            </View>
        );
    }
}
const styles = StyleSheet.create({

    logInOption: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
    },

});

const mapStateToProp = (state) => {
    return {


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (user) => dispatch(registerUser(user)),
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(Login)