import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUnit } from "effector-react";
import "./ProductDetail.scss";
import { $product, clearProductData } from "../../store/products/store";
import { fetchProductByIdFx } from "../../store/products/effects";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product] = useUnit([$product]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProductByIdFx(+id);
    }

    return () => {
      clearProductData();
    };
  }, [id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-detail">
      {product?.image && typeof product?.image === "string" ? (
        <img
          src={'/' + product.image}
          alt={product.name}
          className="product-detail__image"
        />
      ) : (
        <div className="product-detail__thumbnail">NO IMAGE</div>
      )}

      <div className="product-detail__details">
        <h2 className="product-detail__name">{product?.name}</h2>
        <p className="product-detail__description">{product?.description}</p>
        <div className="product-detail__prices">
          {product?.discountPrice ? (
            <>
              <span className="product-detail__discount-price">
                ${product.discountPrice}
              </span>
              <span className="product-detail__original-price">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="product-detail__price">${product?.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
