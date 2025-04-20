
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wrench,
  Package,
  Settings,
  Plus,
  Edit,
  Trash,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GarageDashboard = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [servicesDialogOpen, setServicesDialogOpen] = useState(false);
  const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);

  // Check if user is a garage owner
  useEffect(() => {
    if (!user) {
      toast.error("Please login to access the garage dashboard");
      navigate("/login");
      return;
    }

    if (user.role !== "garage_owner") {
      toast.error("Only garage owners can access this page");
      navigate("/");
      return;
    }
  }, [user, navigate]);

  // Mock data for garage
  const [garage, setGarage] = useState({
    name: "Highway Truck Services",
    address: "Highway 66, Near 45 km marker",
    phoneNumber: "+91-9876543210",
    is24Hours: true,
    vehicleTypes: ["truck", "bus"],
    certifications: ["Tata Authorized", "Ashok Leyland Certified"],
    services: [
      {
        id: "service-1",
        name: "Tire Replacement",
        description: "Replace damaged tires with new ones",
        price: 1500,
        negotiable: true,
      },
      {
        id: "service-2",
        name: "Engine Repair",
        description: "Diagnose and fix engine issues",
        price: 5000,
        negotiable: true,
      }
    ],
    inventory: [
      {
        id: "inventory-1",
        name: "Truck Tires",
        description: "Heavy-duty tires for trucks",
        price: 8000,
        quantity: 12,
        condition: "new",
      }
    ]
  });

  // New service form
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    negotiable: true
  });

  // New inventory item form
  const [newInventory, setNewInventory] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    condition: "new"
  });

  const handleAddService = () => {
    if (!newService.name || !newService.description || !newService.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const price = parseFloat(newService.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const service = {
      id: `service-${Date.now()}`,
      name: newService.name,
      description: newService.description,
      price,
      negotiable: newService.negotiable
    };

    setGarage({
      ...garage,
      services: [...garage.services, service]
    });

    setNewService({
      name: "",
      description: "",
      price: "",
      negotiable: true
    });

    setServicesDialogOpen(false);
    toast.success("Service added successfully");
  };

  const handleAddInventory = () => {
    if (!newInventory.name || !newInventory.description || !newInventory.price || !newInventory.quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const price = parseFloat(newInventory.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const quantity = parseInt(newInventory.quantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const item = {
      id: `inventory-${Date.now()}`,
      name: newInventory.name,
      description: newInventory.description,
      price,
      quantity,
      condition: newInventory.condition as "new" | "used"
    };

    setGarage({
      ...garage,
      inventory: [...garage.inventory, item]
    });

    setNewInventory({
      name: "",
      description: "",
      price: "",
      quantity: "",
      condition: "new"
    });

    setInventoryDialogOpen(false);
    toast.success("Inventory item added successfully");
  };

  const handleDeleteService = (id: string) => {
    setGarage({
      ...garage,
      services: garage.services.filter(service => service.id !== id)
    });
    toast.success("Service deleted successfully");
  };

  const handleDeleteInventory = (id: string) => {
    setGarage({
      ...garage,
      inventory: garage.inventory.filter(item => item.id !== id)
    });
    toast.success("Inventory item deleted successfully");
  };

  const toggleIs24Hours = () => {
    setGarage({
      ...garage,
      is24Hours: !garage.is24Hours
    });
    toast.success(`24/7 service ${!garage.is24Hours ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Garage Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your garage services, inventory, and settings
          </p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/garages/${user?.id}`)}
          className="mt-4 md:mt-0"
        >
          View Public Profile
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold">{garage.name}</h2>
            <div className="flex items-center mt-1 text-gray-600">
              {garage.address}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="flex items-center mr-6">
              <Switch
                id="24-hours"
                checked={garage.is24Hours}
                onCheckedChange={toggleIs24Hours}
              />
              <Label htmlFor="24-hours" className="ml-2">
                24/7 Service
              </Label>
            </div>
            
            <Button variant="outline" size="sm">
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="services">
        <TabsList className="mb-6">
          <TabsTrigger value="services" className="flex items-center">
            <Wrench size={16} className="mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center">
            <Package size={16} className="mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings size={16} className="mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Services</CardTitle>
              
              <Dialog open={servicesDialogOpen} onOpenChange={setServicesDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                      Add details about a service that you offer at your garage
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="service-name" className="text-sm font-medium">
                        Service Name
                      </label>
                      <Input
                        id="service-name"
                        placeholder="e.g., Tire Change, Engine Repair"
                        value={newService.name}
                        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="service-description" className="text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        id="service-description"
                        placeholder="Describe the service..."
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="service-price" className="text-sm font-medium">
                        Price (₹)
                      </label>
                      <Input
                        id="service-price"
                        type="number"
                        placeholder="Service price in rupees"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="negotiable"
                        checked={newService.negotiable}
                        onCheckedChange={(checked) => setNewService({ ...newService, negotiable: checked })}
                      />
                      <Label htmlFor="negotiable">
                        Price is negotiable
                      </Label>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setServicesDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddService}>
                      Add Service
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {garage.services.length > 0 ? (
                <div className="divide-y">
                  {garage.services.map((service) => (
                    <div key={service.id} className="py-4 flex justify-between items-start">
                      <div>
                        <div className="font-semibold flex items-center">
                          {service.name}
                          {service.negotiable && (
                            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                              Negotiable
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-semibold mr-4">₹{service.price.toLocaleString()}</span>
                        
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-700" 
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">No services added yet</p>
                  <Button onClick={() => setServicesDialogOpen(true)}>Add Your First Service</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Parts & Inventory</CardTitle>
              
              <Dialog open={inventoryDialogOpen} onOpenChange={setInventoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Inventory
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add Inventory Item</DialogTitle>
                    <DialogDescription>
                      Add parts or other inventory items available at your garage
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="item-name" className="text-sm font-medium">
                        Item Name
                      </label>
                      <Input
                        id="item-name"
                        placeholder="e.g., Truck Tires, Air Filters"
                        value={newInventory.name}
                        onChange={(e) => setNewInventory({ ...newInventory, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="item-description" className="text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        id="item-description"
                        placeholder="Describe the item..."
                        value={newInventory.description}
                        onChange={(e) => setNewInventory({ ...newInventory, description: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="item-price" className="text-sm font-medium">
                          Price (₹)
                        </label>
                        <Input
                          id="item-price"
                          type="number"
                          placeholder="Item price"
                          value={newInventory.price}
                          onChange={(e) => setNewInventory({ ...newInventory, price: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="item-quantity" className="text-sm font-medium">
                          Quantity
                        </label>
                        <Input
                          id="item-quantity"
                          type="number"
                          placeholder="Available quantity"
                          value={newInventory.quantity}
                          onChange={(e) => setNewInventory({ ...newInventory, quantity: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="item-condition" className="text-sm font-medium">
                        Condition
                      </label>
                      <Select
                        value={newInventory.condition}
                        onValueChange={(value) => setNewInventory({ ...newInventory, condition: value })}
                      >
                        <SelectTrigger id="item-condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setInventoryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddInventory}>
                      Add Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {garage.inventory.length > 0 ? (
                <div className="divide-y">
                  {garage.inventory.map((item) => (
                    <div key={item.id} className="py-4 flex justify-between items-start">
                      <div>
                        <div className="font-semibold flex items-center">
                          {item.name}
                          <span className={`ml-2 text-xs ${
                            item.condition === "new" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          } px-2 py-1 rounded`}>
                            {item.condition}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-right mr-4">
                          <div className="font-semibold">₹{item.price.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{item.quantity} in stock</div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteInventory(item.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">No inventory items added yet</p>
                  <Button onClick={() => setInventoryDialogOpen(true)}>Add Your First Item</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {garage.is24Hours ? (
                    <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                      <Clock size={18} className="mr-2" />
                      <span>Your garage is set to operate 24/7</span>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p>Set your regular working hours</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="operating-hours"
                      checked={garage.is24Hours}
                      onCheckedChange={toggleIs24Hours}
                    />
                    <Label htmlFor="operating-hours">
                      Open 24/7
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck size={18} className="mr-2" />
                  Vehicle Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Select the types of vehicles your garage services
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="truck-type" checked={garage.vehicleTypes.includes("truck")} />
                    <Label htmlFor="truck-type">Truck</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="bus-type" checked={garage.vehicleTypes.includes("bus")} />
                    <Label htmlFor="bus-type">Bus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="car-type" checked={garage.vehicleTypes.includes("car")} />
                    <Label htmlFor="car-type">Car</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="bike-type" checked={garage.vehicleTypes.includes("bike")} />
                    <Label htmlFor="bike-type">Bike</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield size={18} className="mr-2" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Manage your garage's certificates and credentials
                </p>
                
                <div className="space-y-4">
                  {garage.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-green-600" />
                        <span>{cert}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash size={14} />
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus size={16} className="mr-1" />
                    Add Certification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GarageDashboard;
