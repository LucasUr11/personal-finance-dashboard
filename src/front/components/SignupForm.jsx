import { useState } from "react"

export const SignupForm = () => {

    // Almacenamos los datos ingresados 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Actualiza el estado 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Envia el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            //Hacer el POST al backendzs

            const response = await fetch("http://localhost:3001/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            //Pasamos la respuesta a .json
            const data = await response.json();
            if (response.ok) {
                setMessage("Usuario creado correctamente. Inicie sesión.")

            } else {
                const error = await response.json();
                throw new Error(error.message && "Error al registrar el usuario.")
            }

        } catch (error) {
            setError("Error en las credenciales.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-container sign-up-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form_h1">Crear una cuenta</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" className="social"><i className="fab fa-github"></i></a>
                </div>
                <span className="form_span">o utilize su email para registrarse</span>
                <input
                    type="text"
                    placeholder="Nombre"
                    aria-describedby="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form_input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form_input"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form_input"
                />

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <button
                    type="submit"
                    className="form_button"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Registrar"}
                </button>
            </form>

        </div>
    )
}