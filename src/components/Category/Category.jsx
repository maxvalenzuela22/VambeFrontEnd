import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Category.css";

const categories = [
  {
    name: "Industria",
    description: "Análisis de la industria en las que se desenvuelven los principales clientes que se han contactado con Vambe.",
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
    route: "/statistics/Interes%20en%20Funcionalidades",
  },
  {
    name: "Canal de Descubrimiento de Vambe",
    description: "Cómo los usuarios llegan a conocer Vambe.",
    route: "/statistics/Canal%20de%20Descubrimiento%20de%20Vambe",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Categorías seleccionadas</h1>
      <p className="dashboard-subtitle">A continuación se muestran las cuatro categorías que se seleccionaron, al explorar en ellas se podrán ver un gráfico que muestre la cantidad de cada subcategorías.</p>
      <div className="category-grid">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} onClick={() => navigate(category.route)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;