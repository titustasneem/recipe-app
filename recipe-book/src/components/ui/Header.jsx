import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { label: 'My Recipes', path: '/recipe-dashboard', icon: 'BookOpen' },
    { label: 'Search', path: '/search-results', icon: 'Search' },
    { label: 'Add Recipe', path: '/add-recipe', icon: 'Plus' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Navigate to search results with query
      window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchCollapse = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link to="/recipe-dashboard" className="flex items-center space-x-2 mr-8">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="ChefHat" size={20} color="var(--color-primary-foreground)" />
          </div>
          <span className="font-heading font-semibold text-xl text-foreground">
            RecipeBook
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 flex-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 hover:bg-muted ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center ml-auto">
          {!isSearchExpanded ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSearchExpand}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Search" size={16} />
            </Button>
          ) : (
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 px-3 py-2 pl-9 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  autoFocus
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSearchCollapse}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </Button>
            </form>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden ml-auto"
          onClick={() => {
            // Toggle mobile menu logic would go here
          }}
        >
          <Icon name="Menu" size={20} />
        </Button>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md text-xs font-body font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;