import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLogin from "./pages/AuthLogin"
import AuthRegister from "./pages/AuthRegister"
import Home from "./pages/Home"
import { isLogged } from "./utils/auth";

export default function AppRoutes() {
	const isAuthenticated = isLogged();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<AuthLogin />} />
				<Route path="/register" element={<AuthRegister />} />

				{isAuthenticated ? (
					<Route path="/" element={<Home />} />
				) : (
					<Route path="/" element={<AuthLogin />} />
				)}
			</Routes>
		</BrowserRouter>
	)
}