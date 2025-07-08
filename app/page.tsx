import Hero from '@/components/home/hero';
import FeaturedRestaurants from '@/components/home/featured-restaurants';
import CategorySection from '@/components/home/category-section';
import HowItWorks from '@/components/home/how-it-works';
import AppPromotion from '@/components/home/app-promotion';

export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedRestaurants />
      <HowItWorks />
      <AppPromotion />
    </div>
  );
}