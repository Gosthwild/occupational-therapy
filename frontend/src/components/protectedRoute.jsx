// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // verificamos si existe token

  if (!token) {
    return <Navigate to="/login" />; // si no hay token, redirige al login
  }

  return children; // si hay token, muestra el componente
};

export default ProtectedRoute;
