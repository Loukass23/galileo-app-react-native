import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapClustering from '../components/MapClustering'
import Camera from '../components/Camera'

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
    <MapClustering/>
    
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
