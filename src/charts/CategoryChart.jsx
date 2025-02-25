import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { fetchStatistics } from '../services/index.js'; 

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CategoryChart = ({ categoryName }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStatistics(categoryName);
                const labels = data.map(item => item.subcategory);
                const counts = data.map(item => item.count);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Conteo por Subcategoría',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [categoryName]);

    if (!chartData) {
        return <p className="loading">Cargando datos...</p>;
    }

    return (
        <div className="chart-container">
            <h2 className="chart-title">Estadísticas de {categoryName}</h2>
            <div className="chart">
                <Bar data={chartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default CategoryChart;
