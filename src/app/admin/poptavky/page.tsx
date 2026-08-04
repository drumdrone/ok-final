export default function PoptavkyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-steel-950">Poptávky</h1>
      <p className="mt-2 text-steel-600">
        Přehled odeslaných poptávek z kontaktního formuláře.
      </p>

      <div className="mt-8 rounded-lg border border-dashed border-steel-300 bg-white p-10 text-center">
        <div className="mx-auto max-w-md">
          <h2 className="text-lg font-semibold text-steel-950">
            Zatím žádné poptávky
          </h2>
          <p className="mt-2 text-sm text-steel-600">
            Data přijdou, jakmile bude napojený Convex a formulář bude ukládat
            záznamy do tabulky <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">inquiries</code>.
          </p>
          <p className="mt-4 text-xs text-steel-500">
            UI je připraveno — filtr podle stavu, detail poptávky, stažení
            přílohy. Přijde po nasazení Convexu.
          </p>
        </div>
      </div>
    </div>
  );
}
