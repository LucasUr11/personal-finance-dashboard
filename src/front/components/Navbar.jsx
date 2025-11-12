import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<div className="w-100">
			<nav className="navbar">
				<div className="container d-flex justify-content-between">
					<div className="">
						<img
							src="https://ih1.redbubble.net/image.5138037192.9751/st,small,507x507-pad,600x600,f8f8f8.jpg"
							alt="Work in progress"
							width={90}
							height={90}
						/>
					</div>
					<div className="">
						<h4>Billetera Familiar</h4>
					</div>
					<div className="">
						<button className="btn btn-navbar">Cerrar Sesión</button>
						{/* Agregar un icono al boton */}
					</div>
				</div>
			</nav>
		</div>
	);
};