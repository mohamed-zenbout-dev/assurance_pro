import { useEffect, useState } from 'react';
import { Save, ShieldCheck, UserCircle } from 'lucide-react';

import api from '../services/api';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import PageLoader from '../components/common/PageLoader';

function Profile() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    password: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Début GET /client');

        const clientResponse = await api.get('/client');

        console.log('Réponse /client :', clientResponse.data);

        const userResponse = await api.get('/me');

        console.log('Réponse /me :', userResponse.data);

        const currentClient = clientResponse.data.data?.[0] || null;
        
        setClient(currentClient);

        setForm({
          nom: currentClient?.nom || '',
          prenom: currentClient?.prenom || '',
          email: userResponse.data.email || '',
          telephone: currentClient?.telephone || '',
          adresse: currentClient?.adresse || '',
          password: '',
        });
      } catch (error) {
        console.error('Erreur chargement profil :', error);
        setErrorMessage('Impossible de charger le profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!client) {
        setErrorMessage('Client introuvable');
        return;
      }

    setSaving(true);
    setMessage('');
    setErrorMessage('');

    try {
      // Mise à jour des informations client
      const clientResponse = await api.put(`/client/${client.id}`, {
        name: `${form.prenom} ${form.nom}`.trim(),
        telephone: form.telephone,
        adresse: form.adresse,
      });

      // Mise à jour de l'utilisateur connecté
      await api.put('/me', {
        email: form.email,
        password: form.password || undefined,
      });

      setClient(clientResponse.data);

      setForm((prev) => ({
        ...prev,
        password: '',
      }));

      setMessage('Profil mis à jour avec succès');
    } catch (error) {
      console.error(error.response?.data);
      setErrorMessage('Impossible de mettre à jour le profil');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Sidebar */}
      <div className="lg:w-72 lg:flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Contenu principal */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <DashboardHeader client={client} />

        {loading ? (
          <PageLoader />
        ) : (
          <>
            {/* En-tête de page */}
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                <UserCircle className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Mon Profil
                </h1>

                <p className="mt-1 text-slate-600">
                  Consultez et modifiez vos informations personnelles.
                </p>
              </div>
            </div>

            {/* Message de succès */}
            {message && (
              <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* Message d'erreur */}
            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-3">
              {/* Formulaire */}
              <div className="xl:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Nom */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Nom
                      </label>

                      <input
                        type="text"
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    {/* Prénom */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Prénom
                      </label>

                      <input
                        type="text"
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Téléphone
                      </label>

                      <input
                        type="text"
                        name="telephone"
                        value={form.telephone}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    {/* Adresse */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Adresse
                      </label>

                      <textarea
                        name="adresse"
                        value={form.adresse}
                        onChange={handleChange}
                        rows={4}
                        className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>

                    {/* Mot de passe */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Nouveau mot de passe
                      </label>

                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Laisser vide pour conserver le mot de passe actuel"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                      />
                    </div>
                  </div>

                  {/* Bouton de sauvegarde */}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Save className="h-4 w-4" />

                      {saving
                        ? 'Enregistrement...'
                        : 'Enregistrer les modifications'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Carte profil */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-violet-100 p-5 text-violet-600">
                    <UserCircle className="h-16 w-16" />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {form.prenom} {form.nom}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {form.email}
                  </p>

                  <div className="mt-6 flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
                    <ShieldCheck className="h-4 w-4" />
                    Compte vérifié
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;