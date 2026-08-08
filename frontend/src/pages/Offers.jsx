import { Shield, Home, HeartPulse, Clock3, FileText, Headphones, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OfferPricingCard from '../components/OfferPricingCard';
import OfferFeature from '../components/OfferFeature';

const offers = [
  {
    title: 'Assurance Auto',
    description:
      'Protégez votre véhicule et roulez en toute sérénité avec une couverture complète.',
    icon: Shield,
    color: 'bg-violet-600',
    features: [
      'Responsabilité civile',
      'Vol et incendie',
      'Assistance 24/7',
      'Dommages tous accidents',
    ],
  },
  {
    title: 'Assurance Habitation',
    description:
      'Sécurisez votre logement et vos biens contre les imprévus du quotidien.',
    icon: Home,
    color: 'bg-emerald-600',
    features: [
      'Incendie et explosion',
      'Dégâts des eaux',
      'Vol et vandalisme',
      'Responsabilité civile',
    ],
  },
  {
    title: 'Assurance Santé',
    description:
      'Prenez soin de votre santé avec une couverture adaptée à toute la famille.',
    icon: HeartPulse,
    color: 'bg-red-500',
    features: [
      'Soins médicaux',
      'Hospitalisation',
      'Remboursement rapide',
      'Médecine spécialisée',
    ],
  },
];

const advantages = [
  {
    title: 'Fiabilité',
    description: 'Des garanties solides et sécurisées.',
    icon: Shield,
  },
  {
    title: 'Assistance 24/7',
    description: 'Une équipe disponible à tout moment pour vous aider.',
    icon: Headphones,
  },
  {
    title: 'Devis en ligne',
    description: 'Obtenez votre devis rapidement et facilement.',
    icon: FileText,
  },
  {
    title: 'Satisfaction client',
    description: 'La confiance de nos clients est notre priorité.',
    icon: Star,
  },
];

function Offers() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      {/* HERO */}
      <section className="bg-slate-200 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Nos Offres d’Assurance
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Des solutions adaptées pour vous et vos proches, avec une couverture simple, rapide et sécurisée.
            </p>

            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              Découvrir nos offres
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white shadow-xl ring-8 ring-white/60">
              <Shield className="h-24 w-24 text-violet-600" />
            </div>
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Nos principales Offres
            </h2>

            <p className="mt-3 text-slate-600">
              Choisissez l’assurance qui vous convient le mieux.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferPricingCard key={offer.title} {...offer} />
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {advantages.map((item) => (
              <OfferFeature key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Prêt à vous protéger ?
            </h2>

            <p className="mt-4 text-violet-100">
              Créez votre compte et obtenez votre devis personnalisé en quelques clics.
            </p>

            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg transition hover:bg-violet-50"
            >
              Créer un compte
              <Clock3 className="h-4 w-4" />
            </Link>
          </div>

          <div className="w-full max-w-xs overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
            <div className="aspect-[4/3] bg-slate-300">
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80"
                alt="Conseiller assurance avec un client"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Offers;