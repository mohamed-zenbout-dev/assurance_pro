function ContractSummaryCard({ contract }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-violet-600">
            {contract.type_assurance || 'Contrat'}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            {contract.numero_contrat || 'N° contrat'}
          </h3>
        </div>

        <div className="rounded-2xl bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          {contract.statut || 'Actif'}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-3xl font-bold text-slate-900">
          {contract.montant_prime || '0'} €
          <span className="text-base font-medium text-slate-500">/mois</span>
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Jusqu’au{' '}
          {contract.date_fin
            ? new Date(contract.date_fin).toLocaleDateString('fr-FR')
            : '—'}
        </p>
      </div>

      <button className="mt-6 w-full rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-700 hover:to-purple-700">
        Voir le contrat
      </button>
    </div>
  );
}

export default ContractSummaryCard;