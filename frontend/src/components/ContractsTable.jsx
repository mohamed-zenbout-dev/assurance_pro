function ContractsTable({ contracts, selectedId, onSelect }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Type de Contrat</th>
              <th className="px-4 py-3 font-medium">Date du Début</th>
              <th className="px-4 py-3 font-medium">Date du Fin</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Prime Annuelle</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {contracts.map((contract) => (
              <tr
                key={contract.id}
                className={`transition hover:bg-slate-50 ${
                  selectedId === contract.id ? 'bg-violet-50' : ''
                }`}
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {contract.id}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {contract.type_assurance}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {new Date(contract.date_debut).toLocaleDateString('fr-FR')}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {new Date(contract.date_fin).toLocaleDateString('fr-FR')}
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {contract.statut}
                  </span>
                </td>

                <td className="px-4 py-3 font-medium text-slate-900">
                  {contract.montant_prime} €
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => onSelect(contract)}
                    className="rounded-full border border-violet-200 px-4 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                  >
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContractsTable;