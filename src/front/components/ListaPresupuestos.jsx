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

            <Row xs={1} md={2} lg={3} className="g-4">
                {budgets.map((budget) => (
                    <Col key={budget.id}>
                        <Card
                            className="lista_presupuestos-card shadow-sm rounded-4"
                            onClick={() => onSelectBudget(budget.id)}
                        >
                            <Card.Body className="lista_presupuestos_card-container">

                                <div className="lista_presupuestos_card-content">

                                    <div className="lista_presupuestos_card-content_icon rounded-circle">
                                        <i className="bi bi-wallet2 fs-4"></i>
                                    </div>

                                    <div className="lista_presupuestos_card-content_presupuesto">
                                        <h6>
                                            PRESUPUESTO
                                        </h6>
                                        <Card.Title className="fw-bold">
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
                                    <i className="lista_presupuestos_card-button-delete bi bi-trash3-fill"></i>
                                </Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};