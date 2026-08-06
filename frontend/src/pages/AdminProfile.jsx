import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

import api from '../services/api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminProfileInfoForm from '../components/admin/AdminProfileInfoForm';
import AdminChangePasswordForm from '../components/admin/AdminChangePasswordForm';
import AdminProfileAvatarCard from '../components/admin/AdminProfileAvatarCard';

function AdminProfile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Administrateur',
    createdAt: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/client/1');

        setProfile({
          fullName: response.data.fullName || 'Administrateur Assurance Pro',
          email: response.data.email || 'admin@admin.com',
          phone: response.data.phone || '+33 7 77 55 47 23',
          role: 'Administrateur',
          createdAt: response.data.createdAt
            ? new Date(response.data.createdAt).toLocaleDateString('fr-FR')
            : '10/07/2026',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const payload = {
        fullName: profile.fullName.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
      };

      await api.put('/client/1', payload);

      alert('Profil administrateur mis à jour avec succès');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

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
        <AdminSidebar />
      </div>

      <main className="flex-1 p-6 lg:p-8">
        <AdminHeader />

        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
            <User className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Mon Profil Administrateur
            </h1>

            <p className="mt-1 text-slate-600">
              Gérez vos informations personnelles et les paramètres de sécurité du compte administrateur.
            </p>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <AdminProfileInfoForm
              profile={profile}
              setProfile={setProfile}
              onSubmit={handleProfileSubmit}
              saving={saving}
            />

            <AdminChangePasswordForm />
          </div>

          <AdminProfileAvatarCard
            fullName={profile.fullName}
            email={profile.email}
          />
        </div>
      </main>
    </div>
  );
}

export default AdminProfile;