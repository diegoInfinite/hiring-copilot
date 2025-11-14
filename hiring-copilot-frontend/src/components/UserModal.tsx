import { useState } from "react";

type User = {
  id?: number;
  username: string;
  role: string;
  active?: boolean;
};

type UserModalProps = {
  user: User | null;
  onClose: () => void;
  onSave: (data: { username: string; role: string }) => void;
};

export default function UserModal({ user, onClose, onSave }: UserModalProps) {
  const [username, setUsername] = useState(user?.username || "");
  const [role, setRole] = useState(user?.role || "hr");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    setError("");
    onSave({ username, role });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {user ? "Edit User" : "Create User"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Error message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Username */}
          <div>
            <label className="text-sm text-slate-300">Username</label>
            <input
              className="
                w-full p-2 rounded bg-slate-800 border border-slate-700
                focus:border-blue-500 outline-none transition
              "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-slate-300">Role</label>
            <select
              className="
                w-full p-2 rounded bg-slate-800 border border-slate-700
                focus:border-blue-500 outline-none transition
              "
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
            </select>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded
              "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}