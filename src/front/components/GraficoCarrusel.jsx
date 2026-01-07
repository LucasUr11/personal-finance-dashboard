import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Graficos } from './Graficos';


export const GraficoCarrusel = ({ ingresos, egresos, moneda }) => {
    return (
        <div className="graficos_carrusel table-container">
            <div className="graficos_carrusel-titulo">
                <h5 className="m-0 fw-bold text-dark">
                    <i className="bi bi-pie-chart-fill me-2"></i> Análisis
                </h5>
            </div>
            <div className="p-4 flex-grow-1 d-flex align-items-center justify-content-center">
                <Carousel
                    interval={null}
                    variant="dark"
                    className="w-100 custom-carousel"
                >
                    <Carousel.Item>
                        <Graficos
                            datos={ingresos}
                            titulo="Distribución de Ingresos"
                            moneda={moneda}
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <Graficos
                            datos={egresos}
                            titulo="Distribución de Gastos"
                            moneda={moneda}
                        />
                    </Carousel.Item>
                </Carousel>

            </div>
        </div>
    );
};