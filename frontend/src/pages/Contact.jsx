import { useState } from 'react';
import { User, Mail, Phone, MapPin, Clock3, Send } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactInfoCard from '../components/ContactInfoCard';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // Future API Symfony :
      // await api.post('/contact', form);

      console.log('Message envoyé :', form);

      alert('Votre message a bien été envoyé.');

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      {/* HERO */}
      <section className="bg-slate-200 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Contactez-Nous
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos démarches d’assurance.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          {/* FORMULAIRE */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900">
                Envoyez-nous un message
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Nom */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nom complet
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      required
                      className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="votre.email@example.com"
                      required
                      className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Sujet
                  </label>

                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="contrat">Question sur un contrat</option>
                    <option value="sinistre">Déclaration de sinistre</option>
                    <option value="support">Support technique</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Décrivez votre demande en détail..."
                    required
                    className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  {sending ? 'Envoi...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
          </div>

          {/* COORDONNÉES */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Nos coordonnées
              </h2>

              <ContactInfoCard icon={Phone} title="Téléphone">
                <p>+33 7 77 55 47 23</p>
                <p className="mt-1 text-xs text-slate-500">
                  Lun - Ven : 9h00 - 18h00
                </p>
              </ContactInfoCard>

              <ContactInfoCard icon={Mail} title="Email">
                <p>contact@example.com</p>
                <p className="mt-1 text-xs text-slate-500">
                  Réponse sous 24h
                </p>
              </ContactInfoCard>

              <ContactInfoCard icon={MapPin} title="Adresse">
                <p>25, Rue de la Paix</p>
                <p>75002 Paris - France</p>
              </ContactInfoCard>

              <ContactInfoCard icon={Clock3} title="Horaires">
                <p>Lun - Ven : 9h00 - 18h00</p>
                <p>Sam : 9h00 - 13h00</p>
              </ContactInfoCard>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;