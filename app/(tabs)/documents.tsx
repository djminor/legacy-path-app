import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, FlatList, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import files from '@/fileData';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import ChecklistView from '@/components/ChecklistView'; // Import the ChecklistView component

export default function DocumentsScreen() {
  const navigation = useNavigation();

  // State to toggle between views
  const [isChecklistView, setChecklistView] = useState(false);

  // Prepend a special item for the plus button
  const data = [...files];

  return (
    <ThemedView style={styles.container}>
      {/* Banner */}
      <LinearGradient
        colors={['#A5C3B4', '#FFFFFF']} // Gradient from green to white
        start={{ x: 0, y: 0 }} // Top of the banner
        end={{ x: 0, y: 1 }} // Bottom of the banner
        style={styles.banner}
      >
        <Text style={styles.bannerText}>Documents</Text>
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
        <ThemedView style={styles.container}>
          <Image
            source={require('@/assets/images/lp-logo.png')}
            style={styles.lpLogo}
          />
          {files.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.widget}>
                  <ThemedText style={styles.boldText}>{item.title}</ThemedText>
                  <ThemedText>{item.filename}</ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.gridContainer}
            />
          ) : (
            <ThemedText style={styles.noMarkersText}>No saved items</ThemedText>
          )}
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
  lpLogo: {
    position: 'absolute',
    top: 80,
    left: -15,
    height: 425,
    width: 425,
  },
  gridContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    top: 100,
    left: 25,
  },
  widget: {
    width: 150,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, // For Android shadow
  },
  boldText: {
    fontWeight: 'bold',
  },
  noMarkersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});