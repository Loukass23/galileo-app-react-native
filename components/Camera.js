import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import { Ionicons } from "@expo/vector-icons";
// import * as FileSystem from "expo-file-system";
// import ReportIssueSecond from "../screens/ReportIssueScreen";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async snapPhoto() {
    console.log("Button Pressed");
    // console.log(this.camera);
    if (this.camera) {
      console.log("Taking photo");
      const options = {
        quality: 0,
        base64: true,
        fixOrientation: true,
        exif: true
      };
      // console.log(options);
      await this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        console.log(photo.uri);
        //HERE I WILL DISPATCH AN ACTION TO THE REDUX STORE
        // console.log(FileSystem.cacheDirectory);
        // const { navigate } = this.props.navigation;
        // navigate("ReportIssueSecond", { picture: photo.uri });
      });
    }
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            />
            <TouchableOpacity onPress={this.snapPhoto.bind(this)}>
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="md-radio-button-off" // This is the icon which should take and save image
                  style={{ color: "white", fontSize: 100 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-start",
                alignItems: "center"
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
          </Camera>
        </View>
      );
    }
  }
}
