import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { TodoPage } from "./pages/TodoPage";

import "./styles.css";

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
