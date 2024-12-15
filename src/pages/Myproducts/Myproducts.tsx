import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $products } from "../../store/products/store"; // Make sure `addProduct` is exported
import {
  createProductFx,
  deleteProductFx,
  fetchUserProductsFx,
  updateProductFx,
} from "../../store/products/effects";
import { $user } from "../../store/auth/store";
import { useNavigate } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import './Myproducts.scss'

const MyProducts: React.FC = () => {

  const [user] = useUnit([$user]);
  const [products] = useUnit([$products]);
  const navigate = useNavigate()

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (!user) {
      navigate('/')
    }else{
      fetchUserProductsFx();
    }
  }, [user]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price) {
      createProductFx(newProduct);
      setNewProduct({ name: "", description: "", price: "" });
    }
  };

  const handleUpdateProduct = (
    
    updatedProduct: {id: number, name: string; description: string; price: number | string }
  ) => {
    updateProductFx(updatedProduct);
  };

  const handleDeleteProduct = (id : number)=> {
    deleteProductFx(id)
  }

  return (
    <div className="my-products">
  <div className="header">
    <h1>My Products</h1>
  </div>

  <div className="add-product">
    <h2 className="form-title">Add a New Product</h2>
    <div className="form-group">
      <input
        className="form-input"
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <input
        className="form-input"
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <input
        className="form-input"
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
    </div>
    <button className="form-button" onClick={handleAddProduct}>
      Add Product
    </button>
  </div>

  <div className="product-list">
    {products.length > 0 ? (
      products.map((product) => (
        <div key={product.id}>
          <ProductItem
            product={product}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
            isShowButtons={true}
          />
        </div>
      ))
    ) : (
      <p className="empty-message">No products found.</p>
    )}
  </div>
</div>

  );
};

export default MyProducts;
