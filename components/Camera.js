import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import {
  setPictureFile,
  setPictureLocation,
  setPictureLoader
} from "../redux/actions/pictureActions";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import * as ImageManipulator from "expo-image-manipulator";
class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isLoading: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    // console.log(this.props.currentLocation.USER_POSITION);
  }

  async snapPhoto() {
    console.log("Button Pressed");


    if (this.camera) {
      console.log("Taking photo");
      const options = {
        quality: 0,
        // base64: true,
        fixOrientation: true,
        exif: true
      };

      await this.camera.takePictureAsync(options).then(photo => {
        this.props.setPictureLoader(true);
        const { USER_POSITION } = this.props.currentLocation;

        photo.exif.Orientation = 1;
        console.log(photo);

        // this.resizeImage(photo.uri);
        this.props.setPictureFile(photo.uri);
        this.props.setPictureLocation(USER_POSITION);
        this.props.setPictureLoader(false);
      });
    }
  }

  // resizeImage = async uri => {
  //   const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
  //     compress: 0.75,
  //     format: "jpeg"
  //   });
  //   console.log
  //   // const image = `${Expo.FileSystem.documentDirectory}${userID}/${time}.${fileType}`;
  //   // Expo.FileSystem.copyAsync({
  //   //   from: manipResult.uri,
  //   //   to: image
  //   // }).then(() => {
  //   //   alert('It finished!');
  //   // }).catch((error) => {
  //   //   alert(JSON.stringify(error));
  //   // });
  //   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  //   this.props.setPictureFile(manipResult);
  // };

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

const mapStateToProp = state => {
  return {
    currentLocation: state.location,
    pictureURI: state.pictureURI
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setPictureFile: picture => dispatch(setPictureFile(picture)),
    setPictureLocation: pictureLocation =>
      dispatch(setPictureLocation(pictureLocation)),
    setPictureLoader: loading => dispatch(setPictureLoader(loading))
  };
};
export default connect(
  mapStateToProp,
  mapDispatchToProps
)(CameraExample);
