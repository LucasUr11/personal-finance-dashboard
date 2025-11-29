import { useNavigate } from "react-router-dom"
import infoGestorImg1 from "../assets/img/home_13.jpg"
import infoGestorImg2 from "../assets/img/home_15.jpeg"

export const InfoGestor = () => {

    const navigate = useNavigate();
    return (
        <div className="container-fluid info-gestor">
            <div className="info-gestor_container">

                <div className="info-gestor_titulo">
                    <h1>¿Qué es el presupuesto familiar?</h1>
                    <p>
                        El presupuesto mensual familiar es una herramienta que organiza los ingresos y egresos mensuales para lograr equilibrio financiero. Sirve para tener una visión clara del dinero disponible y fomentar el ahorro bajo objetivos concretos.
                    </p>
                    <p>
                        A diferencia de una lista de pagos ocasionales, el presupuesto contempla tanto pagos fijos como variables: servicios, transporte, alimentación, salud, ocio, deudas y otros compromisos del hogar. Su utilidad radica en que se adapte a la realidad de cada familia y se actualice mes a mes.
                    </p>
                </div>

                <div className="info-gestor_presupuesto">
                    <h3>¿Para qué sirve elaborar un presupuesto familiar?</h3>
                    <p>
                        El presupuesto familiar permite visualizar cuánto dinero se tiene disponible y en qué se está gastando. Así, es más sencillo cubrir lo esencial, evitar deudas y reservar un monto para ahorrar o cumplir metas.
                    </p>
                    <p>
                        También ayuda a tomar decisiones con mayor claridad. Al saber cómo se distribuyen los recursos, es más fácil ajustarse a imprevistos y mejorar la estabilidad del hogar.
                    </p>
                </div>

                <div className="info-gestor_consejos">
                    <div>
                        <h3>
                            4 consejos para elaborar un buen presupuesto familiar
                        </h3>
                        <p>
                            Un presupuesto mensual no se trata solo de sumas y restas. Para que realmente funcione, debe estar alineado con las necesidades del hogar, ser flexible y mantenerse actualizado.
                        </p>
                    </div>
                    <div className="info-gestor_consejos">
                        <ul>
                            <li className="card">
                                <h3 className="px-4">Establece objetivos financieros claros</h3>
                                <p className="px-4">
                                    Antes de empezar, es importante saber qué se quiere lograr. El presupuesto puede ayudarte a pagar deudas, aumentar tu ahorro o simplemente organizar mejor tus costos.
                                </p>
                                <p className="px-4">
                                    Tener una meta clara permite tomar mejores decisiones y evaluar si el esfuerzo está dando resultados. Además, mantiene la motivación con el paso de los meses.
                                </p>
                            </li>

                            <li className="card">
                                <h3 className="px-4">Sé realista con los montos y categorías</h3>
                                <p className="px-4">
                                    Anota cada ingreso que recibas: sueldos, trabajos independientes, pensiones o ingresos variables. No dejes nada fuera, aunque parezca poco relevante.
                                </p>
                                <p className="px-4">
                                    Lo mismo con los gastos familiares. Desde los pagos fijos como el alquiler, hasta pequeñas compras del día a día. Esa suma de detalles ofrece una visión real y precisa de tus finanzas.
                                </p>
                            </li>

                            <li className="card">
                                <h3 className="px-4">Revisa y ajusta el presupuesto cada mes</h3>
                                <p className="px-4">
                                    Revisar tu presupuesto una vez al mes permite detectar errores, ajustar montos y hacer mejoras. También ayuda a comparar entre meses y ver si estás avanzando hacia tu objetivo.
                                </p>
                                <p className="px-4">
                                    La revisión no debe verse como una corrección, sino como una oportunidad para tomar decisiones más acertadas.
                                </p>
                            </li>

                            <li className="card">
                                <h3 className="px-4">Involucra a toda la familia</h3>
                                <p className="px-4">
                                    Si el presupuesto afecta a varias personas del hogar, lo ideal es que todos lo conozcan. Esto genera compromiso y evita confusiones en el manejo del dinero.
                                </p>
                                <p className="px-4">
                                    También es una forma de enseñar a los hijos sobre hábitos financieros saludables, involucrándolos según su edad. Esta práctica no solo refuerza el compromiso familiar, también responde al enfoque de Billetera Familiar, que promueven el desarrollo de habilidades financieras desde edades tempranas.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="info-gestor_btn">
                    <button
                        onClick={() => navigate("/home")}
                        className="btn info-gestor_btn-home"
                    >
                        Home
                    </button>
                </div>
            </div>
            <div className="info-gestor_container-img">
                <img
                    src={infoGestorImg1}
                    alt="familia_presupuesto"
                    className="info-gestor_img"
                />
                <img
                    src={infoGestorImg2}
                    alt="familia_presupuesto"
                    className="info-gestor_img-2"
                />

            </div>
        </div>
    )
}