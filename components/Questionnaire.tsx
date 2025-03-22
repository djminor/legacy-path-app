import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Text, View, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useQuestions } from '@/context/QuestionContext';
import { LinearGradient } from 'expo-linear-gradient';

export interface QuestionnaireProps {
  onComplete: (responses: Record<string, string>) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const { questionsForMyLegacy, questionsForTheirLegacy } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string[] | string>>({});
  const [slideAnim] = useState(new Animated.Value(0)); // For sliding animation
  const [selectedQuestions, setSelectedQuestions] = useState(questionsForMyLegacy); // Default to "My Legacy"

  const handleOptionSelect = (option: string) => {
    setResponses({ ...responses, [selectedQuestions[currentQuestion].id]: option });

    // If the first question is answered, set the appropriate question array
    if (currentQuestion === 0) {
      if (option === 'Plan My Legacy') {
        setSelectedQuestions(questionsForMyLegacy);
      } else {
        setSelectedQuestions(questionsForTheirLegacy);
      }
    }

    // Slide out the current question
    Animated.timing(slideAnim, {
      toValue: -300, // Slide out to the left
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
      slideAnim.setValue(300); // Reset position for the next question

      // Slide in the next question
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      // Slide out the current question
      Animated.timing(slideAnim, {
        toValue: 300, // Slide out to the right
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Move to the previous question
        setCurrentQuestion(currentQuestion - 1);
        slideAnim.setValue(-300); // Reset position for the previous question

        // Slide in the previous question
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleChecklistToggle = (option: string) => {
    const questionId = selectedQuestions[currentQuestion].id;
    const currentResponses = responses[questionId] || [];
    const updatedResponses = currentResponses.includes(option)
      ? Array.isArray(currentResponses)
        ? currentResponses.filter((item: string) => item !== option)
        : []
      : [...currentResponses, option];
  
    setResponses({ ...responses, [questionId]: updatedResponses });
  };

  const handleContinue = () => {
    Animated.timing(slideAnim, {
      toValue: -300, // Slide out to the left
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentQuestion(currentQuestion + 1);
      slideAnim.setValue(300); // Reset position for the next question
  
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleComplete = () => {
    const transformedResponses = Object.fromEntries(
      Object.entries(responses).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(', ') : value,
      ])
    );
    onComplete(transformedResponses); // Pass transformed responses to the parent component
  };

  if (currentQuestion >= selectedQuestions.length) {
    return (
      <ThemedView style={styles.container}>
        <Image
          source={require('@/assets/images/lp-logo.png')}
          style={styles.lpLogo}
        />
        <ThemedText style={styles.congrats}>Thank you!</ThemedText>
        <ThemedText style={styles.subtitle}>Honoring Their Legacy, One Step at a Time.</ThemedText>
        <ThemedText style={styles.description}>
          Navigating this process can feel overwhelming, but you don't have to do it alone.
          We'll help guide you through the next steps to create a meaningful plan for your loved one.
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Start Planning</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/lp-logo.png')}
        style={styles.lpLogo}
      />
      <Animated.View
        style={[
          styles.questionContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* Render the title if it exists */}
        {selectedQuestions[currentQuestion].title && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {selectedQuestions[currentQuestion].title}
            </Text>
          </View>
        )}

        {/* Render the question */}
        <ThemedText style={styles.question}>
          {selectedQuestions[currentQuestion].question}
        </ThemedText>

        {/* Render the options */}
        {selectedQuestions[currentQuestion].checklist ? (
          // Render as a checklist
          selectedQuestions[currentQuestion].options.map((option: string, index: number) => (
            <View key={index} style={styles.checklistItem}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleChecklistToggle(option)}
              >
                <View
                  style={[
                    styles.checkboxInner,
                    responses[selectedQuestions[currentQuestion].id]?.includes(option) && styles.checkboxChecked,
                  ]}
                />
              </TouchableOpacity>
              <Text style={styles.checklistText}>{option}</Text>
            </View>
          ))
        ) : currentQuestion === 0 || currentQuestion === 1 ? (
          // Render as buttons for the first and second questions
          selectedQuestions[currentQuestion].options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.firstOption,
                responses[selectedQuestions[currentQuestion].id] === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.firstOptionText}>{option}</Text>
            </TouchableOpacity>
          ))
        ) : (
          // Render as text with a dot selector for subsequent questions
          selectedQuestions[currentQuestion].options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.dotSelectorItem}
              onPress={() => handleOptionSelect(option)}
            >
              <View
                style={[
                  styles.dotSelector,
                  responses[selectedQuestions[currentQuestion].id] === option && styles.dotSelectorSelected,
                ]}
              />
              <Text style={styles.dotSelectorText}>{option}</Text>
            </TouchableOpacity>
          ))
        )}
      </Animated.View>

      {/* Continue Arrow */}
      {currentQuestion > 1 && (<TouchableOpacity
        style={[
          styles.continueButton
        ]}
        onPress={handleContinue}
        disabled={
          !selectedQuestions[currentQuestion].checklist &&
          !responses[selectedQuestions[currentQuestion].id]
        } // Disable for non-checklist questions until an option is selected
      >
        <IconSymbol size={24} name="arrow.right" color="505C57" />
      </TouchableOpacity>
      )}

      {/* Dot Tracker */}
      <View style={styles.dotContainer}>
        {selectedQuestions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentQuestion === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Back Button */}
      {currentQuestion > 0 && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol size={24} name="arrow.left" color="#505C57" />
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  congrats: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    borderColor: '#505C57', // Dark green border color
    borderWidth: 2, // Set the border width
    borderRadius: 10, // Rounded corners
    padding: 10,
    height: 80, // Set a fixed height
    marginBottom: 50, // Spacing below the title
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22, // Larger font size
    fontWeight: 'bold',
    color: '#505C57', // White text color for contrast
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#505C57',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#707070',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: 'light',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    borderColor: '#505C57',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    height: 60,
    width: '80%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#505C57',
    fontWeight: 'bold',
  },
  lpLogo: {
    position: 'absolute',
    top: 30,
    left: 0,
    height: 125,
    width: 125,
  },
  button: {
    backgroundColor: '#505C57',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  dotContainer: {
    position: 'absolute', // Fix the position
    bottom: 165, // Adjust the distance from the bottom of the screen
    left: 0, // Center horizontally
    right: 0, // Center horizontally
    flexDirection: 'row',
    justifyContent: 'center', // Center the dots horizontally
    marginTop: 20, // Optional: Add spacing if needed
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#505C57',
  },
  backButton: {
    position: 'absolute', // Fix the position
    bottom: 150, // Adjust the distance from the bottom
    left: 40, // Adjust the distance from the left
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent', // Optional: Keep it transparent or styled as needed
  },
  firstOption: {
    borderColor: '#505C57', // Dark green border
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    height: 60,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstOptionText: {
    fontSize: 16,
    color: '#505C57', // Dark green text
    fontWeight: 'bold',
  },
  subsequentOption: {
    backgroundColor: '#505C57', // Dark green background
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    height: 50,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subsequentOptionText: {
    fontSize: 14,
    color: 'white', // White text
    fontWeight: 'bold',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '80%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#505C57',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#505C57', // Dark green when checked
  },
  checklistText: {
    fontSize: 16,
    color: '#505C57',
  },
  selectedOption: {
    backgroundColor: '#A5C3B4', // Light green background for selected option
  },
  continueButton: {
    position: 'absolute', // Fix the position
    bottom: 150, // Adjust the distance from the bottom
    right: 40, // Adjust the distance from the left
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent', // Optional: Keep it transparent or styled as needed
  },
  dotSelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '80%',
  },
  dotSelector: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#505C57',
    marginRight: 10,
  },
  dotSelectorSelected: {
    backgroundColor: '#505C57',
  },
  dotSelectorText: {
    fontSize: 16,
    color: '#505C57',
  },
});