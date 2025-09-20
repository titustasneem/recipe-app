import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search recipes...", 
  className = "",
  expanded = false,
  onExpandChange,
  initialValue = ""
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Mock suggestions - in real app, these would come from API
  const mockSuggestions = [
    'Chocolate chip cookies',
    'Chicken curry',
    'Pasta carbonara',
    'Vegetarian lasagna',
    'Banana bread',
    'Caesar salad',
    'Beef stir fry',
    'Lemon cake'
  ];

  useEffect(() => {
    if (isExpanded && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef?.current && !containerRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);

    if (value?.trim()) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      onSearch?.(query?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch?.(suggestion);
    setShowSuggestions(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    onExpandChange?.(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setQuery('');
    setShowSuggestions(false);
    onExpandChange?.(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef?.current?.focus();
  };

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleExpand}
        className={`text-muted-foreground hover:text-foreground ${className}`}
      >
        <Icon name="Search" size={16} />
      </Button>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => query && setShowSuggestions(true)}
            className="w-full px-3 py-2 pl-9 pr-9 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={12} />
            </Button>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCollapse}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={16} />
        </Button>
      </form>
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-soft-md z-50 animate-fade-in">
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 first:rounded-t-md last:rounded-b-md"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;