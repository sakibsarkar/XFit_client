import Categories from "@/components/home/Categories";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import { HeroSection } from "@/components/home/HeroSection";
import ImageGallery from "@/components/home/ImageGallery";

const HomeView = () => {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <Categories />
      <FeaturedProduct />
      <ImageGallery />
    </div>
  );
};

export default HomeView;
