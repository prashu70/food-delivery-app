"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ShoppingBag, 
  ArrowRight, 
  CircleCheck, 
  CircleDashed, 
  CircleEllipsis,
  CircleX
} from "lucide-react";
import { useSession } from "next-auth/react";

// Sample orders data (would come from an API in a real app)
const orders = [
  {
    id: "ORD-12345",
    restaurant: {
      id: "1",
      name: "Pizza Paradise",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    items: [
      { name: "Margherita Pizza", quantity: 1 },
      { name: "Pepperoni Pizza", quantity: 1 },
      { name: "Garlic Bread", quantity: 1 },
      { name: "Soda", quantity: 2 },
    ],
    total: 45.74,
    status: "delivered",
    date: "2025-06-15T18:30:00.000Z"
  },
  {
    id: "ORD-12346",
    restaurant: {
      id: "2",
      name: "Burger Barn",
      image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    items: [
      { name: "Double Cheeseburger", quantity: 1 },
      { name: "French Fries", quantity: 2 },
      { name: "Chocolate Milkshake", quantity: 1 },
    ],
    total: 27.99,
    status: "in_progress",
    date: "2025-06-14T19:45:00.000Z"
  },
  {
    id: "ORD-12347",
    restaurant: {
      id: "3",
      name: "Sushi Sensation",
      image: "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    items: [
      { name: "California Roll", quantity: 2 },
      { name: "Salmon Nigiri", quantity: 4 },
      { name: "Miso Soup", quantity: 1 },
    ],
    total: 38.50,
    status: "cancelled",
    date: "2025-06-10T20:15:00.000Z"
  },
];

export default function OrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  
  if (!session) {
    router.push("/auth/sign-in?redirect=/orders");
    return null;
  }
  
  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab);
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">
          Track and review your order history
        </p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === "all" 
                    ? "You haven't placed any orders yet." 
                    : activeTab === "in_progress" 
                      ? "You don't have any orders in progress." 
                      : activeTab === "delivered" 
                        ? "You don't have any delivered orders."
                        : "You don't have any cancelled orders."}
                </p>
                <Link href="/restaurants">
                  <Button>Browse Restaurants</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface OrderCardProps {
  order: {
    id: string;
    restaurant: {
      id: string;
      name: string;
      image: string;
    };
    items: {
      name: string;
      quantity: number;
    }[];
    total: number;
    status: string;
    date: string;
  };
}

function OrderCard({ order }: OrderCardProps) {
  const statusIcons = {
    in_progress: <CircleEllipsis className="h-5 w-5 text-amber-500" />,
    delivered: <CircleCheck className="h-5 w-5 text-green-500" />,
    cancelled: <CircleX className="h-5 w-5 text-red-500" />,
    pending: <CircleDashed className="h-5 w-5 text-blue-500" />,
  };
  
  const statusText = {
    in_progress: "In Progress",
    delivered: "Delivered",
    cancelled: "Cancelled",
    pending: "Pending",
  };
  
  const orderDate = new Date(order.date);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.restaurant.name}</CardTitle>
            <CardDescription>
              {orderDate.toLocaleDateString()} at {orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </CardDescription>
          </div>
          <Badge 
            variant={order.status === "cancelled" ? "destructive" : "outline"} 
            className="flex items-center gap-1"
          >
            {statusIcons[order.status as keyof typeof statusIcons]}
            <span>{statusText[order.status as keyof typeof statusText]}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
            <img
              src={order.restaurant.image}
              alt={order.restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="mb-2 text-sm">
              <div className="font-medium">Order #{order.id}</div>
              <div className="text-muted-foreground">
                {order.items.reduce((total, item) => total + item.quantity, 0)} items for ${order.total.toFixed(2)}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                  {item.quantity}× {item.name}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Link href={`/order-tracking/${order.id}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Track Order</span>
                </Button>
              </Link>
              
              <Link href={`/restaurants/${order.restaurant.id}`}>
                <Button variant="ghost" size="sm" className="text-primary gap-1">
                  <span>Order Again</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}