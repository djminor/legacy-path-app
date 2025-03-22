import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Import CheckBox component
import { useChecklist } from '@/context/ChecklistContext'; // Import the ChecklistContext

interface ChecklistViewProps {
  onCategorySelect: (category: string) => void;
}

export default function ChecklistView({ onCategorySelect }: ChecklistViewProps) {
  const { checklists } = useChecklist(); // Access checklists from context
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({}); // Track checked items

  const categories = Object.keys(checklists).map((key, index) => ({
    id: index.toString(),
    title: key,
  }));

  const toggleCheckbox = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item], // Toggle the checkbox state
    }));
  };

  return (
    <View style={styles.container}>
      {/* Horizontal Category List */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === item.title && styles.selectedCategoryItem,
            ]}
            onPress={() => {
              setSelectedCategory(item.title);
              onCategorySelect(item.title);
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.title && styles.selectedCategoryText,
              ]}
            >
              {item.title || "Unknown Category"} {/* Fallback for invalid values */}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* Checklist for Selected Category */}
      {selectedCategory && (
        <View style={styles.checklistContainer}>
          <Text style={styles.checklistTitle}>{selectedCategory}</Text>
          {checklists[selectedCategory]?.map((item, index) => (
            <View key={index} style={styles.checklistItem}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  checkedItems[item] && styles.checkedCheckbox, // Apply a different style if checked
                ]}
                onPress={() => toggleCheckbox(item)}
              />
              <Text style={styles.checklistText}>
                {item || "Unknown Item"} {/* Fallback for invalid values */}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 115,
    backgroundColor: '#505C57',
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  selectedCategoryItem: {
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedCategoryText: {
    color: '#505C57',
  },
  checklistContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
  },
  checklistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checklistItem: {
    flexDirection: 'row', // Align checkbox and text horizontally
    alignItems: 'center', // Center items vertically
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  checklistText: {
    fontSize: 16,
    marginLeft: 10, // Add spacing between checkbox and text
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#505C57',
  },
});