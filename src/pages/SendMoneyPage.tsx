
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Plus, Search, Star, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SendMoneyStep = 'amount' | 'beneficiary' | 'confirmation';

interface Recipient {
  id: string;
  name: string;
  identifier: string;
  type: 'bank' | 'mobile' | 'iban';
  bank?: string;
  favorite: boolean;
  accountTitle?: string;
}

const SendMoneyPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SendMoneyStep>('amount');
  const [amount, setAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);

  const recentRecipients: Recipient[] = [
    { 
      id: '1', 
      name: 'Ahmed Al Mansouri', 
      identifier: 'AE070331234567890123456',
      type: 'iban',
      bank: 'Emirates NBD', 
      favorite: true,
      accountTitle: 'Ahmed Al Mansouri'
    },
    { 
      id: '2', 
      name: 'Sara Mohammad', 
      identifier: '+971501234567',
      type: 'mobile',
      bank: 'ADCB Wallet', 
      favorite: false,
      accountTitle: 'Sara Mohammad'
    },
    { 
      id: '3', 
      name: 'Omar Hassan', 
      identifier: '1234567890',
      type: 'bank',
      bank: 'ENBD', 
      favorite: true,
      accountTitle: 'Omar Hassan Al Zaabi'
    },
  ];

  const filteredRecipients = recentRecipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.identifier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAmountContinue = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep('beneficiary');
    }
  };

  const handleRecipientSelect = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    setStep('confirmation');
  };

  const handleNewBeneficiary = () => {
    setShowNewBeneficiary(true);
  };

  const renderAmountStep = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-0 shadow-sm bg-gradient-to-br from-[#FCFFEF] to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-[#918EA4]">Amount to Send</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#003D31]">AED</span>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-3xl font-bold border-0 p-0 h-auto shadow-none text-[#003D31] placeholder:text-[#918EA4] bg-transparent focus-visible:ring-0"
              autoFocus
            />
          </div>
          <div className="flex items-center space-x-2 mt-6">
            {['100', '250', '500', '1000'].map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => setAmount(preset)}
                className={cn(
                  "text-xs border-[#F6F7F9] text-[#918EA4] hover:bg-[#003D31] hover:text-white hover:border-[#003D31] transition-all duration-200",
                  amount === preset && "bg-[#003D31] text-white border-[#003D31]"
                )}
              >
                {preset}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#F6F7F9] rounded-lg p-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#918EA4]">Available Balance</span>
          <span className="font-semibold text-[#003D31]">AED 25,450.00</span>
        </div>
      </div>

      <Button
        onClick={handleAmountContinue}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderBeneficiaryStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FCFFEF] rounded-lg p-4 border border-[#F0FF3D]/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#918EA4]">Sending Amount</p>
            <p className="text-xl font-bold text-[#003D31]">AED {amount}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep('amount')}
            className="text-[#003D31] hover:bg-[#F0FF3D]/20"
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#918EA4]" />
        <Input
          placeholder="Search by name, phone, or account..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 border-2 border-[#F6F7F9] focus:border-[#003D31] transition-all duration-200"
        />
      </div>

      <Button
        onClick={handleNewBeneficiary}
        variant="outline"
        className="w-full h-12 border-2 border-dashed border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white transition-all duration-200"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Beneficiary
      </Button>

      {filteredRecipients.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[#171717] mb-4">Recent Recipients</h2>
          <div className="space-y-3">
            {filteredRecipients.map((recipient) => (
              <Card
                key={recipient.id}
                className="cursor-pointer transition-all duration-200 border-2 border-[#F6F7F9] hover:border-[#003D31]/30 hover:shadow-md group"
                onClick={() => handleRecipientSelect(recipient)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#003D31] to-[#002822] rounded-full flex items-center justify-center text-white font-semibold">
                        {recipient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-[#171717] group-hover:text-[#003D31] transition-colors">
                            {recipient.name}
                          </p>
                          {recipient.favorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-[#918EA4]">
                          {recipient.bank} • {recipient.identifier.slice(-4).padStart(recipient.identifier.length, '*')}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {recipient.type === 'iban' ? 'IBAN' : recipient.type === 'mobile' ? 'Mobile' : 'Bank Account'}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#918EA4] group-hover:text-[#003D31] transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-0 shadow-sm bg-gradient-to-br from-[#FCFFEF] to-white">
        <CardHeader>
          <CardTitle className="text-lg text-[#003D31] flex items-center">
            <Check className="w-5 h-5 mr-2" />
            Transfer Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-[#F6F7F9]">
            <span className="text-[#918EA4]">Amount</span>
            <span className="font-semibold text-[#171717]">AED {amount}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#F6F7F9]">
            <span className="text-[#918EA4]">Transfer Fee</span>
            <span className="font-semibold text-[#171717]">AED 5.00</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[#918EA4] font-medium">Total Amount</span>
            <span className="font-bold text-[#003D31] text-lg">AED {(parseFloat(amount) + 5).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#003D31] to-[#002822] rounded-full flex items-center justify-center text-white font-semibold">
              {selectedRecipient?.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#171717]">{selectedRecipient?.name}</p>
              <p className="text-sm text-[#918EA4]">{selectedRecipient?.accountTitle}</p>
              <p className="text-sm text-[#918EA4]">{selectedRecipient?.bank}</p>
              <p className="text-xs text-[#918EA4] font-mono">{selectedRecipient?.identifier}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => setStep('beneficiary')}
          className="flex-1 h-12 border-[#F6F7F9] text-[#918EA4] hover:bg-[#F6F7F9]"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          onClick={() => {
            // Handle transfer logic here
            console.log('Processing transfer...');
          }}
          className="flex-1 h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium"
        >
          <Check className="w-4 h-4 mr-2" />
          Send Money
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        {['amount', 'beneficiary', 'confirmation'].map((stepName, index) => (
          <div key={stepName} className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
              step === stepName 
                ? "bg-[#003D31] text-white scale-110" 
                : index < ['amount', 'beneficiary', 'confirmation'].indexOf(step)
                ? "bg-[#F0FF3D] text-[#003D31]"
                : "bg-[#F6F7F9] text-[#918EA4]"
            )}>
              {index + 1}
            </div>
            {index < 2 && (
              <div className={cn(
                "w-8 h-0.5 mx-2 transition-all duration-300",
                index < ['amount', 'beneficiary', 'confirmation'].indexOf(step)
                  ? "bg-[#F0FF3D]"
                  : "bg-[#F6F7F9]"
              )} />
            )}
          </div>
        ))}
      </div>

      {step === 'amount' && renderAmountStep()}
      {step === 'beneficiary' && renderBeneficiaryStep()}
      {step === 'confirmation' && renderConfirmationStep()}

      {showNewBeneficiary && (
        <NewBeneficiaryModal 
          onClose={() => setShowNewBeneficiary(false)}
          onSave={(recipient) => {
            setSelectedRecipient(recipient);
            setShowNewBeneficiary(false);
            setStep('confirmation');
          }}
        />
      )}
    </div>
  );
};

// New Beneficiary Modal Component
const NewBeneficiaryModal = ({ onClose, onSave }: { onClose: () => void; onSave: (recipient: Recipient) => void }) => {
  const [identifier, setIdentifier] = useState('');
  const [detectedType, setDetectedType] = useState<'iban' | 'mobile' | 'bank' | null>(null);
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountTitle: '',
    swiftCode: '',
    branch: '',
    bankAddress: ''
  });
  const [showBankForm, setShowBankForm] = useState(false);

  const detectIdentifierType = (value: string) => {
    // IBAN detection (simplified)
    if (value.match(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/)) {
      setDetectedType('iban');
      // Simulate fetching bank details
      setBankDetails({
        bankName: 'Emirates NBD',
        accountTitle: 'John Doe',
        swiftCode: 'EBILAEAD',
        branch: 'Main Branch',
        bankAddress: 'Dubai, UAE'
      });
    }
    // Mobile number detection
    else if (value.match(/^\+?[0-9]{10,15}$/)) {
      setDetectedType('mobile');
    }
    // Bank account number
    else if (value.match(/^[0-9]{8,20}$/)) {
      setDetectedType('bank');
      setShowBankForm(true);
    }
    else {
      setDetectedType(null);
      setShowBankForm(false);
    }
  };

  const handleSave = () => {
    const newRecipient: Recipient = {
      id: Date.now().toString(),
      name: bankDetails.accountTitle || 'New Beneficiary',
      identifier,
      type: detectedType!,
      bank: bankDetails.bankName,
      favorite: false,
      accountTitle: bankDetails.accountTitle
    };
    onSave(newRecipient);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white animate-scale-in">
        <CardHeader>
          <CardTitle className="text-lg text-[#003D31]">Add New Beneficiary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#171717] block mb-2">
              IBAN, Mobile Number, or Account Number
            </label>
            <Input
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                detectIdentifierType(e.target.value);
              }}
              placeholder="AE070331234567890123456"
              className="w-full"
            />
            {detectedType && (
              <p className="text-xs text-[#003D31] mt-1 font-medium">
                ✓ {detectedType === 'iban' ? 'IBAN' : detectedType === 'mobile' ? 'Mobile Account' : 'Bank Account'} detected
              </p>
            )}
          </div>

          {detectedType === 'iban' && bankDetails.accountTitle && (
            <div className="bg-[#FCFFEF] p-3 rounded-lg border border-[#F0FF3D]/30">
              <p className="text-sm font-medium text-[#003D31]">Account Details Found</p>
              <p className="text-sm text-[#171717]">{bankDetails.accountTitle}</p>
              <p className="text-xs text-[#918EA4]">{bankDetails.bankName}</p>
            </div>
          )}

          {showBankForm && (
            <div className="space-y-3 animate-fade-in">
              <Input
                placeholder="Bank Name"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
              />
              <Input
                placeholder="Account Title"
                value={bankDetails.accountTitle}
                onChange={(e) => setBankDetails({...bankDetails, accountTitle: e.target.value})}
              />
              <Input
                placeholder="SWIFT Code"
                value={bankDetails.swiftCode}
                onChange={(e) => setBankDetails({...bankDetails, swiftCode: e.target.value})}
              />
              <Input
                placeholder="Branch"
                value={bankDetails.branch}
                onChange={(e) => setBankDetails({...bankDetails, branch: e.target.value})}
              />
              <Input
                placeholder="Bank Address"
                value={bankDetails.bankAddress}
                onChange={(e) => setBankDetails({...bankDetails, bankAddress: e.target.value})}
              />
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!detectedType || (showBankForm && !bankDetails.accountTitle)}
              className="flex-1 h-10 bg-[#003D31] hover:bg-[#002822]"
            >
              Save & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoneyPage;
