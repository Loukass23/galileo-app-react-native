import React, { Component } from "react";

import { Text, View, Image, StyleSheet, TextInput, Button } from "react-native";
import Colors from "../constants/Colors";

import Camera from "../components/Camera";
import { connect } from "react-redux";
import axios from "axios";

import * as firebase from "firebase";

class ReportIssueScreen extends React.Component {
  state = {
    // pictureURI: null,
    category: "Traffic Light"
  };

  submitIssue = () => {
    const { PICTURE_FILE } = this.props.pictureURI;
    const { PICTURE_LOCATION } = this.props.pictureURI;
    const { PICTURE_LOADER } = this.props.pictureURI;
    console.log("FILE IN REPORT ISSUE" + PICTURE_FILE);
    // const file = PICTURE_FILE.split("Camera/")[1];
    // console.log(file);
    const firebaseConfig = {
      apiKey: "AIzaSyD9IXzl3kSQhoMwgQcBUdWDK4XHZDtqSiY",
      authDomain: "galileoapp.firebaseapp.com",
      databaseURL: "https://galileoapp.firebaseio.com",
      projectId: "galileoapp",
      storageBucket: "galileoapp.appspot.com",
      messagingSenderId: "45488988036",
      appId: "1:45488988036:web:45ee461427207715"
    };
    firebase.initializeApp(firebaseConfig);
    const storageService = firebase.storage();
    const storageRef = storageService.ref();

    console.log(storageRef);

    const uploadTask = storageRef
      .child(`images/${PICTURE_FILE}`)
      .put(PICTURE_FILE);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // console.log(snapshot)
        // let prog = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
        // this.setState({ progress: prog, buffer: 100 });
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("success");
        // this.setState({ isUploading: false, progress: 100, })
        firebase
          .storage()
          .ref("images")
          .child(`${PICTURE_FILE}`)
          .getDownloadURL()
          .then(url => console.log(url));
      }
    );
  };

  render() {
    console.log(this.props.pictureURI);
    const { PICTURE_FILE } = this.props.pictureURI;
    if (PICTURE_FILE == null) {
      return (
        <View style={styleCamera}>
          <Camera />
        </View>
      );
    }

    //else if category has not been choosen yet, render category component
    // else if (this.props.pictureURI.PICTURE_LOADER) {
    //   return <Loader />;
    // }
    else {
      if (this.props.pictureURI.PICTURE_LOCATION == null) {
        return <Text>Loading..</Text>;
      } else {
        const { PICTURE_LOCATION } = this.props.pictureURI;
        return (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image style={stylePicture} source={{ uri: PICTURE_FILE }} />
            <Text>Selected Issue</Text>
            <View style={styleCategory}>
              <Text
                style={{ textAlign: "center", fontSize: 20, color: "white" }}
              >
                {this.state.category}
              </Text>
            </View>

            <Text>Comment</Text>
            <TextInput style={styleInput} />
            <Button
              onPress={this.submitIssue}
              title="SUBMIT"
              color="#841584"
              accessibilityLabel="SUBMIT"
            />
          </View>
        );
      }
    }
  }
}
const styleCamera = {
  width: "100%",
  height: "100%"
};

const stylePicture = {
  width: "70%",
  height: "50%"
};

const styleCategory = {
  width: "70%",
  fontSize: 20,
  margin: 5,
  backgroundColor: "#841584"
};

const styleInput = {
  width: "80%",
  height: 100,
  borderColor: "gray",
  borderWidth: 1
};

ReportIssueScreen.navigationOptions = {
  title: "Report Issue"
};
const mapStateToProp = state => {
  return {
    pictureURI: state.pictureURI
  };
};

export default connect(mapStateToProp)(ReportIssueScreen);
