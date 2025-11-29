import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';

export const ListaPresupuestos = ({ budgets, onSelectBudget, onRefresh, token }) => {
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(amount || 0);
    };

    const handleDeleteBudget = async (budgetId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este presupuesto?")) return;

        try {
            const res = await fetch(`${API_URL}/api/budgets/${budgetId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                onRefresh();
            } else {
                alert(data.msg || "Error");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    return (
        <>
            <style type="text/css">
                {`
                .budget-card {
                    transition: all 0.3s ease;
                    border: none;
                    background: linear-gradient(135deg, #0e6b64 0%, #084a45 100%);
                    color: white;
                }
                .budget-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(14, 107, 100, 0.4) !important;
                }
                .delete-btn {
                    opacity: 0.6;
                    transition: 0.2s;
                }
                .delete-btn:hover {
                    opacity: 1;
                    background-color: rgba(255, 255, 255, 0.2) !important;
                    color: #ff6b6b !important;
                }
                `}
            </style>

            <Row xs={1} md={2} lg={3} className="g-4">
                {budgets.map((budget) => (
                    <Col key={budget.id}>
                        <Card
                            className="h-100 shadow-sm budget-card rounded-4 p-2"
                            onClick={() => onSelectBudget(budget.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Card.Body className="d-flex flex-column justify-content-between position-relative">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="rounded-circle bg-white bg-opacity-25 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                        <i className="bi bi-wallet2 fs-4 text-white"></i>
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        <h6 className="m-0 text-white-50 text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                            Presupuesto
                                        </h6>
                                        <Card.Title className="fw-bold m-0 text-truncate">
                                            {budget.name}
                                        </Card.Title>
                                    </div>
                                </div>
                                <div className="mt-2 mb-3">
                                    <small className="text-white-50">Balance Disponible</small>
                                    <h2 className="display-6 fw-bold mb-0">
                                        {formatCurrency(budget.balance)}
                                    </h2>
                                </div>
                                <Button
                                    variant="link"
                                    className="position-absolute top-0 end-0 m-2 delete-btn text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteBudget(budget.id);
                                    }}
                                >
                                    <i className="bi bi-trash3-fill"></i>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};