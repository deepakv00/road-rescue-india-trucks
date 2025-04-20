
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleAlert, Phone, Flag, Truck, MapPin, Shield, Check, AlertTriangle } from "lucide-react";
import { fadeIn, slideIn, hoverScale } from "@/lib/animation";

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
      <div className={`flex items-center gap-2 mb-6 ${fadeIn}`}>
        <AlertTriangle className="h-8 w-8 text-emergency animate-pulse" />
        <h1 className="text-3xl font-bold">Emergency SOS</h1>
      </div>
      
      {/* Emergency Action Banner */}
      <div className={`bg-emergency/10 border border-emergency rounded-lg p-4 mb-8 ${slideIn}`}>
        <div className="flex items-center gap-2">
          <CircleAlert className="h-6 w-6 text-emergency" />
          <p className="font-medium">In case of emergency, please immediately contact the relevant service below</p>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8`}>
        {[
          {
            title: "Highway Patrol",
            icon: <Flag className="h-5 w-5 text-emergency" />,
            description: "For immediate highway assistance and emergencies.",
            action: "Call Highway Patrol",
            actionIcon: <Phone className="h-4 w-4 mr-2" />,
            buttonClass: "bg-emergency hover:bg-emergency-hover"
          },
          {
            title: "Towing Service",
            icon: <Truck className="h-5 w-5 text-trust" />,
            description: "Request immediate towing assistance.",
            action: "Request Towing",
            linkTo: "/towing",
            buttonClass: ""
          },
          {
            title: "Find Garages",
            icon: <MapPin className="h-5 w-5 text-trust" />,
            description: "Locate nearby garages for assistance.",
            action: "Find Garages",
            linkTo: "/garages",
            buttonClass: ""
          }
        ].map((service, index) => (
          <Card
            key={service.title}
            className={`${hoverScale} transition-all duration-300 border-l-4 ${
              service.title === "Highway Patrol" ? "border-l-emergency" : "border-l-trust"
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {service.icon}
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{service.description}</p>
              {service.linkTo ? (
                <Link to={service.linkTo}>
                  <Button className={`w-full ${service.buttonClass} transition-all duration-300 hover:-translate-y-1`}>
                    {service.action}
                  </Button>
                </Link>
              ) : (
                <Button className={`w-full ${service.buttonClass} transition-all duration-300 hover:-translate-y-1`}>
                  {service.actionIcon}
                  {service.action}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
        <Card className={`${slideIn}`} style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-trust" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <li 
                  key={contact.name} 
                  className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-all duration-200"
                  style={{ animationDelay: `${400 + (index * 100)}ms` }}
                >
                  <span>{contact.name}</span>
                  <Button 
                    variant="outline" 
                    className="border-trust text-trust hover:bg-trust hover:text-white transition-all duration-300"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.number}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className={`${slideIn}`} style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-trust" />
              Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {safetyTips.map((tip, index) => (
                <li 
                  key={tip} 
                  className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-md transition-all duration-200"
                  style={{ animationDelay: `${500 + (index * 100)}ms` }}
                >
                  <Check className="h-4 w-4 mt-1 text-trust flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Emergency Kit Information */}
      <div className={`mt-8 bg-gray-50 p-6 rounded-lg ${fadeIn}`} style={{ animationDelay: '800ms' }}>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-trust" />
          Emergency Kit Essentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "First Aid Kit",
            "Flashlight & Batteries",
            "Warning Triangles",
            "Jump Starter",
            "Tire Inflation Kit",
            "Water & Snacks",
            "Blanket",
            "Multi-tool"
          ].map((item, index) => (
            <div 
              key={item} 
              className="bg-white p-3 rounded border border-gray-200 flex items-center gap-2 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${900 + (index * 50)}ms` }}
            >
              <Check className="h-4 w-4 text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencySOS;
