import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../js/auth";
import { ListaPresupuestos } from "../components/ListaPresupuestos";

export const Budget = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);

    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user")) || { name: "Usuario" };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAndLoadBudgets = async () => {
            const valid = await validateToken();
            if (!valid) {
                navigate("/login");
            } else {
                loadUserBudgets();
            }
        };
        checkAndLoadBudgets();
    }, []);

    const loadUserBudgets = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/budgets/user/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                setBudgets(data);
            } else {
                console.error(data.msg);
            }
        } catch (error) {
            console.error("Error de conexión");
        }
        setLoading(false);
    };

    const handleSelectBudget = (budgetId) => {
        navigate(`/budget/${budgetId}`);
    };

    const SkeletonBudgets = () => (
        <div className="row g-4">
            {[1, 2, 3].map((i) => (
                <div className="col-md-6 col-lg-4" key={i}>
                    <div className="skeleton-card"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="budget">

            <div className="container pt-5">
                <div className="text-center mb-5">
                    <h3 className="text-muted fw-light">Estamos felices de verte,</h3>
                    <h1 className="display-4 fw-bold text-dark">{user.name}.</h1>
                    <p className="budget-paragraph">
                        Gestiona tus presupuestos aquí
                    </p>
                    <button
                        className="btn budget-button rounded-pill px-4 py-2 mt-3"
                        onClick={() => navigate("/CreateBudget")}
                    >
                        <i className="bi bi-plus-lg me-2"></i>
                        Crear Nuevo Presupuesto
                    </button>
                </div>
                <div className="budget-list">
                    {loading ? (
                        <SkeletonBudgets />
                    ) : budgets.length === 0 ? (
                        <div className="text-center py-5">
                            <div className="empty-state-icon">

                                
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <h3 className="fw-bold text-secondary">No tienes presupuestos</h3>
                            <p className="text-muted mb-4">¡Crea uno nuevo para empezar!</p>
                        </div>
                    ) : (
                        <div>
                            <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                                <h4 className="fw-bold text-dark m-0">Mis Presupuestos</h4>
                                <span className="badge rounded-pill px-3 py-2 budget-counter-badge">
                                    Total: {budgets.length}
                                </span>
                            </div>

                            <ListaPresupuestos
                                budgets={budgets}
                                onSelectBudget={handleSelectBudget}
                                onRefresh={loadUserBudgets}
                                token={token}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};