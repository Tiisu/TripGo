import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Tour from "./pages/Tour";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Booking from "./pages/Booking";
import Invoice from "./pages/Invoice";
import About from "./pages/About";
import MyBookings from "./pages/MyBookings";

// Admin imports
import AdminContextProvider from "./context/AdminContext";
import ToursContextProvider from "./context/ToursContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TourManagement from "./pages/admin/TourManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import UserManagement from "./pages/admin/UserManagement";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const App = () => {
  return (
    <AdminContextProvider>
      <ToursContextProvider>
        <ToastContainer theme="dark" position="bottom-right" autoClose={1000} />
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/tours" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <Tour />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <About />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/tours/:id" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <TourDetails />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/login" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <Login />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/booking" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <Booking />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/invoice" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <Invoice />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/my-bookings" element={
          <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-sky-100 to-indigo-100">
            <Navbar />
            <main className="flex-1">
              <MyBookings />
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="tours" element={<TourManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
        </Routes>
      </ToursContextProvider>
    </AdminContextProvider>
  );
};

export default App;
