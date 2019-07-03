import React from 'react'
import { connect } from 'react-redux'

import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    Text,
    View,
} from 'react-native'
import { categories } from '../constants/Issues';
import { setCategory } from '../redux/actions/postIssueActions'
class IssueCategory extends React.Component {


    handleCategory(category) {
        this.props.setCategory(category)
    }


import { categories } from '../constants/Issues';
import { setCategory } from '../redux/actions/postIssueActions'
class IssueCategory extends React.Component {
    //   constructor(props) {


export default class IssueCategory extends React.Component {
    // constructor(props) {

    handleCategory(category) {
        this.props.setCategory(category)
    }


    onPressButton() {
        Alert.alert('You tapped the button!');
    }
    render() {
        return (
            <View style={styles.container}>

                {categories.map(category => {
                    return (
                        <TouchableOpacity key={category.name} style={styles.startContainer} onPress={() => this.handleCategory(category.name)}>
                            <Image
                                width='100'
                                source={category.image}
                            />
                            <Text>{category.name}</Text>
                        </TouchableOpacity>
                    )
                })}

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


const mapStateToProp = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        setCategory: category => dispatch(setCategory(category))
    };
};

export default connect(mapStateToProp, mapDispatchToProps)(IssueCategory);

