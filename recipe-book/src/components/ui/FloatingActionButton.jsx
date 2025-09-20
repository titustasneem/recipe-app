import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingActionButton = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
      <Link to="/add-recipe">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-soft-lg hover:shadow-soft-lg transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon 
            name="Plus" 
            size={24} 
            className={`transition-transform duration-200 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </Button>
      </Link>
      
      {/* Tooltip */}
      <div className={`absolute bottom-full right-0 mb-2 px-3 py-1 bg-popover text-popover-foreground text-sm font-caption rounded-md shadow-soft whitespace-nowrap transition-all duration-200 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
        Add Recipe
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
      </div>
    </div>
  );
};

export default FloatingActionButton;