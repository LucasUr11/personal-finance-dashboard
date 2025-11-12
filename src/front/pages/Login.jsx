import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    return (
        <div className="container mt-5 d-flex flex-column">
            <div>
                <form className="card p-3">
                    <div className="text-center">
                        <h1 className="text-white pb-3">Iniciar Sesion</h1>
                    </div>
                    <div className="input-container mb-3">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="input-container mb-3">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" className="form-control" placeholder="Contraseña" />
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        <Link to="/budget" type="submit" className="btn btn-iniciar_sesion w-100">
                            Iniciar sesión
                        </Link>
                        <Link to="/" className="btn btn-iniciar_sesion w-100">
                            Registrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}