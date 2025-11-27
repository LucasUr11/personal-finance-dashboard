import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/img/Icon.jpeg"
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
							src={Icon}
							alt=""
							width={75}
							height={75}
							className="rounded-4 border"
						/>
					</Link>
				</div>

				<div className="navbar-text">
					<h1>Billetera Familiar</h1>
				</div>
			</div>

			{/* Botones */}
			<div className="d-flex align-items-center gap-2">

				{/* Si el token NO existe, muestra el login y el signup */}
				{!token && (
					<>
						<Link to="/SobreNosotros" className="navbar-link-descripcion btn">
							Sobre Nosotros
						</Link>
						<Link to={"/signup"} className="btn navbar-buttons signup">Registrate</Link>
						<Link to={"/login"} className="btn navbar-buttons login">Iniciar sesión</Link>
					</>
				)}

				{/* Si el token SI existe, mostrar Cerrar sesion */}
				{token && (
					<div className="d-flex align-items-center gap-2">
						<Link to="/SobreNosotros" className="navbar-link-descripcion btn">
							Sobre Nosotros
						</Link>
						<button className="btn navbar-button_cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
						<Link to={"/budget"} className="navbar-button_budget btn"><i className="fa-solid fa-arrow-right-to-bracket"></i></Link>
					</div>
				)}

			</div>
		</nav>

	);
};