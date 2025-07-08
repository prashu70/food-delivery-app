import { CircleArrowDown, Search, CreditCard, Truck } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const steps: Step[] = [
  {
    title: "Select location and find restaurants",
    description: "Enter your address to find the nearest restaurants that deliver to you",
    icon: <Search className="h-8 w-8" />,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    title: "Choose your favorite food",
    description: "Browse menus, read reviews, and select your perfect meal",
    icon: <CircleArrowDown className="h-8 w-8" />,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  },
  {
    title: "Pay securely online",
    description: "Use your preferred payment method for a seamless checkout",
    icon: <CreditCard className="h-8 w-8" />,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    title: "Receive your delivery",
    description: "Track your order in real-time and enjoy your food delivery",
    icon: <Truck className="h-8 w-8" />,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Get your favorite food delivered to your doorstep in just a few steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="staggered-item">
              <div className="flex flex-col items-center text-center">
                <div className={`${step.color} h-16 w-16 rounded-full flex items-center justify-center mb-4`}>
                  {step.icon}
                </div>
                
                <div className="relative mb-4 md:hidden lg:flex items-center justify-center">
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-1/2 transform translate-x-16 w-16 border-t-2 border-dashed border-muted-foreground/30 hidden lg:block"></div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}