import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";
import IssueDetails from "../components/IssueDetails";
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import Loader from '../components/Loader'
import { getLocation } from '../redux/actions/locationActions'
import { getIssues, setMarker } from '../redux/actions/issuesActions'

const { width, height } = Dimensions.get('window');
const markerImages = {
  Trash: require('../assets/images/Marker1.png'),
  Road: require('../assets/images/Marker2.png'),
  Category3: require('../assets/images/Marker3.png'),
  Category4: require('../assets/images/Marker4.png'),
  Category5: require('../assets/images/Marker5.png'),

};

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    const { INITIAL_POSITION } = this.props.issues

    this.state = {
      viewRegion: INITIAL_POSITION,
      marker: null,
      loaded: false,
      hackHeight: height,
    };
    this.showsMyLocationButtonWorkaroudFix = this.showsMyLocationButtonWorkaroudFix.bind(this)
  }

  componentDidMount() {

    //redux location
    this.props.getLocation()

    const dummyRegion = {
      latitude: 1,
      longitude: 1

    }
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0THVjYXMiLCJyb2xlIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE1NjA4NjE3NDEsImlhdCI6MTU2MDg1ODE0MX0.-vAYsof4vn-uy-equ_avLSe2Gek3KdtUAEb8QhqXHxz-ukJ5gDGy7majly9WMi4lpdlt5D8lTwQk5dRWIhw55w"
    this.props.getIssues(5, dummyRegion, token)
    setTimeout(() => this.setState({ loaded: true }), 2000);
  }

  //work around for locate user button bug
  showsMyLocationButtonWorkaroudFix() {
    setTimeout(() => this.setState({ hackHeight: height + 1 }), 1500);
    setTimeout(() => this.setState({ hackHeight: height - 1 }), 2000);
  }


  markerClick(marker) {
    console.log(marker)
    this.props.setMarker(marker)
    this.setState({ LocButtonFix: true })
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
        image={markerImages[marker.category]}
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
    const { viewRegion, marker, loaded, LocButtonFix } = this.state;
    const { RADIUS, ISSUES, MARKER, ISSUES_LOADING } = this.props.issues
    const { USER_POSITION } = this.props.location

    //workaroud to fix locate me button


    const allCoords = ISSUES.map(issue => ({
      geometry: {
        coordinates: [issue.location.longitude, issue.location.latitude],
      },
      category: issue.category,
      description: issue.description,
      image: issue.imageUrls
    }));
    const cluster = getCluster(allCoords, viewRegion);

    if (MARKER) return (<IssueDetails marker={MARKER} />)
    return (
      <View style={{ paddingBottom: this.state.hackHeight, flex: 1 }}>
        {ISSUES_LOADING ? < Loader /> :
          <MapView
            ref={component => this._map = component}
            style={Style.map}
            onMapReady={this.showsMyLocationButtonWorkaroudFix}
            showsMyLocationButton={true}
            showsUserLocation={true}
            provider={MapView.PROVIDER_GOOGLE}
            loadingIndicatorColor={"#ffbbbb"}
            loadingBackgroundColor={"#ffbbbb"}
            region={viewRegion}
            onRegionChangeComplete={viewRegion => this.setState({ viewRegion })}
          >
            {MARKER && <IssueDetails marker={MARKER} />}
            {USER_POSITION &&
              <Circle
                center={USER_POSITION}
                radius={RADIUS}
                fillColor="rgba(163, 48, 87, 0.5)"
              />
            }
            {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
          </MapView>
        }
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
    setMarker: (marker) => dispatch(setMarker(marker)),
    getIssues: (radius, region, token) => dispatch(getIssues(radius, region, token))

  }
}
export default connect(mapStateToProp, mapDispatchToProps)(MapScreen)