import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MapView from "../screens/MapScreen";
import Camera from "../components/Camera";
import ReportIssueScreen from "../screens/ReportIssueScreen";
const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};
const MapStack = createStackNavigator({
  Maps: MapView
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
// const ReportIssueStack = createStackNavigator({
//   ReportIssue: Camera
// });

// ReportIssueStack.navigationOptions = {
//   tabBarLabel: "Report",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
//     />
//   )
// };
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

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  SettingsStack,
  ReportIssueStack
});
