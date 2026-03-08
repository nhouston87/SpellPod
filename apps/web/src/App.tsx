import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth.js';
import { AppPage } from './pages/AppPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SearchPage } from './pages/SearchPage.js';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppPage />
          </RequireAuth>
        }
      />
      <Route
        path="/cards"
        element={
          <RequireAuth>
            <SearchPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}
