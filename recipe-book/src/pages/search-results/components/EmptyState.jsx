import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  searchQuery, 
  hasFilters, 
  onClearFilters, 
  onClearSearch,
  className = "" 
}) => {
  const suggestions = [
    "Try different keywords",
    "Check your spelling",
    "Use more general terms",
    "Remove some filters",
    "Browse by cuisine type"
  ];

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Search" size={32} className="text-muted-foreground" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
          No recipes found
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          {searchQuery 
            ? `We couldn't find any recipes matching "${searchQuery}"`
            : "No recipes match your current filters"
          }
        </p>

        {/* Suggestions */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h4 className="font-body font-medium text-card-foreground mb-3">
            Try these suggestions:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {suggestions?.map((suggestion, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Icon name="ChevronRight" size={12} />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {searchQuery && (
            <Button
              variant="outline"
              onClick={onClearSearch}
              className="flex items-center space-x-2"
            >
              <Icon name="X" size={16} />
              <span>Clear Search</span>
            </Button>
          )}
          
          {hasFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex items-center space-x-2"
            >
              <Icon name="Filter" size={16} />
              <span>Clear Filters</span>
            </Button>
          )}

          <Link to="/add-recipe">
            <Button
              variant="default"
              className="flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Add New Recipe</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;