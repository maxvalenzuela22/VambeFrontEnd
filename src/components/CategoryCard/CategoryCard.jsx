import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ category, onClick }) => {  
    return (
      <div className="category-card">
        <h2 className="category-title">{category.name}</h2>
        <p className="category-description">{category.description}</p>
        <button className="category-button" onClick={onClick}>Explorar</button>
      </div>
    );
  };

export default CategoryCard;