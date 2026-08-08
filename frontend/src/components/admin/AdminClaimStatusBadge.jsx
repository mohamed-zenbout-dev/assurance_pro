function AdminClaimStatusBadge({ status }) {
  const normalized = status?.toLowerCase();

  const classes = {
    accepté: 'bg-green-100 text-green-700 ring-green-200',
    refuse: 'bg-red-100 text-red-700 ring-red-200',
    'en attente': 'bg-orange-100 text-orange-700 ring-orange-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        classes[normalized] || 'bg-slate-100 text-slate-700 ring-slate-200'
      }`}
    >
      {status}
    </span>
  );
}

export default AdminClaimStatusBadge;