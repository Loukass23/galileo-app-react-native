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
import { clearMarker } from '../redux/actions/issuesActions'

function IssueDetails({ marker, clearMarker }) {
    return (
        <View style={styles.container} >
            <ScrollView>
                <View style={styles.view} >
                    <Text>
                        {marker.category}</Text>
                    <Text>{marker.description}</Text>
                </View>
                <Image
                    source={{ uri: marker.image[0] }}
                    style={styles.image}
                />
                <Button
                    style={styles.button}
                    onPress={clearMarker}
                    title="OK"
                    color="#841584"
                    accessibilityLabel="Start looking at issues around you"
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    view: {

    },
    button: {
        marginTop: 10,
        paddingHorizontal: 50,
        marginBottom: 0
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
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(IssueDetails)

