import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";
import IssueDetails from "../components/IssueDetails";
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
      marker: null,
      loaded: false,
      hackHeight: height
    };
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
    //this.props.getIssues(5, dummyRegion, "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0THVjYXMiLCJyb2xlIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE1NjA4MTMzNTEsImlhdCI6MTU2MDgwOTc1MX0.N8JqK66jwGR7JAsGV532oqNuRY4w5Lm3oarZ4O_vOmArCVLq9YQsPWYzHNaT1XFyUsrQ_e8I1Xjb8GOx7NZGPQ")

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

  markerClick(marker) {
    console.log(marker)
    this.setState({ marker })
  }


  renderMarker = (marker, index) => {

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
      <MapView.Marker
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
        title={marker.category}
        description={marker.description}
      >

        <Callout
          onPress={() => this.markerClick(marker)}>

          <View >
            <Text>
              {marker.category}{"\n"}
              {marker.description}</Text>
          </View>

        </Callout>
      </MapView.Marker>
    );
  };

  render() {
    const { viewRegion, marker, loaded } = this.state;
    const { RADIUS, ISSUES } = this.props.issues
    const { USER_POSITION } = this.props.location

    const allCoords = ISSUES.map(issue => ({
      geometry: {
        coordinates: [issue.location.longitude, issue.location.latitude],
      },
      category: issue.category,
      description: issue.description,
      image: issue.imageUrls
    }));
    const cluster = getCluster(allCoords, viewRegion);

    if (marker) return (<IssueDetails marker={marker} />)
    else return (
      <View style={{ paddingBottom: this.state.hackHeight, flex: 1 }}>
        {loaded ? <MapView
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
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
        </MapView> :
          <Loader />}
      </View >
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
  calloutText: {

  },
  customView: {

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