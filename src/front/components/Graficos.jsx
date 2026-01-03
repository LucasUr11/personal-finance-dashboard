import React from 'react';
import { Pie } from 'react-chartjs-2';
// Importaciones necesarias de Chart.js para que el gráfico funcione
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// **REGISTRAR ELEMENTOS DE CHART.JS**
// Esto es esencial para que Chart.js sepa cómo dibujar el Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

export const Graficos = ({
    datos = [],
    titulo = "Resumen por Categoría",
    label = "Monto (₡)"
}) => {

    // Lógica para resumir los datos por categoría
    const resumenPorCategoria = (items) => {
        if (!Array.isArray(items)) return [];
        return items.reduce((acc, item) => {
            // Se asegura que la categoría sea un string válido
            const category = String(item.category || 'Sin Categoría');
            // Asegura que el monto sea un número para la suma
            const amount = Number(item.amount) || 0;

            acc[category] = (acc[category] || 0) + amount;
            return acc;
        }, {});
    };

    const datosPorCategoria = resumenPorCategoria(datos);
    const categorias = Object.keys(datosPorCategoria);
    const montos = Object.values(datosPorCategoria);

    // Si no hay datos, no se muestra el gráfico
    if (montos.length === 0) {
        return (
            <div className="p-3 border rounded h-100">
                <h5 className="mb-3">{titulo}</h5>
                <p className="text-muted">No hay datos para mostrar en el gráfico.</p>
            </div>
        );
    }

    // Generar colores de forma simple (puedes expandir esta paleta)
    const coloresBase = [
        'rgba(205, 38, 38, 1)', // Rojo
        'rgba(0, 72, 186, 1)', // Azul
        'rgba(163, 133, 96, 1)', // Amarillo
        'rgba(15, 92, 75, 1)', // Turquesa
        'rgba(153, 102, 255, 0.8)', // Violeta
        'rgba(255, 159, 64, 0.8)', // Naranja
    ];

    // Mapea colores a categorías, repitiendo si hay más de 6 categorías
    const colores = categorias.map((_, index) => coloresBase[index % coloresBase.length]);

    // Datos para el gráfico de pastel
    const dataGrafico = {
        labels: categorias, // Nombres de las categorías
        datasets: [
            {
                label: label,
                data: montos, // Montos totales por categoría
                backgroundColor: colores,
                hoverOffset: 4,
                borderColor: '#ffffff', // Borde blanco entre segmentos
                borderWidth: 1,
            }
        ]
    };

    const opcionesGrafico = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Muestra la leyenda a la derecha
            }
        },
    };

    return (
        <div className="p-3 border rounded h-100">
            <h5 className="mb-3 text-center">{titulo}</h5>
            <div className='graficos'>
                <Pie data={dataGrafico} options={opcionesGrafico} />
            </div>
        </div>
    );
};