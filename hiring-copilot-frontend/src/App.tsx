import { BrowserRouter, Routes, Route } from "react-router-dom";

/* admin pages */
import AdminLayout from "./UI/pages/admin/AdminLayout";
import UsersAdminPage from "./UI/pages/admin/UsersAdminPage";

import HomePage from "./UI/pages/HomePage";
import JobDetailPage from "./UI/pages/JobDetailPage";
import ApplyPage from "./UI/pages/ApplyPage";
import LoginPage from "./UI/pages/LoginPage";
import HrCandidateDetailPage from "./UI/pages/HrCandidateDetailPage";
import HrPage from "./UI/pages/HrPage";

import { AuthProvider } from "./Features/auth/AuthContext";
import ProtectedRoute from "./Features/auth/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<HomePage scrollTo="jobs" />} />
          <Route path="/contact" element={<HomePage scrollTo="contact" />} />

          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
          <Route path="/apply/:id" element={<ApplyPage />} />   {/* PUBLIC NOW */}

          {/* HR Protected */}
          <Route
            path="/hr"
            element={
              <ProtectedRoute>
                <HrPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr/candidate/:id"
            element={
              <ProtectedRoute>
                <HrCandidateDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersAdminPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}