import Categories from "@/components/home/Categories";
import { HeroSection } from "@/components/home/HeroSection";

const HomeView = () => {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <Categories />
    </div>
  );
};

export default HomeView;
