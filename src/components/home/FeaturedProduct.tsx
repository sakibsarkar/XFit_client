import products from "../mock/product";
import ProductCard from "../product/ProductCard";
import SectionHeading from "../ui/sectionHeading";

const FeaturedProduct = () => {
  return (
    <section className="w-full mt-[50px]">
      <SectionHeading text="Featured Product" />
      <div className="griProductResponsive gap-[20px]">
        {products.slice(0, 4).map((data, i) => (
          <ProductCard key={"prodcut" + i} product={data} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
