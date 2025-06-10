
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, User, Search, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SendMoneyPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const recentRecipients = [
    { id: 1, name: 'Ahmed Al Mansouri', bank: 'Emirates NBD', account: '****1234', favorite: true },
    { id: 2, name: 'Sara Mohammad', bank: 'ADCB', account: '****5678', favorite: false },
    { id: 3, name: 'Omar Hassan', bank: 'ENBD', account: '****9012', favorite: true },
    { id: 4, name: 'Fatima Ali', bank: 'FAB', account: '****3456', favorite: false },
  ];

  const filteredRecipients = recentRecipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-xl font-bold text-[#171717]">Send Money</h1>
      </div>

      {/* Amount Input */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-[#918EA4]">Amount to Send</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#171717]">AED</span>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-3xl font-bold border-0 p-0 h-auto shadow-none text-[#171717] placeholder:text-[#918EA4]"
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            {['100', '250', '500', '1000'].map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => setAmount(preset)}
                className="text-xs border-[#F6F7F9] text-[#918EA4] hover:bg-[#003D31] hover:text-white hover:border-[#003D31]"
              >
                {preset}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Recipients */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#918EA4]" />
        <Input
          placeholder="Search recipients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 border-2 border-[#F6F7F9] focus:border-[#003D31]"
        />
      </div>

      {/* Add New Recipient */}
      <Button
        variant="outline"
        className="w-full h-12 border-2 border-dashed border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Recipient
      </Button>

      {/* Recent Recipients */}
      <div>
        <h2 className="text-lg font-semibold text-[#171717] mb-4">Recent Recipients</h2>
        <div className="space-y-3">
          {filteredRecipients.map((recipient) => (
            <Card
              key={recipient.id}
              className={`cursor-pointer transition-all duration-200 border-2 ${
                selectedRecipient?.id === recipient.id
                  ? 'border-[#003D31] bg-[#003D31]/5'
                  : 'border-[#F6F7F9] hover:border-[#003D31]/30'
              }`}
              onClick={() => setSelectedRecipient(recipient)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#F6F7F9] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[#003D31]" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-[#171717]">{recipient.name}</p>
                        {recipient.favorite && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-[#918EA4]">{recipient.bank} • {recipient.account}</p>
                    </div>
                  </div>
                  {selectedRecipient?.id === recipient.id && (
                    <div className="w-6 h-6 bg-[#003D31] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="sticky bottom-20 bg-[#F6F7F9] p-4 -mx-4">
        <Button
          className="w-full h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium"
          disabled={!amount || !selectedRecipient}
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
};

export default SendMoneyPage;
