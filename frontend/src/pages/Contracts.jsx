import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import api from '../services/api';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import ContractsTable from '../components/ContractsTable';
import ContractDetailCard from '../components/ContractDetailCard';
import CoverageCard from '../components/CoverageCard';
import DocumentsCard from '../components/DocumentsCard';

function Contracts() {
  const [client, setClient] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientRes, contractsRes] = await Promise.all([
          api.get('/client/1'),
          api.get('/contracts'),
        ]);

        setClient(clientRes.data);
        setContracts(contractsRes.data || []);

        if (contractsRes.data?.length > 0) {
          setSelectedContract(contractsRes.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const matchesSearch =
        contract.numero_contrat
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        contract.type_assurance
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        contract.statut?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contracts, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0">
        <DashboardSidebar />
      </div>

      <main className="flex-1 p-6 lg:p-8">
        <DashboardHeader client={client} />

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Mes Contrats
            </h1>
            <p className="mt-1 text-slate-600">
              Consultez et gérez vos contrats d’assurance.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Rechercher un contrat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 sm:w-72"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="expiré">Expiré</option>
            </select>
          </div>
        </div>

        <ContractsTable
          contracts={filteredContracts}
          selectedId={selectedContract?.id}
          onSelect={setSelectedContract}
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <ContractDetailCard contract={selectedContract} />
          <CoverageCard />
          <DocumentsCard contract={selectedContract} />
        </div>
      </main>
    </div>
  );
}

export default Contracts;