import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Star, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample data for featured restaurants
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
  }
];

export default function FeaturedRestaurants() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Restaurants</h2>
            <p className="text-muted-foreground">Top-rated restaurants near you</p>
          </div>
          <Link href="/restaurants">
            <Button variant="link" className="mt-2 md:mt-0">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}