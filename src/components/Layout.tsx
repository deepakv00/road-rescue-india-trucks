
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AppProvider } from "@/contexts/AppContext";
import { useEffect, useState } from "react";

const Layout = () => {
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  useEffect(() => {
    const handleOffline = () => setShowOfflineAlert(true);
    const handleOnline = () => setShowOfflineAlert(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Initialize based on current status
    setShowOfflineAlert(!navigator.onLine);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        {showOfflineAlert && (
          <div className="bg-warning text-black p-2 text-center">
            You are currently offline. Some features may be limited.
          </div>
        )}
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

export default Layout;
