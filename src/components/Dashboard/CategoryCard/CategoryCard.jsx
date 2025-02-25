import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <h2 className="category-title">{category.name}</h2>
      <p className="category-description">{category.description}</p>
      <button className="category-button">Ver Gráfico</button>
    </div>
  );
};

export default CategoryCard;