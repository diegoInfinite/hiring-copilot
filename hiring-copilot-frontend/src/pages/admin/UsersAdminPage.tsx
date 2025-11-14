import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UserModal from "../../components/UserModal";
import ConfirmModal from "../../components/ConfirmModal";

type User = {
  id: number;
  username: string;
  role: string;
  active: boolean;
};

// Mock data (later replaced by .NET API)
const initialUsers: User[] = [
  { id: 1, username: "admin", role: "admin", active: true },
  { id: 2, username: "hector", role: "hr", active: true },
  { id: 3, username: "maria", role: "hr", active: false },
];

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);

  function openCreateModal() {
    setEditingUser(null);
    setShowModal(true);
  }

  function openEditModal(user: User) {
    setEditingUser(user);
    setShowModal(true);
  }

  function openDeactivateModal(user: User) {
    setUserToDeactivate(user);
    setShowConfirm(true);
  }

  function saveUser(userData: Partial<User>) {
    if (editingUser) {
      // Update
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...userData } : u
        )
      );
    } else {
      // Create
      const newUser: User = {
        id: Date.now(),
        username: userData.username || "",
        role: userData.role || "hr",
        active: true,
      };
      setUsers([...users, newUser]);
    }

    setShowModal(false);
  }

  function deactivateUser() {
    if (!userToDeactivate) return;

    setUsers(
      users.map((u) =>
        u.id === userToDeactivate.id ? { ...u, active: false } : u
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
                <th className="p-3 text-left">User</th>
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
                  <td className="p-3">{user.username}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {user.active ? (
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

                    {user.active && (
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
          message={`Do you want to deactivate the user "${userToDeactivate?.username}"?`}
        />
      )}
    </div>
  );
}