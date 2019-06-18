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
    console.log('details', marker)
    return (
        <ScrollView>
            <View >
                <Text>
                    {marker.category}{"\n"}
                    {marker.description}</Text>

                {marker.image.map(image => <Image
                    source={{ uri: image }}
                    key={image}

                />)}
                <Button
                    style={styles.button}
                    onPress={clearMarker}
                    title="OK"
                    color="#841584"
                    accessibilityLabel="Start looking at issues around you"
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {

    }
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

