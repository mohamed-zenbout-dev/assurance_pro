import { useEffect, useState } from 'react';
import { UserCircle, Save, ShieldCheck } from 'lucide-react';

import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import PageLoader from '../components/common/PageLoader';

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await api.get('/admin/profile');

        setAdmin(response.data);

        setForm({
          nom: response.data.nom || '',
          prenom: response.data.prenom || '',
          email: response.data.email || '',
        });
      } catch (error) {
        console.error('Erreur chargement profil admin :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.put('/admin/profile', form);
      setAdmin(response.data);
      alert('Profil administrateur mis à jour');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="lg:w-72 lg:flex-shrink-0 lg:self-stretch">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AdminHeader />

        {loading ? (
          <PageLoader />
        ) : (
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="mb-6 text-3xl font-bold text-slate-900">
                Profil administrateur
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

                <input
                  type="text"
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-violet-100 p-5 text-violet-600">
                  <UserCircle className="h-16 w-16" />
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {admin?.prenom} {admin?.nom}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {admin?.email}
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
                  <ShieldCheck className="h-4 w-4" />
                  Administrateur vérifié
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminProfile;