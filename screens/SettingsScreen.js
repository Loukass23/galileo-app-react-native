import React from 'react';
import ConfigDetails from '../components/ConfigDetails';
import { connect } from 'react-redux'
import { setRadius } from '../redux/actions/issuesActions'

import {
  ScrollView,
  View,
  StyleSheet,
  Slider,
  Text
} from 'react-native';
import { MonoText } from '../components/StyledText';


class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);


  }

  handleRadiusChange = (radius) => {
    this.props.setRadius(radius)

  }
  render() {
    const { RADIUS } = this.props.issues

    return (
      <React.Fragment>
        <ConfigDetails />
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <MonoText>Radius: {RADIUS}m</MonoText>
              <Slider
                onValueChange={this.handleRadiusChange}
                style={{ width: 200, height: 40 }}
                value={RADIUS}
                step={1}
                minimumValue={0}
                maximumValue={1000}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#ae2157"
              />

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
const mapStateToProp = (state) => {
  return {
    issues: state.issues,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setRadius: (RADIUS) => dispatch(setRadius(RADIUS))
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(SettingsScreen)