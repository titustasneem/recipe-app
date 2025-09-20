import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionBar = ({ 
  onSaveDraft, 
  onPublish, 
  isLoading = false, 
  isDraftSaving = false,
  hasUnsavedChanges = false,
  className = "" 
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave without saving?'
      );
      if (!confirmLeave) return;
    }
    navigate('/recipe-dashboard');
  };

  return (
    <div className={`sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border p-4 ${className}`}>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Left Side - Cancel */}
        <Button
          variant="ghost"
          onClick={handleCancel}
          disabled={isLoading || isDraftSaving}
          iconName="X"
          iconPosition="left"
          iconSize={16}
        >
          Cancel
        </Button>

        {/* Center - Status */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {isDraftSaving && (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Saving draft...</span>
            </>
          )}
          {hasUnsavedChanges && !isDraftSaving && (
            <>
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span>Unsaved changes</span>
            </>
          )}
          {!hasUnsavedChanges && !isDraftSaving && (
            <>
              <Icon name="Check" size={16} className="text-success" />
              <span>All changes saved</span>
            </>
          )}
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onSaveDraft}
            disabled={isLoading || isDraftSaving}
            loading={isDraftSaving}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save Draft
          </Button>
          
          <Button
            variant="default"
            onClick={onPublish}
            disabled={isDraftSaving}
            loading={isLoading}
            iconName="Send"
            iconPosition="left"
            iconSize={16}
          >
            Publish Recipe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;