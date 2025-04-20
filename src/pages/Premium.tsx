
import { Shield, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { fadeIn, slideIn, hoverScale } from "@/lib/animation";
import { motion } from "framer-motion";

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
        <div className={`text-center mb-12 ${fadeIn}`}>
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
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${slideIn} ${
                plan.popular ? "border-2 border-purple-500 relative" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 right-4 bg-purple-500 text-white px-4 py-1 rounded-full">
                  <Star className="h-4 w-4 mr-1 inline" /> Popular
                </Badge>
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
                  {plan.features.map((feature, i) => (
                    <li 
                      key={feature} 
                      className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
                      style={{ animationDelay: `${(index * 150) + (i * 100)}ms` }}
                    >
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full ${plan.buttonColor} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                >
                  Subscribe
                </Button>

                {/* Added benefit tag based on plan */}
                <div className="mt-4 text-center">
                  {plan.name === "Basic" && (
                    <span className="text-sm text-gray-600">Perfect for individual vehicle owners</span>
                  )}
                  {plan.name === "Pro" && (
                    <span className="text-sm text-purple-600 font-medium">Best value for money</span>
                  )}
                  {plan.name === "Business" && (
                    <span className="text-sm text-gray-600">Ideal for businesses with multiple vehicles</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Added testimonials section */}
        <div className={`mt-16 ${fadeIn}`} style={{ animationDelay: '600ms' }}>
          <h2 className="text-2xl font-bold text-center mb-8">What our premium members say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul Sharma",
                plan: "Pro",
                quote: "The Pro plan saved me during a late-night breakdown. The 24/7 support is worth every rupee!",
                role: "Business Owner"
              },
              {
                name: "Priya Patel",
                plan: "Basic",
                quote: "Even the Basic plan offers great value. The partner garage access helped me find reliable service.",
                role: "College Professor"
              },
              {
                name: "Vikram Singh",
                plan: "Business",
                quote: "Managing our company fleet has never been easier. The quarterly checks keep all vehicles in top condition.",
                role: "Fleet Manager"
              }
            ].map((testimonial, i) => (
              <div 
                key={testimonial.name} 
                className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${700 + (i * 100)}ms` }}
              >
                <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-trust rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.plan} Plan</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
