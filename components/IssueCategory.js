import React, { Component } from 'react'
import {
    StyleSheet,
    Alert, 
    TouchableOpacity,
    Text,
    View,
} from 'react-native'

export default class IssueCategory extends React.Component {
    //   constructor(props) {
    //     super(props)
    //     this.state = { count: 0 }
    //   }

    //   onPress = () => {
    //     this.setState({
    //       count: this.state.count+1
    //     })
    //   }
    onPressButton() {
        Alert.alert('You tapped the button!');
    }
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={styles.button}
                    onPress={this.onPressButton}
                >
                    <Text> 1  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 2  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 3  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 4  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 5  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 6  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 7  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 8  </Text>
                </View>
                <View
                    style={styles.button}
                >
                    <Text> 9  </Text>
                </View>
                <View>
                    <Text style={styles.issueHeading}> Please choose a category </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'skyblue',
        height: 100,
        width: 100,
        margin: 10
    },
    issueHeading: {
        fontSize: 24,
        marginTop: 30
    }
})

// export default IssueCategory


// import React, { Component } from 'react';
// import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
// import * as Permissions from "expo-permissions";
// import { Camera } from "expo-camera";
// import { Ionicons } from "@expo/vector-icons";
// import {
//     setPictureFile,
//     setPictureLocation,
//     setPictureLoader
// } from "../redux/actions/pictureActions";
// import Loader from "../components/Loader";
// import { connect } from "react-redux";

// class IssueCategory extends React.Component {
//     // state = {
//     //     issues: [
//     //         { photo: null, type: "type3", date: null, user: "User3", id: 1, region: [] }
//     //     ]
//     // }
//     // addIssue = (issue) => {
//     //     //but this would update everyting all at once, so I don't know that it's all that efficient, especially at scale
//     //     issue.id = Math.random();
//     //     issue.date = new Date;
//     //     issue.type = document.getElementById.value;
//     //     let issues = [...this.state.issues, issue];
//     //     this.setState({
//     //         issues: issues
//     //     })
//     // }
//     // deleteIssue = (id) => {
//     //     //but this would update everyting all at once, so I don't know that it's all that efficient, especially at scale
//     //     let issues = this.state.issues.filter(issue => {
//     //         return issue.id !== id;
//     //     });
//     //     this.setState({
//     //         issues: issues
//     //     })
//     // }
//     // handleChange = (e) => {
//     //     this.setState({
//     //         [e.target.id]: e.target.value
//     //     })
//     // }
//     // componentDidMount() {
//     //     console.log("App.js Component mounted");
//     // }
//     // componentDidUpdate(prevProps, prevState) {
//     //     console.log("App.js Component updated")
//     // }
//     render() {
//         return (
//             <View>
//                 {/* <View >
//                     <Text
//                     title="What Kind of Issue?"
//                     value="What Kind of Issue?"/>
//                 </View> */}
//                 <View style={styles.container}>
//                     <View style={styles.issueStyle}>
//                         <Button
//                             style={styles.buttonStyle}
//                             title="Button" />
//                         <Button
//                             style={styles.buttonStyle}
//                             title="Button" />
//                         <Button
//                             style={styles.buttonStyle}
//                             title="Button" />
//                     </View>
//                     {/* <View>
//                         <Button
//                         style={{buttonStyle}}
//                         title="Button"/>
//                         <Button
//                         style={{buttonStyle}}
//                         title="Button"/>
//                         <Button
//                         style={{buttonStyle}}
//                         title="Button"/>
//                     </View>
//                     <View>
//                         <Button
//                         style={{buttonStyle}}
//                         title="Button"/>
//                         <Button
//                         style={{buttonStyle}}
//                         title="Button"/>
//                         <Button
//                         style={{buttonStyle}}
//                         title="Button"/>
//                     </View> */}
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     issueStyle: {
//         flex: 1,
//         flexDirection: "row"
//     },
//     buttonStyle: {
//         width: 5
//     }
// });

// export default IssueCategory;
