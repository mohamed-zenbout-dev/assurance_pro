function StepCard({ step, title, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20">
        <Icon className="h-8 w-8" />
      </div>

      <div className="mt-4 text-sm font-semibold text-blue-600">
        Étape {step}
      </div>

      <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
    </div>
  );
}

export default StepCard;