import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

const AdminContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [admin, setAdmin] = useState(null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("admin");

    if (token && adminData) {
      setAdminToken(token);
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setAdminToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        navigate("/admin/dashboard");
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    setAdminToken(null);
    setAdmin(null);
    navigate("/admin/login");
  };

  const getAuthHeaders = () => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    };
  };

  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();
      
      if (!data.success && data.message === "Invalid token.") {
        adminLogout();
        return { success: false, message: "Session expired. Please login again." };
      }

      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    admin,
    adminToken,
    loading,
    backendUrl,
    adminLogin,
    adminLogout,
    apiCall,
    getAuthHeaders,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
