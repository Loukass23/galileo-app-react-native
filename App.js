import { AppLoading, Constants, Facebook, Google } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Provider } from 'react-redux'
import { store } from './redux/app-redux'
import {
  Image, Platform, ScrollView, Text, Alert,
  StyleSheet, View, TouchableOpacity, Button, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen'

import * as firebase from 'firebase';

import { firebaseConfig } from './constants/config'


class App extends React.Component {
  state = {
    isReady: false,
    okButton: false
  };
  componentDidMount() {
    // Initialize firebase...
    firebase.initializeApp(firebaseConfig)
  }
  validate = () => {
    this.setState({ okButton: true })
  }
  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    else

      return (
        <Provider store={store}>
          <HomeScreen />

        </Provider>

      );
  }


  async _cacheResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        // require('./assets/images/Galileo_logo_animation_3.gif'),
        // require('./assets/images/logo.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);

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
export default App