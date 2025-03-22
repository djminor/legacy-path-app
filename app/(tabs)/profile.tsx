import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import SettingsAndActivityView from '@/components/SettingsAndActivityView';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [showSettings, setShowSettings] = useState(false);

  const settings = [
    { id: '1', title: 'Profile - Manage Your Account' },
    { id: '2', title: 'Connect to FamilySearch' },
    { id: '3', title: 'Security & Privacy' },
    { id: '4', title: 'Help & FAQ\'s' },
    { id: '5', title: 'Contact Support' },
    { id: '6', title: 'Legal & Resources' },
    { id: '7', title: 'Notifications' },
    { id: '8', title: 'Settings' },
    { id: '9', title: 'Log Out' },
  ];

  return (
    <ThemedView style={styles.container}>
      {!showSettings ? (
        <>
          {/* Banner */}
          <LinearGradient
            colors={['#A5C3B4', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.banner}
          >
            <Text style={styles.bannerText}>Profile</Text>
            <TouchableOpacity style={styles.placeholderButton} onPress={() => setShowSettings(true)}>
              <MaterialIcons name="menu" size={28} color="black" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Profile Content */}
          <Image
            source={require('@/assets/images/lp-logo.png')}
            style={styles.lpLogo}
          />
        </>
      ) : (
        <SettingsAndActivityView
          settings={settings} // Pass the settings array
          onBack={() => setShowSettings(false)} // Handle going back
          onSettingSelect={(setting) => console.log(`Selected setting: ${setting}`)}
        />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
  },
  placeholderButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    top: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lpLogo: {
    position: 'absolute',
    top: 80,
    left: -15,
    height: 425,
    width: 425,
  },
  settingsButton: {
    marginTop: 300,
    padding: 15,
    backgroundColor: '#505C57',
    borderRadius: 10,
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
