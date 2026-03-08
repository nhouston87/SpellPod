import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './features/auth/RequireAuth.js';
import { AppPage } from './features/app/app.page.js';
import { LoginPage } from './features/auth/login.page.js';
import { SearchPage } from './features/cards/search.page.js';

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
