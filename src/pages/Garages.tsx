
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { getAllGarages, Garage, getGaragesByVehicleType, saveGaragesToCache, getSavedGarages } from "@/lib/garages";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Car, Map, Star, Clock, Shield, Filter, Loader2, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Garages = () => {
  const { isOffline } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [garages, setGarages] = useState<Garage[]>([]);
  const [filteredGarages, setFilteredGarages] = useState<Garage[]>([]);
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [is24HoursFilter, setIs24HoursFilter] = useState(false);

  useEffect(() => {
    const fetchGarages = async () => {
      setIsLoading(true);
      try {
        let fetchedGarages: Garage[] = [];
        
        if (isOffline) {
          // Use cached data when offline
          fetchedGarages = getSavedGarages();
          if (fetchedGarages.length === 0) {
            toast.warning("You're offline. No cached garage data available.");
          }
        } else {
          // Fetch from API when online
          if (vehicleTypeFilter && vehicleTypeFilter !== "all") {
            fetchedGarages = await getGaragesByVehicleType(vehicleTypeFilter);
          } else {
            fetchedGarages = await getAllGarages();
          }
          
          // Save to cache for offline use
          saveGaragesToCache(fetchedGarages);
        }
        
        setGarages(fetchedGarages);
        setFilteredGarages(fetchedGarages);
      } catch (error) {
        console.error("Error fetching garages:", error);
        toast.error("Failed to load garages. Please try again.");
        
        // Try to use cached data as fallback
        const cachedGarages = getSavedGarages();
        if (cachedGarages.length > 0) {
          setGarages(cachedGarages);
          setFilteredGarages(cachedGarages);
          toast.info("Showing cached garage data.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGarages();
  }, [isOffline, vehicleTypeFilter]);

  useEffect(() => {
    filterGarages();
  }, [search, is24HoursFilter, garages]);

  const filterGarages = () => {
    let filtered = [...garages];
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        garage =>
          garage.name.toLowerCase().includes(searchLower) ||
          garage.address.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by 24/7 service
    if (is24HoursFilter) {
      filtered = filtered.filter(garage => garage.is24Hours);
    }
    
    setFilteredGarages(filtered);
  };

  const handleVehicleTypeChange = (type: string) => {
    setVehicleTypeFilter(type);
  };

  const renderVehicleTypeIcon = (type: string) => {
    switch (type) {
      case "truck":
        return <Truck size={16} className="mr-1" />;
      case "car":
        return <Car size={16} className="mr-1" />;
      case "bike":
        return (
          <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Find Nearby Garages</h1>
      
      {/* Search and Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select onValueChange={handleVehicleTypeChange} value={vehicleTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Vehicle Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="bike">Bike</SelectItem>
              <SelectItem value="bus">Bus</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant={is24HoursFilter ? "default" : "outline"}
            className={is24HoursFilter ? "bg-available hover:bg-available-hover" : ""}
            onClick={() => setIs24HoursFilter(!is24HoursFilter)}
          >
            <Clock size={16} className="mr-2" />
            24/7 Service
          </Button>
        </div>
      </div>
      
      {/* Garage Listings */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 size={30} className="animate-spin text-trust" />
        </div>
      ) : filteredGarages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGarages.map((garage) => (
            <Card key={garage.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{garage.name}</h3>
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                      <Star size={16} className="text-yellow-500 mr-1" fill="#EAB308" />
                      <span>{garage.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500 ml-1">
                        ({garage.totalRatings})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mt-2">
                    <Map size={16} className="mr-1" />
                    <span className="text-sm">{garage.address}</span>
                  </div>
                  
                  <div className="flex items-center mt-4 gap-2">
                    {garage.vehicleTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="flex items-center"
                      >
                        {renderVehicleTypeIcon(type)}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    {garage.is24Hours && (
                      <Badge className="bg-available mr-2">
                        <Clock size={14} className="mr-1" />
                        Open 24/7
                      </Badge>
                    )}
                    
                    {garage.certifications.length > 0 && (
                      <Badge variant="outline" className="border-trust text-trust">
                        <Shield size={14} className="mr-1" />
                        {garage.certifications.length} Certification(s)
                      </Badge>
                    )}
                  </div>
                  
                  <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">{garage.services.length}</span> services
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone size={14} className="mr-1" />
                        Call
                      </Button>
                      <Link to={`/garages/${garage.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No garages found matching your criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setVehicleTypeFilter("");
              setIs24HoursFilter(false);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Garages;

