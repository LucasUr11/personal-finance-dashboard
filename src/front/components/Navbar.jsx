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

	useEffect(() => {
		const check = async () => {
			const valid = await validateToken();
			if (!valid) navigate("/login");
		};
		check();
	}, []);

	return (
		<nav className="navbar container-fluid d-flex justify-content-around align-items-center">

			<div className="nav-container d-flex align-items-center">
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

				<div className="nav-text text-white">
					<h1>Billetera Familiar</h1>
				</div>
			</div>

			{/* Botones */}
			<div className="d-flex align-items-center gap-2">

				{/* Si el token NO existe, muestra el login y el signup */}
				{!token && (
					<>
						<Link to={"/signup"} className="btn nav-btns">Registrate</Link>
						<Link to={"/login"} className="btn nav-btns">Iniciar sesión</Link>
					</>
				)}

				{/* Si el token SI existe, mostrar Cerrar sesion */}
				{token && (
					<div className="d-flex align-items-center gap-2">
						<button className="btn nav-btn_cerrar_sesion" onClick={handleLogout}>Cerrar sesión</button>
						<Link to={"/budget"} className="nav-btn_budget btn"><i className="fa-solid fa-arrow-right-to-bracket"></i></Link>
					</div>
				)}

			</div>
		</nav>

	);
};