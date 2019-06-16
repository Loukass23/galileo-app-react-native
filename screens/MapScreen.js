import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
// import {   Location } from 'expo-location';
// import {   Permissions } from 'expo-permissions';
import { Location, Permissions } from 'expo';
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { radiusSetting } from "./SettingsScreen"
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';




const { width, height } = Dimensions.get('window');


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
      radius: 100,
      loaded: true,
      hackHeight: height
    };
    this.onPoiClick = this.onPoiClick.bind(this);
  }
  componentWillMount() {
    setTimeout(() => this.setState({ loaded: true }), 1500);
  }
  componentDidMount() {
    // this._getLocationAsync();
    this._getLocation();
    setTimeout(() => this.setState({ hackHeight: height + 1 }), 500);
    setTimeout(() => this.setState({ hackHeight: height }), 1000);
  }
  componentWillUpdate() {
    if (radiusSetting != this.state.radius) {
      this.setState({ radius: radiusSetting })

    }
  }

  onPoiClick = (e) => {
    console.log(e)
    const { coordinate } = e.nativeEvent;
    this.setState({ poi: coordinate });
  }
  _getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      // this.setState({ coords: position.coords, loading: false });
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.01
      };
      this.map.animateToRegion(region, 500);


      this.setState(
        {
          userRegion: region

        }
      );
    });
  };

  renderRadius = () => {
    console.log(here)
    return (
      <Circle
        center={this.state.userRegion}
        radius={this.state.radius}
        fillColor="rgba(163, 48, 87, 0.5)"
      />
    )

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
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    const userRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 1, longitudeDelta: 1
    }

    this.setState(
      {
        userRegion,
        viewRegion: userRegion,
      }
    );
  };

  renderShowLocationButton = () => {
    return (
      <TouchableOpacity
        style={Style.myLocationButton}
        onPress={() => {
          this._getLocation()
        }}
      >
        <Text>Test</Text>
        <Ionicons name="md-checkmark-circle" size={32} />
      </TouchableOpacity>
    )
  }
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
        onPress={this.onPoiClick}
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
      />
    );
  };

  render() {
    const { viewRegion, userRegion, radius, poi } = this.state;

    const allCoords = COORDS.map(c => ({
      geometry: {
        coordinates: [c.lon, c.lat]
      }
    }));

    const cluster = getCluster(allCoords, viewRegion);
    if (this.state.loaded) {
      return (
        <View style={{ paddingBottom: this.state.hackHeight, flex: 1 }}>

          <MapView
            ref={mapView => {
              _mapView = mapView
            }}
            {...this.renderShowLocationButton()}
            style={Style.map}
            onMapReady={this.renderShowLocationButton}
            showsMyLocationButton={true}
            showsUserLocation={true}
            provider={MapView.PROVIDER_GOOGLE}
            loadingIndicatorColor={"#ffbbbb"}
            loadingBackgroundColor={"#ffbbbb"}
            region={viewRegion}
            onRegionChangeComplete={viewRegion => this.setState({ viewRegion })}
          >

            {userRegion &&
              this.renderRadius
            }

            {poi && (
              <Marker coordinate={poi}>
                <Callout>
                  <View>
                    <Text>Type: </Text>
                    <Text>Name: </Text>
                    <Text>Lat: {poi.latitude}</Text>
                    <Text>Long: {poi.longitude}</Text>
                  </View>
                </Callout>
              </Marker>
            )}
            {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}

          </MapView>
        </View>
      );
    }
    else {
      return (
        <Text>Loading</Text>
      )
    }
  }
}
MapScreen.navigationOptions = {
  title: 'Issues Map',
};

const Style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  myLocationButton: {

    position: 'absolute',
    bottom: 50,
    right: 50,
    padding: 15,
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 50
  }
});