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

        alignItems: 'stretch',

    },
    welcomeImage: {

        marginTop: 15,
        width: 30,
        height: 35,
        marginLeft: 15
    },
    text: {
        marginTop: 15,
        textAlign: 'center',
        width: 200,
        height: 35,
        backgroundColor: '#fff',
    },
})

export default OnMapMessage

