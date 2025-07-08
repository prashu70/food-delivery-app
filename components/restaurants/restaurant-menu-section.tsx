"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface RestaurantMenuSectionProps {
  id: string;
  category: MenuCategory;
  restaurantId: string;
  restaurantName: string;
}

export default function RestaurantMenuSection({
  id,
  category,
  restaurantId,
  restaurantName
}: RestaurantMenuSectionProps) {
  return (
    <div id={id} className="scroll-mt-32">
      <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map((item) => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            restaurantId={restaurantId} 
            restaurantName={restaurantName}
          />
        ))}
      </div>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    // In a real app, we would also include the selected options
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.image,
      restaurantId,
      restaurantName
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${item.name} added to your order.`,
    });
    
    setIsDialogOpen(false);
    setQuantity(1);
    setSelectedSize("medium");
    setSpecialInstructions("");
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 p-4">
              <div className="flex justify-between">
                <h4 className="font-medium mb-1">{item.name}</h4>
                {item.popular && (
                  <Badge variant="outline" className="text-primary border-primary">
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="mt-auto font-medium">${item.price.toFixed(2)}</div>
            </div>
            {item.image && (
              <div className="md:w-24 md:h-24 h-32 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select size</SelectLabel>
                    <SelectItem value="small">Small (+ $0.00)</SelectItem>
                    <SelectItem value="medium">Medium (+ $2.00)</SelectItem>
                    <SelectItem value="large">Large (+ $4.00)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Input
                id="instructions"
                placeholder="E.g., Extra cheese, no onions, etc."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Quantity</Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-center w-8">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-medium">
            Total: ${(item.price * quantity).toFixed(2)}
          </div>
          <Button onClick={handleAddToCart}>Add to Order</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}