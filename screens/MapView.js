import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapClustering from '../components/MapClustering2'

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
    <MapClustering/>
    
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Maps',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
