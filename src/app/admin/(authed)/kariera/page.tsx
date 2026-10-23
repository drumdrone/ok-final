export default function KarieraAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-steel-950">Kariéra</h1>
          <p className="mt-2 text-steel-600">Správa otevřených pozic.</p>
        </div>
        <button disabled className="btn btn-dark disabled:cursor-not-allowed disabled:opacity-60">
          Přidat pozici
        </button>
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-steel-300 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-steel-950">Bez datové vrstvy</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-steel-600">
          CRUD pozic ožije po připojení Convexu (tabulka <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">jobs</code>).
          Do té doby stránka <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">/kariera</code> ukazuje výzvu
          „pošlete životopis".
        </p>
      </div>
    </div>
  );
}
