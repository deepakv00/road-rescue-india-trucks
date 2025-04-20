
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Truck } from "lucide-react";
import { toast } from "sonner";

const Towing = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error("Please fill in both locations");
      return;
    }
    toast.success("Towing request submitted successfully!");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Request Towing Service</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-6 w-6" />
            Book a Towing Service
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="pl-10"
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
                  className="pl-10"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-emergency hover:bg-emergency-hover">
              Request Towing
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Towing;
