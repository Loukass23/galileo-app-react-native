import { Constants } from 'expo';
import { getLocation } from '../redux/actions/locationActions'
import { getStorageToken, logout } from '../redux/actions/userActions'
// import DeviceInfo from 'react-native-device-info';
import { galileoDevices, androidDevices } from '../constants/Devices'
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
import { SecureStore } from 'expo';




class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            okButton: false,
            device: null,
            galileoEnabled: false
        };
    }

    componentDidMount() {
        this.galileoEnabled()
        this.props.getLocation()
        this.props.getStorageToken()

        // console.log(DeviceInfo.getManufacturer());
        // console.log(DeviceInfo.getModel());

    };
    galileoEnabled = async () => {
        const device = await this.deviceIosAndroid()

        const galileoEnabled = galileoDevices.find(e => {
            return e.Model == device
        })
        console.log('resr', galileoEnabled);
        this.setState({ device, galileoEnabled })
    }

    deviceIosAndroid() {
        const { deviceName, platform } = Constants

        if (platform == "ios") {
            return platform.model
        }
        else {
            const device =
                androidDevices.filter(device => {
                    return device.model == deviceName
                })
            console.log(device);
            return device == [] ? 'Device unknown' : device[0].market_name
        }
    }

    validate = () => {
        this.setState({ okButton: true })
    }

    render() {
        const { deviceName } = Constants
        const { USER, USER_INFO } = this.props.user
        const { galileoEnabled, device } = this.state
        //Splash screen
        return (
            <View style={styles.container}>
                {/* {!this.state.okButton ? <ScrollView */}
                {!USER || !this.state.okButton ? <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.title}>Kietz</Text>
                    {USER && <Text style={styles.title}>Hi {USER.username}</Text>}
                    {USER_INFO.loading && <Loader message={USER_INFO.message} />}
                    {galileoEnabled ? <Text style={styles.getStartedText}>
                        Accuracy matters! Your current device  {device} has a Galileo chipset!
          </Text> :
                        <Text style={styles.getStartedText}>
                            Accuracy matters! Your current device  {device} does not have Galileo chipset
          </Text>}
                    <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>
                                Learn more about Galileo...
            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.elevationContainer}>
                        {!USER ?
                            <View style={styles.logInOption}>
                                <Login />

                            </View> :
                            <View>
                                <Button
                                    style={styles.button}
                                    onPress={this.props.logout}
                                    title="LOG OUT"
                                    color="#841584"
                                    accessibilityLabel="Log Out"
                                />
                                <Button
                                    style={styles.button}
                                    onPress={this.validate}
                                    title="GO"
                                    color="#841584"
                                    accessibilityLabel="Start looking at issues around you"
                                />

                            </View>
                        }

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
        getLocation: () => dispatch(getLocation()),
        logout: () => dispatch(logout()),
        getStorageToken: () => dispatch(getStorageToken())
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(HomeScreen)
