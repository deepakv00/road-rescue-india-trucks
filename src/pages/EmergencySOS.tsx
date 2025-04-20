
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleAlert, Phone, Flag, Truck, MapPin, Shield } from "lucide-react";

const EmergencySOS = () => {
  const emergencyContacts = [
    { name: "Highway Patrol", number: "1-800-HIGHWAY" },
    { name: "National Emergency", number: "911" },
    { name: "Police Control Room", number: "100" },
  ];

  const safetyTips = [
    "Turn on hazard lights and place warning triangles",
    "Move to a safe spot away from traffic",
    "Keep emergency contacts readily available",
    "Always carry a basic emergency kit",
    "Stay inside your vehicle if conditions are unsafe",
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center gap-2 mb-6">
        <CircleAlert className="h-8 w-8 text-emergency" />
        <h1 className="text-3xl font-bold">Emergency SOS</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-emergency" />
              Highway Patrol
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">For immediate highway assistance and emergencies.</p>
            <Button className="w-full bg-emergency hover:bg-emergency-hover">
              <Phone className="h-4 w-4 mr-2" />
              Call Highway Patrol
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-trust" />
              Towing Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Request immediate towing assistance.</p>
            <Link to="/towing">
              <Button className="w-full">Request Towing</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-trust" />
              Find Garages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Locate nearby garages for assistance.</p>
            <Link to="/garages">
              <Button className="w-full">Find Garages</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-trust" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {emergencyContacts.map((contact) => (
                <li key={contact.name} className="flex justify-between items-center">
                  <span>{contact.name}</span>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.number}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-trust" />
              Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {safetyTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-trust flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencySOS;
