import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.js';

export function LoginPage() {
  const { user, signInWithGoogle, isLoading } = useAuth();

  if (isLoading) return <p>Checking session...</p>;
  if (user) return <Navigate to="/app" replace />;

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>SpellPod Login</h1>
      <p>You are signed out.</p>
      <button type="button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </main>
  );
}
