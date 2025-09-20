import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecipeHero = ({ recipe, onEdit, onDelete, onShare, onPrint }) => {
  const [showActions, setShowActions] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg mb-8">
      <Image
        src={recipe?.image}
        alt={recipe?.title}
        className="w-full h-full object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {/* Recipe Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-3xl lg:text-5xl mb-4 leading-tight">
            {recipe?.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center space-x-1">
              {renderStars(recipe?.rating)}
              <span className="text-sm font-mono ml-2">{recipe?.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-mono">{recipe?.prepTime + recipe?.cookTime} min total</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span className="text-sm font-mono">{recipe?.servings} servings</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="BarChart3" size={16} />
              <span className="text-sm font-mono">{recipe?.difficulty}</span>
            </div>
          </div>
          
          <p className="text-lg opacity-90 max-w-2xl">
            {recipe?.description}
          </p>
        </div>
      </div>
      {/* Floating Action Menu */}
      <div className="absolute top-6 right-6">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
            className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-foreground backdrop-blur-sm rounded-full"
          >
            <Icon name="MoreVertical" size={20} />
          </Button>
          
          {showActions && (
            <div className="absolute top-12 right-0 bg-popover border border-border rounded-lg shadow-soft-lg p-2 min-w-[160px] z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="w-full justify-start text-left"
              >
                <Icon name="Edit2" size={16} className="mr-2" />
                Edit Recipe
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onShare}
                className="w-full justify-start text-left"
              >
                <Icon name="Share2" size={16} className="mr-2" />
                Share Recipe
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrint}
                className="w-full justify-start text-left"
              >
                <Icon name="Printer" size={16} className="mr-2" />
                Print Recipe
              </Button>
              <div className="border-t border-border my-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="w-full justify-start text-left text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Delete Recipe
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;