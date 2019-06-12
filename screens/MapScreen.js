import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker, MapView , Constants, Location, Permissions } from 'expo';

import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFill
  }
});

const INITIAL_POSITION = {
  latitude: 52.529015, 
  longitude: 13.395032,
  latitudeDelta: 1,
  longitudeDelta: 1
}


const COORDS = [
  { lat: 52.529815, lon: 13.395032 },
  { lat: 52.529915, lon: 13.395032 },
  { lat: 52.531015, lon: 13.395032 },
  { lat: 52.529015, lon: 13.395032 },
  { lat: 52.529015, lon: 13.395032 },
  { lat: 52.1, lon: 13 },
  { lat: 52.2, lon: 13 },
  { lat: 52.3, lon: 13 },
  { lat: 52.4, lon: 13 }
];

export default class MapScreen extends React.Component {
  state = {
    region: INITIAL_POSITION,
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }


  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    console.log(this.state)
  };

  renderMarker = (marker, index) => {
 
   // console.log(this.state.location)

    const key = index + marker.geometry.coordinates[0];
    // If a cluster
    if (marker.properties) {
      return (
        <MapView.Marker
          key={key}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
        >
          <ClusterMarker count={marker.properties.point_count} />
        </MapView.Marker>
      );
    }
    // If a single marker
    return (
      <MapView.Marker
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
      />
    );
  };

  render() {
    const { region } = this.state;

    const allCoords = COORDS.map(c => ({
      geometry: {
        coordinates: [c.lon, c.lat]
      }
    }));

    const cluster = getCluster(allCoords, region);

    return (
      <View style={Style.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={Style.map}
          loadingIndicatorColor={"#ffbbbb"}
          loadingBackgroundColor={"#ffbbbb"}
          region={region}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          {this.state.mapRegion &&  
           <MapView.Marker
          pinColor="#1500ff"
          coordinate={{
            latitude: this.state.mapRegion.latitude,
            longitude: this.state.mapRegion.longitude
          }}
        />
        }
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
        </MapView>
      </View>
    );
  }
}
MapScreen.navigationOptions = {
  title: 'Issues Map',
};
