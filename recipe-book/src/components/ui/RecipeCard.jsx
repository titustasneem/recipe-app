import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../AppImage';
import Icon from '../AppIcon';
import Button from './Button';

const RecipeCard = ({ 
  recipe = {
    id: 1,
    title: "Classic Chocolate Chip Cookies",
    description: "Soft and chewy cookies with the perfect balance of sweetness",
    image: "/assets/images/recipe-placeholder.jpg",
    cookTime: "25 min",
    servings: 24,
    difficulty: "Easy",
    rating: 4.5,
    tags: ["Dessert", "Baking", "Family Favorite"]
  },
  className = "",
  onEdit,
  onDelete,
  onShare
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleEdit = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onEdit?.(recipe?.id);
  };

  const handleDelete = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onDelete?.(recipe?.id);
  };

  const handleShare = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onShare?.(recipe?.id);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={12} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div 
      className={`group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-soft-md ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowActions(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowActions(false);
      }}
    >
      <Link to={`/recipe-view?id=${recipe?.id}`} className="block">
        {/* Recipe Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe?.image}
            alt={recipe?.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Difficulty Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-caption font-medium bg-background/90 text-foreground rounded-full backdrop-blur-sm">
              {recipe?.difficulty}
            </span>
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-3 right-3 flex space-x-1 transition-all duration-300 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground backdrop-blur-sm"
            >
              <Icon name="Share2" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground backdrop-blur-sm"
            >
              <Icon name="Edit2" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 bg-background/90 hover:bg-destructive text-foreground hover:text-destructive-foreground backdrop-blur-sm"
            >
              <Icon name="Trash2" size={14} />
            </Button>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {recipe?.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {recipe?.description}
          </p>

          {/* Recipe Meta */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span className="font-mono">{recipe?.cookTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={12} />
                <span className="font-mono">{recipe?.servings}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-0.5">
                {renderStars(recipe?.rating)}
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-1">
                {recipe?.rating}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {recipe?.tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-caption bg-muted text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
            {recipe?.tags?.length > 3 && (
              <span className="px-2 py-1 text-xs font-caption bg-muted text-muted-foreground rounded-full">
                +{recipe?.tags?.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;