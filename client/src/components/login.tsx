import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { AUTH_REDUCER_ACTION_TYPE } from "../types/enum";
import { ShowAlertProps } from "../types/types";
import { useTheme } from "../context/themeContext";

const Login = ({ showAlert }: ShowAlertProps) => {
  const { dispatch } = useAuth();
  const { theme } = useTheme();
  const color = theme.mode === "white" ? "black" : "white";
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = credentials;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        { email, password }
      );

      if (response.data.success) {
        showAlert("Logged in Successfully", "success");
        dispatch({
          type: AUTH_REDUCER_ACTION_TYPE.LOGIN,
          payload: response.data.token,
        });
        navigate("/");
      } else {
        showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <div className={`container mt-1 text-${color}`}>
      <h2>Login to Use CloudBook</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            name="email"
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleChange}
            name="password"
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
