import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.js';
import { env } from '../env.js';

type MeResponse = { uid: string | null; email: string | null };

export function AppPage() {
  const { user, signOutUser } = useAuth();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const resp = await fetch(`${env.VITE_API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resp.ok) {
          throw new Error(`API /me failed (${resp.status})`);
        }

        const data = (await resp.json()) as MeResponse;
        setMe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    void run();
  }, [user]);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>SpellPod App</h1>
      <p>Signed in as: {user?.email ?? user?.uid}</p>
      <button type="button" onClick={signOutUser}>
        Sign out
      </button>

      <hr />

      <h2>Protected API Test (/me)</h2>
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </main>
  );
}
