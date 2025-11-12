import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from 'react-router-dom';


export const Signup = () => {
	// Almacenamos los datos ingresados 
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});

	const navigate = useNavigate();
	/*
		Acá se declara la variable de entorno (Explicación en el README.es.md).-
		const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"; 
	*/

	// Actualiza el estado 
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	// Envia el formulario
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			//Hacer el POST al backendzs
			/*
				Acá hay un error en donde tenemos que usar una variable de entorno.-
				Ejemplo de como usarla:
				const response = await fetch(`${API_URL}/api/singup`, ...)
			*/
			const response = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			//Pasamos la respuesta a .json
			const data = await response.json();
			if (response.ok) {
				alert(data.Mensaje);
			} else {
				alert(data.Mensaje);
			}
		} catch (error) {
			alert("Error de conexión con el servidor");
		}
	}
	return (
		<div className="container mt-5 d-flex flex-column">
			<div>
				<form className="card p-3" onSubmit={handleSubmit}>
					<div className="text-center">
						<h1 className="text-white pb-3">Registrate</h1>
					</div>
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Nombre"
							aria-describedby="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<input
							type="email"
							className="form-control"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							className="form-control"
							placeholder="Contraseña"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
					<div className="d-flex justify-content-center gap-2">
						<button type="submit" className="btn btn-registro w-100">Registrarse</button>
						<Link to="/login" className="btn btn-iniciar_sesion w-100">
							Iniciar sesión
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}; 