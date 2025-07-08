"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for restaurants
const restaurants = [
  {
    id: "1",
    name: "Pizza Paradise",
    image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "Italian",
    rating: 4.8,
    reviewCount: 235,
    deliveryTime: 25,
    deliveryFee: "Free",
    tags: ["Featured", "20% OFF"],
    priceLevel: "$$"
  },
  {
    id: "2",
    name: "Burger Barn",
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "American",
    rating: 4.6,
    reviewCount: 187,
    deliveryTime: 20,
    deliveryFee: "Free",
    tags: ["Popular"],
    priceLevel: "$"
  },
  {
    id: "3",
    name: "Sushi Sensation",
    image: "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "Japanese",
    rating: 4.9,
    reviewCount: 312,
    deliveryTime: 30,
    deliveryFee: "$2.99",
    tags: ["Trending"],
    priceLevel: "$$$"
  },
  {
    id: "4",
    name: "Taco Temple",
    image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "Mexican",
    rating: 4.7,
    reviewCount: 156,
    deliveryTime: 25,
    deliveryFee: "Free",
    tags: ["New"],
    priceLevel: "$$"
  },
  {
    id: "5",
    name: "Noodle House",
    image: "https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "Chinese",
    rating: 4.5,
    reviewCount: 142,
    deliveryTime: 35,
    deliveryFee: "$1.99",
    tags: ["Popular"],
    priceLevel: "$$"
  },
  {
    id: "6",
    name: "Green Garden",
    image: "https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "Vegetarian",
    rating: 4.7,
    reviewCount: 98,
    deliveryTime: 20,
    deliveryFee: "$2.99",
    tags: ["Healthy"],
    priceLevel: "$$"
  }
];

export default function RestaurantGrid() {
  const [sortOption, setSortOption] = useState("recommended");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{restaurants.length}</span> restaurants
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="delivery-time">Delivery Time</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id} className="staggered-item">
            <Card className="overflow-hidden border-none food-card-shadow hover:cursor-pointer">
              <div className="relative h-48">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {restaurant.tags.map((tag) => (
                    <Badge key={tag} variant={tag === "20% OFF" ? "destructive" : "secondary"} className="font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                  <div className="flex items-center bg-primary/10 text-primary rounded-full px-2 py-1">
                    <Star className="h-3 w-3 fill-primary mr-1" />
                    <span className="text-xs font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-muted-foreground text-sm mb-3">
                  <span>{restaurant.cuisine}</span>
                  <span className="mx-2">•</span>
                  <span>{restaurant.priceLevel}</span>
                  <span className="mx-2">•</span>
                  <span>{restaurant.reviewCount} reviews</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Zap className="h-4 w-4 mr-1" />
                    <span>{restaurant.deliveryFee} delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Button variant="outline" size="lg">
          Load More
        </Button>
      </div>
    </div>
  );
}