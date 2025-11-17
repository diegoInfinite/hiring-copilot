import { BrowserRouter, Routes, Route } from "react-router-dom";
/* admin pages*/
import AdminLayout from "../src/pages/admin/AdminLayout";
import UsersAdminPage from "../src/pages/admin/UsersAdminPage";

import HomePage from "./pages/HomePage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplyPage from "./pages/ApplyPage";
import LoginPage from "./pages/LoginPage";
import HrCandidateDetailPage from "./pages/HrCandidateDetailPage"
import HrPage from "./pages/HrPage";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Página principal */}
          <Route path="/" element={<HomePage />} />

          <Route path="/jobs" element={<HomePage scrollTo="jobs" />} />

          <Route path="/contact" element={<HomePage scrollTo="contact" />} />


          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Vista detalle del trabajo (pública) */}
          <Route path="/job/:id" element={<JobDetailPage />} />

          {/* Apply requiere login */}
          <Route
            path="/apply/:id"
            element={
              <ProtectedRoute>
                <ApplyPage />
              </ProtectedRoute>
            }
          />

          {/* Área HR */}
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

          {/* Admin */}
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
