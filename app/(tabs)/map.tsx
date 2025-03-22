import React, { useState } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useMarkers } from '@/context/MarkersContext';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ChecklistView from '@/components/ChecklistView'; // Import the ChecklistView component

export default function MapScreen() {
  const { markers, toggleSaved } = useMarkers();

  // State to toggle between views
  const [isChecklistView, setChecklistView] = useState(false);

  return (
    <ThemedView style={styles.container}>
      {/* Banner */}
      <LinearGradient
        colors={['#A5C3B4', '#FFFFFF']} // Gradient from green to white
        start={{ x: 0, y: 0 }} // Top of the banner
        end={{ x: 0, y: 1 }} // Bottom of the banner
        style={styles.banner}
      >
        <Text style={styles.bannerText}>Map</Text>
        <TouchableOpacity
          style={styles.checkboxButton}
          onPress={() => setChecklistView(!isChecklistView)}
        >
          <MaterialIcons
            name={isChecklistView ? 'view-module' : 'check-box'}
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </LinearGradient>

      {/* Conditional Rendering */}
      {isChecklistView ? (
        <ChecklistView
          category={null} // Pass any relevant props if needed
          onCategorySelect={(category: any) => console.log(`Selected category: ${category}`)}
        />
      ) : (
        <ThemedView style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 40.235642,
              longitude: -111.662603,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                pinColor={marker.pinColor}
              >
                <Callout tooltip style={styles.calloutContainer}>
                  <ThemedView style={styles.callout}>
                    <Text>
                      <Text style={styles.boldText}>Name: </Text>
                      <ThemedText>{marker.title}</ThemedText>
                    </Text>
                    <Text>
                      <Text style={styles.boldText}>Hours of Operation: </Text>
                      <ThemedText>{marker.description.split('\n')[0]}</ThemedText>
                    </Text>
                    <Text>
                      <Text style={styles.boldText}>Phone: </Text>
                      <ThemedText>{marker.description.split('\n')[1]}</ThemedText>
                    </Text>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => {
                        console.log('Button pressed');
                        toggleSaved(index);
                      }}
                    >
                      <MaterialIcons
                        name={marker.saved ? 'bookmark' : 'bookmark-border'}
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </ThemedView>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <Image
            source={require('@/assets/images/lp-logo.png')}
            style={styles.lpLogo}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space between the text and the button
    paddingHorizontal: 20,
    paddingVertical: 20, // Adjust padding for better spacing
    marginTop: 0, // Keep the banner at the top of the view
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10, // Optional: Add rounded corners
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50, // Move the text lower within the banner
  },
  checkboxButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    marginTop: 50, // Move the button lower within the banner
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  lpLogo: {
    position: 'absolute',
    top: 30,
    left: 0,
    height: 125,
    width: 125,
  },
  calloutContainer: {
    backgroundColor: 'transparent',
  },
  callout: {
    width: 200,
    height: 150,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 10,
    alignItems: 'center',
  },
});