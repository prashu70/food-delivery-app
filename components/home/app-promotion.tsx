import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";

export default function AppPromotion() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Download the FoodDash App
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg">
              Get the best food delivery experience with our mobile app. Order food, track your delivery in real-time, and enjoy exclusive offers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="gap-2">
                <Apple className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download on the</span>
                  <span className="text-sm font-medium">App Store</span>
                </div>
              </Button>
              
              <Button className="gap-2">
                <Smartphone className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">GET IT ON</span>
                  <span className="text-sm font-medium">Google Play</span>
                </div>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Restaurants</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/7438102/pexels-photo-7438102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="FoodDash mobile app" 
              className="rounded-2xl shadow-lg mx-auto"
            />
            
            <div className="absolute -top-5 -right-5 bg-background rounded-xl p-4 shadow-lg hidden md:block">
              <div className="text-center">
                <div className="font-bold text-lg">4.9<span className="text-primary">★</span></div>
                <div className="text-xs text-muted-foreground">App Store Rating</div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -left-5 bg-background rounded-xl p-4 shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Food" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium">Order Delivered</div>
                  <div className="text-xs text-muted-foreground">25 mins ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}