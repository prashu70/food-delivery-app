"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

export default function Hero() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      router.push(`/restaurants?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="relative hero-gradient min-h-[85vh] flex items-center pt-20">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Delicious Food
              <span className="text-primary"> Delivered</span> To Your Doorstep
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              Order from your favorite restaurants and get your food delivered in minutes. 
              Fast, reliable, and delicious meals at your fingertips.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter your delivery address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 py-6 border border-border rounded-lg"
                />
              </div>
              <Button type="submit" size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                <span>Find Food</span>
              </Button>
            </form>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-medium">✓</span>
                </div>
                <span>Free delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-medium">✓</span>
                </div>
                <span>30 min or free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-medium">✓</span>
                </div>
                <span>Contactless</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <img
              src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Delicious food delivery"
              className="rounded-2xl shadow-2xl animate-fadeUp"
            />
            
            <div className="absolute -bottom-10 -left-10 bg-background rounded-xl p-4 shadow-lg animate-fadeUp" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Food"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Italian Pasta</h4>
                  <p className="text-sm text-muted-foreground">Delivery in 20 min</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-5 -right-5 bg-background rounded-xl p-4 shadow-lg animate-fadeUp" style={{ animationDelay: "0.3s" }}>
              <div className="text-center">
                <h4 className="font-semibold text-lg">4.9<span className="text-primary">★</span></h4>
                <p className="text-sm text-muted-foreground">500+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}