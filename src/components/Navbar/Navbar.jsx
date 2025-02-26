import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaChartBar, FaListUl } from "react-icons/fa";
import "./Navbar.css";
import logo from "/logo-vambe.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Vambe Logo" />
      </div>
      <div className="navbar-links">
        <button className="nav-button" onClick={() => navigate("/")}>
          <FaHome style={{ marginRight: "8px" }} /> Inicio
        </button>
        <button className="nav-button" onClick={() => navigate("/dashboard")}>
          <FaChartBar style={{ marginRight: "8px" }} /> Panel
        </button>
        <button className="nav-button" onClick={() => navigate("/category")}>
          <FaListUl style={{ marginRight: "8px" }} /> Categorías
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
