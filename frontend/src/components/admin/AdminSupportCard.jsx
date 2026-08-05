function AdminSupportCard() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white shadow-lg">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/10 p-3 text-3xl">🛟</div>

        <div>
          <h2 className="text-lg font-semibold">Aide et support</h2>
          <p className="mt-1 text-sm text-violet-100">
            Notre équipe est disponible pour vous accompagner dans la gestion de la plateforme.
          </p>

          <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
            Contacter le support
          </button>
        </div>
      </div>
    </section>
  );
}

export default AdminSupportCard;