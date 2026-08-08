function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

        <p className="text-sm text-slate-500">
          Chargement des données…
        </p>
      </div>
    </div>
  );
}

export default PageLoader;