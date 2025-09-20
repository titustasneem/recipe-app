import React from 'react';
import RecipeCard from '../../../components/ui/RecipeCard';

const RecipeGrid = ({ 
  recipes, 
  searchQuery, 
  onEdit, 
  onDelete, 
  onShare,
  className = "" 
}) => {
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-warning/30 text-warning-foreground px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const enhancedRecipes = recipes?.map(recipe => ({
    ...recipe,
    title: searchQuery ? highlightText(recipe?.title, searchQuery) : recipe?.title,
    description: searchQuery ? highlightText(recipe?.description, searchQuery) : recipe?.description
  }));

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {enhancedRecipes?.map((recipe) => (
        <RecipeCard
          key={recipe?.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
          className="h-full"
        />
      ))}
    </div>
  );
};

export default RecipeGrid;