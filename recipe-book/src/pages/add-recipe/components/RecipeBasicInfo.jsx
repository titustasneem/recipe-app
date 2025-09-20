import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RecipeBasicInfo = ({ 
  formData, 
  onFormChange, 
  errors = {} 
}) => {
  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const categoryOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'snack', label: 'Snack' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'beverage', label: 'Beverage' }
  ];

  const cuisineOptions = [
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'asian', label: 'Asian' },
    { value: 'indian', label: 'Indian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'french', label: 'French' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Recipe Information
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add the basic details about your recipe
        </p>
      </div>
      <div className="space-y-4">
        {/* Recipe Title */}
        <Input
          label="Recipe Title"
          type="text"
          placeholder="Enter recipe name"
          value={formData?.title || ''}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          required
          className="w-full"
        />

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-body font-medium text-foreground">
            Description
          </label>
          <textarea
            placeholder="Brief description of your recipe..."
            value={formData?.description || ''}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          {errors?.description && (
            <p className="text-sm text-error">{errors?.description}</p>
          )}
        </div>

        {/* Time and Servings Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Prep Time (minutes)"
            type="number"
            placeholder="15"
            value={formData?.prepTime || ''}
            onChange={(e) => handleInputChange('prepTime', e?.target?.value)}
            error={errors?.prepTime}
            min="1"
            className="w-full"
          />

          <Input
            label="Cook Time (minutes)"
            type="number"
            placeholder="30"
            value={formData?.cookTime || ''}
            onChange={(e) => handleInputChange('cookTime', e?.target?.value)}
            error={errors?.cookTime}
            min="1"
            className="w-full"
          />

          <Input
            label="Servings"
            type="number"
            placeholder="4"
            value={formData?.servings || ''}
            onChange={(e) => handleInputChange('servings', e?.target?.value)}
            error={errors?.servings}
            min="1"
            className="w-full"
          />
        </div>

        {/* Category and Difficulty Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Category"
            placeholder="Select category"
            options={categoryOptions}
            value={formData?.category || ''}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            className="w-full"
          />

          <Select
            label="Cuisine Type"
            placeholder="Select cuisine"
            options={cuisineOptions}
            value={formData?.cuisine || ''}
            onChange={(value) => handleInputChange('cuisine', value)}
            error={errors?.cuisine}
            className="w-full"
          />

          <Select
            label="Difficulty"
            placeholder="Select difficulty"
            options={difficultyOptions}
            value={formData?.difficulty || ''}
            onChange={(value) => handleInputChange('difficulty', value)}
            error={errors?.difficulty}
            className="w-full"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-body font-medium text-foreground">
            Tags
            <span className="text-muted-foreground font-normal ml-1">(comma separated)</span>
          </label>
          <Input
            type="text"
            placeholder="vegetarian, quick, family-friendly"
            value={formData?.tags || ''}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            error={errors?.tags}
            description="Add tags to help categorize your recipe"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeBasicInfo;