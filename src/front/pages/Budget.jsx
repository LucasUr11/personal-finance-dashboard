import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../js/auth";
// Importamos el nuevo componente de lista de presupuestos
import { ListaPresupuestos } from "../components/ListaPresupuestos";

export const Budget = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]); // Para almacenar la lista de presupuestos

    // Variable de entorno
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));

    const [loading, setLoading] = useState(true);

    // Valida el token y carga los presupuestos al iniciar
    useEffect(() => {
        const checkAndLoadBudgets = async () => {
            const valid = await validateToken();
            if (!valid) {
                navigate("/login");
            } else {
                // Si el token es válido, cargar los presupuestos del usuario
                loadUserBudgets();
            }
        };
        checkAndLoadBudgets();
    }, []);

    // Nueva función para cargar los presupuestos del usuario desde el backend
    const loadUserBudgets = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/budgets/user/${user.id}`, { // Asumo un endpoint para obtener presupuestos por usuario
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                setBudgets(data); // Asume que el backend devuelve una lista de presupuestos
            } else {
                alert(data.msg || "Error al cargar los presupuestos.");
            }
        } catch (error) {
            alert("Error de conexión al cargar presupuestos.");
        }
        setLoading(false);
    };

    const handleSelectBudget = (budgetId) => {
        navigate(`/budget/${budgetId}`);
    };
    const SkeletonBudgets = () => {
        return (
            <div className="mt-4">
                <h4 className="text-white mb-4">Cargando tus presupuestos...</h4>

                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="p-3 mb-3"
                        style={{
                            height: "70px",
                            borderRadius: "10px",
                            border: "2px solid #2c2f36",
                            background: "#d9d9d9",
                            display: "flex",
                            alignItems: "center",
                            animation: "loading 1.6s infinite ease-in-out",
                        }}
                    >
                        <div
                            style={{
                                width: "40%",
                                height: "15px",
                                borderRadius: "5px",
                                background: "#c5c5c5",
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        );
    };
    return (
        <div className="container text-center budget mt-5">
            <h3>Estamos felices de verte,</h3>
            <h1>{user.name}.</h1>
            <p className="budget_paragraph">↓ Gestiona tus presupuestos aquí. ↓</p>

            {/* Crear Presupuesto */}
            <button
                className="btn budget_button m-2"
                onClick={() => navigate("/CreateBudget")}
            >
                Crear Nuevo Presupuesto
            </button>
            <hr />

            {/* Listado de Presupuestos */}
            <div className="card p-4 my-4" style={{ border: '2px solid #2c2f36' }}>
                <h4 className="card-title text-white">Estos son tus presupuestos</h4>
                {loading ? (
                    <SkeletonBudgets />
                ) : budgets.length === 0 ? (
                    <p>No tienes presupuestos creados. ¡Crea uno nuevo!</p>
                ) : (
                    <ListaPresupuestos
                        budgets={budgets}
                        onSelectBudget={handleSelectBudget}
                        onRefresh={loadUserBudgets}
                        token={token}
                    />
                )}
            </div>
        </div>
    );
};