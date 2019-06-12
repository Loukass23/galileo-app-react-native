import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Style = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignSelf: "flex-start"
    },
    bubble: {
        flex: 0,
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: "#ae2157",
        padding: 4,
        borderRadius: 8,
        borderColor: "#ae2157",
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