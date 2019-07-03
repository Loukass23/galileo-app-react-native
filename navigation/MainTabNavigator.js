import React from "react";
import { Platform, View } from "react-native";

import TabBarIcon from "../components/TabBarIcon";
import Camera from "../components/Camera";
import IssueCategory from "../components/IssueCategory";
import ReportIssueScreen from "../screens/ReportIssueScreen";
import IssuesScreen from "../screens/IssuesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MapView from "../screens/MapScreen";
import {
  createStackNavigator,
  createBottomTabNavigator,
  Header,
  HeaderStyleInterpolator,
  NavigationEventPayload,
  NavigationEventSubscription,
  NavigationScreenProp,
  NavigationState,
  TransitionConfig,
} from 'react-navigation';




const MapStack = createStackNavigator({
  Maps: MapView,

});

MapStack.navigationOptions = {
  tabBarLabel: "Maps",

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};
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

const MainNavigator = createStackNavigator({
  Maps: { screen: MapView },
  Settings: { screen: SettingsScreen },
  ReportIssue: { screen: ReportIssueScreen },
});

export default createBottomTabNavigator({
  MapStack,
  SettingsStack,
  ReportIssueStack
});

// const StackWithTranslucentHeader = createStackNavigator(
//   {
//     Home: {
//       screen: MapView,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       headerBackground:
//         Platform.OS === 'ios' ? (
//           <View style={{ flex: 1 }} blurType="light" />
//         ) : (
//             <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.7)' }} />
//           ),
//       headerStyle: {
//         borderBottomColor: '#A7A7AA',

//       },
//       headerTransparent: true,
//     },
//     headerTransitionPreset: 'uikit',
//     // You can leave this out if you don't want the card shadow to
//     // be visible through the header
//     // transitionConfig: () =>
//     //   ({
//     //     headerBackgroundInterpolator:
//     //       HeaderStyleInterpolator.forBackgroundWithTranslation,
//     //   } as TransitionConfig)
//   }
// );

