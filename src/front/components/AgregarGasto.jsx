import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const AgregarGasto = ({ show, handleClose, budgetId, token, onAdded }) => {

    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");
    const categoriasGastos = [
        "Servicios",
        "Salud",
        "Deuda",
        "Entretenimiento",
        "Alimentación",
        "Transporte",
        "Impuestos/tasas",
        "Vacaciones",
        "Otros",
    ];

    // Variable de entorno
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
                `${API_URL}/api/budgets/${budgetId}/gasto`,
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
                return alert(data.msg || "Error al guardar el gasto.");
            }

            onAdded();
            setMonto("");
            setDescripcion("");
            setCategoria("");
            handleClose();
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Gasto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Monto</Form.Label>
                        <Form.Control
                            type="number"
                            name="monto"
                            value={monto}
                            onChange={e => setMonto(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcion"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Seleccione... </option>
                            <option value="servicios">Servicios</option>
                            <option value="salud">Salud</option>
                            <option value="deuda">Deuda</option>
                            <option value="alimentacion">Alimentación</option>
                            <option value="otros">Otros</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="success" onClick={handleSubmit}>Guardar Gasto</Button>
            </Modal.Footer>
        </Modal>
    );
};