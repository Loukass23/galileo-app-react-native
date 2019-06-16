import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import {   Location } from 'expo-location';
// import {   Permissions } from 'expo-permissions';
import { Location, Permissions } from 'expo';
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    const { INITIAL_POSITION, RADIUS } = this.props
    this.state = {
      viewRegion: INITIAL_POSITION,
      userRegion: null,
      poi: null,
      radius: RADIUS,
      loaded: false,
      hackHeight: height
    };
    this.onPoiClick = this.onPoiClick.bind(this);
  }
  componentWillMount() {
    setTimeout(() => this.setState({ loaded: true }), 1500);
  }
  componentDidMount() {
    //this._getLocationAsync();
    this._getLocation();
    setTimeout(() => this.setState({ hackHeight: height + 1 }), 500);
    setTimeout(() => this.setState({ hackHeight: height }), 1000);
  }
  componentWillUpdate() {
    // if (radiusSetting != this.state.radius) {
    //   this.setState({ radius: radiusSetting })

    // }
  }

  onPoiClick = (e) => {

    const { coordinate } = e.nativeEvent;
    console.log(e.nativeEvent, this.state.poi)
    // this.setState({ poi: e.nativeEvent });
    this.setState({ poi: coordinate });
  }
  _getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {

      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.01
      };
      this.setState({ userRegion: region, viewRegion: region });
      //this.map.animateToRegion(region, 500);

    });
  };



  renderMarker = (marker, index) => {

    // console.log(this.state.location)

    const key = index + marker.geometry.coordinates[0];
    //console.log(marker)
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
    const { viewRegion, userRegion, poi } = this.state;
    const { COORDS, RADIUS } = this.props.issues

    const allCoords = COORDS.map(c => ({
      geometry: {
        coordinates: [c.lon, c.lat]
      }
    }));

    const cluster = getCluster(allCoords, viewRegion);
    return (
      <View style={{ paddingBottom: this.state.hackHeight, flex: 1 }}>
        <MapView
          style={Style.map}
          showsMyLocationButton={true}
          showsUserLocation={true}
          provider={MapView.PROVIDER_GOOGLE}
          loadingIndicatorColor={"#ffbbbb"}
          loadingBackgroundColor={"#ffbbbb"}
          region={viewRegion}
          onRegionChangeComplete={viewRegion => this.setState({ viewRegion })}
        >

          {userRegion &&
            <Circle
              center={userRegion}
              radius={RADIUS}
              fillColor="rgba(163, 48, 87, 0.5)"
            />
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

const mapStateToProp = (state) => {
  return {
    issues: state.issues,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProp, mapDispatchToProps)(MapScreen)