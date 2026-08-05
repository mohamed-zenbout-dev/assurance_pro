import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

import api from '../services/api';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import ProfileInfoForm from '../components/ProfileInfoForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ProfileAvatarCard from '../components/ProfileAvatarCard';

function Profile() {
  const [client, setClient] = useState(null);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    registeredAt: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/client/1');

        setClient(response.data);

        setProfile({
          fullName: response.data.fullName || 'Thomas Bernard',
          email: response.data.email || 'thomas.bernard@gmail.com',
          phone: response.data.phone || '+33 7 77 55 47 23',
          registeredAt: response.data.createdAt
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
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
      };

      const response = await api.put('/client/1', payload);

      setClient(response.data);

      alert('Profil mis à jour avec succès');
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
        <DashboardSidebar />
      </div>

      <main className="flex-1 p-6 lg:p-8">
        <DashboardHeader client={client} />

        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
            <User className="h-7 w-7" />
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

        <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <ProfileInfoForm
              profile={profile}
              setProfile={setProfile}
              onSubmit={handleProfileSubmit}
              saving={saving}
            />

            <ChangePasswordForm />
          </div>

          <ProfileAvatarCard
            fullName={profile.fullName}
            email={profile.email}
          />
        </div>
      </main>
    </div>
  );
}

export default Profile;