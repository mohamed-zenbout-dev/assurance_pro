import { FileText, FileWarning, ShieldCheck, Users } from 'lucide-react';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminStatsCard from '../components/admin/AdminStatsCard';
import RecentClaimsTable from '../components/admin/RecentClaimsTable';
import RecentUsersTable from '../components/admin/RecentUsersTable';
import AdminSupportCard from '../components/admin/AdminSupportCard';

function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-6 lg:p-8">
        <AdminHeader />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatsCard title="Demandes actives" value="12" icon={FileText} />
          <AdminStatsCard title="Contrats actifs" value="108" icon={ShieldCheck} />
          <AdminStatsCard title="Utilisateurs enregistrés" value="195" icon={Users} />
          <AdminStatsCard title="Sinistres en attente" value="2" icon={FileWarning} />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <RecentClaimsTable />
          <RecentUsersTable />
        </div>

        <div className="mt-8">
          <AdminSupportCard />
        </div>
      </main>
    </div>
  );
}

export default DashboardAdmin;