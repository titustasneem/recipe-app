import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import SearchResults from './pages/search-results';
import EditRecipe from './pages/edit-recipe';
import RecipeDashboard from './pages/recipe-dashboard';
import AddRecipe from './pages/add-recipe';
import RecipeView from './pages/recipe-view';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddRecipe />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/edit-recipe" element={<EditRecipe />} />
        <Route path="/recipe-dashboard" element={<RecipeDashboard />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe-view" element={<RecipeView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;