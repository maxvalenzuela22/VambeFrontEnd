import React, { useState, useEffect } from "react";
import { fetchMostClosedDealsByCategory, fetchMostFailedDealsByCategory } from "../../services";
import "./Info.css";

const categories = [
    "Industria",
    "Motivacion para Buscar Vambe",
    "Interes en Funcionalidades",
    "Canal de Descubrimiento de Vambe",
];

const Info = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("closed"); // Estado para filtrar entre acuerdos cerrados o fallidos

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchFunction = filter === "closed" ? fetchMostClosedDealsByCategory : fetchMostFailedDealsByCategory;
                const results = await Promise.all(categories.map(category => fetchFunction(category)));
                setData(results);
            } catch (err) {
                setError("No se pudo obtener la información");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filter]); // Se vuelve a cargar cuando cambia el filtro

    if (loading) return <div className="info-loading">Cargando...</div>;
    if (error) return <div className="info-error">{error}</div>;

    const renderSubcategories = () => (
        data.length === 0 ? (
            <div className="info-no-data">No hay datos disponibles para la categoría seleccionada.</div>
        ) : (
            data.map((item, index) => (
                <div key={index} className={`category-info ${filter === "failed" ? "failed" : ""}`}>
                    <div className="subcategory-left">
                        <h3 className="subcategory-name">{item.subcategory.name}</h3>
                        <p className="subcategory-category">Categoría: {categories[index]}</p>
                    </div>
                    <div className={`${filter}-deals`}>
                        <p className={`${filter}-deals-count`}>
                            {item.amount} acuerdos {filter === "closed" ? "cerrados" : "fallidos"}
                        </p>
                    </div>
                </div>
            ))
        )
    );

    return (
        <div className="info-container">
            <h2 className="info-title">Subcategorías con más acuerdos {filter === "closed" ? "cerrados" : "fallidos"} por categoría</h2>

            <div className="filter-container">
                <label>Mostrar: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="closed">Acuerdos Cerrados</option>
                    <option value="failed">Acuerdos Fallidos</option>
                </select>
            </div>

            {renderSubcategories()}
            <button onClick={() => window.history.back()} className="back-button">Volver</button>
        </div>
    );
};

export default Info;
