import axios from "axios";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number | string;
}

export interface IUpdateProduct {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  file?: File | string;
}



class Products {

  // Get all products (public route)
  async getAllProducts(): Promise<IProduct[] | undefined> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}products/all`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch all products:", error);
    }
  }

  async getProductById(id: number): Promise<IProduct | undefined> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}product/${id}`);      
      return response.data.product;
    } catch (error) {
      console.error(`Failed to fetch product with ID ${id}:`, error);
    }
  }

  // Get products for the logged-in user
  async getUserProducts(): Promise<IProduct[] | undefined> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}products`, {
        withCredentials: true, // Include cookies
      });
      
      return response.data.products;
    } catch (error) {
      console.error("Failed to fetch user products:", error);
    }
  }

  // Create a new product
  async createProduct(product: ICreateProduct): Promise<IProduct | undefined> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_API}product`, product, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  }

  // Update a product
  async updateProduct(formData: FormData , id : number): Promise<IUpdateProduct | undefined> {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_API}product/${id}`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  }

  // Delete a product
  async deleteProduct(productId: number): Promise<{ message: string } | undefined> {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_API}product/${productId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }
}

export { Products };