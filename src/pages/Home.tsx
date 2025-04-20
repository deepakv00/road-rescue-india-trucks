
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { Truck, MapPin, Search, Wrench, Clock, Users, Shield } from "lucide-react";

const Home = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-trust to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Roadside Assistance, Made Simple
              </h1>
              <p className="text-xl mb-6">
                Get help when you need it most. Connect with nearby garages and recovery services specialized for trucks and all vehicles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-emergency hover:bg-emergency-hover text-white"
                  onClick={() => navigate('/breakdown')}
                >
                  Report Breakdown
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-trust"
                  onClick={() => navigate('/garages')}
                >
                  Find Nearby Garages
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-white rounded-full p-8 shadow-lg">
                  <Truck size={150} className="text-trust" />
                </div>
                <div className="absolute top-0 right-0 bg-emergency text-white rounded-full p-4 shadow-lg animate-pulse-slow">
                  <MapPin size={24} />
                </div>
                <div className="absolute bottom-0 left-0 bg-available text-white rounded-full p-4 shadow-lg">
                  <Wrench size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How VehicleMate Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-trust/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin size={28} className="text-trust" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Report Your Location</h3>
              <p className="text-gray-600">
                Use our app to report your breakdown location and vehicle details in just a few taps.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-trust/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search size={28} className="text-trust" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Help Nearby</h3>
              <p className="text-gray-600">
                Instantly connect with nearby garages and services that specialize in your vehicle type.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-trust/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wrench size={28} className="text-trust" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Back on the Road</h3>
              <p className="text-gray-600">
                Receive prompt service from verified mechanics with transparent pricing and skilled repairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <Clock size={24} className="text-trust mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">
                Find help anytime, day or night, with garages that operate around the clock.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <Truck size={24} className="text-trust mb-4" />
              <h3 className="text-lg font-semibold mb-2">Truck Specialists</h3>
              <p className="text-gray-600">
                Dedicated services for trucks and heavy vehicles with experienced mechanics.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <Users size={24} className="text-trust mb-4" />
              <h3 className="text-lg font-semibold mb-2">Trucker Community</h3>
              <p className="text-gray-600">
                Connect with fellow drivers to share tips, routes, and garage recommendations.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <Shield size={24} className="text-trust mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Services</h3>
              <p className="text-gray-600">
                All garages are verified and rated by real users for quality and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emergency py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of drivers across India who rely on VehicleMate for roadside assistance and garage connections.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!user ? (
              <>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  className="bg-white text-emergency hover:bg-gray-100"
                >
                  Register Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="border-white text-white hover:bg-white hover:text-emergency"
                >
                  Login
                </Button>
              </>
            ) : (
              <Button 
                size="lg" 
                onClick={() => navigate('/breakdown')}
                className="bg-white text-emergency hover:bg-gray-100"
              >
                Report a Breakdown
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
