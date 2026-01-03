import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

export const AgregarIngreso = ({ show, handleClose, budgetId, token, onAdded, moneda }) => {
    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");

    // Variable de entorno.-
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const handleSubmit = async () => {
        if (!monto.trim()) return alert("El monto es obligatorio");

        const amountNumber = Number(monto);

        if (isNaN(amountNumber)) return alert("Monto inválido");
        if (amountNumber < 0) return alert("Monto inválido");
        if (!descripcion.trim()) return alert("La descripción es obligatoria");
        if (!categoria.trim()) return alert("La categoría es obligatoria");

        setError("");
        try {
            const res = await fetch(
                `${API_URL}/api/budgets/${budgetId}/ingreso`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        description: descripcion,
                        category: categoria,
                        amount: amountNumber
                    })
                }
            );

            const data = await res.json();


            if (!res.ok) {
                setError(data.msg || "Error al guardar ingreso.");
                return;
            }

            onAdded();
            setMonto("");
            setDescripcion("");
            setCategoria("");
            setError("")
            handleClose();

        } catch (error) {
            setError("Error al conectar con el servidor");
        }
    };
    const categoriasIngresos = [
        "Salario",
        "Negocio Propio",
        "Inversiones",
        "Bonos / Aguinaldo",
        "Pensiones",
        "Alquileres",
        "Regalos",
        "Devoluciones",
        "Otros"
    ];
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="agregar_ingreso-header_modal">
                <Modal.Title className="text-white">Agregar Ingresos</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Monto</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="fw-bold bg-light">
                                {moneda ? moneda.code : '$'}
                            </InputGroup.Text>

                            <Form.Control
                                type="number"
                                placeholder="0"
                                name="monto"
                                value={monto}
                                onChange={e => setMonto(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            type="text"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Seleccione... </option>
                            {categoriasIngresos.map((cat, index) => (
                                <option key={index} value={cat.toLowerCase()}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button className="agregar_ingreso-btn" onClick={handleSubmit}>
                    Guardar Ingreso
                </Button>
            </Modal.Footer>
        </Modal>
    );
};