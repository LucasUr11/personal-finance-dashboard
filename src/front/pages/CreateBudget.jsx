import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../js/auth";
import { AgregarIngreso } from "../components/AgregarIngreso";
import { AgregarGasto } from "../components/AgregarGasto";
import { ListaIngresos } from "../components/ListaIngresos";
import { ListaGastos } from "../components/ListaGastos";
import { EditarGasto } from '../components/EditarGasto';
import { EditarIngreso } from '../components/EditarIngreso';
import { Balance } from "../components/Balance";
import { currencies } from "../js/utils"
export const CreateBudget = () => {

    const navigate = useNavigate();
    const [budgetName, setBudgetName] = useState("");
    const [budgetId, setBudgetId] = useState(null);
    const [gastos, setGastos] = useState([]);
    const [ingresos, setIngresos] = useState([]);
    const [monedaSeleccionada, setMonedaSeleccionada] = useState(currencies[0]);
    const [showIngreso, setShowIngreso] = useState(false);
    const [showGasto, setShowGasto] = useState(false);
    const [showEditarGasto, setShowEditarGasto] = useState(false);
    const [gastoAEditar, setGastoAEditar] = useState(null);
    const [showEditarIngreso, setShowEditarIngreso] = useState(false);
    const [ingresoAEditar, setIngresoAEditar] = useState(null);

    // Variable de entorno.-
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    // Token y usuario
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));

    const refreshData = () => {
        loadBudget();
    };
    // Validar token
    useEffect(() => {
        const check = async () => {
            const valid = await validateToken();
            if (!valid) navigate("/login");
        };
        check();
    }, []);

    // Crear presupuesto
    const crearBudget = async () => {
        if (!budgetName.trim()) {
            return alert("El nombre del presupuesto es obligatorio");
        }

        const res = await fetch(`${API_URL}/api/budgets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: budgetName }),
        });

        const data = await res.json();

        if (!res.ok) return alert(data.msg || "Error creando presupuesto");

        setBudgetId(data.id);
        localStorage.setItem(`budget_currency_${data.id}`, JSON.stringify(monedaSeleccionada));
        alert("Presupuesto creado");
        CargarBudget(data.id);
    };

    // Cargar el presupuesto
    const CargarBudget = async (id) => {
        const monedaGuardada = localStorage.getItem(`budget_currency_${id}`);
        if (monedaGuardada) {
            setMonedaSeleccionada(JSON.parse(monedaGuardada));
        }
        const res = await fetch(`${API_URL}/api/budgets/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setGastos(data.gastos || []);
        setIngresos(data.ingresos || []);
    };

    // Recargar después de agregar ingresos/gastos
    const RecargarInfo = () => {
        if (budgetId) CargarBudget(budgetId);
    };

    // Eliminar Gasto
    const BorrarGasto = async (id) => {
        const res = await fetch(`${API_URL}/api/gastos/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            alert("Gasto eliminado");
            RecargarInfo();
        } else {
            const data = await res.json();
            alert(data.msg || "Error al eliminar el gasto");
        }
    };

    const handleEditGasto = (gasto) => {
        setGastoAEditar(gasto);
        setShowEditarGasto(true);
    };
    const handleEditIngreso = (ingreso) => {
        setIngresoAEditar(ingreso);
        setShowEditarIngreso(true);
    };

    // Función de eliminación de Ingreso (A implementar)
    const BorrarIngreso = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/ingresos/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                alert("Ingreso eliminado correctamente.");
                RecargarInfo(); // Llama a la función para recargar gastos e ingresos
            } else {
                const data = await res.json();
                alert(data.msg || "Error al eliminar el ingreso.");
            }
        } catch (error) {
            alert("Error al conectar con el servidor para eliminar el ingreso.");
        }
    };

    const handleMonedaChange = (e) => {
        const codigo = e.target.value;
        const encontrada = currencies.find(c => c.code === codigo);
        setMonedaSeleccionada(encontrada);
    };
    return (
        <div className="create_budget container">

            {/* Input + botón */}
            <div>
                {!budgetId && (
                    <div className="create_budget-input_button">
                        <input
                            type="text"
                            placeholder="Nombre del presupuesto"
                            value={budgetName}
                            onChange={(e) => setBudgetName(e.target.value)}
                            className="form-control"
                        />
                        <select
                            className="form-select w-auto"
                            value={monedaSeleccionada.code}
                            onChange={handleMonedaChange}
                        >
                            {currencies.map((curr) => (
                                <option key={curr.code} value={curr.code}>
                                    {curr.code} - {curr.name}
                                </option>
                            ))}
                        </select>
                        <button className="btn" onClick={crearBudget}>
                            Crear Presupuesto
                        </button>
                    </div>
                )}
            </div>

            {/* Botones Ingreso / Gasto */}
            <div className="create_budget-ingreso_gasto">
                <button
                    className="create_budget-button_ingreso btn btn-outline-success"
                    disabled={!budgetId}
                    onClick={() => setShowIngreso(true)}
                >
                    Agregar Ingreso
                </button>

                <button
                    className="create_budget-button_gasto btn btn-outline-danger"
                    disabled={!budgetId}
                    onClick={() => setShowGasto(true)}
                >
                    Agregar Gasto
                </button>
            </div>

            {/* Panel principal */}
            {budgetId && (
                <div className="border rounded p-4 shadow-sm mt-4">

                    <h4 className="text-center mb-4">
                        {budgetName}
                    </h4>

                    <div className="row g-4">
                        {/* Ingresos */}
                        <div className="col-md-6">
                            <ListaIngresos
                                ingresos={ingresos}
                                onEdit={handleEditIngreso}
                                onDelete={BorrarIngreso} // Se pasa la función de eliminación
                                moneda={monedaSeleccionada}
                            />
                        </div>
                        {/* Gastos */}
                        <div className="col-md-6">
                            <ListaGastos
                                gastos={gastos}
                                onEdit={handleEditGasto}
                                onDelete={BorrarGasto}
                                moneda={monedaSeleccionada}
                            />
                        </div>

                        {/* Balance */}
                        <div className="col-md-4">
                            <Balance
                                ingresos={ingresos}
                                gastos={gastos}
                                moneda={monedaSeleccionada}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Modales */}
            <AgregarIngreso
                show={showIngreso}
                handleClose={() => setShowIngreso(false)}
                budgetId={budgetId}
                token={token}
                onAdded={RecargarInfo}
                moneda={monedaSeleccionada}
            />

            <AgregarGasto // Se pasan las props necesarias
                show={showGasto}
                handleClose={() => setShowGasto(false)}
                budgetId={budgetId}
                token={token}
                onAdded={RecargarInfo}
                moneda={monedaSeleccionada}
            />
            <EditarIngreso
                show={showEditarIngreso}
                handleClose={() => setShowEditarIngreso(false)}
                ingreso={ingresoAEditar}
                token={token}
                onUpdated={RecargarInfo}
            />

            <EditarGasto
                show={showEditarGasto}
                handleClose={() => setShowEditarGasto(false)}
                gasto={gastoAEditar}
                token={token}
                onUpdated={RecargarInfo}
            />
            <div className="create_budget-volver_presupuesto">
                <button
                    className="btn btn-secondary px-4"
                    onClick={() => navigate("/budget")}
                >
                    ← Volver a Presupuestos
                </button>
            </div>
        </div>
    );
};