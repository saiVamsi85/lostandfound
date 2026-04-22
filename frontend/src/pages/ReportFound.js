import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ReportFound = () => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    location: "",
    contact: "",
    date: "",
  });
  const hasRedirected = useRef(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (!item.contact.trim()) {
        alert("Contact is required");
        return;
      }

      const formData = new FormData();

      formData.append("title", item.title);
      formData.append("description", item.description);
      formData.append("location", item.location);
      formData.append("contact", item.contact);
      formData.append("date", item.date);
      formData.append("type", "found");

      if (image) {
        formData.append("image", image);
      }

      await API.post("/items", formData);

      alert("Found item reported");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !hasRedirected.current) {
      hasRedirected.current = true;

      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}> Report Found Item</h2>

        <input
          style={styles.input}
          placeholder="Item Title"
          onChange={(e) => setItem({ ...item, title: e.target.value })}
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Location"
          onChange={(e) => setItem({ ...item, location: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Contact (phone/email)"
          onChange={(e) => setItem({ ...item, contact: e.target.value })}
        />

        {/* Date */}
        <input
          style={styles.input}
          type="date"
          onChange={(e) => setItem({ ...item, date: e.target.value })}
        />

        {/* Image Upload */}
        <div style={styles.uploadBox}>
          <label style={styles.uploadLabel}>Upload Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button style={styles.button} onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReportFound;

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e8f5e9, #d0f0dc)",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#2e7d32",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    resize: "none",
    height: "70px",
    outline: "none",
  },

  uploadBox: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontSize: "14px",
  },

  uploadLabel: {
    color: "#555",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2e7d32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
