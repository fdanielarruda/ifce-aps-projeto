import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { isLogged } from "./utils/auth";

import AuthLogin from "./pages/Auth/Login"
import AuthRegister from "./pages/Auth/Register"
import ManagerExpenses from "./pages/Expenses/ManagerExpenses"
import Home from "./pages/Home"

export default function AppRoutes() {
	const Authenticated = ({ children }) => {
		if (!isLogged()) {
			return <Navigate to="/login" />
		}

		return children
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<AuthLogin />} />
				<Route path="/register" element={<AuthRegister />} />

				<Route path="/" element={<Authenticated> <Home /> </Authenticated>} />
				<Route path="/expenses" element={<Authenticated> <ManagerExpenses /> </Authenticated>} />
			</Routes>
		</BrowserRouter>
	)
}