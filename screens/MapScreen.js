import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import Loader from '../components/Loader'
import { getLocation } from '../redux/actions/locationActions'
import { getIssues } from '../redux/actions/issuesActions'

const { width, height } = Dimensions.get('window');

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    const { INITIAL_POSITION } = this.props.issues

    this.state = {
      viewRegion: INITIAL_POSITION,
      poi: null,
      loaded: false,
      hackHeight: height
    };
    this.onPoiClick = this.onPoiClick.bind(this);
    this._getLocationAsync = this._getLocationAsync.bind(this);

  }

  componentDidMount() {

    //this._getLocationAsync()

    //redux location
    this.props.getLocation()

    const dummyRegion = {
      latitude: 1,
      longitude: 1

    }
    this.props.getIssues(5, dummyRegion, "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0THVjYXMiLCJyb2xlIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE1NjA4MDAwNzYsImlhdCI6MTU2MDc5NjQ3Nn0.Lz8EfNDBJLxCf8qD-pgJ-U-KO90Drj7giIQ_oF9egM5wGnPquY4E5CVDMyZQAHanMJT-ObOmIZcCpVeKzemzmw")
    //work around for locate user button bug
    setTimeout(() => this.setState({ hackHeight: height + 1 }), 2500);
    setTimeout(() => this.setState({ hackHeight: height - 1 }), 3000);

    setTimeout(() => this.setState({ loaded: true }), 2000);
  }


  _getLocationAsync = async () => {
    // console.log('here')

    // let userRegion = await this.props.location.USER_POSITION
    // if (userRegion) console.log('userRegion', userRegion)


    //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //   if (status !== 'granted') {
    //     console.log('Permission to access location was denied')
    //   } else {
    //     console.log('Permission to access location was granted')
    //   }

    //   let location = await Location.getCurrentPositionAsync({})

    //   if (location) {

    //     const region = {
    //       latitude: location.coords.latitude,
    //       longitude: location.coords.longitude,
    //       latitudeDelta: 1,
    //       longitudeDelta: 1
    //     };

    //     this.setState({ userRegion: region });
    //     console.log(this.refs)
    //     //this.refs._map.animateToRegion(region, 500);
    //   }


  }

  onPoiClick = (e) => {

    const { coordinate } = e.nativeEvent;
    console.log(this.state.poi)
    this.setState({ poi: coordinate });
  }

  renderMarker = (marker, index) => {

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
    const { viewRegion, poi, loaded } = this.state;
    const { COORDS, RADIUS, ISSUES } = this.props.issues
    const { USER_POSITION } = this.props.location

    console.log('issues', ISSUES)


    const allCoords = COORDS.map(c => ({
      geometry: {
        coordinates: [c.lon, c.lat]
      }
    }));

    const cluster = getCluster(allCoords, viewRegion);
    return (
      <View style={{ paddingBottom: this.state.hackHeight, flex: 1 }}>

        {loaded ?
          <MapView
            ref={component => this._map = component}
            style={Style.map}
            showsMyLocationButton={true}
            showsUserLocation={true}
            provider={MapView.PROVIDER_GOOGLE}
            loadingIndicatorColor={"#ffbbbb"}
            loadingBackgroundColor={"#ffbbbb"}
            region={viewRegion}
            onRegionChangeComplete={viewRegion => this.setState({ viewRegion })}
          >

            {USER_POSITION &&
              <Circle
                center={USER_POSITION}
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
          : <Loader />}

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
    location: state.location

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: () => dispatch(getLocation()),
    getIssues: (radius, region, token) => dispatch(getIssues(radius, region, token))

  }
}
export default connect(mapStateToProp, mapDispatchToProps)(MapScreen)