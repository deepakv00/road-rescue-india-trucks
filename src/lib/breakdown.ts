
import { Location } from "./location";

export type VehicleType = "car" | "truck" | "bike" | "bus" | "other";

export interface BreakdownIssue {
  id: string;
  name: string;
  description: string;
  urgency: "low" | "medium" | "high";
}

export const breakdownIssues: BreakdownIssue[] = [
  {
    id: "issue-1",
    name: "Flat Tire",
    description: "Vehicle has a flat or punctured tire",
    urgency: "medium"
  },
  {
    id: "issue-2",
    name: "Engine Failure",
    description: "Engine has stopped working or won't start",
    urgency: "high"
  },
  {
    id: "issue-3",
    name: "Battery Dead",
    description: "Battery is dead and vehicle won't start",
    urgency: "medium"
  },
  {
    id: "issue-4",
    name: "Brake Issues",
    description: "Problems with the braking system",
    urgency: "high"
  },
  {
    id: "issue-5",
    name: "Overheating",
    description: "Engine is overheating",
    urgency: "high"
  },
  {
    id: "issue-6",
    name: "Fuel Issues",
    description: "Out of fuel or fuel system problems",
    urgency: "medium"
  },
  {
    id: "issue-7",
    name: "Electrical Issues",
    description: "Problems with the vehicle's electrical system",
    urgency: "medium"
  },
  {
    id: "issue-8",
    name: "Transmission Problems",
    description: "Issues with the vehicle's transmission",
    urgency: "high"
  },
  {
    id: "issue-9",
    name: "Lights Not Working",
    description: "Headlights, taillights, or indicators not working",
    urgency: "low"
  },
  {
    id: "issue-10",
    name: "Other",
    description: "Other issues not listed",
    urgency: "medium"
  }
];

export interface BreakdownReport {
  id: string;
  userId: string;
  vehicleType: VehicleType;
  issueId: string;
  description?: string;
  location: Location;
  createdAt: string;
  status: "pending" | "assigned" | "resolved";
  assignedGarageId?: string;
}

// Report a breakdown
export const reportBreakdown = async (
  userId: string,
  vehicleType: VehicleType,
  issueId: string,
  description: string,
  location: Location
): Promise<BreakdownReport> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create breakdown report
  const report: BreakdownReport = {
    id: "report-" + Date.now(),
    userId,
    vehicleType,
    issueId,
    description,
    location,
    createdAt: new Date().toISOString(),
    status: "pending"
  };
  
  // Save to localStorage for offline/demo purposes
  saveBreakdownReport(report);
  
  return report;
};

// Save breakdown report to localStorage
export const saveBreakdownReport = (report: BreakdownReport): void => {
  try {
    const reports = getBreakdownReports();
    reports.push(report);
    localStorage.setItem('vehiclemate_breakdowns', JSON.stringify(reports));
  } catch (e) {
    console.error("Error saving breakdown report:", e);
  }
};

// Get breakdown reports from localStorage
export const getBreakdownReports = (): BreakdownReport[] => {
  try {
    const reports = localStorage.getItem('vehiclemate_breakdowns');
    return reports ? JSON.parse(reports) : [];
  } catch (e) {
    console.error("Error getting breakdown reports:", e);
    return [];
  }
};

// Get a specific breakdown report by ID
export const getBreakdownReportById = (id: string): BreakdownReport | undefined => {
  return getBreakdownReports().find(report => report.id === id);
};
