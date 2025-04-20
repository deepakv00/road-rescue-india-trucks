
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  negotiable: boolean;
}

export interface Inventory {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  condition: "new" | "used";
}

export interface Garage {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  is24Hours: boolean;
  rating: number;
  totalRatings: number;
  vehicleTypes: ("car" | "truck" | "bike" | "bus" | "other")[];
  services: Service[];
  inventory: Inventory[];
  certifications: string[];
}

// Mock data for garages
const mockGarages: Garage[] = [
  {
    id: "garage-1",
    name: "Highway Truck Services",
    address: "Highway 66, Near 45 km marker",
    latitude: 28.7041,
    longitude: 77.1025,
    phoneNumber: "+91-9876543210",
    is24Hours: true,
    rating: 4.7,
    totalRatings: 120,
    vehicleTypes: ["truck", "bus"],
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
    ],
    certifications: ["Tata Authorized", "Ashok Leyland Certified"]
  },
  {
    id: "garage-2",
    name: "Quick Fix Auto",
    address: "Highway 48, Near 78 km marker",
    latitude: 28.6139,
    longitude: 77.2090,
    phoneNumber: "+91-9876543211",
    is24Hours: false,
    rating: 4.2,
    totalRatings: 85,
    vehicleTypes: ["car", "bike"],
    services: [
      {
        id: "service-3",
        name: "Oil Change",
        description: "Replace engine oil and filter",
        price: 1200,
        negotiable: false,
      },
      {
        id: "service-4",
        name: "Battery Jump Start",
        description: "Jump start your vehicle's dead battery",
        price: 500,
        negotiable: false,
      }
    ],
    inventory: [
      {
        id: "inventory-2",
        name: "Car Battery",
        description: "Battery for passenger cars",
        price: 4500,
        quantity: 5,
        condition: "new",
      }
    ],
    certifications: ["Maruti Suzuki Authorized"]
  },
  {
    id: "garage-3",
    name: "Truck Masters",
    address: "Highway 2, Near 112 km marker",
    latitude: 28.5355,
    longitude: 77.3910,
    phoneNumber: "+91-9876543212",
    is24Hours: true,
    rating: 4.9,
    totalRatings: 210,
    vehicleTypes: ["truck"],
    services: [
      {
        id: "service-5",
        name: "Full Service",
        description: "Complete truck service and maintenance",
        price: 8000,
        negotiable: true,
      },
      {
        id: "service-6",
        name: "Hydraulics Repair",
        description: "Repair hydraulic systems for trucks",
        price: 6000,
        negotiable: true,
      }
    ],
    inventory: [
      {
        id: "inventory-3",
        name: "Brake Pads",
        description: "Heavy duty brake pads for trucks",
        price: 3500,
        quantity: 8,
        condition: "new",
      },
      {
        id: "inventory-4",
        name: "Used Engine Parts",
        description: "Various used engine parts in good condition",
        price: 12000,
        quantity: 3,
        condition: "used",
      }
    ],
    certifications: ["Tata Certified", "Mahindra Authorized", "Volvo Partner"]
  }
];

// Get all garages
export const getAllGarages = async (): Promise<Garage[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockGarages;
};

// Get garages by vehicle type
export const getGaragesByVehicleType = async (vehicleType: string): Promise<Garage[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockGarages.filter(garage => garage.vehicleTypes.includes(vehicleType as any));
};

// Get a specific garage by ID
export const getGarageById = async (id: string): Promise<Garage | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGarages.find(garage => garage.id === id);
};

// Save garages to localStorage for offline access
export const saveGaragesToCache = (garages: Garage[]): void => {
  try {
    localStorage.setItem('vehiclemate_garages', JSON.stringify(garages));
  } catch (e) {
    console.error("Error saving garages to cache:", e);
  }
};

// Get saved garages from localStorage
export const getSavedGarages = (): Garage[] => {
  try {
    const savedGarages = localStorage.getItem('vehiclemate_garages');
    return savedGarages ? JSON.parse(savedGarages) : [];
  } catch (e) {
    console.error("Error getting saved garages:", e);
    return [];
  }
};
