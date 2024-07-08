import { baseApi } from "@/redux/api/api";
import { IProduct } from "@/types";
interface IQueryOptions {
  searchTerm?: string;
  min?: number;
  max?: number;
  sort?: string;
  page?: string | number;
}

interface IProductResponse {
  data: IProduct[];
  totalDoc: number;
}
const productAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    getAllProduct: builder.query<IProductResponse, IQueryOptions>({
      query: (query: IQueryOptions) => {
        const { max = "", min = "", searchTerm = "", sort = "", page } = query;
        return {
          url: `/product?searchTerm=${searchTerm}&min=${min}&max=${max}&sort=${sort}&page=${
            page || "1"
          }`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
  }),
});

export const { useCreateProductMutation, useGetAllProductQuery } = productAPI;
