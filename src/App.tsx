
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, ToastProvider } from './components';
import { AdminRoute } from './components/auth/AdminRoute';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { KenaiAuthProvider } from './contexts/KenaiAuthContext';
import {
  AdminPage,
  BrowsePage,
  BuyersGuidePage,
  DashboardPage,
  DealerPage,
  HomePage,
  NotFoundPage,
  SellPage,
  VehicleDetailPage,
} from './pages';
import { KenaiAccount } from './pages/auth/KenaiAccount';
import { KenaiSignIn } from './pages/auth/KenaiSignIn';
import { KenaiSignUp } from './pages/auth/KenaiSignUp';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiePolicy from './pages/legal/CookiePolicy';
import DMCA from './pages/legal/DMCA';
import AcceptableUse from './pages/legal/AcceptableUse';
const EscrowTransactionPage = lazy(() => import('./pages/EscrowTransactionPage'));

export default function App() {
  return (
    <ToastProvider>
      <KenaiAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/escrow/:id" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"/></div>}><ProtectedRoute><EscrowTransactionPage /></ProtectedRoute></Suspense>} />
              <Route path="/escrow/demo" element={<Suspense fallback={<div />}><EscrowTransactionPage /></Suspense>} />
              <Route path="/dealer" element={<ProtectedRoute allowedRoles={['dealer', 'admin']}><DealerPage /></ProtectedRoute>} />
              <Route path="/buyers-guide" element={<BuyersGuidePage />} />
              <Route path="/sign-in" element={<KenaiSignIn />} />
              <Route path="/signin" element={<KenaiSignIn />} />
              <Route path="/login" element={<KenaiSignIn />} />
              <Route path="/sign-up" element={<KenaiSignUp />} />
              <Route path="/signup" element={<KenaiSignUp />} />
              <Route path="/auth" element={<KenaiSignIn />} />
              <Route path="/account" element={<ProtectedRoute><KenaiAccount /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/acceptable-use" element={<AcceptableUse />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </KenaiAuthProvider>
    </ToastProvider>
  );
}
