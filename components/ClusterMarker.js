import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from '../constants/Colors';


const Style = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignSelf: "flex-start"
    },
    bubble: {
        flex: 0,
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 15,
        borderColor: Colors.secondary,
        borderWidth: 1
    },
    count: {
        color: "#fff",
        fontSize: 13
    }
});

const ClusterMarker = ({ count }) => (
    <View style={Style.container}>
        <View style={Style.bubble}>
            <Text style={Style.count}>{count}</Text>
        </View>
    </View>
);

export default ClusterMarker;