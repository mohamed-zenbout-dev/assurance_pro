import { Search } from 'lucide-react';

function QuotesToolbar({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="text-xl font-semibold text-slate-900">
        Mes demandes de devis
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Rechercher un devis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 sm:w-72"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        >
          <option value="all">Tous les statuts</option>
          <option value="en attente">En attente</option>
          <option value="accepté">Accepté</option>
          <option value="refusé">Refusé</option>
        </select>
      </div>
    </div>
  );
}

export default QuotesToolbar;