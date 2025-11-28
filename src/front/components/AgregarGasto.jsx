import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

export const AgregarGasto = ({ show, handleClose, budgetId, token, onAdded, moneda }) => {

    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");

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
    const categoriasGastos = [
        "Vivienda",
        "Servicios",
        "Alimentación",
        "Transporte",
        "Salud",
        "Educación",
        "Entretenimiento",
        "Deudas",
        "Mascotas",
        "Cuidado Personal",
        "Ahorro",
        "Otros"
    ];
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="header-modal">
                <Modal.Title className="text-white">Agregar Gasto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
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
                            {categoriasGastos.map((cat, index) => (
                                <option key={index} value={cat.toLowerCase()}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button className="btn-custom" onClick={handleSubmit}>Guardar Gasto</Button>
            </Modal.Footer>
        </Modal>
    );
};