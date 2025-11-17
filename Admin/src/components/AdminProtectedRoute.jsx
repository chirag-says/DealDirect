import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  // ✅ if token not found, redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ otherwise show the protected page
  return children;
};

export default AdminProtectedRoute;
