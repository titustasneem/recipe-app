import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EditIngredientsTab = ({ ingredients: initialIngredients = [], onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState(initialIngredients?.length > 0 ? initialIngredients : [
    { id: 1, amount: "2", unit: "cups", name: "all-purpose flour", notes: "" },
    { id: 2, amount: "1", unit: "tsp", name: "baking soda", notes: "" },
    { id: 3, amount: "1", unit: "tsp", name: "salt", notes: "" },
    { id: 4, amount: "1", unit: "cup", name: "butter", notes: "softened" },
    { id: 5, amount: "3/4", unit: "cup", name: "brown sugar", notes: "packed" },
    { id: 6, amount: "1/2", unit: "cup", name: "granulated sugar", notes: "" },
    { id: 7, amount: "2", unit: "large", name: "eggs", notes: "" },
    { id: 8, amount: "2", unit: "tsp", name: "vanilla extract", notes: "" },
    { id: 9, amount: "2", unit: "cups", name: "chocolate chips", notes: "semi-sweet" }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const unitOptions = [
    { value: "cup", label: "cup" },
    { value: "cups", label: "cups" },
    { value: "tsp", label: "tsp" },
    { value: "tbsp", label: "tbsp" },
    { value: "oz", label: "oz" },
    { value: "lb", label: "lb" },
    { value: "g", label: "g" },
    { value: "kg", label: "kg" },
    { value: "ml", label: "ml" },
    { value: "l", label: "l" },
    { value: "piece", label: "piece" },
    { value: "pieces", label: "pieces" },
    { value: "large", label: "large" },
    { value: "medium", label: "medium" },
    { value: "small", label: "small" },
    { value: "pinch", label: "pinch" },
    { value: "dash", label: "dash" }
  ];

  const updateIngredient = (id, field, value) => {
    const updated = ingredients?.map(ingredient =>
      ingredient?.id === id ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(updated);
    onIngredientsChange?.(updated);
  };

  const addIngredient = () => {
    const newIngredient = {
      id: Math.max(...ingredients?.map(i => i?.id), 0) + 1,
      amount: "",
      unit: "cup",
      name: "",
      notes: ""
    };
    const updated = [...ingredients, newIngredient];
    setIngredients(updated);
    onIngredientsChange?.(updated);
  };

  const removeIngredient = (id) => {
    const updated = ingredients?.filter(ingredient => ingredient?.id !== id);
    setIngredients(updated);
    onIngredientsChange?.(updated);
  };

  const handleDragStart = (e, ingredient) => {
    setDraggedItem(ingredient);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIngredient) => {
    e?.preventDefault();
    if (!draggedItem || draggedItem?.id === targetIngredient?.id) return;

    const draggedIndex = ingredients?.findIndex(i => i?.id === draggedItem?.id);
    const targetIndex = ingredients?.findIndex(i => i?.id === targetIngredient?.id);

    const newIngredients = [...ingredients];
    newIngredients?.splice(draggedIndex, 1);
    newIngredients?.splice(targetIndex, 0, draggedItem);

    setIngredients(newIngredients);
    onIngredientsChange?.(newIngredients);
    setDraggedItem(null);
  };

  return (
    <div 
      id="ingredients-panel" 
      role="tabpanel" 
      aria-labelledby="ingredients-tab"
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground mb-1">
              Edit Ingredients
            </h2>
            <p className="text-sm text-muted-foreground">
              Drag to reorder, click to edit, or add new ingredients
            </p>
          </div>
          <Button
            variant="outline"
            onClick={addIngredient}
            iconName="Plus"
            iconPosition="left"
          >
            Add Ingredient
          </Button>
        </div>

        <div className="space-y-3">
          {ingredients?.map((ingredient, index) => (
            <div
              key={ingredient?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, ingredient)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, ingredient)}
              className="group flex items-center space-x-3 p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 cursor-move"
            >
              {/* Drag Handle */}
              <div className="flex items-center justify-center w-6 h-6 text-muted-foreground group-hover:text-foreground">
                <Icon name="GripVertical" size={16} />
              </div>

              {/* Index */}
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-mono font-medium">
                {index + 1}
              </div>

              {/* Amount */}
              <div className="w-20">
                <Input
                  type="text"
                  placeholder="1"
                  value={ingredient?.amount}
                  onChange={(e) => updateIngredient(ingredient?.id, 'amount', e?.target?.value)}
                  className="text-center"
                />
              </div>

              {/* Unit */}
              <div className="w-24">
                <Select
                  options={unitOptions}
                  value={ingredient?.unit}
                  onChange={(value) => updateIngredient(ingredient?.id, 'unit', value)}
                  placeholder="Unit"
                />
              </div>

              {/* Ingredient Name */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient?.name}
                  onChange={(e) => updateIngredient(ingredient?.id, 'name', e?.target?.value)}
                />
              </div>

              {/* Notes */}
              <div className="w-32">
                <Input
                  type="text"
                  placeholder="Notes"
                  value={ingredient?.notes}
                  onChange={(e) => updateIngredient(ingredient?.id, 'notes', e?.target?.value)}
                />
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeIngredient(ingredient?.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-destructive"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          ))}
        </div>

        {ingredients?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-medium text-lg text-foreground mb-2">
              No ingredients yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Add your first ingredient to get started
            </p>
            <Button variant="outline" onClick={addIngredient}>
              Add First Ingredient
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditIngredientsTab;