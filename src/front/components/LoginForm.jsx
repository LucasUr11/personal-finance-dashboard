import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from 'react-bootstrap';

export const LoginForm = () => {

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
        setError("")

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
                localStorage.removeItem("jwt");
                setError(data.Mensaje || "Error al iniciar sesión.");
            }
        } catch (error) {
            console.error(error);
            setError("Error de conexión. Intente más tarde.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form_h1">Iniciar Sesión</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" className="social"><i className="fab fa-github"></i></a>
                </div>
                <span className="form_span">o usa tu cuenta</span>
                <input
                    type="email"
                    placeholder="Email"
                    className="form_input"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="form_input"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <a href="#">¿Olvidaste tu contraseña?</a> {/* Cambiar a navigate */}

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="form_button"
                >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
        </div>
    )
}