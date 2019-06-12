
import React, { Component } from 'react'
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';


export default class MapClustering extends Component {
    render() {
        return (
            <MapView

                clustering={true}
                clusterColor='#000'
                clusterTextColor='#fff'
                clusterBorderColor='#fff'
                clusterBorderWidth={1}
                region={{
                    latitude: 52.5, longitude: 19.2,
                    latitudeDelta: 8.5, longitudeDelta: 8.5
                }}
                style={{ width: 500, height: 800 }}>
                <Marker coordinate={{ latitude: 52.0, longitude: 18.2 }} />
                <Marker coordinate={{ latitude: 52.0, longitude: 18.3 }} />
                <Marker coordinate={{ latitude: 52.0, longitude: 18.4 }} />
                <Marker coordinate={{ latitude: 52.4, longitude: 18.7 }} />
                <Marker coordinate={{ latitude: 52.1, longitude: 18.4 }} />
                <Marker coordinate={{ latitude: 52.6, longitude: 18.3 }} />
                <Marker coordinate={{ latitude: 51.6, longitude: 18.0 }} />
                <Marker coordinate={{ latitude: 53.1, longitude: 18.8 }} />
                <Marker coordinate={{ latitude: 52.9, longitude: 19.4 }} />
            </MapView>
        )
    }
}
