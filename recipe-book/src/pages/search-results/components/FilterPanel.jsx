import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onToggle,
  className = "" 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const cuisineOptions = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'asian', label: 'Asian' },
    { value: 'american', label: 'American' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'indian', label: 'Indian' },
    { value: 'french', label: 'French' }
  ];

  const cookingTimeOptions = [
    { value: 'all', label: 'Any Time' },
    { value: '0-15', label: 'Under 15 min' },
    { value: '15-30', label: '15-30 min' },
    { value: '30-60', label: '30-60 min' },
    { value: '60+', label: 'Over 1 hour' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const dietaryRestrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'keto', label: 'Keto' },
    { id: 'low-carb', label: 'Low Carb' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'whole30', label: 'Whole30' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleDietaryChange = (restrictionId, checked) => {
    const currentRestrictions = localFilters?.dietary || [];
    const updatedRestrictions = checked
      ? [...currentRestrictions, restrictionId]
      : currentRestrictions?.filter(id => id !== restrictionId);
    
    handleFilterChange('dietary', updatedRestrictions);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      cuisine: 'all',
      cookingTime: 'all',
      difficulty: 'all',
      dietary: []
    };
    setLocalFilters(clearedFilters);
    onClearFilters(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.cuisine && localFilters?.cuisine !== 'all') count++;
    if (localFilters?.cookingTime && localFilters?.cookingTime !== 'all') count++;
    if (localFilters?.difficulty && localFilters?.difficulty !== 'all') count++;
    if (localFilters?.dietary && localFilters?.dietary?.length > 0) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`${className} ${isOpen ? 'block' : 'hidden'} md:block bg-card border border-border rounded-lg p-4 space-y-6`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            Filters
          </h3>
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Cuisine Filter */}
        <div className="space-y-2">
          <Select
            label="Cuisine Type"
            options={cuisineOptions}
            value={localFilters?.cuisine || 'all'}
            onChange={(value) => handleFilterChange('cuisine', value)}
            className="w-full"
          />
        </div>

        {/* Cooking Time Filter */}
        <div className="space-y-2">
          <Select
            label="Cooking Time"
            options={cookingTimeOptions}
            value={localFilters?.cookingTime || 'all'}
            onChange={(value) => handleFilterChange('cookingTime', value)}
            className="w-full"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={localFilters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
            className="w-full"
          />
        </div>

        {/* Dietary Restrictions */}
        <div className="space-y-3">
          <label className="text-sm font-body font-medium text-card-foreground">
            Dietary Restrictions
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dietaryRestrictions?.map((restriction) => (
              <Checkbox
                key={restriction?.id}
                label={restriction?.label}
                checked={(localFilters?.dietary || [])?.includes(restriction?.id)}
                onChange={(e) => handleDietaryChange(restriction?.id, e?.target?.checked)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Mobile Close Button */}
        <div className="md:hidden pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onToggle}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;