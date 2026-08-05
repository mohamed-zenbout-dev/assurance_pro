import { Camera, UserCircle } from 'lucide-react';

function ProfileAvatarCard({ fullName, email }) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <UserCircle className="h-28 w-28 text-slate-300" />

          <button className="absolute bottom-1 right-1 rounded-full bg-violet-600 p-2 text-white shadow-lg transition hover:bg-violet-700">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          {fullName || 'Client Assurance Pro'}
        </h3>

        <p className="mt-1 text-sm text-slate-500">{email}</p>

        <span className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Compte actif
        </span>
      </div>
    </aside>
  );
}

export default ProfileAvatarCard;