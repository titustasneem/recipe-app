import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecipeHero from './components/RecipeHero';
import IngredientsTab from './components/IngredientsTab';
import InstructionsTab from './components/InstructionsTab';
import PhotosTab from './components/PhotosTab';
import RatingSection from './components/RatingSection';
import ShareModal from './components/ShareModal';

const RecipeView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const recipeId = searchParams?.get('id');
  
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(4);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock recipe data
  const mockRecipe = {
    id: recipeId || "1",
    title: "Classic Chocolate Chip Cookies",
    description: "Soft and chewy cookies with the perfect balance of sweetness and rich chocolate flavor. These homemade cookies are crispy on the edges and tender in the center, making them the perfect treat for any occasion.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop",
    rating: 4.8,
    userRating: 5,
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: "Easy",
    category: "Dessert",
    cuisine: "American",
    tags: ["Dessert", "Baking", "Family Favorite", "Quick", "Sweet"],
    userNotes: "These turned out amazing! I added a pinch of sea salt on top before baking and it really enhanced the flavor.",
    lastCooked: "2025-01-15",
    userModifications: "Added 1/4 tsp vanilla extract and used brown butter for extra flavor",
    cookingHistory: [
      { date: "2025-01-15", rating: 5 },
      { date: "2024-12-20", rating: 4 },
      { date: "2024-11-28", rating: 5 }
    ],
    ingredients: [
      { name: "All-purpose flour", quantity: "2 1/4", unit: "cups", notes: "sifted", originalServings: 24 },
      { name: "Baking soda", quantity: "1", unit: "tsp", originalServings: 24 },
      { name: "Salt", quantity: "1", unit: "tsp", originalServings: 24 },
      { name: "Butter", quantity: "1", unit: "cup", notes: "softened", originalServings: 24 },
      { name: "Granulated sugar", quantity: "3/4", unit: "cup", originalServings: 24 },
      { name: "Brown sugar", quantity: "3/4", unit: "cup", notes: "packed", originalServings: 24 },
      { name: "Large eggs", quantity: "2", unit: "whole", originalServings: 24 },
      { name: "Vanilla extract", quantity: "2", unit: "tsp", originalServings: 24 },
      { name: "Chocolate chips", quantity: "2", unit: "cups", notes: "semi-sweet", originalServings: 24 }
    ],
    instructions: [
      {
        instruction: "Preheat your oven to 375°F (190°C). Line baking sheets with parchment paper or lightly grease them.",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
        timer: null,
        temperature: 375,
        tip: "Make sure your oven is fully preheated before baking for even results."
      },
      {
        instruction: "In a medium bowl, whisk together flour, baking soda, and salt. Set aside.",
        image: null,
        timer: null,
        tip: "Sifting the flour will give you lighter, more tender cookies."
      },
      {
        instruction: "In a large bowl, cream together the softened butter, granulated sugar, and brown sugar until light and fluffy, about 3-4 minutes.",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
        timer: 4,
        tip: "Properly creamed butter and sugar should look pale and increased in volume."
      },
      {
        instruction: "Beat in eggs one at a time, then add vanilla extract. Mix until well combined.",
        image: null,
        timer: null,
        tip: "Room temperature eggs incorporate better into the mixture."
      },
      {
        instruction: "Gradually mix in the flour mixture until just combined. Don\'t overmix.",
        image: null,
        timer: null,
        tip: "Overmixing can lead to tough cookies. Stop as soon as you don't see flour streaks."
      },
      {
        instruction: "Fold in the chocolate chips until evenly distributed throughout the dough.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
        timer: null,
        tip: "Save a few chocolate chips to press on top of each cookie before baking."
      },
      {
        instruction: "Drop rounded tablespoons of dough onto prepared baking sheets, spacing them about 2 inches apart.",
        image: null,
        timer: null,
        tip: "Use a cookie scoop for uniform cookies that bake evenly."
      },
      {
        instruction: "Bake for 9-11 minutes, or until the edges are golden brown but centers still look slightly underbaked.",
        image: null,
        timer: 10,
        temperature: 375,
        tip: "Cookies will continue to cook on the hot pan after removing from oven."
      },
      {
        instruction: "Cool on baking sheet for 5 minutes, then transfer to a wire rack to cool completely.",
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop",
        timer: 5,
        tip: "This resting time helps cookies set properly and prevents breaking."
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop",
        caption: "Final result - perfectly golden cookies",
        category: "final"
      },
      {
        url: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=600&fit=crop",
        caption: "Creaming butter and sugar",
        category: "process"
      },
      {
        url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop",
        caption: "Adding chocolate chips",
        category: "process"
      },
      {
        url: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=600&fit=crop",
        caption: "Cooling on wire rack",
        category: "process"
      },
      {
        url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=600&fit=crop",
        caption: "All ingredients ready",
        category: "ingredients"
      }
    ]
  };

  useEffect(() => {
    if (!recipeId) {
      navigate('/recipe-dashboard');
    }
  }, [recipeId, navigate]);

  const handleEdit = () => {
    navigate(`/edit-recipe?id=${recipeId}`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // In a real app, this would delete the recipe
    console.log('Deleting recipe:', recipeId);
    setShowDeleteConfirm(false);
    navigate('/recipe-dashboard');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleServingsChange = (newServings) => {
    setServings(newServings);
  };

  const handleGenerateShoppingList = () => {
    const shoppingList = mockRecipe?.ingredients?.map(ingredient => ({
      name: ingredient?.name,
      quantity: ingredient?.quantity,
      unit: ingredient?.unit,
      notes: ingredient?.notes
    }));
    
    // In a real app, this would navigate to shopping list or save to local storage
    console.log('Generated shopping list:', shoppingList);
    alert('Shopping list generated! (Check console for details)');
  };

  const handleAddPhoto = () => {
    // In a real app, this would open a file picker
    alert('Photo upload functionality would be implemented here');
  };

  const handleSaveRating = (ratingData) => {
    // In a real app, this would save to backend
    console.log('Saving rating:', ratingData);
  };

  const tabs = [
    { id: 'ingredients', label: 'Ingredients', icon: 'ShoppingCart' },
    { id: 'instructions', label: 'Instructions', icon: 'List' },
    { id: 'photos', label: 'Photos', icon: 'Camera' }
  ];

  if (!mockRecipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
              Recipe Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/recipe-dashboard')}>
              Back to Recipes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          iconName="ArrowLeft"
          iconPosition="left"
          className="mb-6"
        >
          Back
        </Button>

        {/* Recipe Hero */}
        <RecipeHero
          recipe={mockRecipe}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={handleShare}
          onPrint={handlePrint}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-card border border-border rounded-lg p-6">
              {activeTab === 'ingredients' && (
                <IngredientsTab
                  ingredients={mockRecipe?.ingredients}
                  servings={servings}
                  onServingsChange={handleServingsChange}
                  onGenerateShoppingList={handleGenerateShoppingList}
                />
              )}
              
              {activeTab === 'instructions' && (
                <InstructionsTab instructions={mockRecipe?.instructions} />
              )}
              
              {activeTab === 'photos' && (
                <PhotosTab
                  photos={mockRecipe?.photos}
                  onAddPhoto={handleAddPhoto}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recipe Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-heading font-semibold text-lg text-card-foreground">
                Recipe Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prep Time</span>
                  <span className="font-mono text-sm">{mockRecipe?.prepTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cook Time</span>
                  <span className="font-mono text-sm">{mockRecipe?.cookTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Time</span>
                  <span className="font-mono text-sm font-semibold">
                    {mockRecipe?.prepTime + mockRecipe?.cookTime} min
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Servings</span>
                  <span className="font-mono text-sm">{mockRecipe?.servings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <span className="font-mono text-sm">{mockRecipe?.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cuisine</span>
                  <span className="font-mono text-sm">{mockRecipe?.cuisine}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-border">
                <h4 className="font-body font-medium text-sm text-card-foreground mb-2">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mockRecipe?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-caption bg-muted text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <RatingSection
              recipe={mockRecipe}
              onSaveRating={handleSaveRating}
            />
          </div>
        </div>
      </main>
      {/* Share Modal */}
      <ShareModal
        recipe={mockRecipe}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-popover border border-border rounded-lg shadow-soft-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-destructive" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-popover-foreground">
                    Delete Recipe
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete "{mockRecipe?.title}"? This will permanently remove the recipe and all associated data.
              </p>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete Recipe
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeView;