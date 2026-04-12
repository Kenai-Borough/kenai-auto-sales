
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
