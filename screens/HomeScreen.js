import { AppLoading, Constants, Facebook, Google } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
    Image, Platform, ScrollView, Text, Alert,
    StyleSheet, View, TouchableOpacity, Button, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from '../navigation/AppNavigator';
import Loader from '../components/Loader'
import Login from '../components/Login'
import { connect } from 'react-redux'


class HomeScreen extends React.Component {
    state = {
        isReady: false,
        okButton: false
    };
    validate = () => {
        this.setState({ okButton: true })
    }
    render() {
        const { deviceName } = Constants
        const { USER, USER_INFO } = this.props.user
        console.log(USER_INFO);
        //Splash screen
        return (

            <View style={styles.container}>

                {/* {!USER_INFO.logged ? <ScrollView */}
                {USER_INFO.logged ? <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.title}>Kietz</Text>
                    {USER_INFO.loading && <Loader message={USER_INFO.message} />}
                    <Text style={styles.getStartedText}>
                        Your current device  {deviceName} does not have Galileo chipset
          </Text>
                    <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>
                                Learn more about Galileo...
            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.elevationContainer}>
                        <View style={styles.logInOption}>
                            {!USER_INFO.loading && <Login />}
                        </View>
                        {/* <Button
                            style={styles.button}
                            onPress={this.validate}
                            title="OK"
                            color="#841584"
                            accessibilityLabel="Start looking at issues around you"
                        /> */}

                    </View>
                </ScrollView> :

                    //main app
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <AppNavigator />
                    </View>}
            </View>
        )
    }



}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://www.usegalileo.eu/'
    );
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
        user: state.user,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProp, mapDispatchToProps)(HomeScreen)
