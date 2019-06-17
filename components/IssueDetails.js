import React from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';

function IssueDetails({ marker }) {
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
            </View>
        </ScrollView>
    )
}

export default IssueDetails
