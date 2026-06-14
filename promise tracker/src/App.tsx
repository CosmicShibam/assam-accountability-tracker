/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";

import Promises from "./pages/Promises";
import PromiseDetail from "./pages/PromiseDetail";
import Evidence from "./pages/Evidence";
import Methodology from "./pages/Methodology";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { PromiseProvider } from "./context/PromiseContext";

export default function App() {
  return (
    <PromiseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="promises" element={<Promises />} />
            <Route path="promises/:id" element={<PromiseDetail />} />
            <Route path="evidence" element={<Evidence />} />
            <Route path="methodology" element={<Methodology />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PromiseProvider>
  );
}
