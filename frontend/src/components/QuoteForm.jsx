import { useState } from 'react';
import { Home, Car, CalendarDays, Send } from 'lucide-react';

function QuoteForm({ onQuoteCreated }) {
  const [insuranceType, setInsuranceType] = useState('Assurance Auto');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await onQuoteCreated({
        insuranceType,
        description,
        startDate,
      });

      setDescription('');
      setStartDate('');
      setInsuranceType('Assurance Auto');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Demander un devis
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Remplissez le formulaire ci-dessous pour effectuer une demande de devis.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Type d'assurance
          </label>

          <div className="relative">
            <Car className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-600" />

            <select
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            >
              <option>Assurance Auto</option>
              <option>Assurance Habitation</option>
              <option>Assurance Santé</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description de vos besoins
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre besoin, le type de couverture souhaitée et les détails importants..."
            rows={5}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Date de début souhaitée
          </label>

          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-600" />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4" />
            {submitting ? 'Envoi...' : 'Envoyer la demande'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default QuoteForm;