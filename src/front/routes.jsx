// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Budget } from "./pages/Budget";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Homepage */}
      <Route index element={<Signup />} />

      {/* Auth Routes */}
      <Route path="login" element={<Login />} />
      <Route path="budget" element={<Budget />} />

    </Route>
  )
);