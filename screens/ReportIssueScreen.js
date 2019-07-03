import React from "react";

import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ProgressBarAndroid,
  ScrollView
} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import Colors from "../constants/Colors";
import Camera from "../components/Camera";
import { connect } from "react-redux";


import { postIssue } from "../redux/actions/issuesActions";
import IssueCategory from "../components/IssueCategory";


import * as firebase from "firebase";
import { clearPost } from "../redux/actions/postIssueActions";

class ReportIssueScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      photoURL: null,
      photoUploading: false,
      pictureURI: null,
      category: "",
      description: ""
    };
  }

  // nativeCamera = async () => {
  //   let result = await ImagePicker.launchCameraAsync();
  //   //let result = await ImagePicker.launchImageLibraryAsync();

  //   if (!result.cancelled) {
  //     console.log('blob', result);
  //     this.uploadImage(result.uri)
  //   }
  // }

  // uploadImage = async (uri) => {
  //   console.log('uri :', uri);
  //   const storageService = firebase.storage();
  //   const storageRef = storageService.ref();
  //   const { PICTURE_LOCATION, CATEGORY } = this.props.issue;
  //   const { ADDRESS } = this.props.location;
  //   const id = `${ADDRESS.city}-${CATEGORY}-${new Date()}`;

  //   const response = await fetch(uri);
  //   const blob = await response.blob();

  //   const uploadTask = storageRef.child(`issues/${id}`).put(blob);
  //   uploadTask.on(
  //     "state_changed",
  //     snapshot => {
  //       let progress = Math.round(
  //         (snapshot.bytesTransferred * 100) / snapshot.totalBytes
  //       );
  //       this.setState({ progress: progress / 100 });
  //       console.log(progress);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //       console.log("success");
  //       this.setState({ photoUploading: false });
  //       firebase
  //         .storage()
  //         .ref("issues")
  //         .child(`${id}`)
  //         .getDownloadURL()
  //         .then(photoURL => {
  //           console.log(photoURL);
  //           this.setState({ photoURL });

  //         });
  //     }
  //   );
  // }
  handleChange(event) {
    this.setState({ description: event.target.value });
  }

  submitIssue = () => {
    const { PICTURE_FILE, PICTURE_LOCATION, PICTURE_LOADER } = this.props.issue;
    console.log("FILE IN REPORT ISSUE" + PICTURE_FILE);
    this.setState({ photoUploading: true });

    fetch(PICTURE_FILE).then(res => {
      console.log('res :', res);
      this.getPictureLink(res);
    });
  };
  getPictureLink = res => {
    const { navigate } = this.props.navigation;
    const storageService = firebase.storage();
    const storageRef = storageService.ref();
    const { PICTURE_LOCATION, CATEGORY } = this.props.issue;
    const { ADDRESS, USER_POSITION, POI_LOCATION } = this.props.location;
    const { description } = this.state
    const id = `${ADDRESS.city}-${CATEGORY}-${new Date()}`;
    let location
    if (POI_LOCATION) {
      location = {
        longitude: POI_LOCATION.longitude,
        latitude: POI_LOCATION.latitude
      }
    }
    else {
      location = {
        longitude: USER_POSITION.longitude,
        latitude: USER_POSITION.latitude
      }
    }
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
              location,
              category: CATEGORY,
              description
            };
            this.props.postIssue(issue);
            this.props.clearPost()
            navigate('Maps')
          });
      }
    );
  };
  render() {
    console.log(this.props.issue);
    const { PICTURE_FILE, CATEGORY } = this.props.issue;
    const { PICTURE_LOADER } = this.props.postIssue;
    const { ADDRESS, POI_ADDRESS } = this.props.location;
    console.log(this.state.description);
    if (!PICTURE_FILE) {
      return (
        <View style={Styles.styleCamera}>
          {/* <Button title="Choose image..." onPress={this.nativeCamera} /> */}
          <Camera />
        </View>
      );
    }   //else if category has not been choosen yet, render category component
    else if (!CATEGORY) {
      return (<IssueCategory />)
    }
    else {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>

          <Image style={Styles.stylePicture}
            source={{ uri: PICTURE_FILE }} />
          <ScrollView
            style={Styles.scrollview}>
            {POI_ADDRESS ?
              <Text>{POI_ADDRESS.formatted}</Text> :
              <Text>{ADDRESS.formatted}</Text>
            }

            <View style={styleCategory}>
              <Text>
                {CATEGORY}
              </Text>
            </View>

            <TextInput style={styleInput} value={this.state.description} onChange={this.handleChange} />
            <View style={Styles.buttonsContainer}>
              <Button
                style={Styles.button}
                onPress={this.props.clearPost}
                title="Cancel"
                color='red'
                accessibilityLabel="SUBMIT"
              />
              <Button
                style={Styles.button}
                onPress={this.submitIssue}
                title="SUBMIT"
                color={Colors.primary}
                accessibilityLabel="SUBMIT"
              />
            </View>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={this.state.progress}
            />
          </ScrollView>
        </View>
      );
    }
  }
}

const Styles = StyleSheet.create({

  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.background,


  },
  button: {
    flex: .5
  },
  stylePicture: {
    width: "100%",
    height: "60%"
  },
  styleCamera: {
    width: "100%",
    height: "100%"
  }

});




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
  //title: "Report Issue",
  header: null
};
const mapStateToProp = state => {
  console.log('state :', state);
  return {
    issue: state.postIssue,
    location: state.location,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postIssue: issue => dispatch(postIssue(issue)),
    clearPost: () => dispatch(clearPost())
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(ReportIssueScreen);
