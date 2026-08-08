import { useEffect, useState } from 'react';
import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminStatsCard from '../components/admin/AdminStatsCard';
import RecentClaimsTable from '../components/admin/RecentClaimsTable';
import RecentUsersTable from '../components/admin/RecentUsersTable';
import AdminSupportCard from '../components/admin/AdminSupportCard';
import PageLoader from '../components/common/PageLoader';

function DashboardAdmin() {
  const [stats, setStats] = useState({
    users: 0,
    contracts: 0,
    claims: 0,
    quotes: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentClaims, setRecentClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      // On ne récupère que les routes déjà existantes
      const [contractsRes, claimsRes, quotesRes] = await Promise.all([
        api.get('/contracts'),
        api.get('/claims'),
        api.get('/quotes'),
      ]);

      const contracts = Array.isArray(contractsRes.data)
        ? contractsRes.data
        : contractsRes.data.contracts ||
          contractsRes.data['hydra:member'] ||
          [];

      const claims = Array.isArray(claimsRes.data)
        ? claimsRes.data
        : claimsRes.data.claims ||
          claimsRes.data['hydra:member'] ||
          [];

      const quotes = Array.isArray(quotesRes.data)
        ? quotesRes.data
        : quotesRes.data.quotes ||
          quotesRes.data['hydra:member'] ||
          [];

      // Utilisateurs temporairement à 0
      setStats({
        users: 0,
        contracts: contracts.length,
        claims: claims.length,
        quotes: quotes.length,
      });

      setRecentUsers([]);
      setRecentClaims(claims.slice(0, 5));
    } catch (error) {
      console.error('Erreur chargement dashboard admin :', error);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Tableau de bord administrateur
              </h1>

              <p className="mt-1 text-slate-600">
                Vue d'ensemble des utilisateurs, contrats, devis et sinistres.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              <AdminStatsCard title="Utilisateurs" value={stats.users} />
              <AdminStatsCard title="Contrats" value={stats.contracts} />
              <AdminStatsCard title="Sinistres" value={stats.claims} />
              <AdminStatsCard title="Devis" value={stats.quotes} />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              <RecentUsersTable users={recentUsers} />
              <RecentClaimsTable claims={recentClaims} />
            </div>

            <div className="mt-8">
              <AdminSupportCard />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default DashboardAdmin;