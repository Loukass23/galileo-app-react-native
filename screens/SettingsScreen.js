import React from 'react';
import Colors from '../constants/Colors';
import ConfigDetails from '../components/ConfigDetails';
import { connect } from 'react-redux'
import { setRadius, getIssues } from '../redux/actions/issuesActions'
import { logout } from '../redux/actions/userActions'
import {
  ScrollView,
  View,
  StyleSheet,
  Slider,
  Text,
  Button
} from 'react-native';
import { MonoText } from '../components/StyledText';


class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   radius: 100
    // };

  }
  componentWillUnmount() {

  }
  handleRadiusChange = (radius) => {
    this.props.setRadius(radius)
    this.props.getIssues()

  }
  render() {
    const { RADIUS } = this.props.issues

    return (
      <React.Fragment>
        <ConfigDetails />
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <MonoText>Radius: {RADIUS}m</MonoText>
              <Slider
                onValueChange={this.handleRadiusChange}
                style={{ width: 200, height: 40 }}
                value={RADIUS}
                step={50}
                minimumValue={0}
                maximumValue={10000}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#ae2157"
              />

            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.containerRow}  >
              <Button
                style={styles.button3}
                onPress={this.props.logout}
                title="LOG OUT"
                color={Colors.primary}
                accessibilityLabel="Log Out"
              />
            </View>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,

  },
  scrollview: {
    marginTop: 1,
    flex: .8,
  },
  footer: {
    flex: .15,
    marginBottom: 1,
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
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button3: {
    flex: .3,
    backgroundColor: Colors.secondary,
    width: 50,

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
    getIssues: () => dispatch(getIssues()),
    setRadius: (RADIUS) => dispatch(setRadius(RADIUS)),
    logout: () => dispatch(logout()),

  }
}
export default connect(mapStateToProp, mapDispatchToProps)(SettingsScreen)