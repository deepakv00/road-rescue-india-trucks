
import { Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Premium = () => {
  const plans = [
    {
      name: "Basic",
      price: "999",
      features: [
        "1 free towing service (up to 25km)",
        "5% discount on repairs",
        "Priority customer support",
        "Access to partner garages",
      ],
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Pro",
      price: "2,499",
      popular: true,
      features: [
        "3 free towing services (up to 50km each)",
        "15% discount on repairs",
        "24/7 priority customer support",
        "Access to all partner garages",
        "Free basic inspection twice a year",
      ],
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
    {
      name: "Business",
      price: "5,999",
      features: [
        "Unlimited towing services (up to 100km each)",
        "25% discount on all repairs",
        "Dedicated account manager",
        "Fleet management features",
        "Quarterly maintenance checks",
        "Emergency roadside assistance",
      ],
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  const handleSubscribe = (plan: string) => {
    toast.success(`Subscribing to ${plan} plan coming soon!`);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-trust animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-trust to-blue-400 bg-clip-text text-transparent">
            VehicleMate Premium
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan to enhance your roadside assistance experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`transform transition-all duration-500 hover:scale-105 ${
                plan.popular ? "border-2 border-purple-500 relative" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 right-4 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                  Popular
                </span>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full ${plan.buttonColor} transition-all duration-300 transform hover:-translate-y-1`}
                >
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
