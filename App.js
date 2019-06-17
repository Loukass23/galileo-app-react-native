import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Provider } from 'react-redux'
import { store } from './redux/app-redux'
import {
  Image, Platform, ScrollView, Text,
  StyleSheet, View, TouchableOpacity, Button, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Loader from './components/Loader'

export default class App extends React.Component {
  state = {
    isReady: false,
    okButton: false
  };
  validate = () => {
    this.setState({ okButton: true })
  }
  render() {
    const { deviceName } = Constants
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    if (!this.state.okButton && this.state.isReady) {

      //Splash screen
      return (

        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <Loader />

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
            <Button
              style={styles.button}
              onPress={this.validate}
              title="OK"
              color="#841584"
              accessibilityLabel="Start looking at issues around you"
            />
          </ScrollView>
        </View>

      );
    }
    else {

      //main app
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      )
    }
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


// function handleLoadingError(error: Error) {
//   // In this case, you might want to report the error to your error reporting
//   // service, for example Sentry
//   console.warn(error);
// }



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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },

  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
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
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    marginTop: 10,

  },
});
