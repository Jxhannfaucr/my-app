// src/pages/ProjectVentas.jsx
import React from 'react';
import ProjectTemplate from './ProjectTemplete';

function ProjectVentas() {
    const projectData = {
        title: "Análisis de Ventas Dashboard",
        subtitle: "Dashboard interactivo para análisis de ventas y métricas de negocio usando Power BI y Python",
        category: "Data Analysis",
        tags: ["Power BI", "Python", "SQL", "Data Visualization"],
        sections: [
            {
                id: "introduccion",
                title: "Introducción",
                content: [
                    {
                        type: "text",
                        value: "Este proyecto consiste en el desarrollo de un dashboard interactivo para el análisis de ventas de una empresa retail. El objetivo principal era identificar patrones de compra y optimizar la toma de decisiones."
                    },
                    {
                        type: "text",
                        value: "El dashboard permite visualizar métricas clave como ventas por región, productos más vendidos, y tendencias temporales."
                    }
                ]
            },
            {
                id: "objetivos",
                title: "Objetivos del Proyecto",
                content: [
                    {
                        type: "list",
                        items: [
                            "Analizar patrones de venta por región geográfica",
                            "Identificar productos con mayor rotación",
                            "Detectar tendencias estacionales",
                            "Optimizar estrategias de inventario"
                        ]
                    }
                ]
            },
            {
                id: "metodologia",
                title: "Metodología",
                content: [
                    {
                        type: "subtitle",
                        value: "1. Extracción de Datos"
                    },
                    {
                        type: "text",
                        value: "Los datos fueron extraídos de una base de datos SQL Server utilizando consultas optimizadas. Se trabajó con un dataset de más de 500,000 transacciones."
                    },
                    {
                        type: "code",
                        language: "sql",
                        value: `SELECT 
    region,
    producto,
    fecha,
    SUM(cantidad) as total_ventas
FROM ventas
WHERE fecha >= '2023-01-01'
GROUP BY region, producto, fecha`
                    },
                    {
                        type: "subtitle",
                        value: "2. Limpieza y Transformación"
                    },
                    {
                        type: "text",
                        value: "Se utilizó Python con pandas para limpiar y transformar los datos:"
                    },
                    {
                        type: "code",
                        language: "python",
                        value: `import pandas as pd

# Cargar datos
df = pd.read_csv('ventas.csv')

# Limpieza de datos
df = df.dropna()
df['fecha'] = pd.to_datetime(df['fecha'])
df['mes'] = df['fecha'].dt.month

# Calcular métricas
ventas_por_mes = df.groupby('mes')['total_ventas'].sum()`
                    }
                ]
            },
            {
                id: "resultados",
                title: "Resultados",
                content: [
                    {
                        type: "text",
                        value: "El dashboard implementado permitió identificar insights clave para el negocio:"
                    },
                    {
                        type: "list",
                        items: [
                            "Incremento del 25% en ventas en la región norte",
                            "Los productos electrónicos representan el 40% de las ventas",
                            "Pico de ventas en diciembre (temporada navideña)"
                        ]
                    },
                    {
                        type: "image",
                        src: "/images/dashboard-ventas.png",
                        alt: "Dashboard de ventas",
                        caption: "Vista principal del dashboard de ventas"
                    }
                ]
            },
            {
                id: "conclusiones",
                title: "Conclusiones",
                content: [
                    {
                        type: "quote",
                        value: "El análisis de datos es fundamental para la toma de decisiones estratégicas en el entorno empresarial actual."
                    },
                    {
                        type: "text",
                        value: "Este proyecto demostró el valor del análisis de datos en la optimización de procesos de negocio. Las recomendaciones implementadas resultaron en un incremento del 15% en la eficiencia operativa."
                    }
                ]
            }
        ]
    };

    return <ProjectTemplate {...projectData} />;
}

export default ProjectVentas;