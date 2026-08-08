import { useEffect, useMemo, useState } from 'react';
import { FileText } from 'lucide-react';

import api from '../services/api';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import QuoteForm from '../components/QuoteForm';
import QuotesToolbar from '../components/QuotesToolbar';
import QuotesTable from '../components/QuotesTable';
import PageLoader from '../components/common/PageLoader';

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

        const data = Array.isArray(quotesRes.data)
          ? quotesRes.data
          : quotesRes.data.quotes ||
            quotesRes.data['hydra:member'] ||
            [];

        setQuotes(data);
      } catch (error) {
        console.error('Erreur chargement devis :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuoteCreated = async (payload) => {
    try {
      const response = await api.post('/quotes', payload);

      setQuotes((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error('Erreur création devis :', error);
    }
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

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0 lg:self-stretch">
        <DashboardSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <DashboardHeader client={client} />

        {loading ? (
          <PageLoader />
        ) : (
          <>
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                <FileText className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Mes Devis
                </h1>

                <p className="mt-1 text-slate-600">
                  Demandez un devis et suivez son état d’avancement.
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
          </>
        )}
      </main>
    </div>
  );
}

export default Quotes;