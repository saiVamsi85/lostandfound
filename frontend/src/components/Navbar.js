import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token;
  const isAdmin = isLoggedIn && role === "admin";
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => navigate("/")}>
        Lost & Found
      </div>

      {/* Hamburger */}
      {isMobile && (
        <div style={styles.hamburger} onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </div>
      )}

      {/* Links */}
      {(!isMobile || open) && (
        <div
          style={{
            ...styles.links,
            ...(isMobile ? styles.linksOpen : {}),
          }}
        >
          <Link style={styles.link} to="/" onClick={() => setOpen(false)}>
            Items
          </Link>

          <Link style={styles.link} to="/lost" onClick={() => setOpen(false)}>
            Report Lost
          </Link>

          <Link style={styles.link} to="/found" onClick={() => setOpen(false)}>
            Report Found
          </Link>

          <Link style={styles.link} to="/search" onClick={() => setOpen(false)}>
            Search
          </Link>

          {isAdmin && (
            <Link
              style={styles.link}
              to="/admin"
              onClick={() => setOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          {/* Mobile login/profile/logout */}
          {isMobile && (
            <>
              {!localStorage.getItem("token") ? (
                <Link
                  style={styles.loginBtn}
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <>
                  <button
                    style={styles.profileBtn}
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                  >
                    👤 Profile
                  </button>

                  <button
                    style={styles.logoutBtn}
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* Desktop Right */}
      {!isMobile && (
        <div style={styles.rightDesktop}>
          {!localStorage.getItem("token") ? (
            <Link style={styles.loginBtn} to="/login">
              Login
            </Link>
          ) : (
            <>
              <button
                style={styles.profileBtn}
                onClick={() => navigate("/profile")}
              >
                👤 Profile
              </button>

              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  hamburger: {
    fontSize: "24px",
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "20px",
  },

  linksOpen: {
    position: "absolute",
    top: "60px",
    left: 0,
    width: "100%",
    background: "#fff",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 0",
    gap: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  link: {
    textDecoration: "none",
    color: "#444",
    fontWeight: "500",
  },

  rightDesktop: {
    display: "flex",
    gap: "10px",
  },

  loginBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    background: " #FFA500",
    color: "#fff",
    textDecoration: "none",
  },

  profileBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#60a9ff",
    color: "#fff",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#ff5c5c",
    color: "#fff",
    cursor: "pointer",
  },
};
