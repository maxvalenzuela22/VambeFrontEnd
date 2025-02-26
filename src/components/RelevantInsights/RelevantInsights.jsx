import React, { useEffect, useState } from "react";
import { fetchInfoById, fetchMetrics, fetchSubcategories } from "../../services/index";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
import "./RelevantInsights.css";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const RelevantInsights = () => {
    const [categories, setCategories] = useState([
        "Industria", "Motivacion para Buscar Vambe", "Interes en Funcionalidades", "Canal de Descubrimiento de Vambe"
    ]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [comparisonCategory, setComparisonCategory] = useState("");
    const [initialData, setInitialData] = useState(null);
    const [distributionData, setDistributionData] = useState(null);
    const [subcategoryCount, setsubcategoryCount] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setsubcategoryCount([]);
        setDistributionData(null);
        setInitialData(null);
    }, [selectedCategory, selectedSubcategory, comparisonCategory]);

    useEffect(() => {
        if (selectedCategory) {
            fetchSubcategories(selectedCategory).then(setSubcategories);
        } else {
            setSubcategories([]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        const loadData = async () => {
            if (selectedSubcategory && comparisonCategory) {
                setIsLoading(true);
                const data = await fetchMetrics({ category: selectedCategory, subcategory: selectedSubcategory });
                setInitialData(data);
                setIsLoading(false);
            }
        };

        loadData();
    }, [selectedCategory, selectedSubcategory, comparisonCategory]);

    const getFinalData = async () => {
        if (initialData) {
            const lastInfo = await Promise.all(
                initialData.map(async (singleData) => {
                    const getData = await fetchInfoById(singleData.id);
                    return getData;
                })
            );
            setDistributionData(lastInfo);
        }
    };

    const getsubcategoryCount = () => {
        if (distributionData && comparisonCategory) {
            const subcategoryCounts = {};
            let totalCount = 0;

            distributionData.forEach((singleData) => {
                const subcategories = singleData.subcategories;
                subcategories.forEach((sub) => {
                    if (sub.category.name === comparisonCategory) {
                        const subcategoryName = sub.name;
                        subcategoryCounts[subcategoryName] = (subcategoryCounts[subcategoryName] || 0) + 1;
                        totalCount += 1;
                    }
                });
            });

            const percentages = Object.entries(subcategoryCounts).map(([name, count]) => ({
                name,
                total: count
            }));

            setsubcategoryCount(percentages);
        } else {
            setsubcategoryCount([]);
        }
    };

    useEffect(() => {
        if (initialData) {
            getFinalData();
        }
    }, [initialData]);

    useEffect(() => {
        getsubcategoryCount();
    }, [distributionData, comparisonCategory]);

    const chartData = {
        labels: subcategoryCount.map(item => item.name),
        datasets: [
            {
                label: "Distribución de Subcategorías",
                data: subcategoryCount.map(item => item.total),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverOffset: 4
            }
        ]
    };

    const chartOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const quantity = tooltipItem.raw;
                        const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((quantity / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${quantity} (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <div className="relevant-insights-container">
            <h1>Comparación de Categorías</h1>
            <h3>A través de la elección de una categoría y una respectiva subcategoría, puedes elegir otra categoría para ver cómo sus subcategorías se distribuyen en esta.</h3>
            <div className="filters">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Selecciona una categoría inicial</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} disabled={!selectedCategory}>
                    <option value="">Selecciona una subcategoría</option>
                    {subcategories.map((sub) => (
                        <option key={sub.id} value={sub.name}>{sub.name}</option>
                    ))}
                </select>

                <select value={comparisonCategory} onChange={(e) => setComparisonCategory(e.target.value)} disabled={!selectedSubcategory}>
                    <option value="">Selecciona otra categoría para comparar</option>
                    {categories.filter((cat) => cat !== selectedCategory).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <p>Cargando datos...</p>
            ) : (
                (selectedCategory && selectedSubcategory && comparisonCategory && subcategoryCount.length > 0) ? (
                    <div>
                        
                        <div className="chart-container">
                        <h3>Subcategorías de "{comparisonCategory}" que pertenecen a "{selectedSubcategory}" en "{selectedCategory}"</h3>
                            <Pie data={chartData} options={chartOptions} />
                        </div>
                    </div>
                ) : (
                    <p>No hay datos disponibles para mostrar.</p>
                )
            )}

        </div>
    );
};

export default RelevantInsights;
