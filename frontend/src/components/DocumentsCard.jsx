import { Download, FileBadge } from 'lucide-react';

function DocumentsCard({ contract }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <FileBadge className="h-5 w-5 text-violet-600" />
        <h3 className="text-lg font-semibold text-slate-900">
          Documents
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FileBadge className="h-8 w-8 text-violet-600" />

            <div>
              <p className="text-sm font-medium text-slate-900">
                {contract?.numero_contrat || 'CT-2026-001'}.pdf
              </p>
              <p className="text-xs text-slate-500">
                Contrat d’assurance
              </p>
            </div>
          </div>

          <button className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentsCard;