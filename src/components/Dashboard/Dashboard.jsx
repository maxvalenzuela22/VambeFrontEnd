import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const categories = [
  {
    name: "Industria",
    description: "Análisis de la industria en las que se desenvuelven las principales empresas que han tenido reuniones con Vambe.",
    route: "/statistics/Industria",
  },
  {
    name: "Motivación para Buscar Vambe",
    description: "Razones por las cuales los clientes buscan Vambe y sus necesidades.",
    route: "/statistics/Motivacion%20para%20Buscar%20Vambe",
  },
  {
    name: "Interés en Funcionalidades Específicas",
    description: "Las funcionalidades más valoradas por los clientes de Vambe.",
    route: "/statistics/Interes%20Funcionalidades",
  },
  {
    name: "Canal de Descubrimiento de Vambe",
    description: "Cómo los usuarios llegan a conocer Vambe",
    route: "/statistics/Canal%20de%20Descubrimiento%20de%20Vambe",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Categorías</h1>
      <p className="dashboard-subtitle">
        Explora los datos y estadísticas sobre las distintas categorías seleccionadas.
      </p>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <h2 className="category-title">{category.name}</h2>
            <p className="category-description">{category.description}</p>
            <button
              className="category-button"
              onClick={() => navigate(category.route)}
            >
              Ver Gráfico
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
