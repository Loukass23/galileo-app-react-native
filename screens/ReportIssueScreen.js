import React, { Component } from "react";

import { Text, View, Image, StyleSheet } from "react-native";
// // import * as FileSystem from "expo-file-system";
import Camera from "../components/Camera";
// export default class ReportIssueScreen extends Component {
export default class ReportIssueScreen extends React.Component {
  state = {
    pictureURI: null
  };

  // componentDidMount() {
  //   // this.getImageFromCache();
  // }

  // async getImageFromCache() {
  //   const image = this.props.navigation.state.params.picture;
  //   console.log(this.props.navigation.state.params);
  //   await this.setState({
  //     pictureURI: image
  //   });
  //   console.log(this.state.pictureURI);
  // }
  render() {
    if (this.state.pictureURI == null) {
      return (
        <View style={styleCamera}>
          <Camera />
        </View>

        // <View style={{ flex: 1, alignItems: "center" }}>
        //   <Image
        //     style={{ width: 200, height: 200 }}
        //     source={{ uri: this.state.pictureURI }}
        //   />

        //   <Text>hello</Text>
        // </View>
      );
    }
    // return (
    //   <View style={{ width: 200, height: 200 }}>
    //     <Camera />
    //   </View>

    //   // <View style={{ flex: 1, alignItems: "center" }}>
    //   //   <Image
    //   //     style={{ width: 200, height: 200 }}
    //   //     source={{ uri: this.state.pictureURI }}
    //   //   />

    //   //   <Text>hello</Text>
    //   // </View>
    // );
  }
}
const styleCamera = {
  width: "100%",
  height: "100%"
};
ReportIssueScreen.navigationOptions = {
  title: "Report Issue"
};
