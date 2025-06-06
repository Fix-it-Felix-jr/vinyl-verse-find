
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  selectedConditions: string[];
  setSelectedConditions: (conditions: string[]) => void;
  selectedDecades: string[];
  setSelectedDecades: (decades: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  categoryFilter: 'all' | 'flea' | 'premium';
  setCategoryFilter: (filter: 'all' | 'flea' | 'premium') => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedDecades, setSelectedDecades] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'flea' | 'premium'>('all');

  return (
    <FilterContext.Provider value={{
      selectedGenres,
      setSelectedGenres,
      selectedConditions,
      setSelectedConditions,
      selectedDecades,
      setSelectedDecades,
      priceRange,
      setPriceRange,
      categoryFilter,
      setCategoryFilter
    }}>
      {children}
    </FilterContext.Provider>
  );
};
