const users = [
  { id: 1, name: 'Claire Lefèvre', role: 'Client', date: '10/07/2026' },
  { id: 2, name: 'Pierre Rigaud', role: 'Client', date: '12/07/2026' },
  { id: 3, name: 'Bobbie Singer', role: 'Client', date: '15/07/2026' },
];

function RecentUsersTable() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Utilisateurs récents
      </h2>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2 font-medium">Nom</th>
              <th className="px-3 py-2 font-medium">Rôle</th>
              <th className="px-3 py-2 font-medium">Date d'inscription</th>
              <th className="px-3 py-2 font-medium text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-3 py-3 font-medium text-slate-900">{user.name}</td>
                <td className="px-3 py-3">
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {user.role}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-600">{user.date}</td>
                <td className="px-3 py-3 text-center">
                  <button className="rounded-full border border-violet-200 px-3 py-1 text-xs font-semibold text-violet-600 transition hover:bg-violet-50">
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentUsersTable;