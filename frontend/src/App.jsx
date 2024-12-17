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
import UserBooking from "./pages/UserBookings";

const App = () => {
  return (
    <div className="px-4 sm:px-8 md:px-10 lg:px-22 min-h-screen  bg-gradient-to-b from-sky-50 to-blue-100">
      <ToastContainer theme="dark" position="bottom-right" autoClose={1000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tour />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-booking" element={<UserBooking />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
