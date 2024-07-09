import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProductByIdMutation } from "@/redux/features/product/product.api";
import { IProduct } from "@/types";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

type TFormValues = {
  title: string;
  category: string;
  details: string;
  price: string | number;
  stock: string | number;
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  details: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  stock: Yup.number()
    .required("Stock is required")
    .positive("Stock must be positive")
    .integer("Stock should integer number"),
});

const EditProductModal = ({ product }: { product: IProduct }) => {
  const [updateProduct] = useUpdateProductByIdMutation();

  const handleSubmit = async (value: TFormValues) => {
    const payload = {
      ...value,
      price: Number(value.price),
      stock: Number(value.stock),
    };
    const modalCloseBtn = document.getElementById(
      "edit-modal-close"
    ) as HTMLElement;

    const toastId = toast.loading("Please wait...");
    try {
      const { data } = await updateProduct({
        payload,
        productId: product._id,
      });
      if (!data) {
        return toast.error("An unkown error occurd");
      }
      if (!data.success) {
        return toast.error(data.message || "Failed to update product");
      }
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
    modalCloseBtn.click();
  };

  const formik = useFormik({
    initialValues: {
      title: product.title,
      category: product.category,
      details: product.details,
      price: product.price,
      stock: product.stock,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details for this product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                onBlur={formik.handleBlur}
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-500">{formik.errors.title}</div>
              ) : null}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500">{formik.errors.category}</div>
              ) : null}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Description</Label>
              <Textarea
                id="details"
                name="details"
                onChange={formik.handleChange}
                value={formik.values.details}
                onBlur={formik.handleBlur}
                className="min-h-[100px]"
              />
              {formik.touched.details && formik.errors.details ? (
                <div className="text-red-500">{formik.errors.details}</div>
              ) : null}
            </div>
            <div className="center items-start gap-[10px] w-full">
              <div className="w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-500">{formik.errors.price}</div>
                ) : null}
              </div>
              <div className="w-full">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.stock}
                />
                {formik.touched.stock && formik.errors.stock ? (
                  <div className="text-red-500">{formik.errors.stock}</div>
                ) : null}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!formik.isValid}>
              Save
            </Button>
            <DialogClose asChild>
              <Button variant="outline" id="edit-modal-close">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditProductModal;
