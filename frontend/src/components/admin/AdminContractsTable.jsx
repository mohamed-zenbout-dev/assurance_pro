import { Eye } from 'lucide-react';
import AdminContractStatusBadge from './AdminContractStatusBadge';

function AdminContractsTable({ contracts }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Client</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Type de contrat</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Date de début</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Date de fin</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Statut</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Prime annuelle</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-10 text-center text-slate-500">
                  Aucun contrat trouvé.
                </td>
              </tr>
            ) : (
              contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {contract.id}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {contract.clientName || 'Client'}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {contract.type_assurance}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {contract.date_debut}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {contract.date_fin}
                  </td>

                  <td className="px-4 py-3">
                    <AdminContractStatusBadge status={contract.statut} />
                  </td>

                  <td className="px-4 py-3 text-right font-medium text-slate-900">
                    {Number(contract.montant_prime || 0).toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminContractsTable;