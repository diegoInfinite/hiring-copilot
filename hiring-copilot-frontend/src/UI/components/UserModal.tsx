import { useState } from "react";

type User = {
  id?: string;
  email: string;
  name: string;
  role: "admin" | "interviewer" | "recruiter";
  is_active?: boolean;
};

type UserModalProps = {
  user: User | null;
  onClose: () => void;
  onSave: (data: { email: string; name: string; role: User["role"] }) => void;
};

export default function UserModal({ user, onClose, onSave }: UserModalProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<User["role"]>(user?.role || "interviewer");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave({ name, email, role });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 w-96">

        <h2 className="text-xl font-bold mb-4">
          {user ? "Edit User" : "Create User"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="text-sm text-slate-300">Name</label>
            <input
              className="w-full p-2 rounded bg-slate-800 border border-slate-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-slate-800 border border-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-slate-300">Role</label>
            <select
              className="w-full p-2 rounded bg-slate-800 border border-slate-700"
              value={role}
              onChange={(e) => setRole(e.target.value as User["role"])}
            >
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
              <option value="interviewer">Interviewer</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}