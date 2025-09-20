import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RecipeBasicInfo from './components/RecipeBasicInfo';
import TabNavigation from './components/TabNavigation';
import IngredientsTab from './components/IngredientsTab';
import MethodsTab from './components/MethodsTab';
import PhotosTab from './components/PhotosTab';
import ActionBar from './components/ActionBar';
import Icon from '../../components/AppIcon';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState({});

  // Form Data State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    category: '',
    cuisine: '',
    difficulty: '',
    tags: ''
  });

  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleSaveDraft(true); // Silent save
      }, 30000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges, formData, ingredients, methods, photos]);

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [formData, ingredients, methods, photos]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleIngredientsChange = (newIngredients) => {
    setIngredients(newIngredients);
    
    // Clear ingredients error
    if (errors?.ingredients) {
      setErrors(prev => ({
        ...prev,
        ingredients: null
      }));
    }
  };

  const handleMethodsChange = (newMethods) => {
    setMethods(newMethods);
    
    // Clear methods error
    if (errors?.methods) {
      setErrors(prev => ({
        ...prev,
        methods: null
      }));
    }
  };

  const handlePhotosChange = (newPhotos) => {
    setPhotos(newPhotos);
    
    // Clear photos error
    if (errors?.photos) {
      setErrors(prev => ({
        ...prev,
        photos: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic info validation
    if (!formData?.title?.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    if (!formData?.description?.trim()) {
      newErrors.description = 'Recipe description is required';
    }
    if (!formData?.prepTime) {
      newErrors.prepTime = 'Prep time is required';
    }
    if (!formData?.cookTime) {
      newErrors.cookTime = 'Cook time is required';
    }
    if (!formData?.servings) {
      newErrors.servings = 'Number of servings is required';
    }
    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData?.difficulty) {
      newErrors.difficulty = 'Difficulty level is required';
    }

    // Ingredients validation
    if (ingredients?.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required';
    } else {
      const invalidIngredients = ingredients?.some(ing => 
        !ing?.name?.trim() || !ing?.quantity?.trim()
      );
      if (invalidIngredients) {
        newErrors.ingredients = 'All ingredients must have a name and quantity';
      }
    }

    // Methods validation
    if (methods?.length === 0) {
      newErrors.methods = 'At least one cooking step is required';
    } else {
      const invalidMethods = methods?.some(method => !method?.instruction?.trim());
      if (invalidMethods) {
        newErrors.methods = 'All cooking steps must have instructions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const getTabValidation = () => {
    const validation = {};
    
    // Ingredients tab
    if (ingredients?.length > 0 && ingredients?.every(ing => ing?.name?.trim() && ing?.quantity?.trim())) {
      validation.ingredients = true;
    } else if (ingredients?.length > 0) {
      validation.ingredients = false;
    }

    // Methods tab
    if (methods?.length > 0 && methods?.every(method => method?.instruction?.trim())) {
      validation.methods = true;
    } else if (methods?.length > 0) {
      validation.methods = false;
    }

    // Photos tab (optional, so always valid if has photos)
    if (photos?.length > 0) {
      validation.photos = true;
    }

    return validation;
  };

  const handleSaveDraft = async (silent = false) => {
    if (!silent) setIsDraftSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = {
        ...formData,
        ingredients,
        methods,
        photos,
        status: 'draft',
        lastSaved: new Date()?.toISOString()
      };

      // In real app, save to API/localStorage
      localStorage.setItem('recipe-draft', JSON.stringify(draftData));
      
      setHasUnsavedChanges(false);
      
      if (!silent) {
        // Show success message
        console.log('Draft saved successfully');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      if (!silent) setIsDraftSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) {
      // Switch to first tab with error
      const errorTabs = ['ingredients', 'methods', 'photos'];
      const firstErrorTab = errorTabs?.find(tab => errors?.[tab]);
      if (firstErrorTab) {
        setActiveTab(firstErrorTab);
      }
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const recipeData = {
        ...formData,
        ingredients,
        methods,
        photos,
        status: 'published',
        publishedAt: new Date()?.toISOString(),
        id: Date.now() // Mock ID
      };

      // In real app, save to API
      console.log('Recipe published:', recipeData);
      
      // Clear draft
      localStorage.removeItem('recipe-draft');
      
      // Navigate to recipe view
      navigate(`/recipe-view?id=${recipeData?.id}`);
    } catch (error) {
      console.error('Error publishing recipe:', error);
      setErrors({ general: 'Failed to publish recipe. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return (
          <IngredientsTab
            ingredients={ingredients}
            onIngredientsChange={handleIngredientsChange}
            servings={formData.servings}
            onServingsChange={(value) => handleFormChange('servings', value)}
            onGenerateShoppingList={() => {}} // Add empty function for now
            errors={errors}
          />
        );
      case 'methods':
        return (
          <MethodsTab
            methods={methods}
            onMethodsChange={handleMethodsChange}
            errors={errors}
          />
        );
      case 'photos':
        return (
          <PhotosTab
            photos={photos}
            onPhotosChange={handlePhotosChange}
            onAddPhoto={(photo) => setPhotos(prev => [...prev, photo])} // Add missing prop
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <span>Recipe Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Add Recipe</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Create New Recipe
          </h1>
          <p className="text-muted-foreground mt-2">
            Share your culinary creation with detailed ingredients, step-by-step methods, and beautiful photos
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Basic Recipe Information */}
        <div className="mb-8">
          <RecipeBasicInfo
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabValidation={getTabValidation()}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-lg border border-border p-6 min-h-[500px]">
          {renderTabContent()}
        </div>
      </div>
      {/* Action Bar */}
      <ActionBar
        onSaveDraft={() => handleSaveDraft(false)}
        onPublish={handlePublish}
        isLoading={isLoading}
        isDraftSaving={isDraftSaving}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};

export default AddRecipe;