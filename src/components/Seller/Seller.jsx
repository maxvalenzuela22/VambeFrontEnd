import React, { useState, useEffect } from "react";
import { fetchMetrics, fetchSellers } from "../../services";
import "./Seller.css";

const Seller = () => {
    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [categories] = useState([
        "Industria",
        "Motivacion para Buscar Vambe",
        "Interes en Funcionalidades",
        "Canal de Descubrimiento de Vambe"
    ]);
    const [sellerSubcategoryStats, setSellerSubcategoryStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSellers = async () => {
            try {
                const data = await fetchSellers();
                setSellers(data);
            } catch (err) {
                console.error("Error fetching sellers:", err);
            }
        };
        loadSellers();
    }, []);

    const loadAmountOfSellerByCategories = async (sellerId) => {
        if (!sellerId) return;
        const stats = {};
        for (const category of categories) {
            try {
                const data = await fetchMetrics({ category, seller: sellerId });

                const subcategoryCount = {};
                data.forEach((item) => {
                    if (item.subcategories?.length > 0) {
                        item.subcategories.forEach((sub) => {
                            const subcategory = sub.name || "Desconocido";
                            subcategoryCount[subcategory] = (subcategoryCount[subcategory] || 0) + 1;
                        });
                    }
                });

                const mostRelevantSubcategory = Object.entries(subcategoryCount).reduce(
                    (max, [subcategory, count]) => count > max.count ? { subcategory, count } : max,
                    { subcategory: "Sin datos", count: 0 }
                );

                stats[category] = mostRelevantSubcategory.subcategory;
            } catch (err) {
                console.error(`Error fetching data for ${category}:`, err);
                stats[category] = "Error al obtener datos";
            }
        }
        setSellerSubcategoryStats(stats);
    };

    const handleSellerChange = async (event) => {
        const sellerId = event.target.value;
        setSelectedSeller(sellerId);
        setSellerSubcategoryStats({});
        setLoading(true);
        setError(null);

        try {
            await loadAmountOfSellerByCategories(sellerId);
        } catch (err) {
            setError("No se pudo cargar la información del vendedor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="seller-container">
            <h2 className="seller-title">Relación de Vendedores con Categorías</h2>
            <h3 className="seller-subtitle">No implica cierres con clientes, solo reuniones.</h3>
            <div className="seller-selector">
                <select onChange={handleSellerChange} value={selectedSeller || ""}>
                    <option value="">-- Selecciona un vendedor --</option>
                    {sellers.map((seller) => (
                        <option key={seller.seller} value={seller.seller}>
                            {seller.seller}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <div className="seller-loading">Cargando datos...</div>}
            {error && <div className="seller-error">{error}</div>}

            {selectedSeller && Object.keys(sellerSubcategoryStats).length > 0 && (
                <div className="seller-data">
                    <h3 className="seller-subtitle">Subcategoría más destacada de {selectedSeller} por categoría</h3>
                    <table className="seller-table">
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Subcategoría más relevante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category}>
                                    <td>{category}</td>
                                    <td>{sellerSubcategoryStats[category]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedSeller && Object.keys(sellerSubcategoryStats).length === 0 && !loading && (
                <div className="seller-no-data">Este vendedor no tiene datos en ninguna categoría.</div>
            )}

            <button onClick={() => window.history.back()} className="back-button">Volver</button>   
        </div>
    );
};

export default Seller;
