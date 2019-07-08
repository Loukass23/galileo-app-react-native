import React from 'react'
import { connect } from 'react-redux'

import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView
} from 'react-native'
import { categories } from '../constants/Issues';
import { setCategory } from '../redux/actions/postIssueActions'
import Colors from '../constants/Colors';
class IssueCategory extends React.Component {

    handleCategory(category) {
        this.props.setCategory(category)
    }
    onPressButton() {
        Alert.alert('You tapped the button!');
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}> Please choose a category </Text>
                    <View style={styles.catContainer}>

                        {categories.map(category => {
                            return (
                                <TouchableOpacity key={category.name} style={styles.categoryTouch} onPress={() => this.handleCategory(category.name)}>
                                    <Image
                                        style={{
                                            width: 150,
                                            height: 150,
                                            resizeMode: 'contain',
                                        }}
                                        source={category.image}
                                    />
                                    <Text style={styles.text2}>{category.name}</Text>
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20
    },
    categoryTouch: {

        justifyContent: 'space-around',
        alignContent: 'center',
    },
    catContainer: {
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
    text: {
        fontSize: 20,
        lineHeight: 25,
        textAlign: 'center',
        color: Colors.primary
    },
    text2: {
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        color: Colors.secondary
    },
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
