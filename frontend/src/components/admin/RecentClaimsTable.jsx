const claims = [
  { id: 1, client: 'Claire Lefèvre', type: 'Auto', date: '10/07/2026', status: 'En attente' },
  { id: 2, client: 'Pierre Rigaud', type: 'Habitation', date: '12/07/2026', status: 'Refusé' },
  { id: 3, client: 'Bobbie Singer', type: 'Santé', date: '15/07/2026', status: 'Accepté' },
];

function RecentClaimsTable() {
  const badge = (status) => {
    switch (status) {
      case 'Accepté':
        return 'bg-green-100 text-green-700';
      case 'Refusé':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Demandes récentes
      </h2>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2 font-medium">Client</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Date</th>
              <th className="px-3 py-2 font-medium">Statut</th>
              <th className="px-3 py-2 font-medium text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {claims.map((claim) => (
              <tr key={claim.id} className="hover:bg-slate-50">
                <td className="px-3 py-3 font-medium text-slate-900">{claim.client}</td>
                <td className="px-3 py-3 text-slate-600">{claim.type}</td>
                <td className="px-3 py-3 text-slate-600">{claim.date}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge(claim.status)}`}>
                    {claim.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-center">
                  <button className="rounded-full border border-violet-200 px-3 py-1 text-xs font-semibold text-violet-600 transition hover:bg-violet-50">
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentClaimsTable;