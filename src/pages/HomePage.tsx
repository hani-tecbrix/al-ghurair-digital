
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Send, CreditCard, QrCode, Receipt, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const HomePage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const balance = 12450.75;
  const recentTransactions = [
    { id: 1, type: 'send', amount: -250, recipient: 'Ahmed Al Mansouri', date: '2024-01-10', status: 'completed' },
    { id: 2, type: 'receive', amount: 1500, recipient: 'Salary - Emirates NBD', date: '2024-01-08', status: 'completed' },
    { id: 3, type: 'bill', amount: -120, recipient: 'DEWA Bill Payment', date: '2024-01-07', status: 'completed' },
  ];

  const quickActions = [
    { id: 'send', icon: Send, label: t('actions.sendMoney'), path: '/send-money', color: 'bg-blue-500' },
    { id: 'bills', icon: Receipt, label: t('actions.payBills'), path: '/pay-bills', color: 'bg-green-500' },
    { id: 'qr', icon: QrCode, label: t('actions.qrPay'), path: '/qr-pay', color: 'bg-purple-500' },
    { id: 'cards', icon: CreditCard, label: t('actions.cards'), path: '/cards', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#003D31] to-[#002822] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Welcome back!</h1>
            <p className="text-[#F0FF3D] text-sm">{user?.user_metadata?.full_name || 'User'}</p>
          </div>
          <Badge variant="secondary" className="bg-[#F0FF3D] text-[#003D31]">
            KYC Verified
          </Badge>
        </div>
        
        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-80">Available Balance</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 h-auto text-white hover:bg-white/20"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <div className="text-2xl font-bold">
            {showBalance ? `AED ${balance.toLocaleString()}` : '••••••'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-[#171717] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.id}
                className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 shadow-sm"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-[#171717]">{action.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#171717]">Recent Transactions</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/transactions')}
            className="text-[#003D31] hover:bg-[#F6F7F9]"
          >
            View All
          </Button>
        </div>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {recentTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 ${
                  index !== recentTransactions.length - 1 ? 'border-b border-[#F6F7F9]' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'send' ? 'bg-red-100' : 
                    transaction.type === 'receive' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'send' && <ArrowUpRight className="w-5 h-5 text-red-600" />}
                    {transaction.type === 'receive' && <ArrowDownRight className="w-5 h-5 text-green-600" />}
                    {transaction.type === 'bill' && <Receipt className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-[#171717] text-sm">{transaction.recipient}</p>
                    <p className="text-xs text-[#918EA4]">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-[#171717]'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}AED {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
