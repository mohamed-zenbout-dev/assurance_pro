import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Shield, Users } from 'lucide-react';

import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminStatsCard from '../components/admin/AdminStatsCard';
import AdminUsersTable from '../components/admin/AdminUsersTable';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const email = user.email?.toLowerCase() || '';
      const matchesSearch = email.includes(search.toLowerCase().trim());

      const matchesRole =
        roleFilter === 'all' ||
        user.roles?.includes(roleFilter);

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    );
  }

  const totalUsers = users.length;
  const totalClients = users.filter((u) =>
    u.roles?.includes('ROLE_USER') && !u.roles?.includes('ROLE_ADMIN')
  ).length;

  const totalAdmins = users.filter((u) =>
    u.roles?.includes('ROLE_ADMIN')
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-6 lg:p-8">
        <AdminHeader />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Gestion des utilisateurs
            </h1>

            <p className="mt-1 text-slate-600">
              Consultez et gérez tous les utilisateurs inscrits sur la plateforme.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-700 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            Ajouter un utilisateur
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatsCard title="Total utilisateurs" value={totalUsers} icon={Users} />
          <AdminStatsCard title="Clients" value={totalClients} icon={Users} />
          <AdminStatsCard title="Administrateurs" value={totalAdmins} icon={Shield} />
          <AdminStatsCard title="Comptes actifs" value={totalUsers} icon={Shield} />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            >
              <option value="all">Tous les rôles</option>
              <option value="ROLE_USER">Client</option>
              <option value="ROLE_ADMIN">Administrateur</option>
            </select>
          </div>

          <div className="mt-6">
            <AdminUsersTable users={filteredUsers} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminUsers;