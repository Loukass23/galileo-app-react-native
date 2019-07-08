import React from 'react'
import { connect } from 'react-redux'
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text,
    Button
} from 'react-native';
import { clearMarker, verifyIssue } from '../redux/actions/issuesActions'
import Colors from '../constants/Colors';


class IssueDetails extends React.Component {

    handleVerify = () => {
        const issueID = this.props.marker.id
        this.props.verifyIssue(issueID)
    }
    render() {
        const { marker, clearMarker } = this.props
        console.log('marker :', marker);
        return (
            <View style={styles.container} >
                {/* <ScrollView style={styles.container}> */}

                {marker.image && <Image
                    source={{ uri: marker.image[0] }}
                    style={styles.image}
                />}

                <View style={styles.view} >
                    <Text style={styles.title}>
                        {marker.category}</Text>
                    <Text style={styles.text}>{marker.description}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        onPress={clearMarker}
                        title="Back"
                        color="#841584"
                        accessibilityLabel="Back"
                    />
                    <Button
                        style={styles.button}
                        onPress={this.handleVerify}
                        title="Verify"
                        color="#841584"
                        accessibilityLabel="Verify"
                    />
                </View>
                {/* </ScrollView> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 20,
        color: Colors.primary,
        lineHeight: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
    },
    view: {

    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    button: {
        flex: .2,
        backgroundColor: Colors.primary,
    },
    image: { width: 400, height: 400 }
})


const mapStateToProp = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearMarker: () => dispatch(clearMarker()),
        verifyIssue: issueID => dispatch(verifyIssue(issueID)),

    }
}
export default connect(mapStateToProp, mapDispatchToProps)(IssueDetails)

