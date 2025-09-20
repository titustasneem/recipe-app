import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const IngredientsTab = ({ ingredients, servings, onServingsChange, onGenerateShoppingList }) => {
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const handleIngredientCheck = (index, checked) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: checked
    }));
  };

  const adjustQuantity = (quantity, originalServings, newServings) => {
    if (!quantity || !originalServings || !newServings) return quantity;
    const ratio = newServings / originalServings;
    const adjusted = parseFloat(quantity) * ratio;
    return adjusted % 1 === 0 ? adjusted?.toString() : adjusted?.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Servings Adjuster */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-4">
          <span className="font-body font-medium text-foreground">Servings:</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onServingsChange(Math.max(1, servings - 1))}
              className="h-8 w-8 p-0"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="font-mono font-semibold text-lg w-8 text-center">
              {servings}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onServingsChange(servings + 1)}
              className="h-8 w-8 p-0"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={onGenerateShoppingList}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Shopping List
        </Button>
      </div>
      {/* Ingredients List */}
      <div className="space-y-3">
        {ingredients?.map((ingredient, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
              checkedIngredients?.[index] 
                ? 'bg-success/10 border-success/20' :'bg-card border-border hover:bg-muted/50'
            }`}
          >
            <Checkbox
              checked={checkedIngredients?.[index] || false}
              onChange={(e) => handleIngredientCheck(index, e?.target?.checked)}
              className="flex-shrink-0"
            />
            
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`font-mono font-semibold text-primary ${
                  checkedIngredients?.[index] ? 'line-through opacity-60' : ''
                }`}>
                  {adjustQuantity(ingredient?.quantity, ingredient?.originalServings || servings, servings)} {ingredient?.unit}
                </span>
                <span className={`font-body ${
                  checkedIngredients?.[index] ? 'line-through opacity-60' : ''
                }`}>
                  {ingredient?.name}
                </span>
              </div>
              
              {ingredient?.notes && (
                <span className="text-sm text-muted-foreground italic">
                  {ingredient?.notes}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-accent/20 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-muted-foreground">
            Progress: {Object.values(checkedIngredients)?.filter(Boolean)?.length} of {ingredients?.length} ingredients
          </span>
          <div className="w-32 bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(Object.values(checkedIngredients)?.filter(Boolean)?.length / ingredients?.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsTab;