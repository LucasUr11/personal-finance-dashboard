import { useNavigate } from "react-router-dom";

export const Footer = () => {

	const navigate = useNavigate();

	return (
		<div className="footer">

			<div className="footer_title">
				<h4 className="">Tu familia...Tus metas... Tu Billetera Familiar!</h4>
			</div>

			<div className="footer_button">
				<button
					type="button"
					className="btn"
				// navigate
				>
					Sobre nosotros
				</button>
			</div>

			<div className="footer_copyright">
				<p>©2025. Billetera Familiar SA. Todos los derechos reservados.</p>
			</div>
		</div>
	)
};
