import { useEffect, useMemo, useState } from 'react';
import { FileText, Search } from 'lucide-react';

import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminContractStatusBadge from '../components/admin/AdminContractStatusBadge';
import PageLoader from '../components/common/PageLoader';

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
          : response.data.contracts ||
            response.data['hydra:member'] ||
            [];

        setContracts(data);
      } catch (error) {
        console.error('Erreur chargement contrats :', error);
        setContracts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        contract.numero_contrat
          ?.toLowerCase()
          .includes(searchValue) ||
        contract.type_assurance
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === 'all' ||
        contract.statut?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contracts, search, statusFilter]);

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
                <FileText className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Gestion des contrats
                </h1>

                <p className="mt-1 text-slate-600">
                  Consultez et gérez l’ensemble des contrats d’assurance.
                </p>
              </div>
            </div>

            {/* Recherche et filtre */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Rechercher un contrat..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
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

            {/* Tableau */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        N° Contrat
                      </th>

                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Type
                      </th>

                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Prime
                      </th>

                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Date début
                      </th>

                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Date fin
                      </th>

                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Statut
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredContracts.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-4 py-10 text-center text-slate-500"
                        >
                          Aucun contrat trouvé.
                        </td>
                      </tr>
                    ) : (
                      filteredContracts.map((contract) => (
                        <tr
                          key={contract.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {contract.numero_contrat}
                          </td>

                          <td className="px-4 py-3 text-slate-700">
                            {contract.type_assurance}
                          </td>

                          <td className="px-4 py-3 text-slate-700">
                            {contract.montant_prime
                              ? `${contract.montant_prime} €`
                              : '—'}
                          </td>

                          <td className="px-4 py-3 text-slate-700">
                            {contract.date_debut || '—'}
                          </td>

                          <td className="px-4 py-3 text-slate-700">
                            {contract.date_fin || '—'}
                          </td>

                          <td className="px-4 py-3">
                            <AdminContractStatusBadge
                              status={contract.statut}
                            />
                          </td>
                        </tr>
                      ))
                    )}
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

export default AdminContracts;