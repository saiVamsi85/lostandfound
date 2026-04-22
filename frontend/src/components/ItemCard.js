import React from "react";
import API from "../services/api";

const ItemCard = ({ item }) => {
  const isLost = item.type === "lost";
  const dynamicStyles = isLost ? styles.lost : styles.found;

  const userId = localStorage.getItem("userId");

  const isOwner =
    item.user && item.user._id && item.user._id.toString() === userId;

  const imageUrl = item.image
    ? `https://lostandfound-d9vp.onrender.com/${item.image.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/100";

  const handleClaim = async () => {
    try {
      await API.post("/items/claim", {
        lostId: item._id,
      });

      alert("Marked as claimed. Waiting for admin verification.");
      window.location.reload(); // quick refresh
    } catch (err) {
      alert("Error claiming item");
    }
  };

  return (
    <div style={{ ...styles.card, ...dynamicStyles.card }}>
      <div style={styles.topSection}>
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

          {/* Claim Button */}
          {isOwner && item.status === "active" && (
            <button style={styles.claimBtn} onClick={handleClaim}>
              Mark as Claimed
            </button>
          )}

          {/* Status */}
          {item.status !== "active" && (
            <div style={styles.infoRow}>
              <b>Status:</b> {item.status}
            </div>
          )}
        </div>

        <div style={styles.imageSection}>
          <img src={imageUrl} alt="item" style={styles.image} />
        </div>
      </div>

      {item.contact && (
        <div style={{ ...styles.contactBox, ...dynamicStyles.contactBox }}>
          <span style={styles.contactLabel}>Contact</span>
          <p style={styles.contactText}>{item.contact}</p>
        </div>
      )}
    </div>
  );
};

export default ItemCard;

const styles = {
  page: {
    padding: "20px",
    background: "#eef1f7",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "20px",
  },

  card: {
    borderRadius: "14px",
    padding: "16px",
    margin: "10px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },

  topSection: {
    display: "flex",
    gap: "15px",
  },

  textSection: {
    flex: 3,
  },

  imageSection: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },

  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "2px solid #ddd",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
  },

  desc: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#555",
  },

  infoRow: {
    marginBottom: "6px",
    fontSize: "14px",
  },

  buttonRow: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  resolveBtn: {
    background: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  revertBtn: {
    background: "#ffa726",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  contactBox: {
    marginTop: "12px",
    padding: "10px",
    borderRadius: "10px",
  },

  contactLabel: {
    fontSize: "12px",
    color: "#888",
  },

  contactText: {
    marginTop: "4px",
  },

  // THEMES
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

  claimBtn: {
    marginTop: "10px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#9564ff",
    color: "#fff",
    cursor: "pointer",
  },

  status: {
    marginTop: "8px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#555",
  },
};
