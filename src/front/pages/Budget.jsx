import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { validateToken } from "../js/auth";
import { CreateBudget } from "./CreateBudget";


export const Budget = () => {
    const [showIngreso, setShowIngreso] = useState(false);
    const [showGasto, setShowGasto] = useState(false);
    const navigate = useNavigate();

    const handleSave = (data) => {
        console.log("Datos guardados:", data);
    };

    {/* Valida el token*/ }
    useEffect(() => {
        const check = async () => {

            const valid = await validateToken();

            if (!valid) {
                navigate("/login");
            }
        };

        check();
    }, []); // Se ejecuta una sola vez, al iniciar la applicación.-

    {/* Jala el usuario y datos*/ }
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container text-center mt-5">
            <h1>Estamos felices de verte, {user.name}.</h1>
            <p>Crea tu presupuesto familiar aquí.</p>
            <button
                className="btn btn-success m-2"
                onClick={() => navigate("/CreateBudget")}
            >
                Crear Presupuesto
            </button>
        </div>
    );
}