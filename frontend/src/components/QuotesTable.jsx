import { Eye, Home, Car } from 'lucide-react';

function QuotesTable({ quotes }) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepté':
      case 'accepte':
        return 'bg-green-100 text-green-700';

      case 'refusé':
      case 'refuse':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getIcon = (type) => {
    return type?.toLowerCase().includes('habitation') ? (
      <Home className="h-4 w-4 text-green-600" />
    ) : (
      <Car className="h-4 w-4 text-violet-600" />
    );
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Type d'assurance</th>
              <th className="px-4 py-3 font-medium">Date de demande</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Réponse</th>
              <th className="px-4 py-3 font-medium text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      {getIcon(quote.type_assurance)}
                      {quote.type_assurance || 'Assurance'}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {quote.createdAt
                      ? new Date(quote.createdAt).toLocaleDateString('fr-FR')
                      : '—'}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                        quote.statut
                      )}` }
                    >
                      {quote.statut || 'En attente'}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {quote.response || '—'}
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
                  Aucune demande de devis trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default QuotesTable;