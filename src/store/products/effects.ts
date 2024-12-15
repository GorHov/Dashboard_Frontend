import { createEffect } from "effector";
import { ICreateProduct, Products } from "../../api/Products";

const {
  getAllProducts,
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = new Products();

// Effect to fetch all products (public)
export const fetchAllProductsFx = createEffect(async () => {
  const response = await getAllProducts();
  return response;
});

// Effect to fetch user-specific products
export const fetchUserProductsFx = createEffect(async () => {
  const response = await getUserProducts();
  return response;
});

// Effect to fetch a single product by ID
export const fetchProductByIdFx = createEffect(async (id: number) => {
  const response = await getProductById(id);
  return response;
});

// Effect to create a product
export const createProductFx = createEffect(
  async (productData: ICreateProduct) => {
    const response = await createProduct(productData);
    fetchUserProductsFx();
    return response;
  }
);

// Effect to update a product
export const updateProductFx = createEffect<{
  id: number;
  name?: string;
  description?: string;
  price?: number | string;
  discountPrice?: number;
  image?: File | string;
}, any, Error>(async ({ id, name, description, price, discountPrice, image }) => {
  const formData = new FormData();

  formData.append("id", id.toString());
  if (name) formData.append("name", name);
  if (description) formData.append("description", description);
  if (price) formData.append("price", price.toString());
  if (discountPrice) formData.append("discountPrice", discountPrice.toString());
  if (image && typeof image !== "string") {
    formData.append("image", image);
  }

  try {
    const response = await updateProduct(formData, id);
    fetchUserProductsFx();
    return response;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
});

// Effect to delete a product
export const deleteProductFx = createEffect(async (id: number) => {
  const response = await deleteProduct(id);
  fetchUserProductsFx();
  return response;
});
