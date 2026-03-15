import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />

            {/* All category pages */}
            <Route path="/katzenbetten" element={<CategoryPage />} />
            <Route path="/katzenhoehlen" element={<CategoryPage />} />
            <Route path="/donut-katzenbetten" element={<CategoryPage />} />
            <Route path="/orthopaedische-katzenbetten" element={<CategoryPage />} />
            <Route path="/fensterliegen-katzen" element={<CategoryPage />} />
            <Route path="/beheizte-katzenbetten" element={<CategoryPage />} />
            <Route path="/design-katzenbetten" element={<CategoryPage />} />
            <Route path="/katzensofas" element={<CategoryPage />} />
            <Route path="/haengematten-katzen" element={<CategoryPage />} />
            <Route path="/kratzbetten" element={<CategoryPage />} />
            <Route path="/katzenbett-zubehoer" element={<CategoryPage />} />

            {/* Product detail, guide, about */}
            <Route path="/katzenbett/:slug" element={<Index />} />
            <Route path="/ratgeber" element={<Index />} />
            <Route path="/ratgeber/:slug" element={<Index />} />
            <Route path="/ueber-uns" element={<Index />} />
            <Route path="/impressum" element={<Index />} />
            <Route path="/datenschutz" element={<Index />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
