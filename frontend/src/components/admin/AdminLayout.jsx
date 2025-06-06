import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  MapPin,
  Calendar,
  Users,
  Menu,
  X,
  LogOut,
  User,
  Settings
} from "lucide-react";

const AdminLayout = () => {
  const { admin, adminLogout } = useAdmin();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
    { name: "Tours", href: "/admin/tours", icon: MapPin },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  const isActive = (path) => {
    if (path === "/admin/dashboard" && (location.pathname === "/admin" || location.pathname === "/admin/")) {
      return true;
    }
    return location.pathname === path;
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-900 to-blue-800">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-xl font-bold text-white">TripGo Admin</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-white hover:bg-blue-700 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="mr-3 w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{admin?.name || "Admin"}</p>
            <p className="text-xs text-blue-200">{admin?.email || "admin@tripgo.com"}</p>
          </div>
        </div>
        <button
          onClick={adminLogout}
          className="w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md mr-3"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {navigation.find(item => isActive(item.href))?.name || "Admin Panel"}
                </h2>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-sm text-gray-600">
                  Welcome back, {admin?.name || "Admin"}
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
