import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ className = "" }) => {
  const stats = [
    {
      id: 'total',
      label: 'Total Recipes',
      value: 24,
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'favorites',
      label: 'Favorites',
      value: 8,
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'thisWeek',
      label: 'Added This Week',
      value: 3,
      icon: 'Plus',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'avgRating',
      label: 'Avg Rating',
      value: '4.2',
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-heading font-semibold text-card-foreground">
              {stat?.value}
            </p>
            <p className="text-sm text-muted-foreground font-body">
              {stat?.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;