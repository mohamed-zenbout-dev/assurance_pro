import { useEffect, useMemo, useState } from 'react';
import { FileText } from 'lucide-react';

import api from '../services/api';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import QuoteForm from '../components/QuoteForm';
import QuotesToolbar from '../components/QuotesToolbar';
import QuotesTable from '../components/QuotesTable';

function Quotes() {
  const [client, setClient] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientRes, quotesRes] = await Promise.all([
          api.get('/client/1'),
          api.get('/quotes'),
        ]);

        setClient(clientRes.data);
        setQuotes(quotesRes.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuoteCreated = async ({ insuranceType, description, startDate }) => {
    const payload = {
      type_assurance: insuranceType,
      description,
      date_debut_souhaitee: startDate,
      statut: 'En attente',
    };

    const response = await api.post('/quotes', payload);

    setQuotes((prev) => [response.data, ...prev]);
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesSearch =
        quote.type_assurance
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        quote.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        quote.statut?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [quotes, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0">
        <DashboardSidebar />
      </div>

      <main className="flex-1 p-6 lg:p-8">
        <DashboardHeader client={client} />

        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
            <FileText className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Mes Devis
            </h1>

            <p className="mt-1 text-slate-600">
              Demandez un devis et consultez les réponses reçues.
            </p>
          </div>
        </div>

        <QuoteForm onQuoteCreated={handleQuoteCreated} />

        <div className="mt-8">
          <QuotesToolbar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <QuotesTable quotes={filteredQuotes} />
        </div>
      </main>
    </div>
  );
}

export default Quotes;