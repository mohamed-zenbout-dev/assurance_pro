function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default FeatureCard;