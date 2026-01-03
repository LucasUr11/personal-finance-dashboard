import React from "react";
import { formatMoney } from "../js/utils";

export const Balance = ({ ingresos, gastos, moneda }) => {
    const totalIngresos = ingresos.reduce((sum, i) => sum + i.amount, 0);
    const totalGastos = gastos.reduce((sum, g) => sum + g.amount, 0);
    const disponible = totalIngresos - totalGastos;

    return (
        <div className="h-100 d-flex flex-column">

            <div className="create_budget-balance">
                <h5 className="m-0 fw-bold text-dark">
                    <i className="bi bi-wallet2 me-2"></i> Balance
                </h5>
            </div>

            <div className="create_budget-description">

                <div className="create_budget-description_ingresos-gastos">
                    <span className="text-muted fw-medium">Ingresos Totales:</span>
                    <span className="amount-positive">
                        {formatMoney(totalIngresos, moneda)}
                    </span>
                </div>

                <div className="create_budget-description_ingresos-gastos">
                    <span className="text-muted fw-medium">Egresos Totales:</span>
                    <span className="amount-negative">
                        {formatMoney(totalGastos, moneda)}
                    </span>
                </div>

                <div className="create_budget-description_disponible">
                    <span className="fw-bold text-dark fs-5">Disponible:</span>
                    <span className={`
                        fw-bold fs-5 ${disponible >= 0 ? 'valor_positivo' : 'valor_negativo'}`}>
                        {formatMoney(disponible, moneda)}
                    </span>
                </div>

            </div>

        </div>
    );
};