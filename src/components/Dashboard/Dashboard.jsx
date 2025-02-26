import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../CategoryCard/CategoryCard";

const categories = [
  {
    name: "Comparación de Categorías",
    description: "Una forma interactiva de conocer más las relaciones entre categorías.",
    route: "/vambe",
  },
  {
    name: "Relación entre Acuerdos y Categorías",
    description: "Una vista general de la relación entre los acuerdos con clientes y sus respectivas categorías.",
    route: "/info",
  },
  {
    name: "Métricas Generales",
    description: "Una vista general de la información más relevante de las reuniones con los clientes con filtros incluidos.",
    route: "/metrics",
  },
  {
    name: "Vendedores y Categorías",
    description: "Una forma interactiva de ver cómo los vendedores se relacionan con las categorías.",
    route: "/seller",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Gráficos y Métricas Interactivas</h1>
      <p className="dashboard-subtitle">Explora los datos y estadísticas sobre las distintas categorías seleccionadas.</p>
      <div className="category-grid">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} onClick={() => navigate(category.route)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;