import React from 'react';

        const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
          const categories = [
            { id: 'all', label: 'All Recipes', count: 8 },
            { id: 'recent', label: 'Recent', count: 3 },
            { id: 'favorites', label: 'Favorites', count: 4 },
            { id: 'breakfast', label: 'Breakfast', count: 2 },
            { id: 'lunch', label: 'Lunch', count: 2 },
            { id: 'dinner', label: 'Dinner', count: 3 },
            { id: 'dessert', label: 'Dessert', count: 1 }
          ];

          return (
            <div className="bg-card rounded-lg border border-border p-1">
              <nav className="flex flex-wrap gap-1" role="tablist">
                {categories?.map((category) => (
                  <button
                    key={category?.id}
                    role="tab"
                    aria-selected={activeCategory === category?.id}
                    onClick={() => onCategoryChange(category?.id)}
                    className={`px-4 py-2 text-sm font-body font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                      activeCategory === category?.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {category?.label}
                    <span className="ml-2 text-xs opacity-70">
                      ({category?.count})
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          );
        };

        export default CategoryTabs;