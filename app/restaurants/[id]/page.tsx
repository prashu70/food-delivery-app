"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Zap, MapPin, Phone, Info, ChevronRight, Heart } from "lucide-react";
import RestaurantMenuSection from "@/components/restaurants/restaurant-menu-section";
import RestaurantReviews from "@/components/restaurants/restaurant-reviews";
import RestaurantInfo from "@/components/restaurants/restaurant-info";

// Sample restaurant data (to be replaced with actual API call)
const restaurantData = {
  id: "1",
  name: "Pizza Paradise",
  image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  coverImage: "https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  cuisine: "Italian",
  rating: 4.8,
  reviewCount: 235,
  deliveryTime: 25,
  deliveryFee: "Free",
  distance: "1.2 mi",
  address: "123 Main St, New York, NY 10001",
  phoneNumber: "(555) 123-4567",
  openingHours: "10:00 AM - 10:00 PM",
  tags: ["Featured", "20% OFF"],
  priceLevel: "$$",
  description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes. Our wood-fired oven gives our pizzas a unique flavor that you won't find anywhere else."
};

// Sample menu categories and items
const menuCategories = [
  {
    id: "1",
    name: "Popular Items",
    items: [
      {
        id: "item1",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 12.99,
        image: "https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        popular: true,
      },
      {
        id: "item2",
        name: "Pepperoni Pizza",
        description: "Margherita pizza topped with pepperoni slices",
        price: 14.99,
        image: "https://images.pexels.com/photos/7813577/pexels-photo-7813577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        popular: true,
      },
    ]
  },
  {
    id: "2",
    name: "Pizzas",
    items: [
      {
        id: "item3",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 12.99,
        image: "https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: "item4",
        name: "Pepperoni Pizza",
        description: "Margherita pizza topped with pepperoni slices",
        price: 14.99,
        image: "https://images.pexels.com/photos/7813577/pexels-photo-7813577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: "item5",
        name: "Vegetarian Pizza",
        description: "Loaded with bell peppers, mushrooms, onions, olives, and cheese",
        price: 15.99,
        image: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: "item6",
        name: "Hawaiian Pizza",
        description: "Ham, pineapple, and cheese on tomato sauce",
        price: 14.99,
        image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ]
  },
  {
    id: "3",
    name: "Pasta",
    items: [
      {
        id: "item7",
        name: "Spaghetti Bolognese",
        description: "Spaghetti served with meat sauce and parmesan cheese",
        price: 13.99,
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: "item8",
        name: "Fettuccine Alfredo",
        description: "Fettuccine pasta with creamy Alfredo sauce",
        price: 14.99,
        image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ]
  },
  {
    id: "4",
    name: "Sides",
    items: [
      {
        id: "item9",
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs",
        price: 4.99,
        image: "https://images.pexels.com/photos/1252357/pexels-photo-1252357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: "item10",
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
        price: 6.99,
        image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ]
  },
  {
    id: "5",
    name: "Drinks",
    items: [
      {
        id: "item11",
        name: "Soda",
        description: "Choice of Coke, Diet Coke, Sprite, or Fanta",
        price: 2.49,
        image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: "item12",
        name: "Iced Tea",
        description: "Freshly brewed iced tea, sweetened or unsweetened",
        price: 2.99,
        image: "https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ]
  },
];

// Sample reviews
const reviews = [
  {
    id: "1",
    userName: "John Doe",
    rating: 5,
    date: "2023-08-15",
    comment: "Amazing pizza! The crust was perfect and the toppings were fresh.",
    userImage: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "2",
    userName: "Jane Smith",
    rating: 4,
    date: "2023-08-10",
    comment: "Good food, but delivery was a bit slow. Still worth it for the quality.",
    userImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "3",
    userName: "Mike Johnson",
    rating: 5,
    date: "2023-08-05",
    comment: "Best pizza in town! Will definitely order again.",
    userImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params.id as string;
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  
  // In a real app, you would fetch the restaurant data based on the ID
  // useEffect(() => {
  //   const fetchRestaurant = async () => {
  //     const response = await fetch(`/api/restaurants/${restaurantId}`);
  //     const data = await response.json();
  //     setRestaurant(data);
  //   };
  //   fetchRestaurant();
  // }, [restaurantId]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20">
      {/* Restaurant Header - Cover Image */}
      <div className="relative w-full h-[300px]">
        <img
          src={restaurantData.coverImage}
          alt={restaurantData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-white gap-2">
              <span className="text-sm">Restaurants</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sm">{restaurantData.cuisine}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sm font-medium">{restaurantData.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Restaurant Info */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{restaurantData.name}</h1>
                  <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                    <span>{restaurantData.cuisine}</span>
                    <span className="mx-1">•</span>
                    <span>{restaurantData.priceLevel}</span>
                    <span className="mx-1">•</span>
                    <span>{restaurantData.distance} away</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-primary/10 text-primary rounded-full px-2 py-1">
                      <Star className="h-4 w-4 fill-primary mr-1" />
                      <span className="text-sm font-medium">{restaurantData.rating}</span>
                      <span className="text-xs ml-1">({restaurantData.reviewCount})</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{restaurantData.deliveryTime} min</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Zap className="h-4 w-4 mr-1" />
                      <span className="text-sm">{restaurantData.deliveryFee} delivery</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Save</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Directions</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground">{restaurantData.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="menu" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="info">Restaurant Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="menu" className="space-y-8">
                {/* Category Navigation */}
                <div className="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 sticky top-20 bg-background z-10 border-b">
                  {menuCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => scrollToCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                
                {/* Menu Sections */}
                {menuCategories.map((category) => (
                  <RestaurantMenuSection
                    key={category.id}
                    id={`category-${category.id}`}
                    category={category}
                    restaurantId={restaurantId}
                    restaurantName={restaurantData.name}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="reviews">
                <RestaurantReviews reviews={reviews} rating={restaurantData.rating} reviewCount={restaurantData.reviewCount} />
              </TabsContent>
              
              <TabsContent value="info">
                <RestaurantInfo restaurant={restaurantData} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order/Cart Summary on desktop */}
          <div className="hidden md:block w-80 lg:w-96">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Your Order</h3>
              <div className="text-center py-12">
                <div className="mb-4">
                  <ShoppingBagIcon className="w-16 h-16 mx-auto text-muted-foreground" />
                </div>
                <h4 className="text-lg font-medium mb-2">Add items to your order</h4>
                <p className="text-muted-foreground mb-6">Browse the menu and add items to start your order</p>
                <Button size="sm">Start Ordering</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Internal component for the empty cart icon
function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}