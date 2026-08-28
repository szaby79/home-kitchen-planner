import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import RecipesPage from "@/pages/RecipesPage";
import RecipeDetailPage from "@/pages/RecipeDetailPage";
import PlannerPage from "@/pages/PlannerPage";
import ShoppingPage from "@/pages/ShoppingPage";
import AdminPage from "@/pages/AdminPage";
import BudgetPage from "@/pages/BudgetPage";
import NotFound from "@/pages/NotFound";
import { LanguageProvider } from "@/i18n/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/shopping" element={<ShoppingPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
