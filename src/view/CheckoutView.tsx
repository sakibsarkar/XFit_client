/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ShoppingCartIcon from "@/icons/ShoppingCartIcon";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { useOrderManyProductMutation } from "@/redux/features/product/product.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useFormik } from "formik";
import { CreditCardIcon, DollarSignIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

type TFormValues = typeof initialValues;

const CheckoutView = () => {
  const { total, items } = useAppSelector((state) => state.cart);
  const [confirmOrder] = useOrderManyProductMutation();
  const dispatch = useAppDispatch();

  const naviagate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("email is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d+$/, "Phone must be a number"),
  });
  const handleSubmit = async (value: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data } = await confirmOrder({ cartItems: items });
      if (!data) {
        return toast.error("An unkown error occurd");
      }
      if (!data.success) {
        return toast.error(data.message || "Failed to create order");
      }

      toast.success("Order confirmed");
      dispatch(clearCart(undefined));
      naviagate("/");
    } catch (error) {
      toast.error("Something went wrong please tru again");
    } finally {
      toast.dismiss(toastId);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col min-h-screen container">
      <div className="flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 px-4 py-8 sm:px-6 grid md:grid-cols-2 md:gap-8 gap-12">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-600">{formik.errors.address}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-600">{formik.errors.phone}</div>
              ) : null}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primaryMat text-white font-[700]"
            >
              Place Order
            </Button>
          </form>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="cash"
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="cash"
                    id="payment-cash"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="payment-cash"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSignIcon className="mb-3 h-6 w-6" />
                    Cash on Delivery
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    disabled={true}
                    value="card"
                    id="payment-card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="payment-card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;
