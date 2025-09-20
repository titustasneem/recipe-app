import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TabNavigation = ({ 
  activeTab, 
  onTabChange, 
  tabValidation = {},
  className = "" 
}) => {
  const tabs = [
    {
      id: 'ingredients',
      label: 'Ingredients',
      icon: 'ShoppingCart',
      description: 'Add recipe ingredients'
    },
    {
      id: 'methods',
      label: 'Methods',
      icon: 'List',
      description: 'Step-by-step instructions'
    },
    {
      id: 'photos',
      label: 'Photos',
      icon: 'Camera',
      description: 'Upload recipe images'
    }
  ];

  const getTabStatus = (tabId) => {
    if (tabValidation?.[tabId] === true) return 'complete';
    if (tabValidation?.[tabId] === false) return 'error';
    return 'default';
  };

  const getTabIcon = (tab) => {
    const status = getTabStatus(tab?.id);
    if (status === 'complete') return 'CheckCircle';
    if (status === 'error') return 'AlertCircle';
    return tab?.icon;
  };

  const getTabIconColor = (tab) => {
    const status = getTabStatus(tab?.id);
    if (activeTab === tab?.id) return 'var(--color-primary)';
    if (status === 'complete') return 'var(--color-success)';
    if (status === 'error') return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-1 ${className}`}>
      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-1">
        {tabs?.map((tab) => {
          const isActive = activeTab === tab?.id;
          const status = getTabStatus(tab?.id);
          
          return (
            <Button
              key={tab?.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => onTabChange(tab?.id)}
              className={`flex-1 justify-start space-x-2 h-auto py-3 px-4 ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : status === 'error' ?'text-error hover:text-error' 
                    : status === 'complete' ?'text-success hover:text-success' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={getTabIcon(tab)} 
                size={18} 
                color={isActive ? 'currentColor' : getTabIconColor(tab)}
              />
              <div className="text-left">
                <div className="font-body font-medium text-sm">
                  {tab?.label}
                </div>
                <div className="text-xs opacity-75">
                  {tab?.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
      {/* Mobile Tabs */}
      <div className="md:hidden">
        <div className="flex space-x-1 mb-2">
          {tabs?.map((tab) => {
            const isActive = activeTab === tab?.id;
            const status = getTabStatus(tab?.id);
            
            return (
              <Button
                key={tab?.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onTabChange(tab?.id)}
                className={`flex-1 flex-col space-y-1 h-auto py-2 px-2 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : status === 'error' ?'text-error hover:text-error' 
                      : status === 'complete' ?'text-success hover:text-success' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon 
                  name={getTabIcon(tab)} 
                  size={20} 
                  color={isActive ? 'currentColor' : getTabIconColor(tab)}
                />
                <span className="text-xs font-body font-medium">
                  {tab?.label}
                </span>
              </Button>
            );
          })}
        </div>
        
        {/* Active Tab Description */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {tabs?.find(tab => tab?.id === activeTab)?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;