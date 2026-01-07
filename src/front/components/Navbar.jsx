import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/img/logo_2.png"

export const Navbar = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem("jwt");

	const handleLogout = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("user");
		navigate("/");
	};

	return (
		<nav className="navbar container-fluid">

			<div className="navbar-container">
				<div className="d-flex aling-items-center">
					<Link to="/Home">
						<img
							src={icon}
							width={50}
							height={50}
						/>
					</Link>
				</div>

				<div className="navbar-text">
					<Link to="/Home">
						<h5>WISETRACK</h5>
					</Link>
				</div>
			</div>

			{/* Botones */}
			<div className="navbar_buttons">

				{/* Si el token NO existe, muestra el login y el signup */}
				{!token && (
					<div className="mx-3">
						<div className="navbar_buttons-nosotros btn-group dropstart">
							<button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
								NOSOTROS
							</button>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item fs-7" href="https://www.instagram.com/lucas_urquiza11/" target="_blank">Instagram</a></li>
								<li><a className="dropdown-item fs-7" href="https://github.com/LucasUr11" target="_blank">GitHub</a></li>
								<li><a className="dropdown-item fs-7" href="https://www.linkedin.com/in/lucas-urquiza-c11/" target="_blank">Linkedin</a></li>
							</ul>
						</div>
					</div>

				)}

				{/* Si el token SI existe, mostrar Cerrar sesion */}
				{token && (
					<div className="navbar_buttons-logueados mx-3">
						<button
							className="btn logout"
							onClick={handleLogout}
						>
							CERRAR SESIÓN
						</button>
						<button
							className="btn presupuesto"
							onClick={() => navigate("/budget")}
						>
							PRESUPUESTO
						</button>
					</div>
				)}

			</div>
		</nav>

	);
};