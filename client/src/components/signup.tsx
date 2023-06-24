import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { AUTH_REDUCER_ACTION_TYPE } from "../types/enum";
import { ShowAlertProps } from "../types/types";
import { useTheme } from "../context/themeContext";

const Signup = ({ showAlert }: ShowAlertProps) => {
  const { dispatch } = useAuth();
  const { theme } = useTheme();
  const color = theme.mode === "white" ? "black" : "white";
  const [credentials, setCredentials] = useState<{
    name: string;
    email: string;
    password: string;
    cpassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { name, email, password } = credentials;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/createUser`,
        { name, email, password }
      );

      if (response.data.success) {
        dispatch({
          type: AUTH_REDUCER_ACTION_TYPE.LOGIN,
          payload: response.data.token,
        });
        navigate("/");
        showAlert("Account created Successfully", "success");
      } else {
        showAlert("Invalid Details", "danger");
      }
    } catch (error) {
      showAlert("Invalid Details", "danger");
    }
  };
  return (
    <div className={`container my-1 text-${color}`}>
      <h2>Register to Use CloudBook</h2>
      <hr />
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={handleChange}
            name="name"
            value={credentials.name}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={handleChange}
            name="cpassword"
            value={credentials.cpassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
