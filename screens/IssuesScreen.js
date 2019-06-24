import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase';

export default class IssuesScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    onChooseImagePress = async () => {
        let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            console.log(result);
            this.handleUpload(result.uri, 'test-image')
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert(error);
                });
        }
    }
    handleUpload = (uri, imageName) => {
        const storageService = firebase.storage();
        const storageRef = storageService.ref();

        fetch(uri).then(res => {
            console.log(res);
            const blob = res._bodyBlob
            const uploadTask = storageRef.child(`images/${imageName}`).put(blob); //create a child directory called images, and place the file inside this directory

            uploadTask.on('state_changed', (snapshot) => {

                let prog = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
                // this.setState({ progress: prog, buffer: 100 });
                console.log('progress', prog)

            }, (error) => {

                console.log(error);
            }, () => {
                console.log('success');
                // this.setState({ isUploading: false, progress: 100, })
                firebase
                    .storage()
                    .ref("images")
                    .child(`${imageName}`)
                    .getDownloadURL()
                    .then(url => console.log({ photoURL: url }));

            });

        })



        //console.log(uri)
        //this.setState({ isUploading: true, progress: 0 })


    }

    uploadImage = async (uri, imageName) => {
        console.log(imageName);
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log(blob)
        var ref = firebase.storage().ref().child('images/' + imageName);
        return ref.put(blob);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Choose image..." onPress={this.onChooseImagePress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, alignItems: "center", },
});
