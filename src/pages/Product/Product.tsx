import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllProductQuery } from "@/redux/features/product/product.api";
import { IProduct } from "@/types";
import { capitalized } from "@/utils/capitalizedWord";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Product() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  // filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [priceInputState, setPriceInputState] = useState<[number, number]>([
    0, 0,
  ]);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetAllProductQuery({
    min: priceRange[0],
    max: priceRange[1],
    page: currentPage,
    searchTerm,
    sort,
    category: selectedCategories,
  });

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
  }, [category]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setPriceInputState([0, 0]);
    setSort("");
  };

  const handleChangePriceState = (value: string, index: 0 | 1) => {
    const number = parseInt(value);
    const replica: [number, number] = [...priceInputState];
    replica[index] = number;
    setPriceInputState(replica);
  };

  if (isLoading) {
    return <div>loading....</div>;
  }
  if (isError) {
    return <div>Something went wrong while fetching product</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 min-h-[100vh]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-medium">Search</h3>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Categories</h3>
            <div className="space-y-2">
              {category ? (
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <span className="ml-2">{capitalized(category)}</span>
                </div>
              ) : (
                ""
              )}
              <div className="flex items-center">
                <Checkbox
                  checked={selectedCategories.includes("shirts")}
                  onCheckedChange={() => handleCategoryChange("shirts")}
                />
                <span className="ml-2">Shirts</span>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={selectedCategories.includes("accessories")}
                  onCheckedChange={() => handleCategoryChange("accessories")}
                />
                <span className="ml-2">Accessories</span>
              </div>

              <div className="flex items-center">
                <Checkbox
                  checked={selectedCategories.includes("shorts")}
                  onCheckedChange={() => handleCategoryChange("shorts")}
                />
                <span className="ml-2">Shorts</span>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={selectedCategories.includes("pants")}
                  onCheckedChange={() => handleCategoryChange("pants")}
                />
                <span className="ml-2">Pants</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Price Range</h3>
            <div />
            <div className="w-full flex-col gap-[10px]">
              <div className="mt-2 center gap-[5px]">
                <Input
                  placeholder="Min"
                  type="number"
                  min={0}
                  value={priceInputState[0] || ""}
                  onChange={(e) => handleChangePriceState(e.target.value, 0)}
                />
                <Input
                  placeholder="Max"
                  value={priceInputState[1] || ""}
                  min={0}
                  type="number"
                  onChange={(e) => handleChangePriceState(e.target.value, 1)}
                />
              </div>
              <Button
                className="w-full bg-primaryMat text-white mt-[10px]"
                onClick={() => setPriceRange(priceInputState)}
              >
                Add
              </Button>
            </div>
          </div>

          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-4">
              <Select onValueChange={(e) => setSort(e)} value={sort}>
                <SelectTrigger>
                  <ListOrderedIcon className="h-4 w-4" />{" "}
                  <SelectValue placeholder="Sort prodct" />
                </SelectTrigger>
                <SelectGroup className="w-[100px]">
                  <SelectContent>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="-price">Price: High to Low</SelectItem>
                  </SelectContent>
                </SelectGroup>
              </Select>
            </div>
          </div>
          <div className="griProductResponsive w-full gap-[15px]">
            {data?.data?.map((data, i) => (
              <ProductCard product={data as IProduct} key={i + "prodcut"} />
            ))}
          </div>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from({ length: Math.ceil((data?.totalDoc || 0) / 10) }).map(
            (_, i) => (
              <PaginationItem key={i + "page"}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${
                    currentPage === i + 1
                      ? "bg-primaryMat text-white hover:bg-primaryMat hover:text-white"
                      : "text-primaryMat"
                  } border-[1px] border-primaryMat`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext onClick={() => alert("next")} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function ListOrderedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}