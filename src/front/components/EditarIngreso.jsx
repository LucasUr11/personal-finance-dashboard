import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastNotification } from "./ToastNotification";


export const EditarIngreso = ({ show, handleClose, ingreso, token, onUpdated }) => {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "",
    });

    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const mapIngresoToForm = (ingresoData) => ({
        monto: ingresoData ? ingresoData.amount : "",
        descripcion: ingresoData ? ingresoData.description : "",
        categoria: ingresoData ? ingresoData.category : "",
        id: ingresoData ? ingresoData.id : null,
    });

    const [form, setForm] = useState(mapIngresoToForm(ingreso));

    useEffect(() => setForm(mapIngresoToForm(ingreso)), [ingreso]);

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

        try {
            const res = await fetch(`${API_URL}/api/ingresos/${form.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                setToast({
                    show: true,
                    message: "Error al actualizar el ingreso.",
                    type: "error"
                });
            } else {
                setToast({
                    show: true,
                    message: "Ingreso editado correctamente.",
                    type: "success"
                });
            }

            onUpdated();
            handleClose();
        } catch (error) {
            setToast({
                show: true,
                message: "Error al conectar con el servidor.",
                type: "error"
            });
        }
    };

    if (!ingreso) return null;

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Ingreso</Modal.Title>
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
