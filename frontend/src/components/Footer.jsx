import { Mail, Phone, Globe, Share2 } from 'lucide-react';

function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 px-6 py-14 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-blue-400" />
              <span>contact@example.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-blue-400" />
              <span>+33 6 00 00 00 00</span>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div>
          <h3 className="text-lg font-semibold text-white">Informations</h3>

          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href="#" className="hover:text-white">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white">
              FAQ
            </a>
          </div>
        </div>

        {/* Réseaux */}
        <div>
          <h3 className="text-lg font-semibold text-white">Suivez-nous</h3>

          <div className="mt-4 flex gap-4">
            <a
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-600 hover:text-white"
              aria-label="Site web"
            >
              <Globe className="h-5 w-5" />
            </a>

            <a
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-600 hover:text-white"
              aria-label="Réseaux sociaux"
            >
              <Share2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        © 2026 AssurPro — Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;