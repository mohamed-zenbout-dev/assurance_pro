import { Bell, ShieldCheck, UserCircle } from 'lucide-react';

function AdminHeader() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Espace Administrateur
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Tableau de bord administrateur
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
          <div className="rounded-full bg-violet-100 p-2 text-violet-600">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div className="text-sm">
            <p className="font-semibold text-slate-900">Admin</p>
            <p className="text-xs text-slate-500">Administrateur</p>
          </div>

          <UserCircle className="h-6 w-6 text-slate-400" />
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;