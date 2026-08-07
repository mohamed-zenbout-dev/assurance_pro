import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import heroImage from '../assets/pexels-hero-banner.jpg';

function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-blue-100 via-slate-100 to-blue-200 px-6 py-24 text-center"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
          <ShieldCheck className="h-4 w-4" />
          Plateforme de gestion d’assurance sécurisée
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Assurez vos biens simplement et rapidement
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Gérez vos contrats, devis et sinistres depuis une plateforme moderne et sécurisée.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/quotes"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
          >
            Demander un devis
          </Link>

          <Link
            to="/register"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            S’inscrire
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;