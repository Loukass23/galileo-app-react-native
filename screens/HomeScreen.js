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
import { Video } from 'expo-av';
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
            const fullName = device[0].manufacturer + ' ' + device[0].market_name
            return device == [] ? 'Device unknown' : fullName
        }
    }

    validate = () => {
        this.setState({ okButton: true })
    }
    renderStartButton = (

        <TouchableOpacity style={styles.startContainer} onPress={this.validate}>
            <Image
                style={styles.highlight}
                source={require('../assets/images/logo.png')}
            />
        </TouchableOpacity>
    )
    renderloginPlaceholder = (

        <View style={styles.videoContainer} >

            <Video
                source={require('../assets/images/Kietz_Intro.mp4')}
                rate={1.0}

                isMuted={true}
                resizeMode="contain"
                shouldPlay

                style={{ width: 500, height: 450 }}
            />

            {/* <Image
                style={styles.highlight}
                source={require('../assets/images/logo.png')}
            /> */}
        </View>
    )
    renderLogOutUser = (username) => {
        return (

            <View style={styles.containerRow}  >
                <Text style={styles.halfHorizontal}>Not {username} ?</Text>

                <Button
                    style={styles.button3}
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
                        <View style={styles.scrollViewContainer}>
                            {USER_INFO.loading ? <Loader message={USER_INFO.message} /> : <View>

                                {USER ? <React.Fragment  >
                                    {this.renderStartButton}
                                    <Text style={styles.title2}>Hi {USER.username}</Text>

                                    {/* <Text style={styles.title}>Kietz</Text> */}
                                </React.Fragment> :
                                    <View >
                                        {this.renderloginPlaceholder}


                                    </View>
                                }
                                <View style={styles.helpContainer}>
                                    <Text style={styles.title2}> Accuracy matters!</Text>
                                    {galileoEnabled ?
                                        <Text style={styles.getStartedText}>
                                            Hooray, your current device {device} has a Galileo chipset!
                    </Text> :
                                        <Text style={styles.getStartedText}>
                                            Unfortunately your current device {device} does not have Galileo chipset
                    </Text>
                                    }

                                    <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
                                        <Text style={styles.helpLinkText}>
                                            Learn more about Galileo...
                            </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>}
                        </View>
                    </ScrollView>
                    {!USER_INFO.loading &&
                        <View style={styles.footer}>
                            {!USER ?
                                <View style={styles.elevationContainer}>
                                    <Text style={styles.title3}>Please log in to access issues </Text>
                                    <Login />
                                </View>
                                :
                                <View style={styles.elevationContainer} >
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
        backgroundColor: Colors.background,

    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: .15,
        marginBottom: 1,
    },
    scrollview: {
        marginTop: 1,
        flex: .8,
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

    },
    contentContainer: {
        // paddingTop: 30,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    title: {
        fontSize: 45,
        color: Colors.primary,
        lineHeight: 50,
        textAlign: 'center',
    },
    title2: {
        fontSize: 25,
        color: Colors.secondary,
        lineHeight: 30,
        textAlign: 'center',
    },
    title3: {
        fontSize: 12,
        color: Colors.secondary,
        lineHeight: 20,
        textAlign: 'center',
    },
    elevationContainer: {
        flex: 1,
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
        marginTop: 5,

        alignItems: 'center'
    },
    startContainer: {
        height: 300,
        alignItems: 'center',
    },
    videoContainer: {

        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    button3: {
        flex: .3,
        backgroundColor: Colors.secondary,
        width: 50,

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
