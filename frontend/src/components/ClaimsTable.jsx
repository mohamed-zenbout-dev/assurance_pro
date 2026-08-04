import { Eye } from 'lucide-react';

function ClaimsTable({ claims }) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepté':
      case 'accepte':
      case 'validé':
      case 'valide':
        return 'bg-green-100 text-green-700';

      case 'refusé':
      case 'refuse':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Date du sinistre</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Dernière mise à jour</th>
              <th className="px-4 py-3 font-medium text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {claims.length > 0 ? (
              claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {claim.description || claim.title || 'Sinistre'}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {claim.createdAt
                      ? new Date(claim.createdAt).toLocaleDateString('fr-FR')
                      : '—'}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                        claim.status
                      )}` }
                    >
                      {claim.status || 'En attente'}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {claim.updatedAt
                      ? new Date(claim.updatedAt).toLocaleDateString('fr-FR')
                      : claim.createdAt
                      ? new Date(claim.createdAt).toLocaleDateString('fr-FR')
                      : '—'}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button className="rounded-full border border-violet-200 p-2 text-violet-600 transition hover:bg-violet-50 hover:text-violet-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-10 text-center text-slate-500"
                >
                  Aucun sinistre trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ClaimsTable;