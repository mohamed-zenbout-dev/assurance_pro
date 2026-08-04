import { Link } from 'react-router-dom';

function OfferCard({ title, description, icon: Icon }) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>

      <Link
        to="/quotes"
        className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        Voir plus
      </Link>
    </article>
  );
}

export default OfferCard;