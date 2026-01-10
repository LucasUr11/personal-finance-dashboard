import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { ToastNotification } from "./ToastNotification";

export const AgregarGasto = ({ show, handleClose, budgetId, token, onAdded, moneda }) => {

    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    // Variable de entorno
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const handleSubmit = async () => {
        if (!monto.trim()) {
            setToast({
                show: true,
                message: "El monto es obligatorio.",
                type: "error"
            });
        }

        const amountNumber = Number(monto);

        if (isNaN(amountNumber)) {
            setToast({
                show: true,
                message: "Monto inválido.",
                type: "error"
            });
        }
        if (amountNumber < 0) {
            setToast({
                show: true,
                message: "Monto inválido.",
                type: "error"
            });
        }
        if (!descripcion.trim()) {
            setToast({
                show: true,
                message: "La descripción es obligatoria.",
                type: "error"
            });
        }
        if (!categoria.trim()) {
            setToast({
                show: true,
                message: "La categoria es obligatoria.",
                type: "error"
            });
        }

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
                setToast({
                    show: true,
                    message: data.msg || "Error al guardar el gasto.",
                    type: "error"
                });
            }

            onAdded();
            setMonto("");
            setDescripcion("");
            setCategoria("");
            handleClose();
        } catch (error) {
            setToast({
                show: true,
                message: "Error al conectar con el servidor",
                type: "error"
            });
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
            <Modal.Header closeButton className="agregar_gasto-header_modal">
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
                <Button className="agregar_gasto-btn" onClick={handleSubmit}>Guardar Gasto</Button>
            </Modal.Footer>
        </Modal>
    );
};