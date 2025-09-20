import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import SearchBar from '../../components/ui/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import SearchHeader from './components/SearchHeader';
import EmptyState from './components/EmptyState';
import RecipeGrid from './components/RecipeGrid';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    cuisine: 'all',
    cookingTime: 'all',
    difficulty: 'all',
    dietary: []
  });

  // Mock recipe data
  const allRecipes = [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      description: "Soft and chewy cookies with the perfect balance of sweetness and chocolate chips",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
      cookTime: "25 min",
      servings: 24,
      difficulty: "Easy",
      rating: 4.8,
      tags: ["Dessert", "Baking", "Family Favorite"],
      cuisine: "american",
      dietary: ["vegetarian"],
      dateAdded: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Creamy Chicken Curry",
      description: "Rich and aromatic Indian curry with tender chicken pieces in a creamy tomato sauce",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=400&h=300&fit=crop",
      cookTime: "45 min",
      servings: 4,
      difficulty: "Medium",
      rating: 4.6,
      tags: ["Main Course", "Indian", "Spicy"],
      cuisine: "indian",
      dietary: ["gluten-free"],
      dateAdded: new Date('2024-02-20')
    },
    {
      id: 3,
      title: "Mediterranean Quinoa Salad",
      description: "Fresh and healthy salad with quinoa, vegetables, and Mediterranean flavors",
      image: "https://images.pixabay.com/photo/2017/05/11/19/44/fresh-fruits-2305192_1280.jpg?w=400&h=300&fit=crop",
      cookTime: "20 min",
      servings: 6,
      difficulty: "Easy",
      rating: 4.4,
      tags: ["Salad", "Healthy", "Mediterranean"],
      cuisine: "mediterranean",
      dietary: ["vegetarian", "vegan", "gluten-free"],
      dateAdded: new Date('2024-03-10')
    },
    {
      id: 4,
      title: "Homemade Pizza Margherita",
      description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on homemade dough",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      cookTime: "90 min",
      servings: 4,
      difficulty: "Hard",
      rating: 4.9,
      tags: ["Italian", "Pizza", "Homemade"],
      cuisine: "italian",
      dietary: ["vegetarian"],
      dateAdded: new Date('2024-01-25')
    },
    {
      id: 5,
      title: "Beef Tacos with Guacamole",
      description: "Authentic Mexican tacos with seasoned ground beef and fresh guacamole",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=400&h=300&fit=crop",
      cookTime: "30 min",
      servings: 4,
      difficulty: "Medium",
      rating: 4.7,
      tags: ["Mexican", "Tacos", "Beef"],
      cuisine: "mexican",
      dietary: ["gluten-free"],
      dateAdded: new Date('2024-02-05')
    },
    {
      id: 6,
      title: "Vegan Buddha Bowl",
      description: "Nutritious bowl with roasted vegetables, quinoa, and tahini dressing",
      image: "https://images.pixabay.com/photo/2017/06/01/18/46/cook-2366772_1280.jpg?w=400&h=300&fit=crop",
      cookTime: "35 min",
      servings: 2,
      difficulty: "Easy",
      rating: 4.3,
      tags: ["Vegan", "Healthy", "Bowl"],
      cuisine: "american",
      dietary: ["vegan", "gluten-free"],
      dateAdded: new Date('2024-03-15')
    },
    {
      id: 7,
      title: "French Onion Soup",
      description: "Classic French soup with caramelized onions and melted Gruyère cheese",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      cookTime: "60 min",
      servings: 4,
      difficulty: "Medium",
      rating: 4.5,
      tags: ["French", "Soup", "Comfort Food"],
      cuisine: "french",
      dietary: ["vegetarian"],
      dateAdded: new Date('2024-01-30')
    },
    {
      id: 8,
      title: "Keto Salmon with Asparagus",
      description: "Low-carb grilled salmon with roasted asparagus and lemon butter sauce",
      image: "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?w=400&h=300&fit=crop",
      cookTime: "25 min",
      servings: 2,
      difficulty: "Easy",
      rating: 4.6,
      tags: ["Keto", "Seafood", "Low Carb"],
      cuisine: "american",
      dietary: ["keto", "low-carb", "gluten-free"],
      dateAdded: new Date('2024-02-28')
    }
  ];

  // Filter and search logic
  const filteredRecipes = useMemo(() => {
    let results = [...allRecipes];

    // Apply search query
    if (searchQuery) {
      results = results?.filter(recipe =>
        recipe?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        recipe?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        recipe?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply filters
    if (filters?.cuisine && filters?.cuisine !== 'all') {
      results = results?.filter(recipe => recipe?.cuisine === filters?.cuisine);
    }

    if (filters?.difficulty && filters?.difficulty !== 'all') {
      results = results?.filter(recipe => recipe?.difficulty?.toLowerCase() === filters?.difficulty);
    }

    if (filters?.cookingTime && filters?.cookingTime !== 'all') {
      results = results?.filter(recipe => {
        const cookTimeNum = parseInt(recipe?.cookTime);
        switch (filters?.cookingTime) {
          case '0-15':
            return cookTimeNum <= 15;
          case '15-30':
            return cookTimeNum > 15 && cookTimeNum <= 30;
          case '30-60':
            return cookTimeNum > 30 && cookTimeNum <= 60;
          case '60+':
            return cookTimeNum > 60;
          default:
            return true;
        }
      });
    }

    if (filters?.dietary && filters?.dietary?.length > 0) {
      results = results?.filter(recipe =>
        filters?.dietary?.every(diet => recipe?.dietary?.includes(diet))
      );
    }

    // Apply sorting
    results?.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a?.title?.localeCompare(b?.title);
          break;
        case 'date':
          comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
          break;
        case 'cookTime':
          comparison = parseInt(a?.cookTime) - parseInt(b?.cookTime);
          break;
        case 'rating':
          comparison = a?.rating - b?.rating;
          break;
        case 'relevance':
        default:
          // For relevance, prioritize exact matches in title
          if (searchQuery) {
            const aExact = a?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ? 1 : 0;
            const bExact = b?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ? 1 : 0;
            comparison = bExact - aExact;
          }
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return results;
  }, [searchQuery, filters, sortBy, sortOrder]);

  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  // Event handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      cuisine: 'all',
      cookingTime: 'all',
      difficulty: 'all',
      dietary: []
    };
    setFilters(clearedFilters);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleRecipeEdit = (recipeId) => {
    navigate(`/edit-recipe?id=${recipeId}`);
  };

  const handleRecipeDelete = (recipeId) => {
    // In a real app, this would show a confirmation dialog
    console.log('Delete recipe:', recipeId);
  };

  const handleRecipeShare = (recipeId) => {
    // In a real app, this would open a share dialog
    console.log('Share recipe:', recipeId);
  };

  const hasActiveFilters = () => {
    return filters?.cuisine !== 'all' || 
           filters?.cookingTime !== 'all' || 
           filters?.difficulty !== 'all' || 
           (filters?.dietary && filters?.dietary?.length > 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search recipes by name, ingredients, or tags..."
            expanded={true}
            initialValue={searchQuery}
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          resultCount={filteredRecipes?.length}
          onClearSearch={handleClearSearch}
          className="mb-6"
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isOpen={isFilterPanelOpen}
              onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className="sticky top-24"
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="mb-6">
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Results */}
            {filteredRecipes?.length > 0 ? (
              <RecipeGrid
                recipes={filteredRecipes}
                searchQuery={searchQuery}
                onEdit={handleRecipeEdit}
                onDelete={handleRecipeDelete}
                onShare={handleRecipeShare}
              />
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                hasFilters={hasActiveFilters()}
                onClearFilters={handleClearFilters}
                onClearSearch={handleClearSearch}
              />
            )}
          </div>
        </div>
      </main>
      <FloatingActionButton />
    </div>
  );
};

export default SearchResults;