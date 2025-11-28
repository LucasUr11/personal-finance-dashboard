import JavierImg from "../assets/img/javier.jpg";
import LucasImg from "../assets/img/lucas.jpeg";
import ElizabethImg from "../assets/img/elizabeth.jpeg";


export const SobreNosotros = () => {
    return (
        <div className="container mt-5 mb-5">

            <h1 className="text-center mb-4">Sobre Nosotros</h1>

            <section className="mb-5">
                <h3>Descripción del Proyecto</h3>
                <p>
                    Billetera Familiar es una herramienta diseñada para ayudar a las familias
                    a administrar su presupuesto de forma clara, sencilla y visual. Permite
                    registrar ingresos, gastos, generar reportes en PDF y visualizar gráficos
                    que facilitan la toma de decisiones financieras.
                </p>
            </section>

            <section className="mb-5">
                <h3>Nuestro Equipo</h3>
                <div className="row mt-4">

                    <div className="col-md-4">
                        <div className="card perfil-card">
                            <img src={ElizabethImg} className="perfil-foto" alt="Elizabeth" />
                            <div className="card-body">
                                <h5 className="card-title">Elizabeth Duarte</h5>
                                <div className="card-text descripcion-hover">
                                    <p>País: Costa Rica</p>
                                    <p>
                                        Este curso fue un viaje intenso, retador y profundamente transformador. Llegué con inseguridades, dudas y muchas ganas de aprender, y me voy con herramientas, claridad y una enorme confianza en lo que puedo construir.
                                        Este proceso me hizo crecer no solo como desarrolladora, sino como persona. Hoy me siento lista para seguir aprendiendo, crear proyectos más grandes y abrirme camino en este mundo que una vez me pareció imposible.
                                    </p>
                                    <div className="icon-container">
                                        <a
                                            href="https://www.linkedin.com/in/elizabeth-duarte/"
                                            target="_blank"
                                            className="icon-link"
                                        >
                                            <i className="fa-brands fa-linkedin"></i>
                                        </a>
                                        <a
                                            href="https://github.com/liv-ortiz25"
                                            target="_blank"
                                            className="icon-link"
                                        >
                                            <i className="fa-brands fa-github"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card perfil-card">
                            <img src={JavierImg} className="perfil-foto" alt="Javier" />
                            <div className="card-body">
                                <h5 className="card-title">Javier Obando</h5>
                                <div className="card-text descripcion-hover">
                                    <p>País: Costa Rica</p>
                                    <p>A lo largo de este proceso he aprendido muchísimo sobre desarrollo. Ha sido una experiencia con momentos retadores y otros muy gratificantes, pero cada etapa ha contribuido a un aprendizaje real y valioso.
                                        Hoy siento que puedo desenvolverme bien tanto en el frontend como en el backend. Aun así, me identifico más con el trabajo del lado del backend, ya que la parte de diseño nunca fue mi punto más fuerte durante el bootcamp.
                                    </p>
                                    <div className="icon-container">
                                        <a
                                            href="https://www.linkedin.com/in/jobonilla05/"
                                            target="_blank"
                                            className="icon-link"
                                        >
                                            <i className="fa-brands fa-linkedin"></i>
                                        </a>
                                        <a
                                            href="https://github.com/jabon05"
                                            target="_blank"
                                            className="icon-link"
                                        >
                                            <i className="fa-brands fa-github"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card perfil-card">
                            <img src={LucasImg} className="perfil-foto" alt="Lucas" />
                            <div className="card-body">
                                <h5 className="card-title">Lucas Urquiza</h5>
                                <div className="card-text descripcion-hover">
                                    <p>País: Argentina</p>
                                    <p>Este curso fue uno de los mayores retos que he tenido. Fue una ventana a cosas que no tenia idea de su existencia. Me saco de mi zona de confort en la programación y me enseño un abanico de infinitas cosas que se pueden hacer con el desarrollo web.
                                        Sin dudas es una de las experiencias que más me exigió y a su vez que más disfrute. Gracias a este curso, tengo la certeza de poder ser un desarrollador Full-Stack. Aunque me desenvelvo mejor del lado del frontend más que del backend, entiendo más sobre sus temas y sus formas de diseño.
                                    </p>
                                    <div className="icon-container">
                                        <a
                                            href="https://www.linkedin.com/in/lucas-urquiza-b6663624a/"
                                            target="_blank"
                                            className="icon-link"
                                        >
                                            <i className="fa-brands fa-linkedin"></i>
                                        </a>
                                        <a
                                            href="https://github.com/LucasUr11"
                                            target="_blank"
                                            className="icon-link"
                                        >
                                            <i className="fa-brands fa-github"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="mb-5">
                <h3>Tecnologías Usadas</h3>
                <ul>
                    <li>React + Bootstrap</li>
                    <li>Python Flask</li>
                    <li>SQLAlchemy</li>
                    <li>JWT Authentication</li>
                    <li>ReportLab para generación de PDFs</li>
                </ul>
            </section>

            <section className="mb-5">
                <h3>Funciones a Futuro</h3>
                <ul>
                    <li>Exportar reportes a Excel</li>
                    <li>Comparar presupuestos entre meses</li>
                    <li>Sincronización familiar multiusuario</li>
                    <li>Gráficos avanzados por categoría</li>
                </ul>
            </section>

        </div>
    );
};
