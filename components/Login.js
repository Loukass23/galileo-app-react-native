import { AppLoading, Constants, Facebook, Google } from 'expo';
import * as GoogleSignIn from 'expo-google-sign-in';
import { AppAuth } from 'expo-app-auth';
import AuthScreen from "./AuthScreen";
import { connect } from 'react-redux'
import { registerUser } from '../redux/actions/userActions'
// This value should contain your REVERSE_CLIENT_ID
// const { URLSchemes } = AppAuth;

import React from 'react';
import {
    Image, Platform, ScrollView, Text, Alert,
    StyleSheet, View, TouchableOpacity, Button, StatusBar
} from 'react-native';

class Login extends React.Component {

    _handleGoogleLogin = async () => {
        try {
            const { type, user } = await Google.logInAsync({
                androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
                iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
                androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
                iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

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
                '1201211719949057', // Replace with your own app id in standalone app
                { permissions: ['public_profile'] }
            );
            switch (type) {
                case 'success': {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                    const profile = await response.json();
                    console.log(profile)
                    Alert.alert(
                        'Logged in!',
                        `Hi ${profile.name}!`,
                    );
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
            <View style={styles.container}>
                {/* <AuthScreen /> */}
                <View style={styles.elevationContainer}>
                    <View style={styles.logInOption}>
                        <Button style={styles.button2}
                            title="Login with Facebook"
                            onPress={this._handleFacebookLogin}
                        />
                        <Button style={styles.button2}
                            title="Login with Google"
                            onPress={this._handleGoogleLogin}
                        />
                    </View>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    logInOption: {
        flex: 1,
        flexDirection: "row",

    },
    contentContainer: {
        paddingTop: 30,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        color: 'rgb(174, 33, 87)',
        lineHeight: 24,
        textAlign: 'center',
    },
    elevationContainer: {

        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

    },
    button2: {
        paddingHorizontal: 10

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