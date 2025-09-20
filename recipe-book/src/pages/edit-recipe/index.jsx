import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EditRecipeHeader from './components/EditRecipeHeader';
import EditRecipeTabs from './components/EditRecipeTabs';
import EditIngredientsTab from './components/EditIngredientsTab';
import EditMethodsTab from './components/EditMethodsTab';
import EditPhotosTab from './components/EditPhotosTab';

const EditRecipe = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const recipeId = searchParams?.get('id') || '1';

  const [activeTab, setActiveTab] = useState('ingredients');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock recipe data - in real app, this would come from API
  const [recipeData, setRecipeData] = useState({
    id: recipeId,
    title: "Classic Chocolate Chip Cookies",
    description: "Soft and chewy cookies with the perfect balance of sweetness and chocolate chips",
    prepTime: "15 min",
    cookTime: "25 min",
    totalTime: "40 min",
    servings: 24,
    difficulty: "Easy",
    category: "Dessert",
    cuisine: "American",
    tags: ["Dessert", "Baking", "Family Favorite", "Quick & Easy"],
    lastModified: "2025-09-15",
    ingredients: [
      { id: 1, amount: "2", unit: "cups", name: "all-purpose flour", notes: "" },
      { id: 2, amount: "1", unit: "tsp", name: "baking soda", notes: "" },
      { id: 3, amount: "1", unit: "tsp", name: "salt", notes: "" },
      { id: 4, amount: "1", unit: "cup", name: "butter", notes: "softened" },
      { id: 5, amount: "3/4", unit: "cup", name: "brown sugar", notes: "packed" },
      { id: 6, amount: "1/2", unit: "cup", name: "granulated sugar", notes: "" },
      { id: 7, amount: "2", unit: "large", name: "eggs", notes: "" },
      { id: 8, amount: "2", unit: "tsp", name: "vanilla extract", notes: "" },
      { id: 9, amount: "2", unit: "cups", name: "chocolate chips", notes: "semi-sweet" }
    ],
    methods: [
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
        instruction: "Gradually blend in the flour mixture until just combined. Don\'t overmix.",
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
    ],
    photos: [
      {
        id: 1,
        url: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800",
        caption: "Finished chocolate chip cookies",
        isPrimary: true,
        uploadDate: "2025-09-15"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
        caption: "Cookie dough with chocolate chips",
        isPrimary: false,
        uploadDate: "2025-09-15"
      },
      {
        id: 3,
        url: "https://images.pixabay.com/photo/2017/07/16/15/39/cookies-2509781_960_720.jpg",
        caption: "Cookies baking in the oven",
        isPrimary: false,
        uploadDate: "2025-09-15"
      }
    ]
  });

  // Handle data changes
  const handleIngredientsChange = (ingredients) => {
    setRecipeData(prev => ({ ...prev, ingredients }));
    setHasUnsavedChanges(true);
  };

  const handleMethodsChange = (methods) => {
    setRecipeData(prev => ({ ...prev, methods }));
    setHasUnsavedChanges(true);
  };

  const handlePhotosChange = (photos) => {
    setRecipeData(prev => ({ ...prev, photos }));
    setHasUnsavedChanges(true);
  };

  // Save changes
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, this would save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update last modified date
      setRecipeData(prev => ({
        ...prev,
        lastModified: new Date()?.toISOString()?.split('T')?.[0]
      }));
      
      setHasUnsavedChanges(false);
      
      // Show success message
      alert('Recipe saved successfully!');
      
      // Navigate back to recipe view
      navigate(`/recipe-view?id=${recipeId}`);
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel changes
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        navigate(`/recipe-view?id=${recipeId}`);
      }
    } else {
      navigate(`/recipe-view?id=${recipeId}`);
    }
  };

  // Delete recipe
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${recipeData?.title}"? This action cannot be undone.`)) {
      setIsLoading(true);
      try {
        // Mock API call - in real app, this would delete from backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Recipe deleted successfully!');
        navigate('/recipe-dashboard');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Warn about unsaved changes on page unload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e?.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return (
          <EditIngredientsTab
            ingredients={recipeData?.ingredients}
            onIngredientsChange={handleIngredientsChange}
          />
        );
      case 'methods':
        return (
          <EditMethodsTab
            methods={recipeData?.methods}
            onMethodsChange={handleMethodsChange}
          />
        );
      case 'photos':
        return (
          <EditPhotosTab
            photos={recipeData?.photos}
            onPhotosChange={handlePhotosChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EditRecipeHeader
        recipeName={recipeData?.title}
        lastModified={recipeData?.lastModified}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      <EditRecipeTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="pb-8">
        {renderTabContent()}
      </main>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
              <span className="font-body text-foreground">Saving changes...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRecipe;