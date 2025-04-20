
import { useApp } from "@/contexts/AppContext";
import { logoutUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, Menu, X, User, MapPin } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, isOffline } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-trust text-white p-4 shadow-md relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Truck size={24} className="text-white" />
          <span className="text-xl font-bold">VehicleMate</span>
          {isOffline && (
            <span className="text-xs bg-warning px-2 py-1 rounded text-black">
              Offline
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/breakdown" className="hover:text-gray-300">
            Report Breakdown
          </Link>
          <Link to="/garages" className="hover:text-gray-300">
            Find Garages
          </Link>
          <Link to="/community" className="hover:text-gray-300">
            Community
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === "garage_owner" && (
                <Link to="/garage-dashboard" className="hover:text-gray-300">
                  My Garage
                </Link>
              )}
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{user.name}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={logoutUser} 
                className="text-white border-white hover:bg-white hover:text-trust"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-trust">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-emergency hover:bg-emergency-hover">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-trust p-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/breakdown" 
              className="hover:bg-blue-900 p-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Report Breakdown
            </Link>
            <Link 
              to="/garages" 
              className="hover:bg-blue-900 p-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Garages
            </Link>
            <Link 
              to="/community" 
              className="hover:bg-blue-900 p-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>

            {user ? (
              <>
                {user.role === "garage_owner" && (
                  <Link 
                    to="/garage-dashboard" 
                    className="hover:bg-blue-900 p-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Garage
                  </Link>
                )}
                <div className="flex items-center p-2">
                  <User size={16} className="mr-1" />
                  <span>{user.name}</span>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }} 
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-trust">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-emergency hover:bg-emergency-hover">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
