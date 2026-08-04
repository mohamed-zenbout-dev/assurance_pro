function ClaimsTable({ claims }) {
  const getStatusClass = (status) => {
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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Mes Sinistres
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Sinistre</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {claims.length > 0 ? (
              claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {claim.title || claim.description || 'Sinistre'}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {claim.type || 'Assurance'}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {claim.createdAt
                      ? new Date(claim.createdAt).toLocaleDateString('fr-FR')
                      : '—'}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        claim.status
                      )}` }
                    >
                      {claim.status || 'En attente'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-8 text-center text-slate-500"
                >
                  Aucun sinistre déclaré pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClaimsTable;