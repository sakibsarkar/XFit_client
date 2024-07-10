import CreateProductModal from "@/components/ProductManageMent/CreateProductModal";
import DeleteProductModal from "@/components/ProductManageMent/DeleteProductModal";
import EditProductModal from "@/components/ProductManageMent/EditProductModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProductQuery } from "@/redux/features/product/product.api";
import { Link } from "react-router-dom";

const ProductManageMentView = () => {
  const { data } = useGetAllProductQuery({});
  // const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col gap-6 p-6 container min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <CreateProductModal />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] hidden md:table-cell">
                Image
              </TableHead>
              <TableHead className="cursor-pointer">Name</TableHead>
              <TableHead className="cursor-pointer text-right">Price</TableHead>
              <TableHead className="cursor-pointer text-right">
                Category
              </TableHead>
              <TableHead className="cursor-pointer text-right">Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="w-[80px] hidden md:table-cell">
                  <img
                    src={product.image}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    to={`/product/${product._id}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{product.category}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <EditProductModal product={product} />
                    <DeleteProductModal productId={product._id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {/* Showing {indexOfFirstItem + 1} to {indexOfLastItem} of{" "}
          {products.length} products */}
        </div>
      </div>
    </div>
  );
};
export default ProductManageMentView;
