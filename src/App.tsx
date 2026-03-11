import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import DocsLayout from "./components/DocsLayout";
import GettingStartedPage from "./pages/docs/GettingStartedPage";
import ValidatorsPage from "./pages/docs/ValidatorsPage";
import CLIPage from "./pages/docs/CLIPage";
import RuntimePage from "./pages/docs/RuntimePage";
import ZodIntegrationPage from "./pages/docs/ZodIntegrationPage";
import CompatibilityPage from "./pages/docs/CompatibilityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DocsLayout />}>
              <Route index element={<GettingStartedPage />} />
              <Route path="validators" element={<ValidatorsPage />} />
              <Route path="cli" element={<CLIPage />} />
              <Route path="runtime" element={<RuntimePage />} />
              <Route path="zod" element={<ZodIntegrationPage />} />
              <Route path="compatibility" element={<CompatibilityPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
