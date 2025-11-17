import { useState } from "react";
import { useAuth } from "../../Features/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ok = await login(username, password);

    if (!ok) {
      setLoading(false);
      setError("Invalid username or password.");
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/70 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md border border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Username */}
        <label className="text-slate-300 text-sm">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="
            w-full p-3 rounded-lg mb-5
            bg-slate-700 text-white placeholder-slate-400
            border border-slate-600 focus:border-blue-500
            outline-none transition
          "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password */}
        <label className="text-slate-300 text-sm">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="
            w-full p-3 rounded-lg mb-5
            bg-slate-700 text-white placeholder-slate-400
            border border-slate-600 focus:border-blue-500
            outline-none transition
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit */}
        <button
          disabled={loading}
          className="
            w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
            py-3 rounded-lg text-lg font-semibold transition
          "
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}