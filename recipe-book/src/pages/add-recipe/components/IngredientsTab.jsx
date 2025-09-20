import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IngredientsTab = ({ 
  ingredients = [], 
  onIngredientsChange, 
  errors = {} 
}) => {
  const [editingIndex, setEditingIndex] = useState(-1);

  const unitOptions = [
    { value: 'cup', label: 'Cup' },
    { value: 'tbsp', label: 'Tablespoon' },
    { value: 'tsp', label: 'Teaspoon' },
    { value: 'oz', label: 'Ounce' },
    { value: 'lb', label: 'Pound' },
    { value: 'g', label: 'Gram' },
    { value: 'kg', label: 'Kilogram' },
    { value: 'ml', label: 'Milliliter' },
    { value: 'l', label: 'Liter' },
    { value: 'piece', label: 'Piece' },
    { value: 'clove', label: 'Clove' },
    { value: 'pinch', label: 'Pinch' },
    { value: 'dash', label: 'Dash' }
  ];

  const addIngredient = () => {
    const newIngredient = {
      id: Date.now(),
      name: '',
      quantity: '',
      unit: '',
      notes: ''
    };
    const updatedIngredients = [...ingredients, newIngredient];
    onIngredientsChange(updatedIngredients);
    setEditingIndex(updatedIngredients?.length - 1);
  };

  const updateIngredient = (index, field, value) => {
    const updatedIngredients = ingredients?.map((ingredient, i) => 
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    onIngredientsChange(updatedIngredients);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients?.filter((_, i) => i !== index);
    onIngredientsChange(updatedIngredients);
    if (editingIndex === index) {
      setEditingIndex(-1);
    }
  };

  const moveIngredient = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= ingredients?.length) return;

    const updatedIngredients = [...ingredients];
    [updatedIngredients[index], updatedIngredients[newIndex]] = 
    [updatedIngredients?.[newIndex], updatedIngredients?.[index]];
    
    onIngredientsChange(updatedIngredients);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const stopEditing = () => {
    setEditingIndex(-1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Ingredients
          </h3>
          <p className="text-sm text-muted-foreground">
            Add all ingredients needed for your recipe
          </p>
        </div>
        <Button
          variant="outline"
          onClick={addIngredient}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Add Ingredient
        </Button>
      </div>
      {/* Ingredients List */}
      <div className="space-y-3">
        {ingredients?.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <Icon name="ChefHat" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="font-heading font-medium text-foreground mb-2">
              No ingredients added yet
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Start building your recipe by adding ingredients
            </p>
            <Button
              variant="default"
              onClick={addIngredient}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add First Ingredient
            </Button>
          </div>
        ) : (
          ingredients?.map((ingredient, index) => (
            <div
              key={ingredient?.id}
              className="bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-soft"
            >
              {editingIndex === index ? (
                // Editing Mode
                (<div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-5">
                      <Input
                        label="Ingredient Name"
                        type="text"
                        placeholder="e.g., All-purpose flour"
                        value={ingredient?.name}
                        onChange={(e) => updateIngredient(index, 'name', e?.target?.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Input
                        label="Quantity"
                        type="text"
                        placeholder="2"
                        value={ingredient?.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e?.target?.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-4">
                      <Select
                        label="Unit"
                        placeholder="Select unit"
                        options={unitOptions}
                        value={ingredient?.unit}
                        onChange={(value) => updateIngredient(index, 'unit', value)}
                        searchable
                      />
                    </div>
                  </div>
                  <Input
                    label="Notes (optional)"
                    type="text"
                    placeholder="e.g., sifted, room temperature"
                    value={ingredient?.notes}
                    onChange={(e) => updateIngredient(index, 'notes', e?.target?.value)}
                    description="Add any special preparation notes"
                  />
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopEditing}
                    >
                      Done
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                      iconName="Trash2"
                      iconSize={14}
                    >
                      Delete
                    </Button>
                  </div>
                </div>)
              ) : (
                // Display Mode
                (<div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary text-sm font-mono font-medium rounded-full">
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-body font-medium text-foreground">
                            {ingredient?.quantity} {ingredient?.unit} {ingredient?.name}
                          </span>
                        </div>
                        {ingredient?.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {ingredient?.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveIngredient(index, 'up')}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="ChevronUp" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveIngredient(index, 'down')}
                      disabled={index === ingredients?.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="ChevronDown" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>)
              )}
            </div>
          ))
        )}
      </div>
      {errors?.ingredients && (
        <p className="text-sm text-error">{errors?.ingredients}</p>
      )}
    </div>
  );
};

export default IngredientsTab;