import { Users, FileText, TriangleAlert, Receipt } from 'lucide-react';

const icons = {
  Utilisateurs: Users,
  Contrats: FileText,
  Sinistres: TriangleAlert,
  Devis: Receipt,
};

function AdminStatsCard({ title, value }) {
  const Icon = icons[title] || Users;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default AdminStatsCard;