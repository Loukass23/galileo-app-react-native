import GifLoader from 'react-gif-loader';
import React from 'react';
import {
    StyleSheet, View, Image, Button
} from 'react-native';

class Loader extends React.Component {
    async _cacheResourcesAsync() {
        await Promise.all([
            Asset.loadAsync([
                require('../assets/images/Galileo_logo_animation_3.gif'),

            ])
        ]);

    }
    render() {
        return (
            <View style={Styles.welcomeContainer}>
                <Image
                    source={require('../assets/images/Galileo_logo_animation_3.gif')}
                    style={Styles.welcomeImage}
                />

            </View>
        );
    }
}
const Styles = StyleSheet.create({
    imageStyle: {
        marginTop: "20%"
    },
    welcomeContainer: {
        alignItems: 'center',

    },
    welcomeImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginTop: '50%',
        marginLeft: -10,
    },
})

export default Loader