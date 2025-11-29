import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateToken } from "../js/auth";
import { currencies } from "../js/utils";

// Componentes importados
import { Balance } from '../components/Balance';
import { ListaIngresos } from '../components/ListaIngresos';
import { ListaGastos } from '../components/ListaGastos';
import { AgregarIngreso } from '../components/AgregarIngreso';
import { AgregarGasto } from '../components/AgregarGasto';
import { EditarGasto } from '../components/EditarGasto';
import { EditarIngreso } from '../components/EditarIngreso';
import { GraficoCarrusel } from '../components/GraficoCarrusel';

export const DetallePresupuesto = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [budget, setBudget] = useState(null);
    const [ingresos, setIngresos] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [budgetName, setBudgetName] = useState("Cargando...");
    const [monedaSeleccionada, setMonedaSeleccionada] = useState(currencies[0]);
    const [showIngreso, setShowIngreso] = useState(false);
    const [showGasto, setShowGasto] = useState(false);
    const [showEditarGasto, setShowEditarGasto] = useState(false);
    const [gastoAEditar, setGastoAEditar] = useState(null);
    const [showEditarIngreso, setShowEditarIngreso] = useState(false);
    const [ingresoAEditar, setIngresoAEditar] = useState(null);

    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
    const token = localStorage.getItem("jwt");

    const loadBudget = async () => {
        if (!id) return;

        const savedCurrency = localStorage.getItem(`budget_currency_${id}`);
        if (savedCurrency) {
            setMonedaSeleccionada(JSON.parse(savedCurrency));
        }

        const res = await fetch(`${API_URL}/api/budgets/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
            setBudget(data);
            setBudgetName(data.name);
            setGastos(data.gastos || []);
            setIngresos(data.ingresos || []);
        } else {
            alert(data.msg || "Error cargando presupuesto.");
            navigate("/budget");
        }
    };

    const refreshData = () => {
        loadBudget();
    };

    // Valida el token y cargar datos
    useEffect(() => {
        const check = async () => {
            const valid = await validateToken();
            if (!valid) navigate("/login");
        };
        check();

        loadBudget();
    }, [id]);

    // Lógica de eliminación
    const handleDeleteItem = async (endpoint, id) => {
        try {
            const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                alert(`${endpoint === 'ingresos' ? 'Ingreso' : 'Gasto'} eliminado correctamente.`);
                refreshData();
            } else {
                const data = await res.json();
                alert(data.msg || `Error al eliminar ${endpoint}.`);
            }
        } catch (error) {
            alert("Error al conectar con el servidor.");
        }
    };

    const handleDeleteGasto = (id) => handleDeleteItem('gastos', id);
    const handleDeleteIngreso = (id) => handleDeleteItem('ingresos', id);

    const handleEditGasto = (gasto) => {
        setGastoAEditar(gasto);
        setShowEditarGasto(true);
    };
    const handleEditIngreso = (ingreso) => {
        setIngresoAEditar(ingreso);
        setShowEditarIngreso(true);
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await fetch(`${API_URL}/api/budgets/${id}/pdf`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                alert("No se pudo generar el PDF.");
                return;
            }

            // Convertir respuesta a Blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Crear enlace para descargar
            const a = document.createElement("a");
            a.href = url;
            a.download = `presupuesto_${budgetName}.pdf`;
            a.click();

            // Liberar memoria
            window.URL.revokeObjectURL(url);

        } catch (error) {
            alert("Error al conectarse con el servidor.");
        }
    };


    const SkeletonDetalle = () => (
        <div className="container mt-5 text-center">

            <h4 className="mb-4" style={{ color: "#555" }}>
                Cargando detalles del presupuesto...
            </h4>

            <div className="skeleton-box mb-3"
                style={{ height: "30px", width: "60%", margin: "0 auto" }}>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="skeleton-card"></div>
                </div>
                <div className="col-md-6">
                    <div className="skeleton-card"></div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="skeleton-card"></div>
                </div>
                <div className="col-md-6">
                    <div className="skeleton-card"></div>
                </div>
            </div>
        </div>
    );

    if (!budget || !budget.id) {
        return <SkeletonDetalle />;
    }
    return (
        <div className="container mt-4">
            <button
                className="btn detalle_presupuesto_button"
                onClick={() => navigate("/Budget")}
            >
                <i className="fa-solid fa-angle-left"></i>Volver a Presupuestos
            </button>
            <div className="detalle_presupuesto_text">
                <h2 className='text-center mb-4'>Detalle del Presupuesto: {budgetName}</h2>
            </div>

            {/* Sección de Botones */}
            <div className="detalle_presupuesto-buttons">
                <button
                    className="btn ingreso"
                    onClick={() => setShowIngreso(true)}
                >
                    <i className="bi bi-plus-circle"></i> Agregar Ingreso
                </button>

                <button
                    className="btn gasto"
                    onClick={() => setShowGasto(true)}
                >
                    <i className="bi bi-dash-circle"></i> Agregar Gasto
                </button>
                <button
                    className="btn pdf"
                    onClick={handleDownloadPDF}
                >
                    <i className="bi bi-file-earmark-pdf"></i> Descargar PDF
                </button>
            </div>

            {/* Listas de Ingresos y Gastos*/}
            <div className="row g-4 pb-5">
                <div className="col-md-6">
                    <ListaIngresos
                        ingresos={ingresos}
                        onEdit={handleEditIngreso}
                        onDelete={handleDeleteIngreso}
                        moneda={monedaSeleccionada}
                    />
                </div>
                <div className="col-md-6">
                    <ListaGastos
                        gastos={gastos}
                        onEdit={handleEditGasto}
                        onDelete={handleDeleteGasto}
                        moneda={monedaSeleccionada}
                    />
                </div>
            </div>

            <div className="row g-4 mb-5">

                {/*  Gráfico de Resumen */}
                <div className="col-md-6">
                    <div className="card h-100" style={{ backgroundColor: "#f2f2f2" }}>
                        <div className="card-body">
                            <GraficoCarrusel ingresos={ingresos} egresos={gastos} />
                        </div>
                    </div>
                </div>

                {/* Balance */}
                <div className="col-md-6">
                    <div className="card h-100" style={{ backgroundColor: "#f2f2f2" }}>
                        <div className="card-body">
                            <Balance
                                ingresos={ingresos}
                                gastos={gastos}
                                moneda={monedaSeleccionada}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modales */}
            <AgregarIngreso
                show={showIngreso}
                handleClose={() => setShowIngreso(false)}
                budgetId={id}
                token={token}
                onAdded={refreshData}
            />

            <AgregarGasto
                show={showGasto}
                handleClose={() => setShowGasto(false)}
                budgetId={id}
                token={token}
                onAdded={refreshData}
            />

            <EditarIngreso
                show={showEditarIngreso}
                handleClose={() => setShowEditarIngreso(false)}
                ingreso={ingresoAEditar}
                token={token}
                onUpdated={refreshData}
            />

            <EditarGasto
                show={showEditarGasto}
                handleClose={() => setShowEditarGasto(false)}
                gasto={gastoAEditar}
                token={token}
                onUpdated={refreshData}
            />

        </div>
    );
};