// src/pages/ProjectVentas.jsx
import React from 'react';
import ProjectTemplate from './ProjectTemplete';
import dashboardImg from '../assets/img/dashboard_sanoyfresco.png';
import dashboardAmpliadoImg from '../assets/img/dashboard_ampliado_sanoyfresco.png';
import certificadoSanoyFresco from '../assets/img/cert_sanoyfresco.png';

function ProjectVentas() {
    const projectData = {
        title: "Estrategia integral de Data Science para revertir la caída de ventas en E-commerce",
        subtitle: "Estrategia Integral de Data Science para Revertir Caída de Ventas en E-commerce (Proyecto Sano y Fresco)",
        category: "Data Analysis",
        tags: ["Power BI", "Python", "SQL", "Data Visualization"],
        sections: [
            {
                id: "introduccion",
                title: "Introducción",
                content: [
                    {
                        type: "text",
                        value: "Proyecto integral que demuestra un flujo completo de análisis de datos para resolver una caída crítica del 82% en las ventas del e-commerce 'Sano y Fresco' (de 6.6M€ a 1.1M€ en 12 meses)."
                    },
                    {
                        type: "subtitle",
                        value: "Metodología"
                    },
                    {
                        type: "list",
                        items: [
                            "Fase 1: Diagnóstico con SQL - Análisis de 39M€ en transacciones",
                            "Fase 2: Dashboard en Power BI - Visualización ejecutiva",
                            "Fase 3: Modelo Predictivo en Python - Forecasting y recomendaciones"
                        ]
                    }
                ]
            },
            {
                id: "insights-sql",
                title: "Diagnóstico SQL",
                content: [
                    {
                        type: "text",
                        value: "Análisis de base de datos para identificar patrones y causas de la caída en ventas."
                    },
                    {
                        type: "subtitle",
                        value: "Hallazgos Clave"
                    },
                    {
                        type: "list",
                        items: [
                            "Caída de ingresos del 82%: De 6.6M€ (enero) a 1.1M€ (diciembre)",
                            "Top producto en volumen: Banana (2.46M unidades)",
                            "Top producto en ingresos: Fresas Orgánicas (3.43M€)",
                            "AOV promedio: 19.34€"
                        ]
                    },
                    {
                        type: "subtitle",
                        value: "Consulta SQL - Tendencia Mensual"
                    },
                    {
                        type: "code",
                        language: "sql",
                        value: `SELECT 
strftime('%Y-%m', fecha) AS mes,
SUM(precio_total) AS ingreso_mensual
FROM tickets
GROUP BY mes
ORDER BY mes;`
                    },
                    {
                        type: "text",
                        value: "Esta consulta reveló la tendencia descendente crítica que confirmó la crisis."
                    }
                ]
            },
            {
                id: "dashboard",
                title: "Dashboard Power BI",
                content: [
                    {
                        type: "subtitle",
                        value: "Dashboard en Power BI:"
                    },
                    {
                        type: "subtitle",
                        value: "Componentes Principales"
                    },
                    {
                        type: "list",
                        items: [
                            "KPIs de ventas, clientes y tickets promedio",
                            "Gráfico de tendencia temporal de ingresos",
                            "Treemap de productos por sección",
                            "Filtros interactivos por mes y categoría"
                        ]
                    },
                    {
                        type: "image",
                        src: dashboardImg,
                        alt: "Dashboard de Power BI",
                        caption: "Dashboard interactivo de análisis de ventas"
                    },
                    {
                        type: "subtitle",
                        value: "Impacto"
                    },
                    {
                        type: "text",
                        value: "Permite identificar rápidamente productos y períodos críticos, optimizar inventario y ajustar estrategias de marketing en tiempo real."
                    }
                ]
            },
            {
                id: "python",
                title: "Modelo Predictivo Python",
                content: [
                    {
                        type: "subtitle",
                        value: "Modelo Predictivo Python"
                    },
                    {
                        type: "text",
                        value: "El diagnóstico SQL confirmó la caída de ventas y el dashboard permitió visualizarla, pero 'Sano y Fresco' necesitaba una solución proactiva urgente."
                    },
                    {
                        type: "subtitle",
                        value: "Objetivo"
                    },
                    {
                        type: "text",
                        value: "Desarrollar un motor de recomendaciones basado en Market Basket Analysis para incrementar el ticket medio de compra, atacando directamente el problema de ingresos."
                    },
                    {
                        type: "text",
                        value: "Desarrollo de algoritmo de Market Basket Analysis para incrementar el ticket medio de compra mediante recomendaciones inteligentes de productos."
                    },
                    {
                        type: "subtitle",
                        value: "Proceso de Desarrollo"
                    },
                    {
                        type: "list",
                        items: [
                            "Carga de datos transaccionales desde la base de datos",
                            "Transformación: Matriz binaria one-hot de productos por pedido",
                            "Cálculo de métricas de asociación entre productos"
                        ]
                    },
                    {
                        type: "subtitle",
                        value: "Código Python - Transformación de Datos"
                    },
                    {
                        type: "code",
                        language: "python",
                        value: `# Agrupar productos por pedido
df_agrupado = df_cesta.groupby('id_pedido')['nombre_producto'].apply(
    lambda producto: ','.join(producto)
)

# Crear matriz one-hot
df_transacciones = df_agrupado.str.get_dummies(sep=',')`
                    },
                    {
                        type: "subtitle",
                        value: "Métricas del Algoritmo"
                    },
                    {
                        type: "list",
                        items: [
                            "Soporte: Filtra productos por frecuencia de compra",
                            "Confianza: Probabilidad de compra conjunta entre productos",
                            "Lift: Fuerza real de la asociación (>1 indica relación significativa)"
                        ]
                    },
                    {
                        type: "subtitle",
                        value: "Implementación de Confianza"
                    },
                    {
                        type: "code",
                        language: "python",
                        value: `def confianza(antecedente, consecuente):
# Casos donde se compraron ambos productos
conjunto_ac = df_transacciones[
    (df_transacciones[antecedente] == 1) & 
    (df_transacciones[consecuente] == 1)
]
# Confianza = compras conjuntas / compras de A
return len(conjunto_ac) / df_transacciones[antecedente].sum()`
                    },
                    {
                        type: "subtitle",
                        value: "Deployment e Impacto"
                    },
                    {
                        type: "text",
                        value: "El algoritmo genera un archivo 'reglas.csv' con todas las asociaciones de productos, que se integra en dos sistemas:"
                    },
                    {
                        type: "list",
                        items: [
                            "E-commerce Web: Recomendaciones en tiempo real durante la compra",
                            "Dashboard Power BI: Interfaz para marketing que permite crear packs, cupones personalizados y campañas dirigidas"
                        ]
                    },
                    {
                        type: "quote",
                        value: "Este motor de recomendaciones permite aumentar el valor promedio del pedido mediante sugerencias basadas en patrones reales de compra."
                    }
                ]
            },
            {
                id: "deployment",
                title: "Deployment y Explotación",
                content: [
                    {
                        type: "subtitle",
                        value: "Dashboard de Explotación"
                    },
                    {
                        type: "text",
                        value: "Integración del algoritmo en un dashboard de Power BI para que los equipos de Marketing y Producto puedan explotar las reglas de asociación sin conocimientos técnicos."
                    },
                    {
                        type: "text",
                        value: "El archivo 'reglas.csv' generado por Python se cargó en un segundo dashboard diseñado específicamente para identificar oportunidades de cross-selling."
                    },
                    {
                        type: "image",
                        src: dashboardAmpliadoImg,
                        alt: "Dashboard de explotación de reglas",
                        caption: "Dashboard interactivo para análisis de asociaciones de productos"
                    },
                    {
                        type: "subtitle",
                        value: "Componentes del Dashboard"
                    },
                    {
                        type: "list",
                        items: [
                            "KPIs del modelo: 11 reglas generadas, Confianza Media 12%, Lift Medio 23.5",
                            "Filtros por categoría de producto para análisis específicos",
                            "Diagrama de red que visualiza relaciones entre productos",
                            "Tabla de reglas ordenadas por Lift (fuerza de asociación)"
                        ]
                    },
                    {
                        type: "subtitle",
                        value: "Aplicaciones de Negocio"
                    },
                    {
                        type: "list",
                        items: [
                            "Crear ofertas dirigidas y cupones personalizados basados en productos con alto Lift",
                            "Diseñar packs de productos con alta correlación de compra",
                            "Alimentar el sistema de recomendación web con las reglas más fuertes"
                        ]
                    },
                    {
                        type: "quote",
                        value: "Esta herramienta democratiza el acceso a insights de Machine Learning, permitiendo a equipos no técnicos tomar decisiones basadas en datos para aumentar las ventas."
                    },
                    {
                        type: "image",
                        src: certificadoSanoyFresco,
                        alt: "Certificado Sano y Fresco",
                        caption: "Certificado de reconocimiento por el proyecto"
                    },
                ]
            }
        ]
    };

    return <ProjectTemplate {...projectData} />;
}

export default ProjectVentas;