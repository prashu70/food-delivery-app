"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

const cuisines: FilterOption[] = [
  { id: "italian", label: "Italian" },
  { id: "american", label: "American" },
  { id: "japanese", label: "Japanese" },
  { id: "mexican", label: "Mexican" },
  { id: "chinese", label: "Chinese" },
  { id: "thai", label: "Thai" },
  { id: "indian", label: "Indian" },
  { id: "vegetarian", label: "Vegetarian" },
];

const dietary: FilterOption[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "dairy-free", label: "Dairy Free" },
  { id: "nut-free", label: "Nut Free" },
];

const priceRanges: FilterOption[] = [
  { id: "$", label: "Inexpensive ($)" },
  { id: "$$", label: "Moderate ($$)" },
  { id: "$$$", label: "Expensive ($$$)" },
  { id: "$$$$", label: "Very Expensive ($$$$)" },
];

export default function RestaurantFilters() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<number[]>([45]);
  const [minRating, setMinRating] = useState<number[]>([3]);

  const toggleCuisineFilter = (id: string) => {
    setSelectedCuisines((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleDietaryFilter = (id: string) => {
    setSelectedDietary((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const togglePriceRangeFilter = (id: string) => {
    setSelectedPriceRanges((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedCuisines([]);
    setSelectedDietary([]);
    setSelectedPriceRanges([]);
    setDeliveryTime([45]);
    setMinRating([3]);
  };

  const totalFiltersCount =
    selectedCuisines.length +
    selectedDietary.length +
    selectedPriceRanges.length +
    (deliveryTime[0] < 45 ? 1 : 0) +
    (minRating[0] > 3 ? 1 : 0);

  return (
    <div className="bg-background rounded-lg border border-border p-6 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {totalFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground text-xs h-auto py-1"
          >
            Clear all
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["cuisines", "price", "delivery", "rating"]}>
        <AccordionItem value="cuisines">
          <AccordionTrigger>Cuisines</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {cuisines.map((cuisine) => (
                <div key={cuisine.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine.id}`}
                    checked={selectedCuisines.includes(cuisine.id)}
                    onCheckedChange={() => toggleCuisineFilter(cuisine.id)}
                  />
                  <Label
                    htmlFor={`cuisine-${cuisine.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {cuisine.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dietary">
          <AccordionTrigger>Dietary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {dietary.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dietary-${option.id}`}
                    checked={selectedDietary.includes(option.id)}
                    onCheckedChange={() => toggleDietaryFilter(option.id)}
                  />
                  <Label
                    htmlFor={`dietary-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {priceRanges.map((price) => (
                <div key={price.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${price.id}`}
                    checked={selectedPriceRanges.includes(price.id)}
                    onCheckedChange={() => togglePriceRangeFilter(price.id)}
                  />
                  <Label
                    htmlFor={`price-${price.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {price.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="delivery">
          <AccordionTrigger>Delivery Time</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={deliveryTime}
                max={60}
                step={5}
                onValueChange={setDeliveryTime}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Under {deliveryTime[0]} min</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Minimum Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={minRating}
                min={1}
                max={5}
                step={0.5}
                onValueChange={setMinRating}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{minRating[0]}+ Stars</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-6">Apply Filters</Button>
    </div>
  );
}