import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UserModal from "../../components/UserModal";
import ConfirmModal from "../../components/ConfirmModal";

type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "interviewer" | "recruiter";
  is_active: boolean;
};

// Mock data (simulating DB records)
const initialUsers: User[] = [
  {
    id: crypto.randomUUID(),
    email: "admin@example.com",
    name: "System Admin",
    role: "admin",
    is_active: true,
  },
  {
    id: crypto.randomUUID(),
    email: "hector@example.com",
    name: "Héctor JiméneSSSSz",
    role: "recruiter",
    is_active: true,
  },
  {
    id: crypto.randomUUID(),
    email: "maria@example.com",
    name: "María Solís",
    role: "interviewer",
    is_active: false,
  },
];

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);

  // CREATE MODAL
  function openCreateModal() {
    setEditingUser(null);
    setShowModal(true);
  }

  // EDIT MODAL
  function openEditModal(user: User) {
    setEditingUser(user);
    setShowModal(true);
  }

  // DEACTIVATE MODAL
  function openDeactivateModal(user: User) {
    setUserToDeactivate(user);
    setShowConfirm(true);
  }

  // SAVE (create or update)
  function saveUser(data: { email: string; name: string; role: string }) {
  const role = data.role as User["role"]; // CAST SEGURO

  if (editingUser) {
    // Update
    setUsers(
      users.map((u) =>
        u.id === editingUser.id
          ? { ...u, ...data, role } // role corregido
          : u
      )
    );
  } else {
    // Create
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      role, // ya está casteado correctamente
      is_active: true,
    };
    setUsers([...users, newUser]);
  }

  setShowModal(false);
}


  // SOFT DELETE
  function deactivateUser() {
    if (!userToDeactivate) return;

    setUsers(
      users.map((u) =>
        u.id === userToDeactivate.id ? { ...u, is_active: false } : u
      )
    );

    setShowConfirm(false);
  }

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-6"
        >
          Create new user
        </button>

        <div className="bg-slate-900 rounded border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-800 hover:bg-slate-800/50"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {user.is_active ? (
                      <span className="text-green-400">Active</span>
                    ) : (
                      <span className="text-red-400">Inactive</span>
                    )}
                  </td>

                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded"
                    >
                      Edit
                    </button>

                    {user.is_active && (
                      <button
                        onClick={() => openDeactivateModal(user)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
                      >
                        Disable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />

      {showModal && (
        <UserModal
          onClose={() => setShowModal(false)}
          onSave={saveUser}
          user={editingUser}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          onClose={() => setShowConfirm(false)}
          onConfirm={deactivateUser}
          message={`Do you want to deactivate the user "${userToDeactivate?.name}"?`}
        />
      )}
    </div>
  );
}