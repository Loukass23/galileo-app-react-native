import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import {   Location } from 'expo-location';
// import {   Permissions } from 'expo-permissions';
import {  Location, Permissions } from 'expo';
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";
import MapView, { Callout, Marker } from 'react-native-maps';


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
  { lat: 52.4852006, lon: 13.37 }
];

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    viewRegion: INITIAL_POSITION,
    userRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
  poi: null,
};

this.onPoiClick = this.onPoiClick.bind(this);
}

componentDidMount() {
  this._getLocationAsync();
}

onPoiClick = (e) => {
const poi = e.nativeEvent;

console.log(poi)

this.setState({poi});
}

 
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
   //this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
   const userRegion = { 
    latitude: location.coords.latitude, 
    longitude: location.coords.longitude, 
    latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
   
   this.setState(
      {
        userRegion ,
        viewRegion: userRegion ,
  }
    );
  };

  renderMarker = (marker, index) => {
 
   // console.log(this.state.location)

    const key = index + marker.geometry.coordinates[0];
    // If a cluster
    if (marker.properties) {
      return (
        <Marker
          key={key}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
        >
          <ClusterMarker count={marker.properties.point_count} />
        </Marker>
      );
    }
    // If a single marker
    return (
      <Marker
      onPress= {this.onPoiClick}
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
      />
    );
  };

  render() {
    const { viewRegion } = this.state;

    const allCoords = COORDS.map(c => ({
      geometry: {
        coordinates: [c.lon, c.lat]
      }
    }));

    const cluster = getCluster(allCoords, viewRegion);

    return (
      <View style={Style.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={Style.map}
          loadingIndicatorColor={"#ffbbbb"}
          loadingBackgroundColor={"#ffbbbb"}
          region={viewRegion}
          onRegionChangeComplete={viewRegion => this.setState({ viewRegion })}
        >
          {this.state.userRegion &&  
           <Marker
          pinColor="#1500ff"
          coordinate={{
            latitude: this.state.userRegion.latitude,
            longitude: this.state.userRegion.longitude
          }}
        />
        }
        {this.state.poi && (
            <Marker coordinate={this.state.poi.coordinate}>
              <Callout>
                <View>
                  <Text>Type: </Text>
                  <Text>Name: </Text>
                   <Text>Lat: {this.state.poi.coordinate.latitude}</Text>
                  <Text>Long: {this.state.poi.coordinate.longitude}</Text> 
                </View>
              </Callout>
            </Marker>
          )}
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
        </MapView>
      </View>
    );
  }
}
MapScreen.navigationOptions = {
  title: 'Issues Map',
};
