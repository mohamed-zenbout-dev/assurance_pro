import { Link } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';

function OfferPricingCard({ title, description, icon: Icon, features, color }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-xl">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${color}`} >
        <Icon className="h-8 w-8 text-white" />
      </div>

      <h3 className="mt-4 text-center text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-center text-sm text-slate-600">
        {description}
      </p>

      <ul className="mt-5 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
            <CircleCheck className="mt-0.5 h-4 w-4 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/register"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100"
      >
        Demander un devis
      </Link>
    </div>
  );
}

export default OfferPricingCard;