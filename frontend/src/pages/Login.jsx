import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  ShieldCheck,
  Mail,
  Lock,
  Globe,
  Share2,
} from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // LOGIQUE API JWT 
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    console.log('Connexion avec :', email, password);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login_check',
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Réponse login :', response.data);

      localStorage.setItem('token', response.data.token);

      // décodage du JWT
      const decoded = jwtDecode(response.data.token);
      const roles = decoded.roles || [];

      localStorage.setItem('roles', JSON.stringify(roles));

      if (roles.includes('ROLE_ADMIN')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
      } catch (error) {
      console.error('Erreur complète :', error);
      console.error('Réponse serveur :', error.response?.data);

      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENU PRINCIPAL */}
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/40">
          {/* Logo */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              Assur<span className="text-violet-600">Pro</span>
            </h2>

            <h3 className="mt-4 text-xl font-semibold text-slate-800">
              Connexion
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Accédez à votre compte
            </p>
          </div>

          {/* Illustration */}
          <div className="mt-6 flex justify-center">
            <div className="h-28 w-44 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-2 shadow-md">
              <div className="flex h-full items-center justify-center rounded-xl bg-white text-center text-xs font-medium text-slate-500">
                Espace sécurisé
                <br />
                Assurance Pro
              </div>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  placeholder="test2@test.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mot de passe
              </label>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  placeholder="123456"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Séparateur */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              OU
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Réseaux */}
          <div className="text-center">
            <p className="text-sm text-slate-500">Continuez avec</p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                className="rounded-full border border-slate-200 p-3 text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                <Globe className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="rounded-full border border-slate-200 p-3 text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Inscription */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Pas encore de compte ?{' '}
            <Link
              to="/register"
              className="font-semibold text-violet-600 transition hover:text-violet-700"
            >
              S’inscrire
            </Link>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Login;