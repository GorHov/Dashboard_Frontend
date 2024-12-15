import React from "react";
import { Link } from "react-router-dom";
import { useStoreMap } from "effector-react";
import { $user } from "../../store/auth/store";
import { logoutFx } from "../../store/auth/effects";
import "./Navbar.scss";

const Navbar: React.FC = () => {

  const user = useStoreMap({
    store: $user,
    keys: [],
    fn: (state) => state,
  });

  const handleLogout = () => {
    logoutFx();
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            Logo
          </Link>
        </div>
        <div className="links">
          {user ? (
            <>
              <span>
                <Link className="link" to="/my-products">
                  My Products
                </Link>
              </span>
              <span>
                <Link className="link" to="/profile">
                  My Profile
                </Link>
              </span>
              <Link className="link" onClick={handleLogout} to="/login">Logout</Link>
            </>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
