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
import Colors from '../constants/Colors';


const IssueDetails = ({ marker, clearMarker }) => {
    console.log('marker :', marker);
    return (
        <View style={styles.container} >
            <ScrollView>

                {marker.image && <Image
                    source={{ uri: marker.image[0] }}
                    style={styles.image}
                />}

                <View style={styles.view} >
                    <Text style={styles.title}>
                        {marker.category}</Text>
                    <Text style={styles.text}>{marker.description}</Text>
                </View>
                <View>
                    <Button
                        style={styles.button}
                        onPress={clearMarker}
                        title="Back"
                        color="#841584"
                        accessibilityLabel="Back"
                    />
                    <Button
                        style={styles.button}

                        title="Verify"
                        color="#841584"
                        accessibilityLabel="Verify"
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
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
    button: {
        height: 100,
        width: 100,
        margin: 10,
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
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(IssueDetails)

