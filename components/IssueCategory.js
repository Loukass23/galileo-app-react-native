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
    //       count: this.state.type;
    //     })
    //   }
    onPressButton() {
        Alert.alert('You tapped the button!');
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 2 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 3 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 4 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 5 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 6 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 7 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 8 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> 9 </Text>
                </TouchableOpacity>
                <Text style={styles.issueHeading}> Please choose a category </Text>
                <TouchableOpacity style={styles.submitButton}>
                    <Text> Submit issue </Text>
                </TouchableOpacity>
            </View >
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
    submitButton: {
        width: 300, 
        height: 150,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple'
    },
    issueHeading: {
        fontSize: 24,
        marginTop: 30
    },
    submitText: {
        fontSize: 48
    }
})