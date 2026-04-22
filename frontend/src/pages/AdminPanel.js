import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminPanel = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await API.get("/items?status=claimed");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resolveItem = async (id) => {
    await API.put(`/items/resolve/${id}`);
    fetchItems();
  };

  const revertItem = async (id) => {
    await API.put(`/items/revert/${id}`); // 👈 backend route needed
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Admin Verification Panel</h2>

      {items.length === 0 && <p>No claimed requests</p>}

      {items.map((item) => {
        const isLost = item.type === "lost";
        const dynamicStyles = isLost ? styles.lost : styles.found;

        const imageUrl = item.image
          ? `http://localhost:5000/${item.image.replace(/\\/g, "/")}`
          : "https://via.placeholder.com/100";

        return (
          <div key={item._id} style={{ ...styles.card, ...dynamicStyles.card }}>
            {/* 🔝 Top */}
            <div style={styles.topSection}>
              {/* LEFT */}
              <div style={styles.textSection}>
                <h3 style={{ ...styles.title, ...dynamicStyles.title }}>
                  {item.title}
                </h3>

                <p style={styles.desc}>{item.description}</p>

                <div style={styles.infoRow}>
                  <b>Type:</b> {item.type}
                </div>

                <div style={styles.infoRow}>
                  <b>Location:</b> {item.location}
                </div>

                <div style={styles.infoRow}>
                  <b>Date:</b>{" "}
                  {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                </div>

                {/* ACTION BUTTONS */}
                <div style={styles.buttonRow}>
                  <button
                    style={styles.resolveBtn}
                    onClick={() => resolveItem(item._id)}
                  >
                    ✔ Resolve
                  </button>

                  <button
                    style={styles.revertBtn}
                    onClick={() => revertItem(item._id)}
                  >
                    ↺ Back to Active
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteItem(item._id)}
                  >
                    ✖ Delete
                  </button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div style={styles.imageSection}>
                <img src={imageUrl} alt="item" style={styles.image} />
              </div>
            </div>

            {/* CONTACT */}
            <div style={{ ...styles.contactBox, ...dynamicStyles.contactBox }}>
              <span style={styles.contactLabel}>Contact</span>
              <p style={styles.contactText}>{item.contact}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPanel;

const styles = {
  page: {
    padding: "30px",
    background: "#eef1f7",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "25px",
    fontSize: "22px",
    fontWeight: "600",
  },

  // ✅ Empty message
  empty: {
    textAlign: "center",
    marginTop: "80px",
    fontSize: "14px",
    fontStyle: "italic",
    color: "#777",
  },

  card: {
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "20px", // ✅ cleaner spacing between cards
    color: "#333",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    transition: "0.2s",
  },

  topSection: {
    display: "flex",
    gap: "20px",
  },

  textSection: {
    flex: 3,
  },

  imageSection: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "2px solid #ddd",
  },

  title: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "600",
  },

  desc: {
    fontSize: "14px",
    marginBottom: "12px",
    color: "#555",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  infoRow: {
    marginBottom: "6px",
    fontSize: "14px",
    color: "#444",
  },

  // ✅ BUTTON ROW IMPROVED
  buttonRow: {
    marginTop: "14px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  // ✅ Buttons (better colors + spacing)
  resolveBtn: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },

  revertBtn: {
    background: "#fb8c00",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },

  deleteBtn: {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },

  contactBox: {
    marginTop: "14px",
    padding: "10px",
    borderRadius: "10px",
  },

  contactLabel: {
    fontSize: "12px",
    color: "#888",
  },

  contactText: {
    marginTop: "4px",
    fontWeight: "500",
  },

  // THEMES (unchanged but slightly cleaner)
  lost: {
    card: {
      background: "#fff5f5",
      border: "1px solid #ffcccc",
    },
    title: {
      color: "#d32f2f",
    },
    contactBox: {
      background: "#ffe6e6",
      border: "1px solid #ffb3b3",
    },
  },

  found: {
    card: {
      background: "#dff5e6",
      border: "1px solid #6fcf97",
    },
    title: {
      color: "#1b5e20",
    },
    contactBox: {
      background: "#c8ecd6",
      border: "1px solid #4caf50",
    },
  },
};
