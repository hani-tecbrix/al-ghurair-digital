
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Zap, Smartphone, Wifi, GraduationCap, Car, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PayBillsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');

  const billCategories = [
    { id: 'utilities', icon: Zap, label: 'Utilities', description: 'DEWA, ADDC, SEWA', color: 'bg-yellow-500' },
    { id: 'telecom', icon: Smartphone, label: 'Telecom', description: 'Etisalat, du, Virgin', color: 'bg-blue-500' },
    { id: 'internet', icon: Wifi, label: 'Internet', description: 'Home internet bills', color: 'bg-purple-500' },
    { id: 'education', icon: GraduationCap, label: 'Education', description: 'School & university fees', color: 'bg-green-500' },
    { id: 'automotive', icon: Car, label: 'Automotive', description: 'Car registration & fines', color: 'bg-red-500' },
    { id: 'insurance', icon: Home, label: 'Insurance', description: 'Health & car insurance', color: 'bg-indigo-500' },
  ];

  const recentBills = [
    { id: 1, provider: 'DEWA', account: '123456789', amount: 245.50, dueDate: '2024-01-15' },
    { id: 2, provider: 'Etisalat', account: '987654321', amount: 189.00, dueDate: '2024-01-18' },
    { id: 3, provider: 'ADDC', account: '456789123', amount: 167.25, dueDate: '2024-01-20' },
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
        <h1 className="text-xl font-bold text-[#171717]">Pay Bills</h1>
      </div>

      {/* Bill Categories */}
      <div>
        <h2 className="text-lg font-semibold text-[#171717] mb-4">Select Category</h2>
        <div className="grid grid-cols-2 gap-4">
          {billCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  selectedCategory?.id === category.id
                    ? 'border-[#003D31] bg-[#003D31]/5'
                    : 'border-[#F6F7F9] hover:border-[#003D31]/30'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-[#171717] text-sm mb-1">{category.label}</h3>
                      <p className="text-xs text-[#918EA4] leading-tight">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Account Number Input */}
      {selectedCategory && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-[#918EA4]">Account Number</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Input
              placeholder="Enter your account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="h-12 border-2 border-[#F6F7F9] focus:border-[#003D31]"
            />
            <p className="text-xs text-[#918EA4] mt-2">
              Enter the account number as shown on your bill
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Bills */}
      <div>
        <h2 className="text-lg font-semibold text-[#171717] mb-4">Recent Bills</h2>
        <div className="space-y-3">
          {recentBills.map((bill) => (
            <Card key={bill.id} className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#171717]">{bill.provider}</h3>
                    <p className="text-sm text-[#918EA4]">Account: {bill.account}</p>
                    <p className="text-xs text-[#918EA4]">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#171717]">AED {bill.amount}</p>
                    <Button size="sm" className="mt-2 bg-[#003D31] hover:bg-[#002822] text-white">
                      Pay Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {selectedCategory && accountNumber && (
        <div className="sticky bottom-20 bg-[#F6F7F9] p-4 -mx-4">
          <Button className="w-full h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium">
            Get Bill Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default PayBillsPage;
