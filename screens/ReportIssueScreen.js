import React, { Component } from "react";
import { SecureStore } from "expo";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ProgressBarAndroid
} from "react-native";
import Colors from "../constants/Colors";
import Camera from "../components/Camera";
import { connect } from "react-redux";


import { postIssue } from "../redux/actions/issuesActions";

import axios from "axios";
import IssueCategory from "../components/IssueCategory";


import * as firebase from "firebase";

class ReportIssueScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      photoURL: null,
      photoUploading: false,
      // pictureURI: null,
      category: ""
    };
  }
  componentDidMount() {}


  submitIssue = () => {
    const { PICTURE_FILE } = this.props.pictureURI;
    const { PICTURE_LOCATION } = this.props.pictureURI;
    const { PICTURE_LOADER } = this.props.pictureURI;


    console.log("FILE IN REPORT ISSUE" + PICTURE_FILE);
    this.setState({ photoUploading: true });

    fetch(PICTURE_FILE).then(res => {
      this.getPictureLink(res);
    });
  };
  getPictureLink = res => {
    const storageService = firebase.storage();
    const storageRef = storageService.ref();
    const { PICTURE_LOCATION } = this.props.pictureURI;
    const { ADDRESS } = this.props.location;
    const id = `${ADDRESS.city}-${this.state.category}-${new Date()}`;
    console.log(id);
    console.log(res);
    const blob = res._bodyBlob;

    const uploadTask = storageRef.child(`issues/${id}`).put(blob);
    uploadTask.on(
      "state_changed",
      snapshot => {
        let progress = Math.round(
          (snapshot.bytesTransferred * 100) / snapshot.totalBytes
        );
        this.setState({ progress: progress / 100 });
        console.log(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("success");
        this.setState({ photoUploading: false });
        firebase
          .storage()
          .ref("issues")
          .child(`${id}`)
          .getDownloadURL()
          .then(photoURL => {
            console.log(photoURL);
            this.setState({ photoURL });
            const issue = {
              imageUrls: [photoURL],
              location: {
                longitude: PICTURE_LOCATION.longitude,
                latitude: PICTURE_LOCATION.latitude
              },
              category: this.state.category
            };
            this.props.postIssue(issue);
          });
      }
    );
  };
  render() {
    console.log(this.props.pictureURI);
    const { PICTURE_FILE } = this.props.pictureURI;
    const { PICTURE_LOADER } = this.props.pictureURI;
    if (PICTURE_FILE == null) {
      return (
        <View style={styleCamera}>
          <Camera />
        </View>
      );
    }   //else if category has not been choosen yet, render category component
    else if(!this.state.category){
       return (<IssueCategory/>) 
      }
      else {
        const { PICTURE_LOCATION } = this.props.pictureURI;
        // const { username } = this.props.user.USER;
        // const { token } = this.props.user.USER;
        // console.log(username);
        // console.log(token);
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
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={this.state.progress}
            />
          </View>
        );        
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
    pictureURI: state.pictureURI,
    location: state.location,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postIssue: issue => dispatch(postIssue(issue))
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(ReportIssueScreen);
