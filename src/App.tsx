import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, ToastProvider } from './components';
import {
  AdminPage,
  AuthPage,
  BrowsePage,
  BuyersGuidePage,
  DashboardPage,
  DealerPage,
  HomePage,
  NotFoundPage,
  SellPage,
  VehicleDetailPage,
} from './pages';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dealer" element={<DealerPage />} />
            <Route path="/buyers-guide" element={<BuyersGuidePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
