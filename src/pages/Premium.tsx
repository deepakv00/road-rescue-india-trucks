
import { Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Premium = () => {
  const features = [
    "Priority Support 24/7",
    "Discounted Towing Services",
    "Emergency Roadside Assistance",
    "Exclusive Garage Discounts",
    "Advanced Booking Features",
    "Premium Community Badge",
  ];

  const handleSubscribe = () => {
    toast.success("Premium feature coming soon!");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-trust" />
        </div>
        <h1 className="text-3xl font-bold mb-4">VehicleMate Premium</h1>
        <p className="text-gray-600 mb-8">
          Upgrade your roadside assistance experience with premium features
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Premium Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-5 w-5 text-trust mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleSubscribe}
              className="w-full mt-8 bg-trust hover:bg-trust/90"
            >
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Premium;
