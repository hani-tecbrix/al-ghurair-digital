
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, CreditCard, Eye, EyeOff, ChevronRight, Info, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardsPage = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const cards = [
    { 
      id: 1, 
      type: 'visa', 
      number: '•••• •••• •••• 1234', 
      expiry: '12/26', 
      name: 'Ahmed Al Mansouri', 
      isPrimary: true,
      color: 'from-blue-600 to-blue-800'
    },
    { 
      id: 2, 
      type: 'mastercard', 
      number: '•••• •••• •••• 5678', 
      expiry: '09/25', 
      name: 'Ahmed Al Mansouri', 
      isPrimary: false,
      color: 'from-green-600 to-green-800'
    },
  ];

  const cardActions = [
    { id: 'freeze', icon: Lock, label: 'Freeze Card', description: 'Temporarily disable card' },
    { id: 'limits', icon: Info, label: 'Card Limits', description: 'Manage spending limits' },
    { id: 'details', icon: CreditCard, label: 'Card Details', description: 'View card information' },
  ];

  const recentTransactions = [
    { id: 1, merchant: 'Carrefour', amount: 156.75, date: '2024-01-10', category: 'Shopping' },
    { id: 2, merchant: 'Apple App Store', amount: 32.50, date: '2024-01-09', category: 'Entertainment' },
    { id: 3, merchant: 'Dubai Metro', amount: 25.00, date: '2024-01-05', category: 'Transport' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="p-2 h-auto"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-[#171717]">My Cards</h1>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {cards.map((card, index) => (
          <div key={card.id} className="relative">
            <Card className={`border-0 shadow-md bg-gradient-to-br ${card.color} text-white rounded-xl`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-white/70">Card {index + 1}</p>
                    {card.isPrimary && (
                      <Badge variant="secondary" className="bg-white/20 text-white text-xs mt-1">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <img 
                      src={card.type === 'visa' ? '/placeholder.svg' : '/placeholder.svg'} 
                      alt={card.type}
                      className="w-12 h-auto"
                    />
                  </div>
                </div>
                
                <div>
                  <p className="text-lg font-medium">{card.number}</p>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/70">Card Holder</p>
                    <p className="text-sm font-medium">{card.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70">Expires</p>
                    <p className="text-sm font-medium">{card.expiry}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Card Actions */}
            <Card className="border-0 shadow-sm mt-3">
              <CardContent className="p-0">
                {cardActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#F6F7F9] transition-colors ${
                        i !== cardActions.length - 1 ? 'border-b border-[#F6F7F9]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#F6F7F9] rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#003D31]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#171717] text-sm">{action.label}</p>
                          <p className="text-xs text-[#918EA4]">{action.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#918EA4]" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Add New Card */}
      <Button
        variant="outline"
        className="w-full h-12 border-2 border-dashed border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Card
      </Button>

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
                <div>
                  <p className="font-medium text-[#171717]">{transaction.merchant}</p>
                  <p className="text-xs text-[#918EA4]">
                    {transaction.date} • {transaction.category}
                  </p>
                </div>
                <p className="font-semibold text-[#171717]">AED {transaction.amount}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardsPage;
