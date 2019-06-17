import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import Camera from '../components/Camera';
import ReportIssueScreen from '../screens/ReportIssueScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapView from '../screens/MapScreen';

const ReportIssueStack = createStackNavigator({
  ReportIssue: ReportIssueScreen
});

ReportIssueStack.navigationOptions = {
  tabBarLabel: "Report",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
    />
  )
};


// const IssuesStack = createStackNavigator({
//   Issues: IssuesScreen,
// });

// IssuesStack.navigationOptions = {
//   tabBarLabel: 'Issues',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };


const MapStack = createStackNavigator({
  Maps: MapView,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  MapStack,
  ReportIssueStack,
  SettingsStack,
});
