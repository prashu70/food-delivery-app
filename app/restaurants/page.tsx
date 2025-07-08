import RestaurantsHeader from "@/components/restaurants/restaurants-header";
import RestaurantGrid from "@/components/restaurants/restaurant-grid";
import RestaurantFilters from "@/components/restaurants/restaurant-filters";

export default function RestaurantsPage() {
  return (
    <div className="pt-20">
      <RestaurantsHeader />
      <div className="container px-4 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <RestaurantFilters />
          </aside>
          <main className="lg:col-span-3">
            <RestaurantGrid />
          </main>
        </div>
      </div>
    </div>
  );
}