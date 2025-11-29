import React from "react";
import { formatMoney } from "../js/utils";

export const ListaIngresos = ({ ingresos, onEdit, onDelete, moneda }) => {
    return (
        <div className="table-container">
            <div className="p-4 d-flex justify-content-between align-items-center border-bottom border-light">
                <h5 className="m-0 fw-bold text-dark">
                    <i className="bi bi-graph-up-arrow me-2 text-success"></i> Ingresos
                </h5>
                {ingresos.length > 0 && (
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">
                        {ingresos.length}
                    </span>
                )}
            </div>

            {ingresos.length === 0 ? (
                <div className="empty-state">
                    <i className="bi bi-cash-coin text-success"></i>
                    <p className="fw-medium m-0 text-muted">No hay ingresos registrados.</p>
                </div>
            ) : (
                <div className="table-responsive flex-grow-1">
                    <table className="table custom-table">
                        <thead className="thead-income">
                            <tr>
                                <th scope="col">Descripción</th>
                                <th scope="col">Categoría</th>
                                <th scope="col" className="text-end">Monto</th>
                                <th scope="col" className="text-center" style={{ width: '120px' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingresos.map((item) => (
                                <tr key={item.id}>
                                    <td><span className="text-desc">{item.description}</span></td>
                                    <td><span className="category-badge">{item.category}</span></td>
                                    <td className="text-end">
                                        <span className="amount-positive">
                                            + {formatMoney(item.amount, moneda)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            
                                            <button 
                                                className="btn-modern-icon edit" 
                                                onClick={() => onEdit(item)} 
                                                title="Editar Ingreso"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            <button 
                                                className="btn-modern-icon delete" 
                                                onClick={() => onDelete(item.id)} 
                                                title="Eliminar Ingreso"
                                            >
                                                <i className="bi bi-trash3"></i>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};