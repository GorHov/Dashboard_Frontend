import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerFx } from "../store/auth/effects";
import { IDataRegister } from "../api/Auth";

const Register: React.FC = () => {
  const [inputs, setInputs] = useState<IDataRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerFx(inputs);      
      if (response.message) {
        navigate("/login");
      } else {
        const errorMessage = response.data?.message || "Registration failed";
        setError(errorMessage);
      }
    } catch (error: any) {
      setError(error.response?.data.msg || "An error occurred");
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="firstName"
          name="firstName"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="lastName"
          name="lastName"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
