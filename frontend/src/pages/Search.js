import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const hasRedirected = useRef(false);
  const navigate = useNavigate();
  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await API.get(`/items/search?q=${query}`);
    setResults(res.data);
    setSearched(true);
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
      {/* Search Bar */}
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Search items, description, place..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Only show message AFTER search */}
      {searched && results.length === 0 && <p>No items found</p>}

      {/* Results */}
      <div style={styles.grid}>
        {results.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Search;

const styles = {
  page: {
    padding: "20px",
    minHeight: "100vh",
    background: "#eef1f7",
  },

  heading: {
    marginBottom: "20px",
  },

  // Search Box
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "40px",
    marginTop: "10px",
    alignItems: "center",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#60a9ff",
    color: "#fff",
    fontWeight: "500",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
};
