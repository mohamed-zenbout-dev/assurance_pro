import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ShieldCheck, X } from 'lucide-react';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-violet-300 ${
      isActive
        ? 'font-semibold text-violet-400'
        : 'text-slate-200'
    }`;

  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-violet-600/20 p-2">
            <ShieldCheck className="h-7 w-7 text-violet-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Assur<span className="text-violet-400">Pro</span>
            </h1>

            <p className="hidden text-xs text-slate-400 sm:block">
              Votre sécurité, notre priorité
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={navLinkClass}
          >
            Accueil
          </NavLink>

          <NavLink
            to="/offers"
            className={navLinkClass}
          >
            Offres
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            Contact
          </NavLink>
        </div>

        {/* Actions desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            Connexion
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-700 hover:to-purple-700"
          >
            Inscription
          </Link>
        </div>

        {/* Bouton mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 p-2 text-slate-200 transition hover:border-violet-500 hover:text-violet-300 md:hidden"
          aria-label={
            mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'
          }
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <span className="block rounded-xl px-4 py-3 hover:bg-slate-900">
                Accueil
              </span>
            </NavLink>

            <NavLink
              to="/offers"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <span className="block rounded-xl px-4 py-3 hover:bg-slate-900">
                Offres
              </span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <span className="block rounded-xl px-4 py-3 hover:bg-slate-900">
                Contact
              </span>
            </NavLink>

            <div className="my-2 border-t border-slate-800" />

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900 hover:text-white"
            >
              Connexion
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:from-violet-700 hover:to-purple-700"
            >
              Inscription
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;