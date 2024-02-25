import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLogin from "./pages/AuthLogin"
import AuthRegister from "./pages/AuthRegister"
import Home from "./pages/Home"

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<AuthLogin />} />
				<Route path="/register" element={<AuthRegister />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}