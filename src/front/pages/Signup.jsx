import { useState } from "react"
import { useNavigate } from 'react-router-dom';


export const Signup = () => {
	// Almacenamos los datos ingresados 
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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
			//Hacer el POST al backendzs

			const response = await fetch(`${API_URL}/api/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			//Pasamos la respuesta a .json
			const data = await response.json();
			if (response.ok) {
				setMessage("Usuario creado correctamente.")
				setTimeout(() => {
					navigate("/login");
				}, 1000);

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
		<div className="formulario signup">
			<div>
				<form className="formulario-data p-3" onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-white pb-3">Registrate</h1>
					</div>
					<div className="formulario-input">
						<i className="fa-solid fa-user"></i>
						<input
							type="text"
							placeholder="Nombre"
							aria-describedby="name"
							id="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</div>
					<div className="formulario-input">
						<i className="fa-solid fa-envelope"></i>
						<input
							type="email"
							placeholder="Email"
							id="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className="formulario-input">
						<i className="fa-solid fa-lock"></i>
						<input
							type="password"
							placeholder="Contraseña"
							id="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>

					{message && <div className="alert alert-success">{message}</div>}
					{error && <div className="alert alert-danger">{error}</div>}

					<div className="formulario-button">
						<button
							type="submit"
							className="btn formulario-button_registro"
							disabled={loading}
						>
							{loading ? "Cargando..." : "Registrarse"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}; 