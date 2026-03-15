import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index.tsx";
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
            <Route path="/katzenbetten" element={<Index />} />
            <Route path="/katzenhoehlen" element={<Index />} />
            <Route path="/donut-katzenbetten" element={<Index />} />
            <Route path="/orthopaedische-katzenbetten" element={<Index />} />
            <Route path="/fensterliegen-katzen" element={<Index />} />
            <Route path="/haengematten-katzen" element={<Index />} />
            <Route path="/beheizte-katzenbetten" element={<Index />} />
            <Route path="/design-katzenbetten" element={<Index />} />
            <Route path="/katzensofas" element={<Index />} />
            <Route path="/kratzbetten" element={<Index />} />
            <Route path="/katzenbett-zubehoer" element={<Index />} />
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
