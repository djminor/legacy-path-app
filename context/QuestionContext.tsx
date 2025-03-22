import React, { createContext, useContext, ReactNode } from 'react';

// Define the structure of a single question
export interface Question {
  id: number;
  checklist?: boolean;
  title?: string;
  question?: string; 
  options: string[];
}

// Define the context value type
interface QuestionContextType {
  questionsForMyLegacy: Question[];
  questionsForTheirLegacy: Question[];
}

// Create the context with a default value of `null`
export const QuestionContext = createContext<QuestionContextType | null>(null);

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const questionsForMyLegacy: Question[] = [
    {
      id: 1,
      options: ['Plan My Legacy', 'Plan Their Legacy'],
    },
    {
      id: 2,
      title: 'Plan My Legacy',
      checklist: false,
      question: 'To provide you with the most helpful guidance, we personalize your experience based on your responses. Whether you are planning for yourself or a loved one, we\'ll create a tailored checklist to make this process as smooth as possible.',
      options: ['Continue'],
    },
    {
      id: 3,
      title: 'Plan My Legacy',
      checklist: true,
      question: 'Have you made any end-of-life arrangements? (Select all that apply)',
      options: ['Selected a burial or cremation option', 'Chosen a mortuary', 'Created a will or other legal documents', 'Discusses wishes with family', 'Purchased a pre-paid funeral plan', 'None of the above'],
    },
    {
      id: 4,
      title: 'Plan My Legacy',
      checklist: false,
      question: 'Would you like to designate someone to handle your arrangements?',
      options: ['Yes', 'No'],
    },
    {
      id: 5,
      title: 'Plan My Legacy',
      checklist: false,
      question: 'Do you want to include personal messages or letters to loved ones in your plan?',
      options: ['Yes', 'No'],
    },
    {
      id: 6,
      title: 'Plan My Legacy',
      checklist: false,
      question: 'Would you like to set up a digital legacy plan? (Managing social media, passwords, and digital assets after passing)',
      options: ['Yes', 'No'],
    },
    {
      id: 7,
      title: 'Plan My Legacy',
      checklist: false,
      question: 'Do you have specific wishes for your memorial or celebration of life?',
      options: ['Yes', 'No'],
    },
  ];

  const questionsForTheirLegacy: Question[] = [
    {
      id: 1,
      checklist: false,
      options: ['Plan My Legacy', 'Plan Their Legacy'],
    },
    {
      id: 2,
      title: 'Plan Their Legacy',
      checklist: false,
      question: 'To provide you with the most helpful guidance, we personalize your experience based on your responses. Whether you are planning for yourself or a loved one, we\'ll create a tailored checklist to make this process as smooth as possible.',
      options: ['Continue'],
    },
    {
      id: 3,
      title: 'Plan Their Legacy',
      checklist: false,
      question: 'Has your loved one already passed away?',
      options: ['Yes', 'No', 'Just preparing'],
    },
    {
      id: 4,
      title: 'Plan Their Legacy',
      checklist: true,
      question: 'What steps have you already taken?',
      options: ['Picked a mortuary', 'Chosen a burial place','Obtained legal documents (will, power of attorney, etc.', 'Planned a funeral or memorial', 'None of the above'],
    },
    {
      id: 5,
      title: 'Plan Their Legacy',
      checklist: true,
      question: 'Do you need help with any of the following? (Select all that apply)',
      options: ['Arranging a funeral service', 'Writing an obituary', 'Financial planning for funeral costs', 'Notifying family and friends'],
    },
    {
      id: 6,
      title: 'Plan Their Legacy',
      checklist: false,
      question: 'Would you like additional guidance on cultural or religious traditions for end-of-life planning?',
      options: ['Yes', 'No'],
    },
  ];

  return (
    <QuestionContext.Provider value={{ questionsForMyLegacy, questionsForTheirLegacy }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionProvider');
  }
  return context;
};