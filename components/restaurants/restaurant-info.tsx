"use client";

import { MapPin, Clock, Phone, Globe, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface RestaurantInfoProps {
  restaurant: {
    name: string;
    address: string;
    phoneNumber: string;
    openingHours: string;
    description: string;
  };
}

export default function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Restaurant Information</h3>
        <p className="text-muted-foreground">{restaurant.description}</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Location & Hours</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map (placeholder - would be replaced with actual map) */}
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
            <span className="text-muted-foreground">Map Placeholder</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Address</h4>
                <p className="text-muted-foreground">{restaurant.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Hours</h4>
                <p className="text-muted-foreground">{restaurant.openingHours}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-muted-foreground">{restaurant.phoneNumber}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Website</h4>
                <a href="#" className="text-primary hover:underline">
                  Visit website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        
        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium">Food Allergies</h4>
            <p className="text-sm">
              If you have a food allergy or intolerance (or someone you're ordering for has), 
              please call the restaurant directly before placing your order.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InfoCard title="Cuisines" content={["Italian", "Pizza", "Pasta"]} />
          <InfoCard title="Features" content={["Delivery", "Takeout", "Outdoor Seating"]} />
          <InfoCard title="Payments" content={["Credit Cards", "Cash", "Mobile Payments"]} />
        </div>
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  content: string[];
}

function InfoCard({ title, content }: InfoCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h4 className="font-medium mb-2">{title}</h4>
      <ul className="text-muted-foreground space-y-1">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}