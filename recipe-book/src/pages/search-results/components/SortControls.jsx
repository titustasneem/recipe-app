import React from 'react';
import Select from '../../../components/ui/Select';


const SortControls = ({ sortBy, sortOrder, onSortChange, className = "" }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date', label: 'Date Added' },
    { value: 'cookTime', label: 'Cooking Time' },
    { value: 'rating', label: 'Rating' },
    { value: 'title', label: 'Recipe Name' }
  ];

  const orderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' }
  ];

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="flex-1">
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={(value) => onSortChange(value, sortOrder)}
          className="w-full"
        />
      </div>
      <div className="flex-1">
        <Select
          label="Order"
          options={orderOptions}
          value={sortOrder}
          onChange={(value) => onSortChange(sortBy, value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SortControls;