import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    try {
      const { data } = await API.post(endpoint, formData);
      if (mode === "login") {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/tasks");
      } else {
        alert(data.message);
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      {mode === "register" && (
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
