import { Link } from "react-router-dom";

import { ICategory } from "@/types";
import { categories } from "../mock/categories";
import SectionHeading from "../ui/sectionHeading";

const Categories = () => {
  return (
    <section className="mt-[50px] w-full">
      <SectionHeading text="Top Categories" />

      <div className="gridResponsive gap-[10px]">
        {categories.map((data, i) => (
          <CategoryCard data={data} key={i + "string"} />
        ))}
      </div>
    </section>
  );
};

const CategoryCard = ({ data }: { data: ICategory }) => {
  const { Icon, label } = data;

  return (
    <Link
      to={`/product?category=${data.value}`}
      className="w-full h-[150px] center flex-col gap-[15px] rounded-[8px] hover:shadow-lg hover:border-primaryTxt border-[1px] border-transparent duration-[0.3s] shadow-md"
      style={{ background: "white" }}
    >
      <Icon className="text-[30px] text-primaryTxt" />
      <div className="flex-col gap-[5px] center ">
        <h5 className="text-[15px] leading-[20px] text-center text-primaryTxt font-[600]">
          {label}
        </h5>
      </div>
    </Link>
  );
};

export default Categories;
