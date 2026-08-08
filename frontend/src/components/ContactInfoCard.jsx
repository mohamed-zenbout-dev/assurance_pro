function ContactInfoCard({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <div className="mt-1 text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}

export default ContactInfoCard;