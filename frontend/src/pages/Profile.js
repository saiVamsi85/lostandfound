import React, { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        alert("Please login first");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Avatar */}
        <div style={styles.avatar}>{user.name?.charAt(0).toUpperCase()}</div>

        <h2 style={styles.heading}>{user.name}</h2>
        <p style={styles.subtext}>{user.email}</p>

        <div style={styles.divider}></div>

        <div style={styles.row}>
          <span style={styles.label}>Role</span>
          <span style={styles.badge}>{user.role}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Status</span>
          <span style={styles.status}>Active</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Inter, sans-serif",
  },

  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
    padding: "30px",
    borderRadius: "16px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    color: "#fff",
    transition: "0.3s",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 auto 15px",
    color: "#333",
  },

  heading: {
    margin: "5px 0",
    fontSize: "22px",
  },

  subtext: {
    fontSize: "13px",
    opacity: 0.8,
    marginBottom: "15px",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.2)",
    margin: "15px 0",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },

  label: {
    fontSize: "13px",
    opacity: 0.8,
  },

  badge: {
    background: "#00c6ff",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
  },

  status: {
    background: "#2ecc71",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
  },
};
