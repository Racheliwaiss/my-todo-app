import { useState, useCallback } from 'react';

export const useFilter = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const updateFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const updateSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const updateCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const clearFilters = useCallback(() => {
    setFilter('all');
    setSearchTerm('');
    setSelectedCategory('all');
  }, []);

  return {
    filter,
    searchTerm,
    selectedCategory,
    updateFilter,
    updateSearch,
    updateCategory,
    clearFilters,
  };
};
