import { Mail, Phone} from 'lucide-react';

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
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        © 2026 AssurPro — Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;