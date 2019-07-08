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
import { markerImages } from '../constants/Issues';


import { postIssue } from "../redux/actions/issuesActions";
import IssueCategory from "../components/IssueCategory";


import * as firebase from "firebase";
import { clearPost } from "../redux/actions/postIssueActions";

class ReportIssueScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      photoUploading: false,
      pictureURI: null,
      category: "",
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.firebaseUpload = this.firebaseUpload.bind(this);

  }

  handleChange(event) {
    this.setState({ description: event.target.value });
  }

  firebaseUpload = async () => {
    const uri = this.props.issue.PICTURE_FILE
    const id = `${this.props.location.ADDRESS.city}-${this.props.issue.CATEGORY}-${new Date()}`;
    this.setState({ photoUploading: true })
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log('blob :', blob);

    return new Promise((resolve, reject) => {
      const storageRef = firebase
        .storage()
        .ref()
        .child(`issues/${id}`);
      const uploadTask = storageRef.put(blob)
      uploadTask.on('state_changed',
        snapshot => {
          let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          this.setState({ progress: progress / 100 });
          console.log(this.state.progress);
        },
        err => {
          console.log('error', err)
          reject()
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('downloadURL :', downloadURL);
            resolve(downloadURL)
          })
        }
      )
    })
  }

  handleSubmitIssue = async () => {

    const { navigate } = this.props.navigation;
    const { CATEGORY, PICTURE_FILE } = this.props.issue;
    const { ADDRESS, USER_POSITION, POI_LOCATION, POI_ADDRESS } = this.props.location;
    const { description } = this.state

    const storageUrl = await this.firebaseUpload()
    console.log(storageUrl)

    console.log('photoURL :', storageUrl);
    let location
    if (POI_LOCATION) {
      location = {
        longitude: POI_LOCATION.longitude,
        latitude: POI_LOCATION.latitude,
        address: POI_ADDRESS.formatted
      }
    }
    else {
      location = {
        longitude: USER_POSITION.longitude,
        latitude: USER_POSITION.latitude,
        address: ADDRESS.formatted
      }
    }
    const issue = {
      imageUrls: [storageUrl],
      location,
      category: CATEGORY,
      description
    };
    this.props.postIssue(issue);
    this.props.clearPost()
    navigate('Maps')
  }

  render() {

    const { PICTURE_FILE, CATEGORY } = this.props.issue;
    const { PICTURE_LOADER } = this.props.postIssue;
    const { ADDRESS, POI_ADDRESS } = this.props.location;
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
        <View style={Styles.container}>

          <Image style={Styles.stylePicture}
            source={{ uri: PICTURE_FILE }} />
          <ScrollView
            style={Styles.scrollview}>
            {POI_ADDRESS ?
              <Text>{POI_ADDRESS.formatted}</Text> :
              <Text>{ADDRESS.formatted}</Text>
            }

            <View style={Styles.styleCategory}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={markerImages[CATEGORY]} />
              <Text style={{ alignSelf: 'center' }}>
                {CATEGORY}
              </Text>
            </View>

            <TextInput style={Styles.styleInput} editable={!this.state.photoUploading} placeholder='Add a comment on this issue' value={this.state.description} onChangeText={(description) => this.setState({ description })} />
            {this.state.progress === 0 ?
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
                  onPress={this.handleSubmitIssue}
                  title="SUBMIT"
                  color={Colors.primary}
                  accessibilityLabel="SUBMIT"
                />
              </View> :
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.state.progress}
              />}
          </ScrollView>
        </View>
      );
    }
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"

  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  styleCategory: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    marginTop: 10,


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
  },
  styleInput: {
    marginVertical: 20,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1
  }

});


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
