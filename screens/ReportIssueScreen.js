import React, { Component } from "react";

import { Text, View, Image, StyleSheet, TextInput, Button } from "react-native";
import Colors from "../constants/Colors";

import Camera from "../components/Camera";
import { connect } from "react-redux";
import axios from "axios";
import IssueCategory from "../components/IssueCategory";


class ReportIssueScreen extends React.Component {
  state = {
    // pictureURI: null,
    category: "Traffic Light"
  };

  submitIssue = () => {
    const { PICTURE_FILE } = this.props.pictureURI;
    const { PICTURE_LOCATION } = this.props.pictureURI;
    const { PICTURE_LOADER } = this.props.pictureURI;
    console.log(PICTURE_FILE);
    let api_key = "848653823763635";
    let api_secret = "1yOwrzV2V4yXjXvmkN2SGSjovl0";
    let cloud = "dgiubh3ed";
    // let hash_string = 'timestamp=' + timestamp + api_secret
    // let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url =
      "https://api.cloudinary.com/v1_1/" + cloud + "/image/upload";
    axios
      .post(upload_url, {
        upload_preset: "issue-upload"
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props.pictureURI);
    const { PICTURE_FILE } = this.props.pictureURI;
    if (PICTURE_FILE == null) {
      return (
        <View >
          <Camera />
        </View>
      );
    }

    //else if category has not been choosen yet, render category component
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
