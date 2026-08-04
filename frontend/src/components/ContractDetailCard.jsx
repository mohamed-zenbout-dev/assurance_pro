import { FileText } from 'lucide-react';

function ContractDetailCard({ contract }) {
  if (!contract) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-violet-600" />
        <h3 className="text-lg font-semibold text-slate-900">
          Détail du contrat
        </h3>
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex justify-between">
          <span className="font-medium">Type de Contrat :</span>
          <span>{contract.type_assurance}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Numéro de Contrat :</span>
          <span>{contract.numero_contrat}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Date de Début :</span>
          <span>
            {new Date(contract.date_debut).toLocaleDateString('fr-FR')}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Date de Fin :</span>
          <span>
            {new Date(contract.date_fin).toLocaleDateString('fr-FR')}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Statut :</span>
          <span className="font-semibold text-green-600">
            {contract.statut}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Prime Annuelle :</span>
          <span className="font-semibold text-slate-900">
            {contract.montant_prime} €
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContractDetailCard;