
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportBreakdown from "./pages/ReportBreakdown";
import Garages from "./pages/Garages";
import GarageDetail from "./pages/GarageDetail";
import Community from "./pages/Community";
import GarageDashboard from "./pages/GarageDashboard";
import NotFound from "./pages/NotFound";
import Towing from "./pages/Towing";
import Premium from "./pages/Premium";
import EmergencySOS from "./pages/EmergencySOS";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="breakdown" element={<ReportBreakdown />} />
            <Route path="garages" element={<Garages />} />
            <Route path="garages/:id" element={<GarageDetail />} />
            <Route path="community" element={<Community />} />
            <Route path="garage-dashboard" element={<GarageDashboard />} />
            <Route path="towing" element={<Towing />} />
            <Route path="premium" element={<Premium />} />
            <Route path="emergency" element={<EmergencySOS />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
