import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const MethodsTab = ({ 
  methods = [], 
  onMethodsChange, 
  errors = {} 
}) => {
  const [editingIndex, setEditingIndex] = useState(-1);

  const addMethod = () => {
    const newMethod = {
      id: Date.now(),
      instruction: '',
      time: '',
      temperature: '',
      image: null,
      notes: ''
    };
    const updatedMethods = [...methods, newMethod];
    onMethodsChange(updatedMethods);
    setEditingIndex(updatedMethods?.length - 1);
  };

  const updateMethod = (index, field, value) => {
    const updatedMethods = methods?.map((method, i) => 
      i === index ? { ...method, [field]: value } : method
    );
    onMethodsChange(updatedMethods);
  };

  const removeMethod = (index) => {
    const updatedMethods = methods?.filter((_, i) => i !== index);
    onMethodsChange(updatedMethods);
    if (editingIndex === index) {
      setEditingIndex(-1);
    }
  };

  const moveMethod = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= methods?.length) return;

    const updatedMethods = [...methods];
    [updatedMethods[index], updatedMethods[newIndex]] = 
    [updatedMethods?.[newIndex], updatedMethods?.[index]];
    
    onMethodsChange(updatedMethods);
  };

  const handleImageUpload = (index, event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateMethod(index, 'image', e?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    updateMethod(index, 'image', null);
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
            Cooking Methods
          </h3>
          <p className="text-sm text-muted-foreground">
            Add step-by-step instructions for your recipe
          </p>
        </div>
        <Button
          variant="outline"
          onClick={addMethod}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Add Step
        </Button>
      </div>
      {/* Methods List */}
      <div className="space-y-4">
        {methods?.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <Icon name="List" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="font-heading font-medium text-foreground mb-2">
              No cooking steps added yet
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Break down your recipe into clear, easy-to-follow steps
            </p>
            <Button
              variant="default"
              onClick={addMethod}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add First Step
            </Button>
          </div>
        ) : (
          methods?.map((method, index) => (
            <div
              key={method?.id}
              className="bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-soft"
            >
              {editingIndex === index ? (
                // Editing Mode
                (<div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground text-sm font-mono font-bold rounded-full">
                      {index + 1}
                    </span>
                    <h4 className="font-heading font-medium text-foreground">
                      Step {index + 1}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-body font-medium text-foreground">
                      Instruction *
                    </label>
                    <textarea
                      placeholder="Describe this cooking step in detail..."
                      value={method?.instruction}
                      onChange={(e) => updateMethod(index, 'instruction', e?.target?.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Time (optional)"
                      type="text"
                      placeholder="e.g., 5 minutes"
                      value={method?.time}
                      onChange={(e) => updateMethod(index, 'time', e?.target?.value)}
                      description="How long this step takes"
                    />
                    <Input
                      label="Temperature (optional)"
                      type="text"
                      placeholder="e.g., 350°F"
                      value={method?.temperature}
                      onChange={(e) => updateMethod(index, 'temperature', e?.target?.value)}
                      description="Cooking temperature if applicable"
                    />
                  </div>
                  <Input
                    label="Additional Notes (optional)"
                    type="text"
                    placeholder="Any tips or important details..."
                    value={method?.notes}
                    onChange={(e) => updateMethod(index, 'notes', e?.target?.value)}
                    description="Extra tips or warnings for this step"
                  />
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-body font-medium text-foreground">
                      Step Image (optional)
                    </label>
                    {method?.image ? (
                      <div className="relative">
                        <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={method?.image}
                            alt={`Step ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2"
                          iconName="X"
                          iconSize={14}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Icon name="ImagePlus" size={32} className="mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-3">
                          Add a photo to help illustrate this step
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="hidden"
                          id={`image-upload-${index}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`image-upload-${index}`)?.click()}
                          iconName="Upload"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Upload Image
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
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
                      onClick={() => removeMethod(index)}
                      iconName="Trash2"
                      iconSize={14}
                    >
                      Delete Step
                    </Button>
                  </div>
                </div>)
              ) : (
                // Display Mode
                (<div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <span className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary text-sm font-mono font-bold rounded-full mt-1">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-foreground font-body leading-relaxed">
                          {method?.instruction}
                        </p>
                        
                        {(method?.time || method?.temperature) && (
                          <div className="flex items-center space-x-4 mt-2">
                            {method?.time && (
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Icon name="Clock" size={14} />
                                <span className="font-mono">{method?.time}</span>
                              </div>
                            )}
                            {method?.temperature && (
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Icon name="Thermometer" size={14} />
                                <span className="font-mono">{method?.temperature}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {method?.notes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            💡 {method?.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveMethod(index, 'up')}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="ChevronUp" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveMethod(index, 'down')}
                        disabled={index === methods?.length - 1}
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
                        onClick={() => removeMethod(index)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                  {method?.image && (
                    <div className="ml-11">
                      <div className="w-48 h-32 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={method?.image}
                          alt={`Step ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>)
              )}
            </div>
          ))
        )}
      </div>
      {errors?.methods && (
        <p className="text-sm text-error">{errors?.methods}</p>
      )}
    </div>
  );
};

export default MethodsTab;