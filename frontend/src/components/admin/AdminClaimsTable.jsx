import { Eye } from 'lucide-react';
import AdminClaimStatusBadge from './AdminClaimStatusBadge';

function AdminClaimsTable({ claims }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Client</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Description</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Date du sinistre</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Statut</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Date de réception</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {claims.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-10 text-center text-slate-500">
                  Aucun sinistre trouvé.
                </td>
              </tr>
            ) : (
              claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {claim.id}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {claim.clientName || 'Client'}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {claim.description}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {claim.date_sinistre || claim.createdAt}
                  </td>

                  <td className="px-4 py-3">
                    <AdminClaimStatusBadge status={claim.status} />
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {claim.createdAt || '—'}
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

export default AdminClaimsTable;