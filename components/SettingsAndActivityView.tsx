import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface SettingsAndActivityViewProps {
  settings: { id: string; title: string }[];
  onBack: () => void; // Callback for going back
}

export default function SettingsAndActivityView({
  settings,
  onBack,
}: SettingsAndActivityViewProps) {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Settings & Activity</Text>
      {settings.map((setting) => (
        <TouchableOpacity
          key={setting.id}
          style={styles.settingButton}
          onPress={() => console.log(`Navigating to ${setting.title}`)} // Replace with navigation logic if needed
        >
          <Text style={styles.settingText}>{setting.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back to Profile</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#505C57',
  },
  settingButton: {
    padding: 15,
    backgroundColor: '#A5C3B4',
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
    height: 50,
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#505C57',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});