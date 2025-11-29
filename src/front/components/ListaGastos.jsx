import React from "react";
import { formatMoney } from "../js/utils";


export const ListaGastos = ({ gastos, onEdit, onDelete, moneda }) => {
    return (
        <div className="table-container">
            
            <div className="p-4 d-flex justify-content-between align-items-center border-bottom border-light">
                <h5 className="m-0 fw-bold text-dark">
                    <i className="bi bi-graph-down-arrow me-2 text-danger"></i> Gastos
                </h5>
                {gastos.length > 0 && (
                    <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3">
                        {gastos.length}
                    </span>
                )}
            </div>
            {gastos.length === 0 ? (
                <div className="empty-state">
                    <i className="bi bi-receipt text-danger"></i>
                    <p className="fw-medium m-0 text-muted">No hay gastos registrados.</p>
                </div>
            ) : (
                <div className="table-responsive flex-grow-1">
                    <table className="table custom-table">
                        <thead className="thead-expense">
                            <tr>
                                <th scope="col">Descripción</th>
                                <th scope="col">Categoría</th>
                                <th scope="col" className="text-end">Monto</th>
                                <th scope="col" className="text-center" style={{ width: '120px' }}>Acciones</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {gastos.map((item) => (
                                <tr key={item.id}>
                                    <td><span className="text-desc">{item.description}</span></td>
                                    <td><span className="category-badge">{item.category}</span></td>
                                    
                                    <td className="text-end">
                                        <span className="amount-negative">
                                            - {formatMoney(item.amount, moneda)}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            
                                            <button 
                                                className="btn-modern-icon edit" 
                                                onClick={() => onEdit(item)} 
                                                title="Editar Gasto"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            <button 
                                                className="btn-modern-icon delete" 
                                                onClick={() => onDelete(item.id)} 
                                                title="Eliminar Gasto"
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