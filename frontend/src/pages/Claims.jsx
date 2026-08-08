import { useEffect, useMemo, useState } from 'react';
import { FileWarning } from 'lucide-react';

import api from '../services/api';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import ClaimForm from '../components/ClaimForm';
import ClaimsToolbar from '../components/ClaimsToolbar';
import ClaimsTable from '../components/ClaimsTable';
import PageLoader from '../components/common/PageLoader';

function Claims() {
  const [client, setClient] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientRes, claimsRes] = await Promise.all([
          api.get('/client/1'),
          api.get('/claims'),
        ]);

        setClient(clientRes.data);

        const data = Array.isArray(claimsRes.data)
          ? claimsRes.data
          : claimsRes.data.claims ||
            claimsRes.data['hydra:member'] ||
            [];

        setClaims(data);
      } catch (error) {
        console.error('Erreur chargement sinistres :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClaimCreated = async ({ description, createdAt }) => {
    const payload = {
      description,
      type: 'Assurance',
      createdAt,
      status: 'En attente',
    };

    const response = await api.post('/claims', payload);

    setClaims((prev) => [response.data, ...prev]);
  };

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesSearch =
        claim.description
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        claim.title?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        claim.status?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [claims, search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0 lg:self-stretch">
        <DashboardSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <DashboardHeader client={client} />

        {loading ? (
          <PageLoader />
        ) : (
          <>
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                <FileWarning className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Mes Sinistres
                </h1>

                <p className="mt-1 text-slate-600">
                  Déclarez un sinistre et suivez l’état de vos déclarations.
                </p>
              </div>
            </div>

            <ClaimForm onClaimCreated={handleClaimCreated} />

            <div className="mt-8">
              <ClaimsToolbar
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />

              <ClaimsTable claims={filteredClaims} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Claims;