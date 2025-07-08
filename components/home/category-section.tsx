import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pizza, Coffee, Beef, Sandwich, IceCream, Fish, Carrot, ArrowRight } from "lucide-react";

interface FoodCategory {
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const categories: FoodCategory[] = [
  {
    name: "Pizza",
    icon: <Pizza className="h-6 w-6" />,
    href: "/restaurants?category=pizza",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  },
  {
    name: "Burger",
    icon: <Beef className="h-6 w-6" />,
    href: "/restaurants?category=burger",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  },
  {
    name: "Coffee",
    icon: <Coffee className="h-6 w-6" />,
    href: "/restaurants?category=coffee",
    color: "bg-brown-100 text-brown-600 dark:bg-brown-900/30 dark:text-brown-400"
  },
  {
    name: "Sandwich",
    icon: <Sandwich className="h-6 w-6" />,
    href: "/restaurants?category=sandwich",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    name: "Ice Cream",
    icon: <IceCream className="h-6 w-6" />,
    href: "/restaurants?category=ice-cream",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    name: "Seafood",
    icon: <Fish className="h-6 w-6" />,
    href: "/restaurants?category=seafood",
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
  },
  {
    name: "Vegetarian",
    icon: <Carrot className="h-6 w-6" />,
    href: "/restaurants?category=vegetarian",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  }
];

export default function CategorySection() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Food Categories</h2>
            <p className="text-muted-foreground">Explore restaurants by category</p>
          </div>
          <Link href="/restaurants">
            <Button variant="link" className="mt-2 md:mt-0">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <Link 
              key={category.name} 
              href={category.href}
              className="staggered-item"
            >
              <div className={`category-pill rounded-xl p-4 text-center ${category.color} transition-all hover:shadow-md`}>
                <div className="flex justify-center mb-3">
                  {category.icon}
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}