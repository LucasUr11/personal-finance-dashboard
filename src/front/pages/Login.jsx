import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from 'react-bootstrap';


// Almacenamos los datos ingresados 
export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

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
                alert(data.Mensaje);
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user))
                setTimeout(() => {
                    navigate("/budget");
                }, 1000);
            } else {
                alert(data.Mensaje);
            }
        } catch (error) {
            alert("Error de conexión con el servidor");
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

                    {/* Botón */}
                    <Button type="submit" className="btn w-100" style={{ backgroundColor: "#0e6b64", border: "1px solid #0e6b64" }}>
                        Iniciar sesión
                    </Button>
                </Form>
            </div>
        </div>
    )
}