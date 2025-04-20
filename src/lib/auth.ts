
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "garage_owner";
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  role: "user" | "garage_owner";
}

// Mock API call - would be replaced with actual API call
const mockLoginDelay = () => new Promise(resolve => setTimeout(resolve, 800));

export const loginUser = async (data: LoginData): Promise<User | null> => {
  try {
    // Simulate API call
    await mockLoginDelay();
    
    // For demo, create mock response
    // In production, this would be a fetch to your backend
    const mockUser: User = {
      id: "user-123",
      name: data.email.split('@')[0],
      email: data.email,
      role: "user",
      token: "jwt-token-would-be-here"
    };
    
    // Store in localStorage
    localStorage.setItem('vehiclemate_user', JSON.stringify(mockUser));
    
    return mockUser;
  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Login failed. Please try again.");
    return null;
  }
};

export const registerUser = async (data: RegisterData): Promise<User | null> => {
  try {
    // Simulate API call
    await mockLoginDelay();
    
    // For demo, create mock response
    const mockUser: User = {
      id: "user-" + Math.floor(Math.random() * 1000),
      name: data.name,
      email: data.email,
      role: data.role,
      token: "jwt-token-would-be-here"
    };
    
    // Store in localStorage
    localStorage.setItem('vehiclemate_user', JSON.stringify(mockUser));
    
    return mockUser;
  } catch (error) {
    console.error("Registration failed:", error);
    toast.error("Registration failed. Please try again.");
    return null;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('vehiclemate_user');
  window.location.href = '/';
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('vehiclemate_user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (e) {
    console.error("Error parsing user data:", e);
    return null;
  }
};
