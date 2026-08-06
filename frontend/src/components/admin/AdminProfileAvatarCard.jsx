import { Camera, ShieldCheck, UserCircle } from 'lucide-react';

function AdminProfileAvatarCard({ fullName, email }) {
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
          {fullName || 'Administrateur'}
        </h3>

        <p className="mt-1 text-sm text-slate-500">{email}</p>

        <div className="mt-4 flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
          <ShieldCheck className="h-4 w-4" />
          Administrateur
        </div>
      </div>
    </aside>
  );
}

export default AdminProfileAvatarCard;