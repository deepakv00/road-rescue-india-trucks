
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { getGarageById, Garage, getSavedGarages } from "@/lib/garages";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Star,
  Clock,
  Shield,
  Phone,
  Truck,
  ArrowLeft,
  Tag,
  AlertTriangle,
  Wrench,
  Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GarageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isOffline } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [garage, setGarage] = useState<Garage | null>(null);

  useEffect(() => {
    const fetchGarage = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        let fetchedGarage: Garage | undefined;
        
        if (isOffline) {
          // Use cached data when offline
          const cachedGarages = getSavedGarages();
          fetchedGarage = cachedGarages.find(g => g.id === id);
          
          if (!fetchedGarage) {
            toast.warning("You're offline. No cached data available for this garage.");
          }
        } else {
          // Fetch from API when online
          fetchedGarage = await getGarageById(id);
        }
        
        if (fetchedGarage) {
          setGarage(fetchedGarage);
        } else {
          toast.error("Garage not found");
        }
      } catch (error) {
        console.error("Error fetching garage:", error);
        toast.error("Failed to load garage details. Please try again.");
        
        // Try to use cached data as fallback
        const cachedGarages = getSavedGarages();
        const cachedGarage = cachedGarages.find(g => g.id === id);
        if (cachedGarage) {
          setGarage(cachedGarage);
          toast.info("Showing cached data for this garage.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGarage();
  }, [id, isOffline]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trust"></div>
        </div>
      </div>
    );
  }

  if (!garage) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Garage Not Found</h1>
        <p className="mb-6">The garage you're looking for doesn't exist or has been removed.</p>
        <Link to="/garages">
          <Button>Back to Garages</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Link to="/garages" className="inline-flex items-center mb-6 text-trust hover:underline">
        <ArrowLeft size={16} className="mr-1" />
        Back to Garage Listings
      </Link>
      
      {/* Garage Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold">{garage.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin size={18} className="mr-1" />
              <span>{garage.address}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
              <Star size={20} className="text-yellow-500 mr-1" fill="#EAB308" />
              <span className="text-xl font-bold">{garage.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-500 ml-1">
                ({garage.totalRatings} reviews)
              </span>
            </div>
            
            <Button className="ml-4 bg-trust hover:bg-trust-hover">
              <Phone size={16} className="mr-2" />
              {garage.phoneNumber}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {garage.vehicleTypes.map((type) => (
            <Badge key={type} variant="outline" className="px-3 py-1">
              {type === "truck" && <Truck size={14} className="mr-1" />}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          ))}
          
          {garage.is24Hours && (
            <Badge className="bg-available px-3 py-1">
              <Clock size={14} className="mr-1" />
              Open 24/7
            </Badge>
          )}
        </div>
      </div>
      
      {/* Garage Details Tabs */}
      <Tabs defaultValue="services">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="services" className="flex-grow sm:flex-grow-0">
            <Wrench size={16} className="mr-1" />
            Services
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex-grow sm:flex-grow-0">
            <Package size={16} className="mr-1" />
            Parts & Inventory
          </TabsTrigger>
          <TabsTrigger value="about" className="flex-grow sm:flex-grow-0">
            <Shield size={16} className="mr-1" />
            About & Certifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {garage.services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="font-bold text-lg">
                      ₹{service.price.toLocaleString()}
                      {service.negotiable && (
                        <Badge
                          variant="outline"
                          className="ml-2 text-xs font-normal"
                        >
                          Negotiable
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {garage.services.length === 0 && (
              <div className="col-span-2 text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No services listed for this garage.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {garage.inventory.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold flex items-center">
                        {item.name}
                        <Badge
                          variant={item.condition === "new" ? "default" : "secondary"}
                          className="ml-2 text-xs font-normal"
                        >
                          {item.condition}
                        </Badge>
                      </h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div>
                      <div className="font-bold text-lg">₹{item.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 text-right">
                        {item.quantity} in stock
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {garage.inventory.length === 0 && (
              <div className="col-span-2 text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No inventory listed for this garage.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Certifications</h3>
              
              {garage.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {garage.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      <Shield size={14} className="mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No certifications listed for this garage.</p>
              )}
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">About the Garage</h3>
                <p className="text-gray-600">
                  {garage.name} is located at {garage.address}. 
                  {garage.is24Hours 
                    ? " They provide 24/7 service, ensuring help is available round the clock." 
                    : ""}
                  {" "}They specialize in servicing {garage.vehicleTypes.join(", ")} vehicles
                  and have received {garage.totalRatings} reviews with an average rating of {garage.rating.toFixed(1)}/5.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Book Service Button */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Need assistance?</h3>
            <p className="text-gray-600">Book a service or request roadside assistance</p>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button>Book Service</Button>
            <Button variant="outline">Request Towing</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageDetail;
