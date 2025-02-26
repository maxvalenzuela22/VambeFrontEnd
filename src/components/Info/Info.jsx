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
    const [closedSubcategories, setClosedSubcategories] = useState([]);
    const [failedSubcategories, setFailedSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const closedDataPromises = categories.map(category =>
                    fetchMostClosedDealsByCategory(category)
                );
                
                const failedDataPromises = categories.map(category =>
                    fetchMostFailedDealsByCategory(category)
                );
                
                const closedData = await Promise.all(closedDataPromises);
                const failedData = await Promise.all(failedDataPromises);
                console.log('Closed data:', closedData);
                console.log('Failed data:', failedData);
                setClosedSubcategories(closedData);
                setFailedSubcategories(failedData);
            } catch (err) {
                setError("No se pudo obtener la información");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="info-loading">Cargando...</div>;
    }

    if (error) {
        return <div className="info-error">{error}</div>;
    }

    return (
        <div className="info-container">
            <h2 className="info-title">Subcategorías con más acuerdos cerrados por categoría</h2>
            {closedSubcategories.length === 0 ? (
                <div className="info-no-data">No hay datos disponibles para las categorías de acuerdos cerrados.</div>
            ) : (
                closedSubcategories.map((data, index) => (
                    <div key={index} className="category-info">
                        <div className="subcategory-left">
                            <h3 className="subcategory-name">{data.subcategory.name}</h3>
                            <p className="subcategory-category">Categoría: {categories[index]}</p>
                        </div>
                        <div className="closed-deals">
                            <p className="closed-deals-count">
                                {data.amount} acuerdos cerrados
                            </p>
                        </div>
                    </div>
                ))
            )}

            <h2 className="info-title">Subcategorías con más acuerdos fallidos por categoría</h2>
            {failedSubcategories.length === 0 ? (
                <div className="info-no-data">No hay datos disponibles para las categorías de acuerdos fallidos.</div>
            ) : (
                failedSubcategories.map((data, index) => (
                    <div key={index} className="category-info failed">
                        <div className="subcategory-left">
                            <h3 className="subcategory-name">{data.subcategory.name}</h3>
                            <p className="subcategory-category">Categoría: {categories[index]}</p>
                        </div>
                        <div className="failed-deals">
                            <p className="failed-deals-count">
                                {data.amount} acuerdos fallidos
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Info;
