import MainLayout from "@/components/Layouts/MainLayouts";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import Home from "@/pages/Home/Home";
import Product from "@/pages/Product/Product";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";

import NotFound from "@/pages/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: true,
        path: "product",
        element: <Product />,
      },
      {
        index: true,
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        index: true,
        path: "cart",
        element: <Cart />,
      },
      {
        index: true,
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
