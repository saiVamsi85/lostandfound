import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button style={styles.loginBtn} onClick={handleSubmit}>
          Login
        </button>

        <p style={styles.text}>Don't have an account?</p>

        <button
          style={styles.registerBtn}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  container: {
    background: "rgba(255, 255, 255, 0.15)",
    padding: "30px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    width: "300px",
    textAlign: "center",
    color: "#fff",
  },

  heading: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },

  loginBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00c6ff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  registerBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#ff7eb3",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
};
