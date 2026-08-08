import { useEffect, useMemo, useState } from 'react';
import { Users, Search } from 'lucide-react';

import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import PageLoader from '../components/common/PageLoader';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.users || response.data['hydra:member'] || [];

        setUsers(data);
      } catch (error) {
        console.error('Erreur chargement utilisateurs :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.nom?.toLowerCase().includes(search.toLowerCase()) ||
      user.prenom?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0 lg:self-stretch">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AdminHeader />

        {loading ? (
          <PageLoader />
        ) : (
          <>
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                <Users className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Gestion des utilisateurs
                </h1>

                <p className="mt-1 text-slate-600">
                  Consultez et gérez les comptes utilisateurs de la plateforme.
                </p>
              </div>
            </div>

            <div className="mb-6 relative max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Nom</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Rôle</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {user.prenom} {user.nom}
                        </td>

                        <td className="px-4 py-3 text-slate-700">
                          {user.email}
                        </td>

                        <td className="px-4 py-3 text-slate-700">
                          {user.roles?.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminUsers;