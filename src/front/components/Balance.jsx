import React from "react";
import { formatMoney } from "../js/utils";

export const Balance = ({ ingresos, gastos, moneda }) => {
    const totalIngresos = ingresos.reduce((sum, i) => sum + i.amount, 0);
    const totalGastos = gastos.reduce((sum, g) => sum + g.amount, 0);
    const disponible = totalIngresos - totalGastos;

    return (
        <div className="table-container h-100 d-flex flex-column">
            <div className="p-4 d-flex justify-content-between align-items-center border-bottom border-light">
                <h5 className="m-0 fw-bold text-dark">
                    <i className="bi bi-wallet2 me-2 text-primary"></i> Balance
                </h5>
            </div>
            <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                    <span className="text-muted fw-medium">Ingresos Totales:</span>
                    <span className="amount-positive">
                        {formatMoney(totalIngresos, moneda)}
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                    <span className="text-muted fw-medium">Egresos Totales:</span>
                    <span className="amount-negative">
                        {formatMoney(totalGastos, moneda)}
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-3 mt-1">
                    <span className="fw-bold text-dark fs-5">Disponible:</span>
                    <span className={`fw-bold fs-5 ${disponible >= 0 ? 'text-primary' : 'text-danger'}`}>
                        {formatMoney(disponible, moneda)}
                    </span>
                </div>

            </div>
        </div>
    );
};