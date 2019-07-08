import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../components/MapUtils";
import IssueDetails from "../components/IssueDetails";
import OnMapMessage from "../components/OnMapMessage";
import Header from "../components/Header";
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import Loader from '../components/Loader'
import { getLocation, setPOIlocation } from '../redux/actions/locationActions'
import { getIssues, setMarker, } from '../redux/actions/issuesActions'
import Colors from '../constants/Colors';
import { markerImages } from '../constants/Issues';

const { width, height } = Dimensions.get('window');


class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    const { INITIAL_POSITION } = this.props.issues

    this.state = {
      viewRegion: INITIAL_POSITION,
      hackHeight: height,
      showMessage: true,
      poi: null
    };
    this.showsMyLocationButtonWorkaroudFix = this.showsMyLocationButtonWorkaroudFix.bind(this)
    this.mapLongClick = this.mapLongClick.bind(this)
  }

  componentDidMount() {

    // this.props.getIssues()
  }


  //work around for locate user button bug
  showsMyLocationButtonWorkaroudFix() {
    setTimeout(() => this.setState({ hackHeight: height + 1 }), 1500);
    setTimeout(() => this.setState({ hackHeight: height - 1 }), 2000);
  }

  markerClick(marker) {
    console.log(marker)
    this.props.setMarker(marker)
  }
  poiClick(poi) {
    console.log('poi :', poi);
    const { navigate } = this.props.navigation;

    this.props.setPOIlocation(poi.coordinate)
    navigate('ReportIssue')
  }
  mapLongClick(e) {
    console.log(e.nativeEvent)
    const poi = e.nativeEvent;
    this.setState({ poi });
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
        style={{
          width: 100,
          height: 100,
        }}
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
            <Text style={Style.makerTitle}>
              {marker.category}</Text>
            <Text style={Style.makerText}> {marker.description}</Text>
          </View>
        </Callout>
      </MapView.Marker>
    );
  };

  render() {
    const { viewRegion, poi } = this.state;
    const { RADIUS, ISSUES, MARKER, ISSUES_LOADING, ERR } = this.props.issues
    const { USER_POSITION } = this.props.location

    const allCoords = ISSUES.map(issue => ({
      geometry: {
        coordinates: [issue.location.longitude, issue.location.latitude],
      },
      category: issue.category,
      description: issue.description,
      imageUrls: issue.imageUrls,
      id: issue.id
    }));
    const cluster = getCluster(allCoords, viewRegion);

    if (MARKER) return (<IssueDetails marker={MARKER} />)
    return (
      <View style={Style.mapViewContainer} >
        {/* {ISSUES_LOADING ? < Loader message="Loading Issues" /> : */}
        <View style={{ paddingBottom: this.state.hackHeight, flex: 1 }}>
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
            showsBuildings={true}
            onLongPress={this.mapLongClick}
            onPress={() => this.setState({ poi: null })}
            onRegionChangeComplete={viewRegion => this.setState({ viewRegion })}
          >

            {MARKER && <IssueDetails marker={MARKER} />}
            {USER_POSITION &&
              <Circle
                center={USER_POSITION}
                radius={RADIUS}
                fillColor={Colors.radius}
              />
            }
            {poi && (
              <Marker coordinate={poi.coordinate}
              >
                <Callout
                  //onPress={() => navigate('ReportIssue')}
                  onPress={() => this.poiClick(poi)}
                >
                  <View>
                    <Text>Add Issue Here</Text>
                    {/* <Text>Name: {this.state.poi.name}</Text> */}
                  </View>
                </Callout>
              </Marker>
            )}

            {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
          </MapView>
          {ERR && <OnMapMessage message={ERR} />}
        </View>
        {/* } */}
      </View >
    );

  }
}
MapScreen.navigationOptions = {
  //title: 'Issues Map',
  header: null
  // header: <Header message={"test"} />

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
  makerTitle: {
    fontSize: 12,
    color: Colors.secondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  mapViewContainer: {
    marginTop: 20
  },
  makerText: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
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
    setPOIlocation: (region) => dispatch(setPOIlocation(region)),
    setMarker: (marker) => dispatch(setMarker(marker)),
    getIssues: () => dispatch(getIssues())

  }
}
export default connect(mapStateToProp, mapDispatchToProps)(MapScreen)