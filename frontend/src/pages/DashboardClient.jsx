import { useEffect, useState } from 'react';
import api from '../services/api';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import ContractSummaryCard from '../components/ContractSummaryCard';
import ClaimsTable from '../components/ClaimsTable';

function DashboardClient() {
  const [client, setClient] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [clientRes, contractsRes, claimsRes] = await Promise.all([
          api.get('/client/1'),
          api.get('/contracts'),
          api.get('/claims'),
        ]);

        setClient(clientRes.data);
        setContracts(contractsRes.data || []);
        setClaims(claimsRes.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* SIDEBAR */}
      <div className="lg:w-72 lg:flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* CONTENU */}
      <div className="flex-1 p-6 lg:p-8">
        <DashboardHeader client={client} />

        {/* Cartes contrats */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Résumé de vos contrats
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <ContractSummaryCard
                  key={contract.id}
                  contract={contract}
                />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 md:col-span-2 xl:col-span-3">
                Aucun contrat disponible.
              </div>
            )}
          </div>
        </div>

        {/* Tableau sinistres */}
        <ClaimsTable claims={claims} />
      </div>
    </div>
  );
}

export default DashboardClient;