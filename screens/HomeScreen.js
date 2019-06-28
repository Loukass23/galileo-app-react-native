import { Constants } from 'expo';
import { getLocation } from '../redux/actions/locationActions'
import { getStorageToken, logout } from '../redux/actions/userActions'
// import DeviceInfo from 'react-native-device-info';
import { galileoDevices, androidDevices } from '../constants/Devices'
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import {
    Image, Platform, ScrollView, Text, Alert,
    StyleSheet, View, TouchableOpacity, Button, StatusBar, TouchableHighlight
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
            return e.Model.toUpperCase() == device.toUpperCase()
        })
        this.setState({ device, galileoEnabled })
    }

    deviceIosAndroid() {
        const { deviceName, platform } = Constants
        // console.log('platform', platform.ios)
        if (platform.ios != null) {
            return platform.ios.model
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
    renderStartButton = (

        <TouchableOpacity style={styles.helpContainer} onPress={this.validate}>
            <Text style={styles.getStartedText}> Start looking at issues around you</Text>
            <Image
                style={styles.highlight}
                source={require('../assets/images/logo.png')}
            />
        </TouchableOpacity>
    )
    renderloginPlaceholder = (

        <View style={styles.helpContainer} >
            <Text style={styles.getStartedText}>Choose login mathod below</Text>
            <Image
                style={styles.highlight}
                source={require('../assets/images/logo.png')}
            />
        </View>
    )
    renderLogOutUser = (username) => {
        return (
            <View style={styles.countainer} >
                <Text style={styles.halfHorizontal}>Your are not {username} ?</Text>
                <Button
                    style={styles.halfHorizontal}
                    onPress={this.props.logout}
                    title="LOG OUT"
                    color={Colors.primary}
                    accessibilityLabel="Log Out"
                />
            </View>
        )
    }

    render() {
        const { USER, USER_INFO } = this.props.user
        const { galileoEnabled, device } = this.state

        if (!USER || !this.state.okButton)
            //Render plash screen
            return (
                <View style={styles.container}>
                    <ScrollView
                        style={styles.scrollview}
                        contentContainerStyle={styles.contentContainer}>

                        <View>
                            <Text style={styles.title}>Kietz</Text>
                            {USER ? <View >
                                <Text style={styles.title}>Hi {USER.username}</Text>
                                {this.renderStartButton}
                            </View> :
                                <View >
                                    <Text style={styles.title}>Please log in to access issues </Text>
                                    {this.renderloginPlaceholder}
                                </View>
                            }
                            <View style={styles.helpContainer}>
                                {galileoEnabled ?
                                    <Text style={styles.getStartedText}>
                                        Accuracy matters! Horay, your current device {device} has a Galileo chipset!
                    </Text> :
                                    <Text style={styles.getStartedText}>
                                        Accuracy matters! Unfotunately your current device {device} does not have Galileo chipset
                    </Text>
                                }

                                <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
                                    <Text style={styles.helpLinkText}>
                                        Learn more about Galileo...
                            </Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        {/* {USER_INFO.loading && <Loader message={USER_INFO.message} />} */}


                    </ScrollView>
                    {!USER_INFO.loading &&
                        <View style={styles.footer}>
                            {!USER ?
                                <Login />
                                :
                                <View  >
                                    {this.renderLogOutUser(USER.username)}
                                </View>

                            }
                        </View>}
                </View>
            )
        else
            //Render Main App
            return (<View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator />
            </View>)
    }

}


const handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
        'https://www.usegalileo.eu/'
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row'
    },
    footer: {
        flex: .1
    },
    scrollview: {
        flex: .9
    },
    halfHorizontal: {
        flex: .5
    },
    logoutContainer: {
        marginBottom: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-end',

        marginHorizontal: 10,
        paddingHorizontal: 2
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    highlight: {
        width: 200,
        height: 200,
        resizeMode: 'contain',

        marginLeft: -10,


        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginTop: '10%',
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
        backgroundColor: '#fbfbfb',


    },

    helpContainer: {
        marginTop: 20,
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
