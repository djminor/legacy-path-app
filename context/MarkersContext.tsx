import React, { createContext, useState, useContext } from 'react';
import markersData from '@/markersData';

import { ReactNode } from 'react';

interface Marker {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  pinColor: string;
  saved: boolean;
}

interface MarkersContextType {
  markers: Marker[];
  toggleSaved: (index: number) => void;
}

const MarkersContext = createContext<MarkersContextType>({
  markers: [],
  toggleSaved: () => {},
});

interface MarkersProviderProps {
  children: ReactNode;
}

export const MarkersProvider = ({ children }: MarkersProviderProps) => {
  const [markers, setMarkers] = useState(markersData);

  const toggleSaved = (index: number) => {
    console.log('toggleSaved called');
    const newMarkers = [...markers];
    newMarkers[index].saved = !newMarkers[index].saved;
    setMarkers(newMarkers);
    console.log(newMarkers)
  };

  return (
    <MarkersContext.Provider value={{ markers, toggleSaved }}>
      {children}
    </MarkersContext.Provider>
  );
};

export const useMarkers = () => useContext(MarkersContext);