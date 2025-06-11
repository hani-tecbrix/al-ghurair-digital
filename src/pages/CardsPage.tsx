
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, CreditCard, Eye, EyeOff, ChevronRight, Info, Lock, Shield, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const CardsPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });

  const cards = [
    { 
      id: 1, 
      type: 'visa', 
      number: '4532 1234 5678 9012', 
      maskedNumber: '•••• •••• •••• 9012',
      expiry: '12/26', 
      name: 'Ahmed Al Mansouri', 
      isPrimary: true,
      isActive: true,
      color: 'from-blue-600 to-blue-800',
      balance: 15420.50
    },
    { 
      id: 2, 
      type: 'mastercard', 
      number: '5555 4444 3333 2222',
      maskedNumber: '•••• •••• •••• 2222',
      expiry: '09/25', 
      name: 'Ahmed Al Mansouri', 
      isPrimary: false,
      isActive: false,
      color: 'from-green-600 to-green-800',
      balance: 8750.25
    },
  ];

  const cardActions = [
    { id: 'freeze', icon: Lock, label: t('cards.freeze'), description: 'Temporarily disable card' },
    { id: 'limits', icon: Info, label: 'Card Limits', description: 'Manage spending limits' },
    { id: 'details', icon: CreditCard, label: t('cards.viewDetails'), description: 'View card information' },
  ];

  const recentTransactions = [
    { id: 1, merchant: 'Carrefour', amount: 156.75, date: '2024-01-10', category: 'Shopping', status: 'completed' },
    { id: 2, merchant: 'Apple App Store', amount: 32.50, date: '2024-01-09', category: 'Entertainment', status: 'completed' },
    { id: 3, merchant: 'Dubai Metro', amount: 25.00, date: '2024-01-05', category: 'Transport', status: 'completed' },
    { id: 4, merchant: 'Starbucks', amount: 45.75, date: '2024-01-04', category: 'Food', status: 'pending' },
  ];

  const toggleCardVisibility = (cardId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleAddCard = () => {
    // Validate form
    if (!cardForm.cardNumber || !cardForm.expiryMonth || !cardForm.expiryYear || !cardForm.cvv || !cardForm.cardholderName) {
      toast.error('Please fill in all card details');
      return;
    }

    // Simulate API call
    toast.success('Card added successfully!');
    setShowAddCard(false);
    setCardForm({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'inProcess': return 'text-blue-600 bg-blue-50';
      case 'scheduled': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (showAddCard) {
    return (
      <div className="space-y-6 animate-slide-in">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddCard(false)}
            className="p-2 h-auto hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-[#171717]">{t('cards.addNew')}</h1>
        </div>

        {/* Add Card Form */}
        <Card className="border-0 shadow-lg animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#003D31]" />
              <span>Card Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#171717] mb-2 block">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardForm.cardNumber}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                    value = value.replace(/(.{4})/g, '$1 ').trim();
                    if (value.length <= 19) {
                      setCardForm(prev => ({ ...prev, cardNumber: value }));
                    }
                  }}
                  className="h-12 text-lg font-mono"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#171717] mb-2 block">Month</label>
                  <Input
                    placeholder="MM"
                    value={cardForm.expiryMonth}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 2 && parseInt(value) <= 12) {
                        setCardForm(prev => ({ ...prev, expiryMonth: value }));
                      }
                    }}
                    className="h-12 text-center text-lg font-mono"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#171717] mb-2 block">Year</label>
                  <Input
                    placeholder="YYYY"
                    value={cardForm.expiryYear}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 4) {
                        setCardForm(prev => ({ ...prev, expiryYear: value }));
                      }
                    }}
                    className="h-12 text-center text-lg font-mono"
                    maxLength={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#171717] mb-2 block">CVV</label>
                  <Input
                    placeholder="123"
                    type="password"
                    value={cardForm.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 4) {
                        setCardForm(prev => ({ ...prev, cvv: value }));
                      }
                    }}
                    className="h-12 text-center text-lg font-mono"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#171717] mb-2 block">Cardholder Name</label>
                <Input
                  placeholder="Ahmed Al Mansouri"
                  value={cardForm.cardholderName}
                  onChange={(e) => setCardForm(prev => ({ ...prev, cardholderName: e.target.value.toUpperCase() }))}
                  className="h-12 text-lg uppercase"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAddCard(false)}
                className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCard}
                className="flex-1 h-12 bg-[#003D31] hover:bg-[#002822] text-white"
              >
                Add Card
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="border-0 shadow-sm bg-[#FCFFEF]">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#003D31] mt-0.5" />
              <div>
                <h3 className="font-medium text-[#171717] mb-1">Secure & Encrypted</h3>
                <p className="text-sm text-[#918EA4]">Your card information is protected with bank-level encryption and stored securely.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#171717]">My Cards</h1>
        <Button
          onClick={() => setShowAddCard(true)}
          className="bg-[#003D31] hover:bg-[#002822] text-white h-10 rounded-xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {cards.map((card, index) => (
          <div key={card.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
            <Card className={`border-0 shadow-lg bg-gradient-to-br ${card.color} text-white rounded-2xl overflow-hidden`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wide">Card {index + 1}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {card.isPrimary && (
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs px-2 py-1">
                          Primary
                        </Badge>
                      )}
                      <Badge variant="secondary" className={`text-xs px-2 py-1 ${card.isActive ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
                        {card.isActive ? 'Active' : 'Frozen'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <img 
                      src={card.type === 'visa' ? '/placeholder.svg' : '/placeholder.svg'} 
                      alt={card.type}
                      className="w-14 h-auto opacity-90"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-white/70 uppercase tracking-wide">Card Number</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold tracking-wider">
                      {showDetails[card.id] ? card.number : card.maskedNumber}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCardVisibility(card.id.toString())}
                      className="p-1 h-auto text-white/70 hover:text-white hover:bg-white/10"
                    >
                      {showDetails[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wide">Card Holder</p>
                    <p className="text-sm font-semibold">{card.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70 uppercase tracking-wide">Expires</p>
                    <p className="text-sm font-semibold flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {card.expiry}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/20">
                  <p className="text-xs text-white/70 uppercase tracking-wide">Available Balance</p>
                  <p className="text-2xl font-bold">AED {card.balance.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Card Actions */}
            <Card className="border-0 shadow-sm mt-4">
              <CardContent className="p-0">
                {cardActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#F6F7F9] transition-colors group ${
                        i !== cardActions.length - 1 ? 'border-b border-[#F6F7F9]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#F6F7F9] group-hover:bg-[#003D31] rounded-lg flex items-center justify-center transition-colors">
                          <Icon className="w-5 h-5 text-[#003D31] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="font-medium text-[#171717] text-sm group-hover:text-[#003D31] transition-colors">{action.label}</p>
                          <p className="text-xs text-[#918EA4]">{action.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#918EA4] group-hover:text-[#003D31] transition-colors" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#171717]">Recent Transactions</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/transactions')}
            className="text-[#003D31] hover:bg-[#F6F7F9] hover:scale-105 transition-all duration-200"
          >
            View All
          </Button>
        </div>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {recentTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 hover:bg-[#F6F7F9] transition-colors group cursor-pointer ${
                  index !== recentTransactions.length - 1 ? 'border-b border-[#F6F7F9]' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#003D31]/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#003D31]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#171717] group-hover:text-[#003D31] transition-colors">{transaction.merchant}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-[#918EA4]">
                        {transaction.date} • {transaction.category}
                      </p>
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(transaction.status)}`}>
                        {t(`transaction.${transaction.status}`)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-[#171717] group-hover:text-[#003D31] transition-colors">AED {transaction.amount}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardsPage;
