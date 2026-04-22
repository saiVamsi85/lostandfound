import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ItemCard from "../components/ItemCard";

const Items = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    claimed: false,
    resolved: false,
  });
  const hasRedirected = useRef(false);
  const navigate = useNavigate();
  const fetchItems = useCallback(async () => {
    const selected = Object.keys(filters).filter((key) => filters[key]);

    let query = "";

    if (selected.length === 0) {
      query = "?status=active";
    } else {
      query = `?status=${selected.join(",")}`;
    }

    const res = await API.get(`/items${query}`);
    setItems(res.data);
  }, [filters]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !hasRedirected.current) {
      hasRedirected.current = true;

      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Items</h2>

      <div style={styles.filterBox}>
        <label>
          <input
            type="checkbox"
            name="claimed"
            checked={filters.claimed}
            onChange={handleChange}
          />
          Claimed
        </label>

        <label>
          <input
            type="checkbox"
            name="resolved"
            checked={filters.resolved}
            onChange={handleChange}
          />
          Resolved
        </label>
      </div>

      <div style={styles.grid}>
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    background: "#eef1f7",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "20px",
  },

  filterBox: {
    marginBottom: "20px",
    display: "flex",
    gap: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "4px",
  },
};

export default Items;
