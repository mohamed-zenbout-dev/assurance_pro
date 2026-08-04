import { Link, useNavigate } from 'react-router-dom';
import {ShieldCheck, LayoutDashboard, FileText, TriangleAlert, ScrollText, User, LogOut,} from 'lucide-react';

function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="flex min-h-screen w-full flex-col bg-gradient-to-b from-violet-700 to-purple-700 text-white lg:w-72">
      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">Assur Pro</h2>
            <p className="text-sm text-violet-100">Espace Client</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8">
        <div className="space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/20"
          >
            <LayoutDashboard className="h-5 w-5" />
            Tableau de bord
          </Link>

          <Link
            to="/quotes"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10"
          >
            <FileText className="h-5 w-5" />
            Mes devis
          </Link>

          <Link
            to="/claims"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10"
          >
            <TriangleAlert className="h-5 w-5" />
            Mes sinistres
          </Link>

          <Link
            to="/contracts"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10"
          >
            <ScrollText className="h-5 w-5" />
            Mes contrats
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10"
          >
            <User className="h-5 w-5" />
            Profil
          </Link>
        </div>
      </nav>

      {/* Déconnexion */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10"
        >
          <LogOut className="h-5 w-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;