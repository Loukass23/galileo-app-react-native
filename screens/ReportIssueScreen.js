import React, { Component } from "react";

import { Text, View, Image, StyleSheet, TextInput, Button, ProgressBarAndroid } from "react-native";
import Colors from "../constants/Colors";
import Camera from "../components/Camera";
import { connect } from "react-redux";
import axios from "axios";
import IssueCategory from "../components/IssueCategory";


import * as firebase from "firebase";

class ReportIssueScreen extends React.Component {
<<<<<<< HEAD
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
=======
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            photoURL: null,
            photoUploading: false,
            // pictureURI: null,
            category: "Traffic Light"
        }
    }
    componentDidMount() {

    }

    submitIssue = () => {
        const { PICTURE_FILE } = this.props.pictureURI;
>>>>>>> 3abf9437b3566966f368867919c2986f410ef7d0
        const { PICTURE_LOCATION } = this.props.pictureURI;
        const { PICTURE_LOADER } = this.props.pictureURI;
        const { ADDRESS } = this.props.location
        const storageService = firebase.storage();
        const storageRef = storageService.ref();
        console.log("FILE IN REPORT ISSUE" + PICTURE_FILE);
        this.setState({ photoUploading: true })

        const id = `${ADDRESS.city}-${this.state.category}-${new Date()}`
        console.log(id)
        fetch(PICTURE_FILE).then(res => {
            console.log(res);
            const blob = res._bodyBlob

            const uploadTask = storageRef
                .child(`issues/${id}`)
                .put(blob);
            uploadTask.on(
                "state_changed",
                snapshot => {

                    let progress = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
                    this.setState({ progress: progress / 100 });
                    console.log(progress);

                },
                error => {
                    console.log(error);
                },
                () => {
                    console.log("success");
                    this.setState({ photoUploading: false })
                    firebase
                        .storage()
                        .ref("issues")
                        .child(`${id}`)
                        .getDownloadURL()
                        .then(photoURL => this.setState({ photoURL }));
                }
            );
        })
    }
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
        location: state.location
    };
};

export default connect(mapStateToProp)(ReportIssueScreen);
