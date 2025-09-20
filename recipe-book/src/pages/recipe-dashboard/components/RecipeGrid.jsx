import React from 'react';
import RecipeCard from '../../../components/ui/RecipeCard';

const RecipeGrid = ({ recipes, onEdit, onDelete, onShare, className = "" }) => {
  if (!recipes || recipes?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          No recipes found
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Start building your recipe collection by adding your first recipe.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {recipes?.map((recipe) => (
        <RecipeCard
          key={recipe?.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;