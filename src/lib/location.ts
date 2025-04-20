export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        
        // Get address using reverse geocoding (mock for now)
        getAddressFromCoordinates(location.latitude, location.longitude)
          .then(address => {
            location.address = address;
            resolve(location);
          })
          .catch(() => {
            // Even if address lookup fails, return coordinates
            resolve(location);
          });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Mock function to simulate reverse geocoding
// In production, you'd use a service like Google Maps or MapBox
export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock address based on coordinates
  return `Highway ${Math.floor(lng * 10) % 100}, Near ${Math.abs(Math.floor(lat * 100) % 100)} km marker`;
};

// Save locations to localStorage for offline access
export const saveLocationToCache = (location: Location): void => {
  try {
    const savedLocations = getSavedLocations();
    savedLocations.push(location);
    
    // Keep only the last 5 locations
    const recentLocations = savedLocations.slice(-5);
    
    localStorage.setItem('vehiclemate_locations', JSON.stringify(recentLocations));
  } catch (e) {
    console.error("Error saving location to cache:", e);
  }
};

// Get saved locations from localStorage
export const getSavedLocations = (): Location[] => {
  try {
    const savedLocations = localStorage.getItem('vehiclemate_locations');
    return savedLocations ? JSON.parse(savedLocations) : [];
  } catch (e) {
    console.error("Error getting saved locations:", e);
    return [];
  }
};
