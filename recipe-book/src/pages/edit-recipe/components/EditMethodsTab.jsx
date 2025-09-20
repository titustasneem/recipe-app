import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const EditMethodsTab = ({ methods: initialMethods = [], onMethodsChange }) => {
  const [methods, setMethods] = useState(initialMethods?.length > 0 ? initialMethods : [
    {
      id: 1,
      step: 1,
      instruction: "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
      time: "5 min",
      image: null
    },
    {
      id: 2,
      step: 2,
      instruction: "In a medium bowl, whisk together flour, baking soda, and salt. Set aside.",
      time: "2 min",
      image: null
    },
    {
      id: 3,
      step: 3,
      instruction: "In a large bowl, cream together softened butter, brown sugar, and granulated sugar until light and fluffy, about 3-4 minutes.",
      time: "4 min",
      image: "https://images.pexels.com/photos/4686820/pexels-photo-4686820.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      step: 4,
      instruction: "Beat in eggs one at a time, then add vanilla extract. Mix until well combined.",
      time: "2 min",
      image: null
    },
    {
      id: 5,
      step: 5,
      instruction: "Gradually blend in the flour mixture until just combined. Don't overmix.",
      time: "2 min",
      image: null
    },
    {
      id: 6,
      step: 6,
      instruction: "Stir in chocolate chips until evenly distributed throughout the dough.",
      time: "1 min",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      step: 7,
      instruction: "Drop rounded tablespoons of dough onto prepared baking sheets, spacing them 2 inches apart.",
      time: "5 min",
      image: null
    },
    {
      id: 8,
      step: 8,
      instruction: "Bake for 9-11 minutes or until golden brown around the edges. Centers should still look slightly soft.",
      time: "10 min",
      image: "https://images.pixabay.com/photo/2017/07/16/15/39/cookies-2509781_960_720.jpg"
    },
    {
      id: 9,
      step: 9,
      instruction: "Cool on baking sheet for 5 minutes, then transfer to a wire rack to cool completely.",
      time: "15 min",
      image: null
    }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const updateMethod = (id, field, value) => {
    const updated = methods?.map(method =>
      method?.id === id ? { ...method, [field]: value } : method
    );
    setMethods(updated);
    onMethodsChange?.(updated);
  };

  const addMethod = () => {
    const newMethod = {
      id: Math.max(...methods?.map(m => m?.id), 0) + 1,
      step: methods?.length + 1,
      instruction: "",
      time: "",
      image: null
    };
    const updated = [...methods, newMethod];
    setMethods(updated);
    onMethodsChange?.(updated);
  };

  const removeMethod = (id) => {
    const updated = methods?.filter(method => method?.id !== id)?.map((method, index) => ({ ...method, step: index + 1 }));
    setMethods(updated);
    onMethodsChange?.(updated);
  };

  const handleImageUpload = (id, event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateMethod(id, 'image', e?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeImage = (id) => {
    updateMethod(id, 'image', null);
  };

  const handleDragStart = (e, method) => {
    setDraggedItem(method);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetMethod) => {
    e?.preventDefault();
    if (!draggedItem || draggedItem?.id === targetMethod?.id) return;

    const draggedIndex = methods?.findIndex(m => m?.id === draggedItem?.id);
    const targetIndex = methods?.findIndex(m => m?.id === targetMethod?.id);

    const newMethods = [...methods];
    newMethods?.splice(draggedIndex, 1);
    newMethods?.splice(targetIndex, 0, draggedItem);

    // Reorder step numbers
    const reorderedMethods = newMethods?.map((method, index) => ({
      ...method,
      step: index + 1
    }));

    setMethods(reorderedMethods);
    onMethodsChange?.(reorderedMethods);
    setDraggedItem(null);
  };

  return (
    <div 
      id="methods-panel" 
      role="tabpanel" 
      aria-labelledby="methods-tab"
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl text-card-foreground mb-1">
              Edit Cooking Methods
            </h2>
            <p className="text-sm text-muted-foreground">
              Drag to reorder steps, add photos, and edit instructions
            </p>
          </div>
          <Button
            variant="outline"
            onClick={addMethod}
            iconName="Plus"
            iconPosition="left"
          >
            Add Step
          </Button>
        </div>

        <div className="space-y-4">
          {methods?.map((method) => (
            <div
              key={method?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, method)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, method)}
              className="group p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 cursor-move"
            >
              <div className="flex items-start space-x-4">
                {/* Drag Handle & Step Number */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center w-6 h-6 text-muted-foreground group-hover:text-foreground">
                    <Icon name="GripVertical" size={16} />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-mono font-medium">
                    {method?.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Instruction */}
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter cooking instruction..."
                      value={method?.instruction}
                      onChange={(e) => updateMethod(method?.id, 'instruction', e?.target?.value)}
                      className="text-base"
                    />
                  </div>

                  {/* Time and Image Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="w-full sm:w-32">
                      <Input
                        type="text"
                        placeholder="Time"
                        value={method?.time}
                        onChange={(e) => updateMethod(method?.id, 'time', e?.target?.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(method?.id, e)}
                        className="hidden"
                        id={`image-upload-${method?.id}`}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById(`image-upload-${method?.id}`)?.click()}
                      >
                        <Icon name="Camera" size={16} />
                        <span className="ml-2">{method?.image ? 'Change Photo' : 'Add Photo'}</span>
                      </Button>

                      {method?.image && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(method?.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Step Image */}
                  {method?.image && (
                    <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden">
                      <Image
                        src={method?.image}
                        alt={`Step ${method?.step} illustration`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(method?.id)}
                        className="absolute top-2 right-2 h-6 w-6 p-0 bg-background/80 hover:bg-background text-foreground backdrop-blur-sm"
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMethod(method?.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {methods?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="List" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-medium text-lg text-foreground mb-2">
              No cooking steps yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Add your first cooking step to get started
            </p>
            <Button variant="outline" onClick={addMethod}>
              Add First Step
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMethodsTab;