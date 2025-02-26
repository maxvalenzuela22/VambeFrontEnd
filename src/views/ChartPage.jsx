import React from "react";
import { useParams } from "react-router-dom";
import CategoryChart from "../charts/CategoryChart";
import './ChartPage.css';

const ChartPage = () => {
    const { category } = useParams();
    
    return (
        <div className="chart-page-container">
            <section className="chart-header">
                <h1 className="category-title">{category}</h1>
                <p className="category-description">
                    Explora las estadísticas detalladas de la categoría seleccionada con visualizaciones dinámicas 
                    que te ayudarán a analizar la información de manera más efectiva.
                </p>
            </section>
            <CategoryChart categoryName={category} />
            <button onClick={() => window.history.back()} className="back-button">Volver</button>
        </div>
    );
};

export default ChartPage;
