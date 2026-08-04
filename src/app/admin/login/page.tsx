import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Přihlášení",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  return <LoginForm searchParams={searchParams} />;
}

async function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="min-h-screen bg-steel-50">
      <div className="mx-auto max-w-sm px-4 py-24">
        <h1 className="text-2xl font-bold text-steel-950">Admin OK FINAL</h1>
        <p className="mt-2 text-sm text-steel-600">
          Přístup jen pro editory obsahu.
        </p>
        <form action="/api/admin/login" method="post" className="mt-8 space-y-4">
          <input type="hidden" name="next" value={sp.next ?? "/admin"} />
          <div>
            <label className="field-label" htmlFor="password">Heslo</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="field-input"
            />
          </div>
          {sp.error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Nesprávné heslo.
            </div>
          ) : null}
          <button className="btn btn-primary w-full">Přihlásit se</button>
        </form>
      </div>
    </div>
  );
}
