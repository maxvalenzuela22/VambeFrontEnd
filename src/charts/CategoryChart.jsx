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
                            label: 'Cantidad',
                            data: counts,
                            backgroundColor: labels.map((_, i) => `hsl(${i * 35}, 80%, 60%)`),
                            borderColor: labels.map((_, i) => `hsl(${i * 35}, 80%, 40%)`),
                            borderWidth: 2,
                            borderRadius: 6,
                            hoverBackgroundColor: labels.map((_, i) => `hsl(${i * 35}, 90%, 50%)`),
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
            <h2 className="chart-title">📊 Estadísticas de {categoryName}</h2>
            <div className="chart">
                <Bar 
                    data={chartData} 
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                titleFont: { size: 16, weight: 'bold' },
                                bodyFont: { size: 14 },
                                padding: 12,
                                cornerRadius: 10,
                            },
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                                ticks: { font: { size: 14 }, color: '#555' },
                            },
                            y: {
                                grid: { color: '#ddd', lineWidth: 0.5 },
                                ticks: { font: { size: 14 }, color: '#555' },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default CategoryChart;
