
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, ArrowUpRight, ArrowDownRight, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransactionsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample transaction data
  const transactions = [
    { 
      id: 1, 
      type: 'send', 
      amount: -1000, 
      description: 'Rent Payment', 
      recipient: 'Mohammed Ahmed', 
      date: '2024-01-12', 
      status: 'completed' 
    },
    { 
      id: 2, 
      type: 'receive', 
      amount: 5200, 
      description: 'Salary Deposit', 
      recipient: 'Emirates NBD', 
      date: '2024-01-08', 
      status: 'completed' 
    },
    { 
      id: 3, 
      type: 'bill', 
      amount: -250, 
      description: 'DEWA Bill Payment', 
      recipient: 'DEWA', 
      date: '2024-01-07', 
      status: 'completed' 
    },
    { 
      id: 4, 
      type: 'send', 
      amount: -500, 
      description: 'Family Support', 
      recipient: 'Sara Mohammad', 
      date: '2024-01-05', 
      status: 'completed' 
    },
    { 
      id: 5, 
      type: 'bill', 
      amount: -189, 
      description: 'Etisalat Bill Payment', 
      recipient: 'Etisalat', 
      date: '2024-01-03', 
      status: 'completed' 
    },
    { 
      id: 6, 
      type: 'send', 
      amount: -350, 
      description: 'Grocery Money', 
      recipient: 'Omar Hassan', 
      date: '2023-12-28', 
      status: 'completed' 
    },
    { 
      id: 7, 
      type: 'receive', 
      amount: 1200, 
      description: 'Refund', 
      recipient: 'Jumeirah Group', 
      date: '2023-12-26', 
      status: 'completed' 
    },
  ];

  const filteredTransactions = transactions.filter(
    transaction => 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-xl font-bold text-[#171717]">Transactions</h1>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#918EA4]" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 border-2 border-[#F6F7F9] focus:border-[#003D31]"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilterOpen(!filterOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 h-auto"
        >
          <Filter className="w-5 h-5 text-[#918EA4]" />
        </Button>
      </div>

      {/* Filter Options */}
      {filterOpen && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="cursor-pointer bg-[#003D31] hover:bg-[#002822]">All</Badge>
              <Badge className="cursor-pointer bg-[#F6F7F9] text-[#918EA4] hover:bg-[#003D31] hover:text-white">Send Money</Badge>
              <Badge className="cursor-pointer bg-[#F6F7F9] text-[#918EA4] hover:bg-[#003D31] hover:text-white">Receive Money</Badge>
              <Badge className="cursor-pointer bg-[#F6F7F9] text-[#918EA4] hover:bg-[#003D31] hover:text-white">Bill Payments</Badge>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" className="text-xs border-[#F6F7F9] text-[#918EA4]">
                Reset
              </Button>
              <Button size="sm" className="text-xs bg-[#003D31] hover:bg-[#002822] text-white">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions List */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#F6F7F9] transition-colors ${
                  index !== filteredTransactions.length - 1 ? 'border-b border-[#F6F7F9]' : ''
                }`}
                onClick={() => navigate(`/transactions/${transaction.id}`)}
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
                    <p className="font-medium text-[#171717] text-sm">{transaction.description}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-[#918EA4]">{transaction.recipient}</p>
                      <div className="w-1 h-1 bg-[#918EA4] rounded-full"></div>
                      <p className="text-xs text-[#918EA4]">{transaction.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-[#171717]'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}AED {Math.abs(transaction.amount)}
                  </p>
                  <Badge variant="outline" className="text-xs font-normal border-[#F6F7F9] text-[#918EA4]">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-[#918EA4]">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Month Dividers */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#F6F7F9]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#F6F7F9] text-[#918EA4]">December 2023</span>
        </div>
      </div>

      {/* More Transactions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {/* Additional older transactions would be shown here */}
          <div className="p-8 text-center">
            <Button 
              variant="outline" 
              className="border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white"
            >
              Load More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
