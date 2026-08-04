import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-2">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">AssurPro</h1>
            <p className="text-xs text-slate-400">
              Votre sécurité, notre priorité
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#hero" className="text-sm font-medium text-slate-300 hover:text-white">Accueil</a>
          <a href="#offers" className="text-sm font-medium text-slate-300 hover:text-white">Offres</a>
          <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-white">Contact</a>

          <Link
            to="/login"
            className="rounded-full border border-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-slate-900"
          >
            Connexion
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Inscription
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;