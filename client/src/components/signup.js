import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {
  const { showAlert } = props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    const response = await axios.post(
      `http://localhost:5000/api/auth/createUser`, { name, email, password }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);

      navigate("/");
      showAlert("Account created Successfully", "success");
    } else {
      showAlert("Invalid Details", "danger");
    }
  };
  return (
    <div className="container my-1">
      <h2>Register to Use CloudBook</h2>
      <hr />
      <form onSubmit={handleSubmit}>
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
