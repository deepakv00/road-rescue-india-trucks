
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, Clock, Calendar, ArrowRight, Car } from "lucide-react";
import { toast } from "sonner";
import { fadeIn, slideIn, hoverScale } from "@/lib/animation";

const Towing = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error("Please fill in both locations");
      return;
    }
    
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.success("Towing request submitted successfully!");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className={`${fadeIn}`}>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Truck className="h-8 w-8 text-emergency" /> Request Towing Service
        </h1>
        <p className="text-gray-600 mb-6">Get immediate assistance for your vehicle</p>
      </div>
      
      <div className={`mb-8 flex justify-center ${slideIn}`}>
        <div className="flex items-center w-full max-w-xl">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 1 ? 'bg-emergency text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className={`h-1 flex-grow ${step === 1 ? 'bg-gray-300' : 'bg-emergency'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? 'bg-emergency text-white' : 'bg-gray-200'}`}>
            2
          </div>
        </div>
      </div>
      
      <Card className={`max-w-2xl mx-auto ${hoverScale}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-6 w-6" />
            {step === 1 ? "Specify Locations" : "Choose Service Options"}
          </CardTitle>
          <CardDescription>
            {step === 1 
              ? "Tell us where you need the towing service" 
              : "Select additional options for your towing service"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="pickup">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="pickup"
                      type="text"
                      placeholder="Enter pickup location"
                      className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-emergency focus:border-emergency"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="dropoff">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="dropoff"
                      type="text"
                      placeholder="Enter drop-off location"
                      className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-emergency focus:border-emergency"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="font-medium">Trip Details</div>
                      <div className="text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-emergency" /> 
                          <span>Pickup: {pickup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-trust" /> 
                          <span>Dropoff: {dropoff}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-emergency" />
                      <span>Express Service (30 min)</span>
                    </div>
                    <span className="font-medium">+ ₹499</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-trust" />
                      <span>Special Equipment (Heavy Vehicles)</span>
                    </div>
                    <span className="font-medium">+ ₹799</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-trust" />
                      <span>Schedule for Later</span>
                    </div>
                    <span className="font-medium">+ ₹0</span>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              type="submit" 
              className={`w-full ${step === 1 ? 'bg-emergency hover:bg-emergency-hover' : 'bg-trust hover:bg-trust-hover'} transition-all duration-300 hover:-translate-y-1`}
            >
              {step === 1 ? (
                <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
              ) : (
                "Request Towing"
              )}
            </Button>
            
            {step === 2 && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => setStep(1)}
              >
                Back to Locations
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      
      {step === 1 && (
        <div className={`mt-10 ${fadeIn}`} style={{ animationDelay: '300ms' }}>
          <h2 className="text-2xl font-bold text-center mb-6">Why Choose Our Towing Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Fast Response",
                description: "Our team arrives within 30 minutes of your call in urban areas.",
                icon: <Clock className="h-8 w-8 text-emergency" />
              },
              {
                title: "Careful Handling",
                description: "Your vehicle will be handled with utmost care by our trained professionals.",
                icon: <Car className="h-8 w-8 text-trust" />
              },
              {
                title: "24/7 Availability",
                description: "Our services are available round the clock for all your emergency needs.",
                icon: <Truck className="h-8 w-8 text-trust" />
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title} 
                className={`text-center p-6 ${hoverScale}`}
                style={{ animationDelay: `${400 + (index * 100)}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Towing;
