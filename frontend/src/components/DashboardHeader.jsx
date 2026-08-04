import { Bell, Mail, UserCircle } from 'lucide-react';

function DashboardHeader({ client }) {
  return (
    <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Bonjour {client?.firstName || client?.fullName || 'Client'} 👋
          </h1>
          <p className="mt-1 text-slate-600">
            Voici un résumé de vos contrats et sinistres.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button className="rounded-full border border-slate-200 p-3 text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600">
            <Bell className="h-5 w-5" />
          </button>

          <button className="rounded-full border border-slate-200 p-3 text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600">
            <Mail className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            <span className="text-sm font-medium text-slate-700">
              Client
            </span>
            <UserCircle className="h-8 w-8 text-slate-500" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;