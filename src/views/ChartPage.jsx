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
                    Aquí podrás explorar las estadísticas detalladas de la categoría seleccionada, 
                    con visualizaciones gráficas que te ayudarán a comprender mejor los datos.
                </p>
            </section>
            <CategoryChart categoryName={category} />
        </div>
    );
};

export default ChartPage;
