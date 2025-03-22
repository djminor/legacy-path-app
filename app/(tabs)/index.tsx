import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, FlatList, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMarkers } from '@/context/MarkersContext';
import { useQuestions, Question } from '@/context/QuestionContext'; // Import QuestionContext and Question type
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ChecklistView from '@/components/ChecklistView';
import Questionnaire from '@/components/Questionnaire';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { markers } = useMarkers();
  const { questionsForMyLegacy, questionsForTheirLegacy } = useQuestions(); // Access questions from context
  const savedMarkers = markers.filter(marker => marker.saved);

  // State to toggle between views
  const [isChecklistView, setChecklistView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // State to track questionnaire completion and checklist data
  const [isQuestionnaireComplete, setQuestionnaireComplete] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<Question[] | null>(null);

  const handleQuestionnaireComplete = (responses: any) => {
    // Determine which checklist to use based on the first response
    if (responses[1] === 'Plan My Legacy') {
      setSelectedChecklist(questionsForMyLegacy);
    } else if (responses[1] === 'Plan Their Legacy') {
      setSelectedChecklist(questionsForTheirLegacy);
    }
    setQuestionnaireComplete(true); // Mark the questionnaire as complete
  };

  return (
    <ThemedView style={styles.container}>
      {!isQuestionnaireComplete ? (
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      ) : (
        <>
          {/* Banner with Gradient */}
          <LinearGradient
            colors={['#A5C3B4', '#FFFFFF']} // Gradient from green to white
            start={{ x: 0, y: 0 }} // Top of the banner
            end={{ x: 0, y: 1 }} // Bottom of the banner
            style={styles.banner}
          >
            <Text style={styles.bannerText}>Home</Text>
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
              onCategorySelect={(category: string) => setSelectedCategory(category)}
              checklists={
                selectedChecklist
                  ? { checklist: selectedChecklist.map(question => question.question).filter((q): q is string => q !== undefined) }
                  : {}
              } // Transform selectedChecklist to the required format
            />
          ) : (
            <ThemedView style={styles.container}>
              <Image
                source={require('@/assets/images/lp-logo.png')}
                style={styles.lpLogo}
              />
              {savedMarkers.length > 0 ? (
                <FlatList
                  data={savedMarkers}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.widget}>
                      <ThemedText style={styles.boldText}>{item.title}</ThemedText>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.gridContainer}
                />
              ) : (
                <ThemedText style={styles.noMarkersText}>No saved items</ThemedText>
              )}
            </ThemedView>
          )}
        </>
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
    elevation: 5,
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