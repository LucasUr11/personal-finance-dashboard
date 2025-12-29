import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/img/logo_2.png"
import iconText from "../assets/img/logo-texto_2.png"

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
			<div className="d-flex align-items-center gap-2">

				{/* Si el token NO existe, muestra el login y el signup */}
				{/* {!token && (

				)} */}

				{/* Si el token SI existe, mostrar Cerrar sesion */}
				{token && (
					<div className="d-flex align-items-center gap-2">
						<button
							className="btn navbar_buttons-btn logout"
							onClick={handleLogout}
						>
							CERRAR SESIÓN
						</button>
						<div className="navbar_buttons">
							<button
								className="btn navbar_buttons-btn"
								onClick={() => navigate("/budget")}
							>
								PRESUPUESTO
							</button>
						</div>
					</div>
				)}

			</div>
		</nav>

	);
};