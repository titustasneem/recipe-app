import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  resultCount, 
  onClearSearch, 
  className = "" 
}) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Search" size={20} className="text-muted-foreground" />
            <h1 className="font-heading font-semibold text-xl text-card-foreground">
              Search Results
            </h1>
          </div>
          
          {searchQuery ? (
            <div className="flex items-center space-x-2">
              <p className="text-muted-foreground">
                {resultCount} {resultCount === 1 ? 'recipe' : 'recipes'} found for
              </p>
              <span className="font-body font-medium text-foreground bg-muted px-2 py-1 rounded-md">
                "{searchQuery}"
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSearch}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">
              {resultCount} {resultCount === 1 ? 'recipe' : 'recipes'} in your collection
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;