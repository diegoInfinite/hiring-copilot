import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminLayout() {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">

      <Navbar />

      <div className="flex flex-grow">

        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 space-y-4">

          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/jobs"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Job Positions
          </NavLink>

          <NavLink
            to="/admin/candidates"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Candidates
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            Settings
          </NavLink>

        </aside>

        {/* Admin main content */}
        <main className="flex-grow p-10">
          <Outlet />
        </main>

      </div>

      <Footer />

    </div>
  );
}