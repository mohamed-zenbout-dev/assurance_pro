import {LayoutDashboard, Users, FileWarning, FileText, User, LogOut, ShieldCheck,} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-violet-100 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <aside className="flex h-full min-h-screen flex-col bg-gradient-to-b from-violet-700 to-violet-800 p-6 text-white">
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-2xl bg-white/10 p-2">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">AssurPro</h2>
          <p className="text-xs text-violet-100">Administration</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard className="h-5 w-5" />
          Tableau de Bord
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users className="h-5 w-5" />
          Gestion des Utilisateurs
        </NavLink>

        <NavLink to="/admin/claims" className={linkClass}>
          <FileWarning className="h-5 w-5" />
          Gestion des Sinistres
        </NavLink>

        <NavLink to="/admin/contracts" className={linkClass}>
          <FileText className="h-5 w-5" />
          Gestion des Contrats
        </NavLink>

        <NavLink to="/admin/profile" className={linkClass}>
          <User className="h-5 w-5" />
          Profil
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-5 w-5" />
        Déconnexion
      </button>
    </aside>
  );
}

export default AdminSidebar;