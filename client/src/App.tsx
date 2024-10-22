import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Shared/Layout";
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";
import { LoginForm } from "./components/Auth/LoginForm";
import { Home } from "./components/User/Home";
import { BookingForm } from "./components/Booking/BookingForm";
import { MyRides } from "./components/Booking/MyRides";
import { UserProfile } from "./components/User/UserProfile";
import { TrackingComponent } from "./components/Tracking/TrackingComponent";
import { DriverDashboard } from "./components/Driver/DriverDashboard";
import { LocationUpdate } from "./components/Driver/LocationUpdate";
import { VehicleManagement } from "./components/Driver/VehicleManagement";
import { AdminDashboard } from "./components/Admin/AdminDashboard";
import { ErrorPage } from "./components/Shared/ErrorPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rides"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <MyRides />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <TrackingComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver/dashboard"
              element={
                <ProtectedRoute allowedRoles={["driver"]}>
                  <DriverDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver/update-location"
              element={
                <ProtectedRoute allowedRoles={["driver"]}>
                  <LocationUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver/vehicles"
              element={
                <ProtectedRoute allowedRoles={["driver"]}>
                  <VehicleManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
