import { useAuth } from './auth/AuthContext.js';

export function App() {
  const { user, isLoading, signInWithGoogle, signOutUser } = useAuth();

  if (isLoading) {
    return <p>Checking session...</p>;
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>SpellPod</h1>

      {user ? (
        <>
          <p>Signed in as: {user.email ?? user.uid}</p>
          <button type="button" onClick={signOutUser}>
            Sign out
          </button>
        </>
      ) : (
        <>
          <p>You are signed out.</p>
          <button type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </>
      )}
    </main>
  );
}
