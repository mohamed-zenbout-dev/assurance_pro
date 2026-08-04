import {
  Car,
  Home as HomeIcon,
  HeartPulse,
  FileText,
  Lock,
  Headphones,
  UserPlus,
  ShieldCheck,
  CircleCheck,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OfferCard from '../components/OfferCard';
import FeatureCard from '../components/FeatureCard';
import StepCard from '../components/StepCard';
import Footer from '../components/Footer';

const offers = [
  {
    title: 'Assurance Auto',
    description: 'Protégez votre véhicule avec des garanties adaptées à votre budget.',
    icon: Car,
  },
  {
    title: 'Assurance Habitation',
    description: 'Sécurisez votre logement contre les imprévus du quotidien.',
    icon: HomeIcon,
  },
  {
    title: 'Assurance Santé',
    description: 'Une couverture santé simple et accessible pour toute la famille.',
    icon: HeartPulse,
  },
];

const advantages = [
  {
    title: 'Devis rapide',
    description: 'Obtenez une estimation personnalisée en quelques minutes.',
    icon: FileText,
  },
  {
    title: 'Sécurité des données',
    description: 'Vos informations personnelles sont protégées et sécurisées.',
    icon: Lock,
  },
  {
    title: 'Support 24/7',
    description: 'Une assistance disponible à tout moment pour vous accompagner.',
    icon: Headphones,
  },
];

const steps = [
  { title: 'Créez votre compte', icon: UserPlus },
  { title: 'Choisissez votre offre', icon: ShieldCheck },
  { title: 'Obtenez votre contrat', icon: CircleCheck },
];

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <Hero />

      <section id="offers" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Nos offres
            </h2>
            <p className="mt-4 text-slate-600">
              Des solutions adaptées à chaque besoin de protection.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.title} {...offer} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pourquoi nous ?
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {advantages.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Comment ça marche ?
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                step={index + 1}
                title={step.title}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Prêt à assurer vos biens ?
          </h2>
          <p className="mt-4 text-blue-100">
            Rejoignez Assurance Pro et gérez facilement vos contrats, devis et sinistres depuis une plateforme unique.
          </p>

          <a
            href="/register"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50"
          >
            Commencer maintenant
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;