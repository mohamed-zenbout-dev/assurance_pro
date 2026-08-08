import { useEffect, useMemo, useState } from 'react';
import { TriangleAlert } from 'lucide-react';

import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminClaimsToolbar from '../components/admin/AdminClaimsToolbar';
import AdminClaimsTable from '../components/admin/AdminClaimsTable';
import PageLoader from '../components/common/PageLoader';

function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await api.get('/claims');

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.claims ||
            response.data['hydra:member'] ||
            [];

        setClaims(data);
      } catch (error) {
        console.error('Erreur récupération sinistres :', error);
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        claim.description?.toLowerCase().includes(searchValue) ||
        claim.clientName?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === 'all' ||
        claim.status?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [claims, search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Sidebar */}
      <div className="lg:w-72 lg:flex-shrink-0 lg:self-stretch">
        <AdminSidebar />
      </div>

      {/* Contenu principal */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AdminHeader />

        {loading ? (
          <PageLoader />
        ) : (
          <>
            {/* En-tête de page */}
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                <TriangleAlert className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Gestion des sinistres
                </h1>

                <p className="mt-1 text-slate-600">
                  Consultez et gérez tous les sinistres déclarés par les
                  clients.
                </p>
              </div>
            </div>

            {/* Recherche et filtres */}
            <AdminClaimsToolbar
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            {/* Tableau */}
            <AdminClaimsTable claims={filteredClaims} />
          </>
        )}
      </main>
    </div>
  );
}

export default AdminClaims;