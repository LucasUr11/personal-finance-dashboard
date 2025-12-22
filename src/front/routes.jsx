// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Budget } from "./pages/Budget";
import { CreateBudget } from "./pages/CreateBudget";
import { DetallePresupuesto } from "./pages/DetallePresupuesto";
import { AgregarGasto } from "./components/AgregarGasto";
import { AgregarIngreso } from "./components/AgregarIngreso";
import { PrivateRoute } from "./components/PrivateRoute";
import { ListaIngresos } from "./components/ListaIngresos";
import { ListaGastos } from "./components/ListaGastos";
import { Balance } from "./components/Balance";
import { ListaPresupuestos } from "./components/ListaPresupuestos"
import { Graficos } from "./components/Graficos"
import { GraficoCarrusel } from "./components/GraficoCarrusel";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Homepage */}
      <Route index element={<Home />} />
      <Route path="Home" element={<Home />} />

      {/* Auth Routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* Budget Routes */}
      <Route path="budget" element={
        <PrivateRoute>
          <Budget />
        </PrivateRoute>
      } />
      <Route path="budget/:id" element={
        <PrivateRoute>
          <DetallePresupuesto />
        </PrivateRoute>
      } />

      {/* Rutas de componentes */}
      <Route path="ListaPresupuestos" element={<ListaPresupuestos />} />
      <Route path="CreateBudget" element={<CreateBudget />} />
      <Route path="AgregarGasto" element={<AgregarGasto />} />
      <Route path="AgregarIngreso" element={<AgregarIngreso />} />
      <Route path="Graficos" element={<Graficos />} />
      <Route path="ListaIngresos" element={<ListaIngresos />} />
      <Route path="ListaGastos" element={<ListaGastos />} />
      <Route path="Balance" element={<Balance />} />
      <Route path="GraficoCarrusel" element={<GraficoCarrusel />} />

    </Route>
  )
);