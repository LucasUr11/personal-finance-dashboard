import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastNotification } from "./ToastNotification";

export const EditarGasto = ({ show, handleClose, gasto, token, onUpdated }) => {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const mapGastoToForm = (gastoData) => ({
        monto: gastoData ? gastoData.amount : "",
        descripcion: gastoData ? gastoData.description : "",
        categoria: gastoData ? gastoData.category : "",
        id: gastoData ? gastoData.id : null,
    });

    const [form, setForm] = useState(mapGastoToForm(gasto));

    useEffect(() => setForm(mapGastoToForm(gasto)), [gasto]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const amountNumber = Number(form.monto);

        if (isNaN(amountNumber) || amountNumber < 0) {
            setToast({
                show: true,
                message: "El monto es inválido o negativo.",
                type: "error"
            });
        }
        if (!form.descripcion.trim()) {
            setToast({
                show: true,
                message: "La descripción es obligatoria.",
                type: "error"
            });
        }
        if (!form.categoria.trim()) {
            setToast({
                show: true,
                message: "La categoria es obligatoria.",
                type: "error"
            });
        }

        const body = {
            amount: amountNumber,
            description: form.descripcion,
            category: form.categoria,
        };

        const tokenFinal = token || localStorage.getItem('token');

        if (!tokenFinal) {
            setToast({
                show: true,
                message: "No estás autorizado. Por favor inicia sesión nuevamente.",
                type: "error"
            });
        }

        try {
            const res = await fetch(`${API_URL}/api/gastos/${gasto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenFinal}`,
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    setToast({
                        show: true,
                        message: "Tu sesión ha expirado.",
                        type: "error"
                    });
                    window.location.href = '/';
                }
            } else {
                setToast({
                    show: true,
                    message: "Gasto editado correctamente.",
                    type: "error"
                });
            }

            onUpdated();
            handleClose();
        } catch (error) {
            console.error(error);
            setToast({
                show: true,
                message: "Error al conectar con el servidor.",
                type: "error"
            });
        }
    };

    if (!gasto) return null;

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Gasto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                type="number"
                                name="monto"
                                value={form.monto}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoria"
                                value={form.categoria}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="btn-custom" onClick={handleSubmit}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>

            <ToastNotification
                show={toast.show}
                message={toast.message}
                onClose={() =>
                    setToast(prev => ({ ...prev, show: false }))
                }
            />
        </div>
    );
};