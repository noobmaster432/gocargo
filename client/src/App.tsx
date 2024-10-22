import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Shared/Layout";
import Home from "./components/User/Home";
import LoginForm from "./components/Auth/LoginForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DriverDashboard from "./components/Driver/DriverDashboard";
import BookingForm from "./components/Booking/BookingForm";
import MyRides from "./components/Booking/MyRides";
import UserProfile from "./components/User/UserProfile";
import TrackingComponent from "./components/Tracking/TrackingComponent";
import LocationUpdate from "./components/Driver/LocationUpdate";
import VehicleManagement from "./components/Driver/VehicleManagement";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        {user && (
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/tracking" element={<TrackingComponent />} />
            {user.role === "customer" && (
              <>
                <Route path="/book" element={<BookingForm />} />
                <Route path="/rides" element={<MyRides />} />
              </>
            )}
            {user.role === "driver" && (
              <>
                <Route path="/driver/dashboard" element={<DriverDashboard />} />
                <Route
                  path="/driver/update-location"
                  element={<LocationUpdate />}
                />
                <Route
                  path="/driver/vehicles"
                  element={<VehicleManagement />}
                />
              </>
            )}
            {user.role === "admin" && (
              <Route path="/admin" element={<AdminDashboard />} />
            )}
          </>
        )}
      </Routes>
    </Layout>
  );
};

export default App;
