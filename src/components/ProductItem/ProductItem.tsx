import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductItem.scss";
import Modal from "../Modal/Modal";
import { useUnit } from "effector-react";
import { $user } from "../../store/auth/store";

type ProductItemProps = {
  product: {
    name?: string;
    id: number;
    description?: string;
    price?: number | string;
    discountPrice?: number | string;
    image?: string | File;
    userId?: number;
  };
  currentUserId?: number;
  onUpdate?: (updatedProduct: {
    id: number;
    name: string;
    description: string;
    price: number | string;
    image?: string | File;
  }) => void;
  onDelete?: (id: number) => void;
  isShowButtons?: boolean;
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onUpdate,
  onDelete,
  isShowButtons,
}) => {
  const [user] = useUnit([$user]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: product.id,
    name: product.name || "",
    description: product.description || "",
    price: product.price || '',
    image: product.image || "",
    discountPrice: product.discountPrice || '',
  });

  
  const isOwner = product.userId === user?.userId;

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedProduct);
    }
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setEditedProduct((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    }
  };

  return (
    <div className="product-item">
      {product.image && typeof product.image === "string" ? (
        <img
          src={product.image}
          alt={product.name}
          className="product-item__image"
        />
      ) : (
        <div className="product-item__thumbnail">NO IMAGE</div>
      )}

      <div className="product-item__details">
        <div>
          {/* Link to the product detail page */}
          <h2 className="product-item__name">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h2>
          <p className="product-item__description">{product.description}</p>
          <div className="product-item__prices">
            {product.discountPrice ? (
              <>
                <span className="product-item__discount-price">
                  ${product.discountPrice}
                </span>
                <span className="product-item__original-price">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="product-item__price">${product.price}</span>
            )}
          </div>
        </div>

        {isOwner && isShowButtons && (
          <div className="product-item__actions">
            <button
              className="product-item__button product-item__button--update"
              onClick={() => setIsEditing(true)}
            >
              Update
            </button>
            <button
              className="product-item__button product-item__button--delete"
              onClick={() => onDelete?.(product.id)}
            >
              Delete
            </button>
          </div>
        )}

        {isOwner && !isShowButtons && (
          <div className="product-item__owner-message">
            My Product
          </div>
        )}
      </div>

      <Modal
        title="Edit Product"
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      >
        <div className="product-item__modal">
          <label>
            Product Name:
            <input
              type="text"
              placeholder="Product Name"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
            />
          </label>

          <label>
            Description:
            <textarea
              placeholder="Description"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
          </label>

          <label>
            Price:
            <input
              type="number"
              placeholder="Price"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: Number(e.target.value),
                })
              }
            />
          </label>

          <label>
            File:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <label>
            Sale Price:
            <input
              type="number"
              placeholder="Sale Price"
              value={editedProduct.discountPrice}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  discountPrice: Number(e.target.value),
                })
              }
            />
          </label>

          <div className="modal__actions">
            <button onClick={handleSave} className="product-item__button">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="product-item__button product-item__button--cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductItem;
