import React from 'react';
import ConfigDetails from '../components/ConfigDetails';
//import Slider from '@react-native-community/slider';
import {
  ScrollView,
  View,
  StyleSheet,
  Slider,
  Text
} from 'react-native';
import { MonoText } from '../components/StyledText';

export let radiusSetting = 0

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: 100
    };

  }

  handleRadiusChange = (radius) => {
    radiusSetting = radius
    this.setState({ radius })
    console.log(radiusSetting)
  }
  render() {
    return (
      <React.Fragment>
        <ConfigDetails />
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <MonoText>Radius</MonoText>
              <Slider
                onValueChange={this.handleRadiusChange}
                style={{ width: 200, height: 40 }}
                value={this.state.radius}
                step={1}
                minimumValue={0}
                maximumValue={1000}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#ae2157"
              />
              <Text >{this.state.radius}</Text>
            </View>
          </ScrollView>
        </View>
      </React.Fragment>
    )
  }

}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
})