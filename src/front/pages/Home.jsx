import React from "react";
import { useNavigate } from "react-router-dom";
import home_page from "../assets/img/home_9.jpg"


export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container d-flex">
            <div>
                <img
                    src={home_page}
                    alt="home"
                    className="home_img"
                />
            </div>

            <div className="home_text">
                <h1>¡Bienvenidos!</h1>
                <p>
                    Acá va a ir un párrafo donde se explique que es un gestor de gastos y para saber mas, haremos una visual donde se vea el porque es necesario tener uno para los tiempos en los que vivimos.
                    A esa visual entraremos desde el boton 'leer mas' y los botones del formulario estaran en el navbar, hasta que no esten listos, se quedaran ahi para que se pueda seguir ingresando.
                </p>
                <button
                    className="btn"
                    onClick={() => navigate("/InfoGestor")}
                >
                    Leer más
                </button>
                {/* Botones inferiores lado a lado
                <div className="my-2 d-flex gap-2">
                    <button
                        className="btn btn-registro"
                        onClick={() => navigate("/Signup")}
                    >
                        Registrarse
                    </button>

                    <button
                        className="btn btn-iniciar_sesion"
                        onClick={() => navigate("/Login")}
                    >
                        Acceder
                    </button> 
                </div>*/}
            </div>

        </div>
    );
};
