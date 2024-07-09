// src/redux/cartSlice.ts

import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  total: number;
}

const initialState: ICart = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem | IProduct>) => {
      const product = action.payload;
      const quantity = (action.payload as ICartItem).quantity || 1;
      if (!product.stock) {
        toast.error("Product is not in stock");
        return;
      }
      const existingProduct = state.items.find(
        (item) => item._id === product._id
      );

      const willQuantity = (existingProduct?.quantity || 0) + quantity;

      if (existingProduct && willQuantity > product.stock) {
        toast.error("Maximum product qunatity reached");
        return;
      }

      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          toast.error("Maximum product qunatity reached");
          return;
        } else {
          existingProduct.quantity += quantity;
          toast.success("Product added to the cart");
        }
      } else {
        state.items.push({ ...product, quantity });
        toast.success("Product added to the cart");
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItemToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
