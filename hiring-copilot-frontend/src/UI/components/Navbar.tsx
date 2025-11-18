import { Link } from "react-router-dom";
import { useAuth } from "../../Features/auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const isHr = user?.role === "hr";
  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-slate-950 text-white px-8 py-4 flex justify-between items-center border-b border-slate-800">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        AI Hiring Portal
      </Link>

      <div className="space-x-6 flex items-center text-sm">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/jobs" className="hover:text-blue-400 transition">Jobs</Link>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>

        {(isHr || isAdmin) && (
          <Link
            to="/hr"
            className="hover:text-emerald-400 transition border border-emerald-500 px-3 py-1 rounded"
          >
            HR Panel
          </Link>
        )}

        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-yellow-400 transition border border-yellow-500 px-3 py-1 rounded"
          >
            Admin Panel
          </Link>
        )}

        {/* WATCH: login only appears as HR/Admin gateway */}
        {!user ? (
          <Link to="/login" className="hover:text-blue-400 transition">
            Log in
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-white text-xs opacity-80">{user.username}</span>

            <span className="text-[10px] px-2 py-1 rounded-full bg-slate-800 border border-slate-600 uppercase">
              {user.role}
            </span>

            <button
              onClick={logout}
              className="ml-2 px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700 transition"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}