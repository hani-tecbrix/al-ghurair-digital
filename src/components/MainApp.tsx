
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import TabNavigation from '@/components/layout/TabNavigation';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ProfilePage from '@/pages/ProfilePage';
import SendMoneyPage from '@/pages/SendMoneyPage';
import PayBillsPage from '@/pages/PayBillsPage';
import QRPayPage from '@/pages/QRPayPage';
import CardsPage from '@/pages/CardsPage';
import TransactionsPage from '@/pages/TransactionsPage';
import NotificationsPage from '@/pages/NotificationsPage';

const MainApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-[#003D31] rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pb-20 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/send-money" element={<SendMoneyPage />} />
          <Route path="/pay-bills" element={<PayBillsPage />} />
          <Route path="/qr-pay" element={<QRPayPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </main>

      <TabNavigation />
    </div>
  );
};

export default MainApp;
