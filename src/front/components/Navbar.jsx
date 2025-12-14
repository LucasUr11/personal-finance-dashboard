import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/img/logo-wisetrack.png"
import iconText from "../assets/img/logo-texto.png"
import { useEffect } from "react";
import { validateToken } from "../js/auth";

export const Navbar = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem("jwt");

	const handleLogout = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<nav className="navbar container-fluid">

			<div className="navbar-container">
				<div className="d-flex aling-items-center">
					<Link to="/Home">
						<img
							src={icon}
							alt=""
							width={100}
							height={100}
						/>
					</Link>
				</div>

				<div className="navbar-text">
					<Link to="/Home">
						<img
							src={iconText}
							height={100}
						/>
					</Link>
				</div>
			</div>

			{/* Botones */}
			<div className="d-flex align-items-center gap-2">

				{/* Si el token NO existe, muestra el login y el signup */}
				{!token && (
					<>
						<Link to={"/signup"} className="btn navbar-buttons signup">Registrate</Link>
						<Link to={"/login"} className="btn navbar-buttons login">Iniciar sesión</Link>
					</>
				)}

				{/* Si el token SI existe, mostrar Cerrar sesion */}
				{token && (
					<div className="d-flex align-items-center gap-2">
						<button className="btn navbar-button_cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
						<Link to={"/budget"} className="navbar-button_budget btn">Presupuesto<i className="fa-solid fa-angle-right"></i></Link>
					</div>
				)}

			</div>
		</nav>

	);
};