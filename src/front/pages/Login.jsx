import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from 'react-bootstrap';


// Almacenamos los datos ingresados 
export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Variable de entorno.-
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    // Actualiza el estado
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Envia el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            // Almacenamos el token
            if (response.ok) {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user))
                setTimeout(() => {
                    navigate("/budget");
                }, 1000);
            } else {
                const error = await response.json();
                throw new Error(error.message && "Error al iniciar sesión.")
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column">
            <div>
                <Form className="card p-3" style={{ backgroundColor: "#2c2f36" }} onSubmit={handleSubmit}>

                    <div className="text-center">
                        <h1 className="text-white pb-3">Iniciar Sesion</h1>
                    </div>

                    {/* Ingresar Email*/}
                    <div className="input-container mb-3">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>

                    {/* Ingresar password*/}
                    <div className="input-container mb-3">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Botón */}
                    <Button
                        type="submit"
                        className="btn w-100 btn-iniciar_sesion"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </Button>
                </Form>
            </div>
        </div>
    )
}