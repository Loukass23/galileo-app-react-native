import React from 'react';
import {
    StyleSheet, View, Image, Text
} from 'react-native';

class OnMapMessage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {


    }
    async _cacheResourcesAsync() {
        await Promise.all([
            Asset.loadAsync([
                require('../assets/images/Galileo_logo_animation_3.gif'),

            ])
        ]);

    }
    render() {
        const { message } = this.props
        return (
            <React.Fragment>
                <View style={Styles.welcomeContainer}>
                    <Image
                        source={require('../assets/images/Galileo_logo_animation_3.gif')}
                        style={Styles.welcomeImage}
                    />
                    <Text style={Styles.text}>{message}</Text>
                </View >
            </React.Fragment>
        );
    }
}
const Styles = StyleSheet.create({

    welcomeContainer: {

        backgroundColor: '#fff',
        flex: 1,
        flexDirection: "row",
        textAlign: 'center',

        alignItems: 'stretch',


    },
    welcomeImage: {

        marginTop: 13,
        width: 30,
        height: 38,
        marginLeft: 60
    },
    text: {
        marginTop: 13,
        padding: 5,
        textAlign: 'center',
        alignItems: 'center',
        width: 200,
        height: 38,
        backgroundColor: 'rgba(255, 255, 255, .7)',
        color: 'grey'
    },
})

export default OnMapMessage

