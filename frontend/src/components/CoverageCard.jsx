import { Shield, CheckCircle } from 'lucide-react';

function CoverageCard() {
  const items = [
    'Responsabilité civile',
    'Vol',
    'Assistance 24/7',
    'Dommages tous accidents',
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-violet-600" />
        <h3 className="text-lg font-semibold text-slate-900">
          Information couverture
        </h3>
      </div>

      <ul className="space-y-3 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <CheckCircle className="h-4 w-4 text-green-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoverageCard;