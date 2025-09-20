import React from 'react';
import Icon from '../../../components/AppIcon';

const EditRecipeTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'ingredients',
      label: 'Ingredients',
      icon: 'ShoppingCart',
      description: 'Edit ingredients list'
    },
    {
      id: 'methods',
      label: 'Methods',
      icon: 'List',
      description: 'Edit cooking steps'
    },
    {
      id: 'photos',
      label: 'Photos',
      icon: 'Camera',
      description: 'Manage recipe photos'
    }
  ];

  return (
    <div className="bg-background border-b border-border sticky top-16 z-30">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex space-x-0" role="tablist">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              role="tab"
              aria-selected={activeTab === tab?.id}
              aria-controls={`${tab?.id}-panel`}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-4 text-sm font-body font-medium border-b-2 transition-all duration-200 hover:text-foreground hover:bg-muted/50 ${
                activeTab === tab?.id
                  ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default EditRecipeTabs;