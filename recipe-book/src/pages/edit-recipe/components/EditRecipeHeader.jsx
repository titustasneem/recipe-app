import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EditRecipeHeader = ({ 
  recipeName = "Classic Chocolate Chip Cookies",
  lastModified = "2025-09-15",
  onSave,
  onCancel,
  onDelete,
  hasUnsavedChanges = false
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        onCancel?.();
        navigate('/recipe-view?id=1');
      }
    } else {
      onCancel?.();
      navigate('/recipe-view?id=1');
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipeName}"? This action cannot be undone.`)) {
      onDelete?.();
      navigate('/recipe-dashboard');
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="flex items-center space-x-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/recipe-view?id=1')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={16} />
            <span className="ml-2">Back to Recipe</span>
          </Button>
        </div>

        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-2">
              Edit Recipe
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
              <span className="font-body">Editing: {recipeName}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span className="font-mono">Last modified: {new Date(lastModified)?.toLocaleDateString()}</span>
              </div>
              {hasUnsavedChanges && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center space-x-1 text-warning">
                    <Icon name="AlertCircle" size={14} />
                    <span className="font-caption">Unsaved changes</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="order-2 sm:order-1"
            >
              <Icon name="X" size={16} />
              <span className="ml-2">Cancel</span>
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="order-3 sm:order-2"
            >
              <Icon name="Trash2" size={16} />
              <span className="ml-2">Delete Recipe</span>
            </Button>

            <Button
              variant="default"
              onClick={onSave}
              className="order-1 sm:order-3"
            >
              <Icon name="Save" size={16} />
              <span className="ml-2">Save Changes</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeHeader;