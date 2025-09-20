import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  onFilterChange, 
  onSortChange, 
  activeFilters = {}, 
  className = "" 
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const mealTypeOptions = [
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snacks' },
    { value: 'dessert', label: 'Desserts' }
  ];

  const cuisineOptions = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'asian', label: 'Asian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'indian', label: 'Indian' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const cookTimeOptions = [
    { value: 'all', label: 'Any Time' },
    { value: '15', label: 'Under 15 min' },
    { value: '30', label: 'Under 30 min' },
    { value: '60', label: 'Under 1 hour' },
    { value: '60+', label: 'Over 1 hour' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'alphabetical', label: 'A to Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'cookTime', label: 'Cook Time' },
    { value: 'difficulty', label: 'Difficulty' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange?.({ ...activeFilters, [filterType]: value });
  };

  const clearAllFilters = () => {
    onFilterChange?.({
      mealType: 'all',
      cuisine: 'all',
      difficulty: 'all',
      cookTime: 'all'
    });
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value && value !== 'all');

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <Select
            options={mealTypeOptions}
            value={activeFilters?.mealType || 'all'}
            onChange={(value) => handleFilterChange('mealType', value)}
            placeholder="Meal Type"
            className="min-w-32"
          />
          
          <Select
            options={cuisineOptions}
            value={activeFilters?.cuisine || 'all'}
            onChange={(value) => handleFilterChange('cuisine', value)}
            placeholder="Cuisine"
            className="min-w-32"
          />
          
          <Select
            options={difficultyOptions}
            value={activeFilters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
            placeholder="Difficulty"
            className="min-w-32"
          />
          
          <Select
            options={cookTimeOptions}
            value={activeFilters?.cookTime || 'all'}
            onChange={(value) => handleFilterChange('cookTime', value)}
            placeholder="Cook Time"
            className="min-w-32"
          />

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} className="mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            options={sortOptions}
            value={activeFilters?.sort || 'recent'}
            onChange={(value) => onSortChange?.(value)}
            className="min-w-40"
          />
        </div>
      </div>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center space-x-2"
        >
          <Icon name="Filter" size={16} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary rounded-full"></span>
          )}
        </Button>

        <Select
          options={sortOptions}
          value={activeFilters?.sort || 'recent'}
          onChange={(value) => onSortChange?.(value)}
          className="min-w-40"
        />
      </div>
      {/* Mobile Filters Panel */}
      {showMobileFilters && (
        <div className="md:hidden mt-4 pt-4 border-t border-border space-y-3">
          <Select
            options={mealTypeOptions}
            value={activeFilters?.mealType || 'all'}
            onChange={(value) => handleFilterChange('mealType', value)}
            placeholder="Meal Type"
          />
          
          <Select
            options={cuisineOptions}
            value={activeFilters?.cuisine || 'all'}
            onChange={(value) => handleFilterChange('cuisine', value)}
            placeholder="Cuisine"
          />
          
          <Select
            options={difficultyOptions}
            value={activeFilters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
            placeholder="Difficulty"
          />
          
          <Select
            options={cookTimeOptions}
            value={activeFilters?.cookTime || 'all'}
            onChange={(value) => handleFilterChange('cookTime', value)}
            placeholder="Cook Time"
          />

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} className="mr-1" />
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;