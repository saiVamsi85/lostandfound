import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Create Account ✨</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

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

        <button style={styles.registerBtn} onClick={handleSubmit}>
          Register
        </button>

        <p style={styles.text}>Already a user?</p>

        <button style={styles.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;

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
  },

  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
};
