
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Truck, AlertTriangle, Loader2 } from "lucide-react";
import { VehicleType, breakdownIssues, reportBreakdown } from "@/lib/breakdown";
import { getCurrentLocation, Location, saveLocationToCache } from "@/lib/location";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ReportBreakdown = () => {
  const navigate = useNavigate();
  const { user, isOffline } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState<VehicleType>("truck");
  const [issueId, setIssueId] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<Location | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  // Get current location
  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      saveLocationToCache(currentLocation);
      toast.success("Location detected successfully");
    } catch (error) {
      console.error("Error getting location:", error);
      toast.error("Failed to get your location. Please try again or enter manually.");
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to report a breakdown");
      navigate("/login");
      return;
    }
    
    if (!vehicleType || !issueId) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!location) {
      toast.error("Please provide your location");
      return;
    }
    
    setIsLoading(true);
    try {
      const report = await reportBreakdown(
        user.id,
        vehicleType,
        issueId,
        description,
        location
      );
      
      toast.success("Breakdown reported successfully");
      navigate(`/breakdown-details/${report.id}`);
    } catch (error) {
      console.error("Error reporting breakdown:", error);
      toast.error("Failed to report breakdown. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Report a Breakdown</h1>
        
        {isOffline && (
          <div className="bg-warning/20 border border-warning text-black p-4 rounded-md mb-6 flex items-center">
            <AlertTriangle size={20} className="mr-2 text-warning" />
            <p>You're currently offline. Your report will be saved and sent when you're back online.</p>
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Vehicle & Issue Details</CardTitle>
            <CardDescription>
              Provide information about your vehicle and the problem you're experiencing
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Vehicle Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Vehicle Type</label>
                <RadioGroup 
                  value={vehicleType} 
                  onValueChange={(value) => setVehicleType(value as VehicleType)}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  <div>
                    <RadioGroupItem 
                      value="truck" 
                      id="truck" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="truck"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-trust [&:has([data-state=checked])]:border-trust"
                    >
                      <Truck size={24} />
                      <span className="mt-2">Truck</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="car" 
                      id="car" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="car"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-trust [&:has([data-state=checked])]:border-trust"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                      <span className="mt-2">Car</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="bike" 
                      id="bike" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="bike"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-trust [&:has([data-state=checked])]:border-trust"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>
                      <span className="mt-2">Bike</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="other" 
                      id="other" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="other"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-trust [&:has([data-state=checked])]:border-trust"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v.01"/><path d="M12 8v4"/></svg>
                      <span className="mt-2">Other</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Issue Selection */}
              <div className="space-y-2">
                <label htmlFor="issue" className="text-sm font-medium">
                  What's the issue?
                </label>
                <Select onValueChange={setIssueId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {breakdownIssues.map((issue) => (
                      <SelectItem key={issue.id} value={issue.id}>
                        {issue.name}
                        {issue.urgency === "high" && (
                          <span className="ml-2 text-red-500">• Urgent</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Additional Details (optional)
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe your issue in more detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Location */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Your Location</h3>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGetLocation}
                    disabled={locationLoading}
                    className="flex items-center gap-1"
                  >
                    {locationLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <MapPin size={16} />
                    )}
                    {location ? "Update Location" : "Get Current Location"}
                  </Button>
                </div>

                {location ? (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={18} className="text-trust" />
                      <span className="font-medium">Current Location:</span>
                    </div>
                    <p className="mb-1">
                      {location.address || "Address not available"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-gray-500">
                      Please get your current location to continue
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-emergency hover:bg-emergency-hover"
                disabled={isLoading || !location}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Report Breakdown"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportBreakdown;
