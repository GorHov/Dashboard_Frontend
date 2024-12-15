import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $user } from "../../store/auth/store";
import axios from "axios";
import ProductItem from "../../components/ProductItem/ProductItem";
import './Home.scss';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [user] = useUnit([$user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/products/all`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="dashboard">
        <div>
          <p>Dashboard with all products</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-message">
          <p>Dashboard is empty</p>
        </div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <div key={product.id}>
              <ProductItem product={product} currentUserId={user?.userId} isShowButtons={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
