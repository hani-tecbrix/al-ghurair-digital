
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Receipt, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  Car, 
  Home, 
  Plane,
  GraduationCap,
  Zap,
  Wifi,
  ShoppingCart
} from 'lucide-react';

const ServicesPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      category: 'Money Transfer',
      items: [
        { id: 'send-money', icon: Send, label: 'Send Money', description: 'Transfer to bank accounts', path: '/send-money' },
        { id: 'qr-pay', icon: QrCode, label: 'QR Payment', description: 'Pay with QR code', path: '/qr-pay' },
      ]
    },
    {
      category: 'Bill Payments',
      items: [
        { id: 'utilities', icon: Zap, label: 'Utilities', description: 'DEWA, ADDC, SEWA', path: '/pay-bills' },
        { id: 'telecom', icon: Smartphone, label: 'Telecom', description: 'Etisalat, du, Virgin', path: '/pay-bills' },
        { id: 'internet', icon: Wifi, label: 'Internet', description: 'Home internet bills', path: '/pay-bills' },
        { id: 'education', icon: GraduationCap, label: 'Education', description: 'School & university fees', path: '/pay-bills' },
      ]
    },
    {
      category: 'Cards & Accounts',
      items: [
        { id: 'cards', icon: CreditCard, label: 'My Cards', description: 'Manage your cards', path: '/cards' },
        { id: 'transactions', icon: Receipt, label: 'Transactions', description: 'View transaction history', path: '/transactions' },
      ]
    },
    {
      category: 'Travel & Lifestyle',
      items: [
        { id: 'travel', icon: Plane, label: 'Travel', description: 'Flight & hotel bookings', path: '/services' },
        { id: 'shopping', icon: ShoppingCart, label: 'Shopping', description: 'Online shopping payments', path: '/services' },
        { id: 'insurance', icon: Home, label: 'Insurance', description: 'Health & car insurance', path: '/services' },
        { id: 'automotive', icon: Car, label: 'Automotive', description: 'Car registration & fines', path: '/services' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003D31] to-[#002822] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Services</h1>
        <p className="text-[#F0FF3D] text-sm">Everything you need in one place</p>
      </div>

      {/* Services Categories */}
      {services.map((category) => (
        <div key={category.category}>
          <h2 className="text-lg font-semibold text-[#171717] mb-4">{category.category}</h2>
          <div className="grid grid-cols-2 gap-4">
            {category.items.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 shadow-sm"
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-[#003D31] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-[#171717] text-sm mb-1">{service.label}</h3>
                        <p className="text-xs text-[#918EA4] leading-tight">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Coming Soon */}
      <Card className="border-2 border-dashed border-[#F6F7F9] bg-[#FCFFEF]/50">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-[#F0FF3D] rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-[#003D31]" />
          </div>
          <h3 className="font-semibold text-[#171717] mb-2">More Services Coming Soon</h3>
          <p className="text-sm text-[#918EA4] mb-4">
            We're working on adding more services to make your life easier
          </p>
          <Button variant="outline" className="border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white">
            Get Notified
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPage;
