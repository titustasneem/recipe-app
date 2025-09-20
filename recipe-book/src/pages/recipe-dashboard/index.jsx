import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchBar from '../../components/ui/SearchBar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import RecipeGrid from './components/RecipeGrid';
import FilterBar from './components/FilterBar';
import CategoryTabs from './components/CategoryTabs';
import StatsOverview from './components/StatsOverview';

const RecipeDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState({
    mealType: 'all',
    cuisine: 'all',
    difficulty: 'all',
    cookTime: 'all',
    sort: 'recent'
  });
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      description: "Soft and chewy cookies with the perfect balance of sweetness and chocolate chunks",
      image: "https://stock.adobe.com/search?k=chocolate+chip+cookie+cartoon",
      cookTime: "25 min",
      prepTime: "15 min",
      servings: 24,
      difficulty: "Easy",
      rating: 4.8,
      tags: ["Dessert", "Baking", "Family Favorite"],
      mealType: "dessert",
      cuisine: "american",
      dateAdded: new Date('2025-01-15'),
      isFavorite: true
    },
    {
      id: 2,
      title: "Creamy Chicken Alfredo Pasta",
      description: "Rich and creamy pasta dish with tender chicken and homemade alfredo sauce",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=400&h=300&fit=crop",
      cookTime: "30 min",
      prepTime: "10 min",
      servings: 4,
      difficulty: "Medium",
      rating: 4.6,
      tags: ["Dinner", "Pasta", "Comfort Food"],
      mealType: "dinner",
      cuisine: "italian",
      dateAdded: new Date('2025-01-12'),
      isFavorite: false
    },
    {
      id: 3,
      title: "Fluffy Pancakes with Berries",
      description: "Light and airy pancakes topped with fresh seasonal berries and maple syrup",
      image: "https://images.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_1280.jpg?w=400&h=300&fit=crop",
      cookTime: "15 min",
      prepTime: "10 min",
      servings: 4,
      difficulty: "Easy",
      rating: 4.7,
      tags: ["Breakfast", "Sweet", "Weekend"],
      mealType: "breakfast",
      cuisine: "american",
      dateAdded: new Date('2025-01-18'),
      isFavorite: true
    },
    {
      id: 4,
      title: "Mediterranean Quinoa Salad",
      description: "Fresh and healthy salad with quinoa, vegetables, feta cheese and lemon dressing",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      cookTime: "20 min",
      prepTime: "15 min",
      servings: 6,
      difficulty: "Easy",
      rating: 4.4,
      tags: ["Lunch", "Healthy", "Vegetarian"],
      mealType: "lunch",
      cuisine: "mediterranean",
      dateAdded: new Date('2025-01-10'),
      isFavorite: false
    },
    {
      id: 5,
      title: "Spicy Thai Green Curry",
      description: "Aromatic and spicy curry with coconut milk, vegetables and fragrant herbs",
      image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?w=400&h=300&fit=crop",
      cookTime: "45 min",
      prepTime: "20 min",
      servings: 4,
      difficulty: "Hard",
      rating: 4.9,
      tags: ["Dinner", "Spicy", "Asian"],
      mealType: "dinner",
      cuisine: "asian",
      dateAdded: new Date('2025-01-08'),
      isFavorite: true
    },
    {
      id: 6,
      title: "Homemade Banana Bread",
      description: "Moist and flavorful banana bread perfect for breakfast or afternoon snack",
      image: "https://images.pixabay.com/photo/2017/06/23/23/57/banana-bread-2435682_1280.jpg?w=400&h=300&fit=crop",
      cookTime: "60 min",
      prepTime: "15 min",
      servings: 8,
      difficulty: "Medium",
      rating: 4.5,
      tags: ["Breakfast", "Baking", "Snack"],
      mealType: "breakfast",
      cuisine: "american",
      dateAdded: new Date('2025-01-16'),
      isFavorite: false
    },
    {
      id: 7,
      title: "Caesar Salad with Grilled Chicken",
      description: "Classic caesar salad with crispy romaine, parmesan and grilled chicken breast",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      cookTime: "20 min",
      prepTime: "15 min",
      servings: 2,
      difficulty: "Easy",
      rating: 4.3,
      tags: ["Lunch", "Salad", "Protein"],
      mealType: "lunch",
      cuisine: "american",
      dateAdded: new Date('2025-01-14'),
      isFavorite: false
    },
    {
      id: 8,
      title: "Beef Tacos with Homemade Salsa",
      description: "Seasoned ground beef tacos with fresh salsa, lettuce and cheese",
      image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?w=400&h=300&fit=crop",
      cookTime: "25 min",
      prepTime: "20 min",
      servings: 4,
      difficulty: "Medium",
      rating: 4.6,
      tags: ["Dinner", "Mexican", "Family"],
      mealType: "dinner",
      cuisine: "mexican",
      dateAdded: new Date('2025-01-11'),
      isFavorite: true
    }
  ];

  // Filter recipes based on active filters and search query
  useEffect(() => {
    let filtered = [...mockRecipes];

    // Apply category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'favorites') {
        filtered = filtered?.filter(recipe => recipe?.isFavorite);
      } else if (activeCategory === 'recent') {
        const oneWeekAgo = new Date();
        oneWeekAgo?.setDate(oneWeekAgo?.getDate() - 7);
        filtered = filtered?.filter(recipe => recipe?.dateAdded >= oneWeekAgo);
      } else {
        filtered = filtered?.filter(recipe => recipe?.mealType === activeCategory);
      }
    }

    // Apply search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(recipe =>
        recipe?.title?.toLowerCase()?.includes(query) ||
        recipe?.description?.toLowerCase()?.includes(query) ||
        recipe?.tags?.some(tag => tag?.toLowerCase()?.includes(query))
      );
    }

    // Apply filters
    if (filters?.mealType !== 'all') {
      filtered = filtered?.filter(recipe => recipe?.mealType === filters?.mealType);
    }
    if (filters?.cuisine !== 'all') {
      filtered = filtered?.filter(recipe => recipe?.cuisine === filters?.cuisine);
    }
    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(recipe => recipe?.difficulty?.toLowerCase() === filters?.difficulty);
    }
    if (filters?.cookTime !== 'all') {
      const timeLimit = parseInt(filters?.cookTime);
      if (filters?.cookTime === '60+') {
        filtered = filtered?.filter(recipe => parseInt(recipe?.cookTime) > 60);
      } else {
        filtered = filtered?.filter(recipe => parseInt(recipe?.cookTime) <= timeLimit);
      }
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'alphabetical':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'cookTime':
        filtered?.sort((a, b) => parseInt(a?.cookTime) - parseInt(b?.cookTime));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        filtered?.sort((a, b) => difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty]);
        break;
      default: // recent
        filtered?.sort((a, b) => b?.dateAdded - a?.dateAdded);
    }

    setFilteredRecipes(filtered);
  }, [activeCategory, searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query?.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
    }
  };

  const handleEditRecipe = (recipeId) => {
    navigate(`/edit-recipe?id=${recipeId}`);
  };

  const handleDeleteRecipe = (recipeId) => {
    // In a real app, this would show a confirmation dialog and delete the recipe
    console.log('Delete recipe:', recipeId);
  };

  const handleShareRecipe = (recipeId) => {
    // In a real app, this would open a share dialog
    console.log('Share recipe:', recipeId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-heading font-semibold text-foreground">
                My Recipe Collection
              </h1>
              <p className="text-muted-foreground font-body mt-1">
                Organize and discover your favorite recipes
              </p>
            </div>
            
            {/* Desktop Search */}
            <div className="hidden sm:block">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search recipes, ingredients, or tags..."
                className="w-80"
              />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search recipes..."
              expanded={true}
            />
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Filter Bar */}
        <FilterBar
          onFilterChange={setFilters}
          onSortChange={(sort) => setFilters(prev => ({ ...prev, sort }))}
          activeFilters={filters}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-body">
            Showing {filteredRecipes?.length} of {mockRecipes?.length} recipes
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setFilters({
                  mealType: 'all',
                  cuisine: 'all',
                  difficulty: 'all',
                  cookTime: 'all',
                  sort: 'recent'
                });
              }}
              className="text-sm text-primary hover:text-primary/80 font-body font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Recipe Grid */}
        <RecipeGrid
          recipes={filteredRecipes}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
          onShare={handleShareRecipe}
        />
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default RecipeDashboard;