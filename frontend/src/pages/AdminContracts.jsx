import { useEffect, useMemo, useState } from 'react';
import { FileText } from 'lucide-react';

import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminContractsToolbar from '../components/admin/AdminContractsToolbar';
import AdminContractsTable from '../components/admin/AdminContractsTable';

function AdminContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchContracts = async () => {
        try {
        const response = await api.get('/contracts');

        const data = Array.isArray(response.data)
            ? response.data
            : response.data.contracts || response.data['hydra:member'] || [];

        setContracts(data);
        } catch (error) {
        console.error('Erreur récupération contrats :', error);
        setContracts([]);
        } finally {
        setLoading(false);
        }
    };

    fetchContracts();
    }, []);

    const filteredContracts = useMemo(() => {
    const safeContracts = Array.isArray(contracts) ? contracts : [];

    return safeContracts.filter((contract) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        contract.numero_contrat?.toLowerCase().includes(searchValue) ||
        contract.type_assurance?.toLowerCase().includes(searchValue) ||
        contract.clientName?.toLowerCase().includes(searchValue);

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
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Sidebar */}
      <div className="lg:w-72 lg:flex-shrink-0 lg:self-stretch">
        <AdminSidebar />
      </div>

      {/* Contenu principal */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AdminHeader />

        {/* Titre */}
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
            <FileText className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Gestion des contrats
            </h1>

            <p className="mt-1 text-slate-600">
              Consultez, filtrez et gérez l’ensemble des contrats d’assurance de la plateforme.
            </p>
          </div>
        </div>

        {/* Barre d’outils */}
        <AdminContractsToolbar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Tableau */}
        <AdminContractsTable contracts={filteredContracts} />
      </main>
    </div>
  );
}

export default AdminContracts;