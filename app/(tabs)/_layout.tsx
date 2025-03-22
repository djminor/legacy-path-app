import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Modal, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableWithoutFeedback } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Active label color
          tabBarInactiveTintColor: '#FFFFFF', // Inactive label color (white)
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12, // Adjust font size if needed
            fontWeight: 'bold',
          },
          tabBarIconStyle: {
            marginBottom: 7, // Moves the icons up slightly
          },
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              height: 100, // Increased height to accommodate the button
              backgroundColor: '#A5C3B4', // Light green color
              paddingTop: 25, // Add padding to move the icons further down
            },
            default: {
              height: 100, // Increased height for other platforms
              backgroundColor: '#A5C3B4', // Light green color
              paddingTop: 40, // Add padding to move the icons further down
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: () => <IconSymbol size={38} name="house" color="#FFFFFF" />, // White icon
            tabBarItemStyle: {
              marginHorizontal: 20,
            },
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: () => <IconSymbol size={38} name="map" color="#FFFFFF" />, // White icon
            tabBarItemStyle: {
              marginRight: 50,
            },
          }}
        />
        <Tabs.Screen
          name="documents"
          options={{
            title: 'Docs',
            tabBarIcon: () => <IconSymbol size={38} name="document" color="#FFFFFF" />, // White icon
            tabBarItemStyle: {
              marginLeft: 30,
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: () => <IconSymbol size={38} name="person" color="#FFFFFF" />, // White icon
            tabBarItemStyle: {
              marginHorizontal: 20,
            },
          }}
        />
      </Tabs>

      {/* Custom Plus Button */}
      <TouchableOpacity style={styles.plusButton} onPress={toggleMenu}>
        <IconSymbol size={28} name="plus" color="#A5C3B4" />
      </TouchableOpacity>

      {/* Popout Menu */}
      <Modal
        transparent={true}
        visible={isMenuVisible}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.popoutMenu}>
              <Text style={styles.menuItem} onPress={toggleMenu}>
                Option 1
              </Text>
              <Text style={styles.menuItem} onPress={toggleMenu}>
                Option 2
              </Text>
              <Text style={styles.menuItem} onPress={toggleMenu}>
                Option 3
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingBottom: 120, 
    alignItems: 'center',
  },
  popoutMenu: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 18,
    marginTop: 20,
    padding: 20,
    color: '#FFF',
  },
});
