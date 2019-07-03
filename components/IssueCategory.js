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
    //   constructor(props) {
    //     super(props)
    //     this.state = { count: 0 }
    //   }

    //   onPress = () => {
    //     this.setState({
    //       count: this.state.count+1
    //     })
    //   }
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
                                style={styles.highlight}
                                source={category.image}
                            />
                            <Text>{category.name}</Text>
                        </TouchableOpacity>
                    )
                })}
                {/* <View
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
                </View> */}
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
