import { Link } from "react-router-dom";

export const Footer = () => {

	return (
		<div className="footer">

			<div className="footer_h4">
				<h4 className="">Tu familia...Tus metas... Tu billetera familiar!</h4>
			</div>

			<div className="footer_icons">
				<a href="https://4geeks.com/es/login" target="_blank">
					<i className="fa-regular fa-envelope"></i>
				</a>
				<a href="https://github.com/4GeeksAcademy" target="_blank">
					<i className="fa-brands fa-github"></i>
				</a>
				<a href="https://www.linkedin.com/school/4geeksacademy/posts/?feedView=all" target="_blank">
					<i className="fa-brands fa-linkedin"></i>
				</a>
			</div>

			<div className="footer_button btn-group dropend">
				<button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
					¿Quienes somos?
				</button>
				<ul className="dropdown-menu">
					<li><a href="http://">Elizabeth</a></li>
					<li><a href="http://">Javier</a></li>
					<li><a href="http://">Lucas</a></li>
				</ul>
			</div>

			<div className="footer_copyright py-3">
				<p>©2025. Billetera Familiar SA. Todos los derechos reservados.</p>
			</div>
		</div>
	)
};
