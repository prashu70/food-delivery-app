"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function OrderConfirmationPage() {
  const [progress, setProgress] = useState(15);
  const [status, setStatus] = useState("Order Confirmed");
  const [statusDescription, setStatusDescription] = useState("Your order has been received by the restaurant");
  
  // Simulate order progress updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 15;
          
          // Update status based on progress
          if (newProgress >= 35 && newProgress < 65) {
            setStatus("Preparing");
            setStatusDescription("The restaurant is preparing your food");
          } else if (newProgress >= 65 && newProgress < 100) {
            setStatus("Out for Delivery");
            setStatusDescription("Your order is on the way");
          } else if (newProgress >= 100) {
            setStatus("Delivered");
            setStatusDescription("Your order has been delivered");
          }
          
          return newProgress;
        });
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [progress]);

  // Order details (would come from API/context in a real app)
  const orderDetails = {
    id: "ORD-12345",
    restaurant: "Pizza Paradise",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
      { name: "Garlic Bread", quantity: 1, price: 4.99 },
      { name: "Soda", quantity: 2, price: 2.49 }
    ],
    paymentMethod: "Credit Card",
    subtotal: 37.95,
    deliveryFee: 3.99,
    serviceFee: 3.80,
    total: 45.74,
    date: new Date().toISOString(),
    estimatedDelivery: "25-40 minutes"
  };
  
  return (
    <div className="container max-w-2xl mx-auto px-4 py-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your order. Your food is being prepared and will be delivered shortly.
        </p>
      </div>
      
      {/* Order Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div>Order Status</div>
            <div className="text-lg font-semibold text-primary">{status}</div>
          </CardTitle>
          <CardDescription>{statusDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-4 text-center">
              <div className={`space-y-2 ${progress >= 15 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto ${progress >= 15 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  1
                </div>
                <div className="text-xs">Confirmed</div>
              </div>
              <div className={`space-y-2 ${progress >= 35 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto ${progress >= 35 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  2
                </div>
                <div className="text-xs">Preparing</div>
              </div>
              <div className={`space-y-2 ${progress >= 65 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto ${progress >= 65 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  3
                </div>
                <div className="text-xs">On the way</div>
              </div>
              <div className={`space-y-2 ${progress >= 100 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto ${progress >= 100 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  4
                </div>
                <div className="text-xs">Delivered</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Estimated Delivery</div>
                  <div className="text-sm text-muted-foreground">{orderDetails.estimatedDelivery}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Delivery Address</div>
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {orderDetails.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>
            Order #{orderDetails.id} from {orderDetails.restaurant}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.quantity}×</span> {item.name}
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span>${orderDetails.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Service Fee</span>
              <span>${orderDetails.serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2">
              <span>Total</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="font-medium">Payment Method</div>
              <div>{orderDetails.paymentMethod}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Order Date</div>
              <div>{new Date(orderDetails.date).toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link href="/restaurants">
          <Button variant="outline" size="lg" className="w-full">
            Browse More Restaurants
          </Button>
        </Link>
        <Link href="/orders">
          <Button size="lg" className="w-full gap-2">
            Track Order
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}