import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import Patients from "./pages/admin/Patients";
import Incidents from "./pages/admin/Incidents";
import CalendarView from "./pages/admin/CalendarView";
import PatientView from "./pages/patient/PatientView";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Login Route (Both / and /login) */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ✅ Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/patients"
            element={
              <ProtectedRoute role="Admin">
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/incidents"
            element={
              <ProtectedRoute role="Admin">
                <Incidents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/calendar"
            element={
              <ProtectedRoute role="Admin">
                <CalendarView />
              </ProtectedRoute>
            }
          />

          {/* ✅ Patient Route */}
          <Route
            path="/patient"
            element={
              <ProtectedRoute role="Patient">
                <PatientView />
              </ProtectedRoute>
            }
          />

          {/* ❌ Catch-all route for invalid paths */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
