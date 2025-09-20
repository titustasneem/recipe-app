import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RatingSection = ({ recipe, onSaveRating }) => {
  const [userRating, setUserRating] = useState(recipe?.userRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [notes, setNotes] = useState(recipe?.userNotes || '');
  const [cookingDate, setCookingDate] = useState(recipe?.lastCooked || '');
  const [modifications, setModifications] = useState(recipe?.userModifications || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSave = () => {
    const ratingData = {
      rating: userRating,
      notes,
      cookingDate,
      modifications,
      timestamp: new Date()?.toISOString()
    };
    onSaveRating(ratingData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserRating(recipe?.userRating || 0);
    setNotes(recipe?.userNotes || '');
    setCookingDate(recipe?.lastCooked || '');
    setModifications(recipe?.userModifications || '');
    setIsEditing(false);
  };

  const renderStars = (rating, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (interactive ? (hoverRating || userRating) : rating);
      stars?.push(
        <button
          key={i}
          type="button"
          onClick={interactive ? () => handleStarClick(i) : undefined}
          onMouseEnter={interactive ? () => handleStarHover(i) : undefined}
          onMouseLeave={interactive ? handleStarLeave : undefined}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all duration-200`}
          disabled={!interactive}
        >
          <Icon 
            name="Star" 
            size={24} 
            className={filled ? 'text-warning fill-current' : 'text-muted-foreground'} 
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-xl text-card-foreground">
          My Rating & Notes
        </h3>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit2"
            iconPosition="left"
          >
            Edit
          </Button>
        )}
      </div>
      {/* Rating Stars */}
      <div className="space-y-2">
        <label className="font-body font-medium text-sm text-foreground">
          Your Rating
        </label>
        <div className="flex items-center space-x-1">
          {renderStars(userRating, isEditing)}
          {userRating > 0 && (
            <span className="ml-3 font-mono text-sm text-muted-foreground">
              {userRating}/5 stars
            </span>
          )}
        </div>
      </div>
      {/* Cooking Date */}
      <Input
        label="Last Cooked"
        type="date"
        value={cookingDate}
        onChange={(e) => setCookingDate(e?.target?.value)}
        disabled={!isEditing}
        className="max-w-xs"
      />
      {/* Personal Notes */}
      <div className="space-y-2">
        <label className="font-body font-medium text-sm text-foreground">
          Personal Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e?.target?.value)}
          disabled={!isEditing}
          placeholder="How did it turn out? Any thoughts or memories about this recipe?"
          className="w-full p-3 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          rows={4}
        />
      </div>
      {/* Modifications */}
      <div className="space-y-2">
        <label className="font-body font-medium text-sm text-foreground">
          My Modifications
        </label>
        <textarea
          value={modifications}
          onChange={(e) => setModifications(e?.target?.value)}
          disabled={!isEditing}
          placeholder="What changes did you make to the original recipe?"
          className="w-full p-3 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          rows={3}
        />
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center space-x-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}
      {/* Cooking History */}
      {recipe?.cookingHistory && recipe?.cookingHistory?.length > 0 && (
        <div className="pt-4 border-t border-border">
          <h4 className="font-body font-medium text-sm text-foreground mb-3">
            Cooking History
          </h4>
          <div className="space-y-2">
            {recipe?.cookingHistory?.slice(0, 3)?.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {new Date(entry.date)?.toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-1">
                  {renderStars(entry?.rating)}
                </div>
              </div>
            ))}
            {recipe?.cookingHistory?.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{recipe?.cookingHistory?.length - 3} more cooking sessions
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingSection;