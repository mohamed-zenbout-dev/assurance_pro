import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-violet-300 ${
      isActive ? 'text-violet-400 font-semibold' : 'text-slate-200'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 ring-1 ring-violet-500/30">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <p className="text-2xl font-extrabold tracking-tight text-white">
              Assur<span className="text-violet-400">Pro</span>
            </p>

            <p className="text-xs text-slate-400">
              Votre sécurité, notre priorité
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Accueil
          </NavLink>

          <a href="#offers" className="text-slate-200 transition hover:text-violet-300">
            Offres
          </a>

          <a href="#contact" className="text-slate-200 transition hover:text-violet-300">
            Contact
          </a>
        </nav>

        {/* Actions desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-violet-400/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-violet-300 hover:bg-violet-500/10"
          >
            Connexion
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-700 hover:to-purple-700"
          >
            Inscription
          </Link>
        </div>

        {/* Bouton mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 p-2 text-slate-200 transition hover:border-violet-500 hover:text-violet-300 md:hidden"
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-900 md:hidden">
          <div className="space-y-2 px-4 py-4">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-violet-300"
            >
              Accueil
            </NavLink>

            <a
              href="#offers"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-violet-300"
            >
              Offres
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-violet-300"
            >
              Contact
            </a>

            <div className="mt-4 grid gap-3 border-t border-slate-800 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-xl border border-violet-400/40 px-4 py-3 text-sm font-semibold text-white transition hover:border-violet-300 hover:bg-violet-500/10"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-700 hover:to-purple-700"
              >
                Inscription
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;