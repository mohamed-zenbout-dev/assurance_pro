import { Eye, Pencil, Trash2 } from 'lucide-react';

function AdminUsersTable({ users }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Rôle</th>
            <th className="px-4 py-3 font-medium">Date d'inscription</th>
            <th className="px-4 py-3 font-medium text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">
                #{user.id}
              </td>

              <td className="px-4 py-3 text-slate-700">{user.email}</td>

              <td className="px-4 py-3">
                {user.roles?.includes('ROLE_ADMIN') ? (
                  <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                    Administrateur
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Client
                  </span>
                )}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('fr-FR')
                  : '—'}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button className="rounded-full p-2 text-violet-600 transition hover:bg-violet-50 hover:text-violet-700">
                    <Eye className="h-4 w-4" />
                  </button>

                  <button className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700">
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button className="rounded-full p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersTable;