"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export default function RestaurantsHeader() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "New York");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the URL with search params
    console.log("Searching for:", searchQuery, "in", location);
  };

  return (
    <div className="bg-muted py-8">
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Restaurants in {location}</h1>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for restaurants or cuisines"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 border border-border rounded-lg"
            />
          </div>
          
          <div className="relative w-full sm:w-72">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 py-6 border border-border rounded-lg"
            />
          </div>
          
          <Button type="submit" size="lg" className="shrink-0">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}