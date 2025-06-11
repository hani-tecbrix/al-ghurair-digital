import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Plus, Search, Star, Check, X, RefreshCw, Share, Download, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type SendMoneyStep = 'amount' | 'beneficiary' | 'confirmation';

interface Recipient {
  id: string;
  name: string;
  identifier: string;
  type: 'bank' | 'mobile' | 'iban';
  bank?: string;
  favorite: boolean;
  accountTitle?: string;
  country?: string;
  countryCode?: string;
}

interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
  rate: number;
}

const SendMoneyPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SendMoneyStep>('amount');
  const [amount, setAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  // Mock countries with live rates
  const countries: Country[] = [
    { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸', rate: 0.27 },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', rate: 0.22 },
    { code: 'EU', name: 'European Union', currency: 'EUR', flag: '🇪🇺', rate: 0.25 },
    { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳', rate: 22.58 },
    { code: 'PK', name: 'Pakistan', currency: 'PKR', flag: '🇵🇰', rate: 76.25 },
    { code: 'BD', name: 'Bangladesh', currency: 'BDT', flag: '🇧🇩', rate: 29.12 },
    { code: 'PH', name: 'Philippines', currency: 'PHP', flag: '🇵🇭', rate: 15.34 },
    { code: 'EG', name: 'Egypt', currency: 'EGP', flag: '🇪🇬', rate: 8.45 },
  ];

  const recentRecipients: Recipient[] = [
    { 
      id: '1', 
      name: 'Ahmed Al Mansouri', 
      identifier: 'AE070331234567890123456',
      type: 'iban',
      bank: 'Emirates NBD', 
      favorite: true,
      accountTitle: 'Ahmed Al Mansouri',
      country: 'United States',
      countryCode: 'US'
    },
    { 
      id: '2', 
      name: 'Sara Mohammad', 
      identifier: '+971501234567',
      type: 'mobile',
      bank: 'ADCB Wallet', 
      favorite: false,
      accountTitle: 'Sara Mohammad',
      country: 'India',
      countryCode: 'IN'
    },
    { 
      id: '3', 
      name: 'Omar Hassan', 
      identifier: '1234567890',
      type: 'bank',
      bank: 'ENBD', 
      favorite: true,
      accountTitle: 'Omar Hassan Al Zaabi',
      country: 'Pakistan',
      countryCode: 'PK'
    },
  ];

  const filteredRecipients = recentRecipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.identifier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAmountContinue = () => {
    if (amount && parseFloat(amount) > 0 && selectedCountry) {
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

  const handleCountrySelect = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setIsLoadingRates(true);
      // Simulate live rate fetching
      setTimeout(() => {
        setIsLoadingRates(false);
      }, 1000);
    }
  };

  const getConvertedAmount = () => {
    if (!amount || !selectedCountry) return '0.00';
    return (parseFloat(amount) * selectedCountry.rate).toFixed(2);
  };

  const handleSendMoney = () => {
    // Trigger haptic feedback (vibration)
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
    
    // Show success toast
    toast({
      title: "Transfer Successful!",
      description: `AED ${amount} sent to ${selectedRecipient?.name}`,
      duration: 3000,
    });
    
    // Show receipt modal
    setShowReceiptModal(true);
  };

  const renderAmountStep = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-0 shadow-sm bg-gradient-to-br from-[#FCFFEF] to-white dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-[#918EA4] dark:text-gray-400">International Transfer Amount</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#003D31] dark:text-white">AED</span>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-3xl font-bold border-0 p-0 h-auto shadow-none text-[#003D31] dark:text-white placeholder:text-[#918EA4] dark:placeholder:text-gray-400 bg-transparent focus-visible:ring-0"
              autoFocus
            />
          </div>
          
          {/* Country Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#171717] dark:text-white">Transfer to Country</label>
            <Select onValueChange={handleCountrySelect}>
              <SelectTrigger className="w-full h-12 border-2 border-[#F6F7F9] dark:border-gray-600 focus:border-[#003D31] dark:focus:border-[#F0FF3D] dark:bg-gray-800">
                <SelectValue placeholder="Select destination country" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg z-50">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{country.flag}</span>
                        <div>
                          <p className="font-medium dark:text-white">{country.name}</p>
                          <p className="text-xs text-[#918EA4] dark:text-gray-400">{country.currency}</p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm font-semibold text-[#003D31] dark:text-[#F0FF3D]">
                          {country.rate} {country.currency}
                        </p>
                        <p className="text-xs text-[#918EA4] dark:text-gray-400">per AED</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Live Currency Conversion */}
          {selectedCountry && (
            <div className="bg-gradient-to-r from-[#003D31]/5 to-[#F0FF3D]/20 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 border border-[#F0FF3D]/30 dark:border-gray-500">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-[#003D31] dark:text-[#F0FF3D]" />
                  <span className="text-sm font-medium text-[#003D31] dark:text-white">Live Exchange Rate</span>
                  {isLoadingRates && <RefreshCw className="w-4 h-4 animate-spin text-[#003D31] dark:text-[#F0FF3D]" />}
                </div>
                <Badge variant="secondary" className="bg-[#F0FF3D] text-[#003D31] dark:bg-[#F0FF3D] dark:text-[#003D31]">
                  Live
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#918EA4] dark:text-gray-300">
                  1 AED = {selectedCountry.rate} {selectedCountry.currency}
                </span>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#003D31] dark:text-white">
                    {selectedCountry.currency} {getConvertedAmount()}
                  </p>
                  <p className="text-xs text-[#918EA4] dark:text-gray-400">Recipient will receive</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
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
        disabled={!amount || parseFloat(amount) <= 0 || !selectedCountry}
        className="w-full h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Continue to Beneficiary
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderBeneficiaryStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FCFFEF] rounded-lg p-4 border border-[#F0FF3D]/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#918EA4]">Sending to {selectedCountry?.name}</p>
            <p className="text-xl font-bold text-[#003D31]">
              AED {amount} → {selectedCountry?.currency} {getConvertedAmount()}
            </p>
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
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {recipient.type === 'iban' ? 'IBAN' : recipient.type === 'mobile' ? 'Mobile' : 'Bank Account'}
                          </Badge>
                          {recipient.country && (
                            <Badge variant="secondary" className="text-xs">
                              {recipient.country}
                            </Badge>
                          )}
                        </div>
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
            International Transfer Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-[#F6F7F9]">
            <span className="text-[#918EA4]">You Send</span>
            <span className="font-semibold text-[#171717]">AED {amount}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#F6F7F9]">
            <span className="text-[#918EA4]">Recipient Gets</span>
            <span className="font-semibold text-[#171717]">
              {selectedCountry?.currency} {getConvertedAmount()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#F6F7F9]">
            <span className="text-[#918EA4]">Exchange Rate</span>
            <span className="font-semibold text-[#171717]">
              1 AED = {selectedCountry?.rate} {selectedCountry?.currency}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#F6F7F9]">
            <span className="text-[#918EA4]">Transfer Fee</span>
            <span className="font-semibold text-[#171717]">AED 15.00</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[#918EA4] font-medium">Total Amount</span>
            <span className="font-bold text-[#003D31] text-lg">AED {(parseFloat(amount) + 15).toFixed(2)}</span>
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
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-xs text-[#918EA4] font-mono">{selectedRecipient?.identifier}</p>
                <Badge variant="secondary" className="text-xs">
                  {selectedCountry?.flag} {selectedRecipient?.country}
                </Badge>
              </div>
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
          onClick={handleSendMoney}
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
                ? "bg-[#003D31] dark:bg-[#F0FF3D] text-white dark:text-[#003D31] scale-110" 
                : index < ['amount', 'beneficiary', 'confirmation'].indexOf(step)
                ? "bg-[#F0FF3D] text-[#003D31]"
                : "bg-[#F6F7F9] dark:bg-gray-700 text-[#918EA4] dark:text-gray-400"
            )}>
              {index + 1}
            </div>
            {index < 2 && (
              <div className={cn(
                "w-8 h-0.5 mx-2 transition-all duration-300",
                index < ['amount', 'beneficiary', 'confirmation'].indexOf(step)
                  ? "bg-[#F0FF3D]"
                  : "bg-[#F6F7F9] dark:bg-gray-700"
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
            const recipientWithCountry = {
              ...recipient,
              country: selectedCountry?.name,
              countryCode: selectedCountry?.code
            };
            setSelectedRecipient(recipientWithCountry);
            setShowNewBeneficiary(false);
            setStep('confirmation');
          }}
          selectedCountry={selectedCountry}
        />
      )}

      {showReceiptModal && (
        <ShareableReceiptModal 
          onClose={() => setShowReceiptModal(false)}
          transferData={{
            amount,
            recipient: selectedRecipient,
            country: selectedCountry,
            convertedAmount: getConvertedAmount(),
            transactionId: `TXN${Date.now()}`
          }}
        />
      )}
    </div>
  );
};

// Updated New Beneficiary Modal Component
const NewBeneficiaryModal = ({ 
  onClose, 
  onSave, 
  selectedCountry 
}: { 
  onClose: () => void; 
  onSave: (recipient: Recipient) => void;
  selectedCountry: Country | null;
}) => {
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
      accountTitle: bankDetails.accountTitle,
      country: selectedCountry?.name,
      countryCode: selectedCountry?.code
    };
    onSave(newRecipient);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white animate-scale-in">
        <CardHeader>
          <CardTitle className="text-lg text-[#003D31]">
            Add New Beneficiary in {selectedCountry?.flag} {selectedCountry?.name}
          </CardTitle>
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
              placeholder="Enter beneficiary details"
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

// Enhanced Shareable Receipt Modal Component with Al Ghurair Branding
const ShareableReceiptModal = ({ 
  onClose, 
  transferData 
}: { 
  onClose: () => void; 
  transferData: {
    amount: string;
    recipient: Recipient | null;
    country: Country | null;
    convertedAmount: string;
    transactionId: string;
  };
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Al Ghurair Exchange - Money Transfer Receipt',
          text: `Transfer of AED ${transferData.amount} to ${transferData.recipient?.name} completed successfully via Al Ghurair Exchange.`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      const shareText = `Al Ghurair Exchange - Transfer Receipt\nAmount: AED ${transferData.amount}\nRecipient: ${transferData.recipient?.name}\nTransaction ID: ${transferData.transactionId}\nTransfer via Al Ghurair Exchange`;
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Receipt copied to clipboard",
        description: "You can now paste it anywhere to share",
      });
    }
  };

  const handleDownload = () => {
    // Create a downloadable receipt with Al Ghurair branding
    const receiptContent = `
      AL GHURAIR EXCHANGE
      MONEY TRANSFER RECEIPT
      ======================
      Date: ${currentDate}
      Transaction ID: ${transferData.transactionId}
      
      FROM: Your Account
      TO: ${transferData.recipient?.name}
      COUNTRY: ${transferData.country?.name}
      
      AMOUNT SENT: AED ${transferData.amount}
      AMOUNT RECEIVED: ${transferData.country?.currency} ${transferData.convertedAmount}
      EXCHANGE RATE: 1 AED = ${transferData.country?.rate} ${transferData.country?.currency}
      
      STATUS: COMPLETED
      Transfer via Al Ghurair Exchange
      
      Thank you for choosing Al Ghurair Exchange
      Your trusted money transfer partner
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `al-ghurair-receipt-${transferData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 animate-scale-in">
        <CardHeader className="text-center">
          {/* Al Ghurair Logo */}
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <img 
              src="/lovable-uploads/43e1811d-01e3-492d-ae97-297a3e5efc27.png" 
              alt="Al Ghurair Exchange"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-xl text-[#003D31] dark:text-white">Transfer Successful!</CardTitle>
          <p className="text-sm text-[#918EA4] dark:text-gray-400">{currentDate}</p>
          <p className="text-xs text-[#003D31] dark:text-[#F0FF3D] font-medium mt-2">Transfer via Al Ghurair Exchange</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#FCFFEF] dark:bg-gray-700 rounded-lg p-4 border border-[#F0FF3D]/30 dark:border-gray-600">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-[#003D31] dark:text-white">AED {transferData.amount}</p>
              <p className="text-sm text-[#918EA4] dark:text-gray-400">sent successfully</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#918EA4] dark:text-gray-400">To:</span>
                <span className="font-medium text-[#171717] dark:text-white">{transferData.recipient?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#918EA4] dark:text-gray-400">Country:</span>
                <span className="font-medium text-[#171717] dark:text-white">
                  {transferData.country?.flag} {transferData.country?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#918EA4] dark:text-gray-400">Amount Received:</span>
                <span className="font-medium text-[#171717] dark:text-white">
                  {transferData.country?.currency} {transferData.convertedAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#918EA4] dark:text-gray-400">Transaction ID:</span>
                <span className="font-mono text-xs text-[#171717] dark:text-white">{transferData.transactionId}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1 h-12 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex-1 h-12 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <Button
            onClick={onClose}
            className="w-full h-12 bg-[#003D31] hover:bg-[#002822] dark:bg-[#F0FF3D] dark:hover:bg-[#E0EF2D] text-white dark:text-[#003D31]"
          >
            Done
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoneyPage;
