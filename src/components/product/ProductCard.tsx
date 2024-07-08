import { trimText } from "@/utils/trimText";
import { Link } from "react-router-dom";
import { IProduct } from "../mock/product";
import ProductAddToCartBtn from "./ProductAddToCartBtn";
import ProductTooltip from "./ProductTooltip";

interface ProductCardProps {
  // product: IProduct;
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative w-full h-[370px]  overflow-hidden rounded-[15px] border-[1px] border-borderColor bg-white">
      {product.tag && (
        <span
          className={`bg-primaryMat text-white text-xs font-bold uppercase px-[20px] py-2 absolute top-0 left-0 rounded-br-[20px] z-50`}
        >
          {product.tag}
        </span>
      )}
      <div className="w-full h-[200px] relative group/image cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt={product.title}
        />

        <ProductTooltip product={product} />
      </div>
      <div className="px-4 py-4">
        <div className="text-sm text-gray-500">{product.category}</div>
        {/* <Link href={`/product/details/${product._id}`} className="font-bold text-xl mb-2 hover:underline"> */}
        <Link
          to={`/product/details/${product._id}`}
          className="font-bold text-xl mb-2 hover:underline"
        >
          {trimText(product.title, 20)}
        </Link>

        <div className="mt-2 flex items-center justify-start gap-[15px]">
          <div>
            <span className="text-primaryMat font-bold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-gray-500 line-through ml-2">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <ProductAddToCartBtn product={product} />
    </div>
  );
};

export default ProductCard;
