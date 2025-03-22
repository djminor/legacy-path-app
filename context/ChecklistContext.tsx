import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChecklistContextProps {
  checklists: { [key: string]: string[] }; // Categories and their items
  setChecklists: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

const ChecklistContext = createContext<ChecklistContextProps | undefined>(undefined);

export const ChecklistProvider = ({ children }: { children: ReactNode }) => {
  const [checklists, setChecklists] = useState<{ [key: string]: string[] }>({
    "Immediate Steps": ["Obtain legal pronouncement of death (from doctor or medical examiner).", "Notify family & close friends", "Arrange for body transportation (hospital, nursing home, etc.).", "Locate any pre-arranged funeral plans or wills.", "Contact a funeral home or mortuary."],
    "Funeral Planning": ["Choose burial or cremation.", "Choose a casket or urn.", "Select a cemetery, urn, or burial plot.", "Arrange for transpotation (such as a hearse).", "Plan funeral or memorial services (date, time, location).", "Write an obituary & submit it to newspapers.", "Pick flowers, music, and readings for the service."],
    "Financial & Legal": ["Obtain death certificates (Mutliple copies needed).", "Notify Social Security, banks, and insurance.", "Close or transfer bank accounts.", "Settle debts, credit cards, and loans.", "Notify employer (if applicable) and check benefits.", "Arrange for estate and will execution."],
  });

  return (
    <ChecklistContext.Provider value={{ checklists, setChecklists }}>
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklist = () => {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error('useChecklist must be used within a ChecklistProvider');
  }
  return context;
};