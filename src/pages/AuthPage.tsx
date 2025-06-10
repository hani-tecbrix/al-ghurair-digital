
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { ArrowLeft, Phone, Shield, Clock } from 'lucide-react';

const AuthPage = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'register'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, sendOTP } = useAuth();
  const { t } = useLanguage();

  const handleSendOTP = async () => {
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }

    setLoading(true);
    const { error } = await sendOTP(phone);
    setLoading(false);

    if (error) {
      if (error.message?.includes('User not found')) {
        setStep('register');
      } else {
        toast.error(error.message || 'Failed to send OTP');
      }
    } else {
      setStep('otp');
      toast.success('OTP sent successfully');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    setLoading(true);
    const { error } = await signIn(phone, otp);
    setLoading(false);

    if (error) {
      toast.error(error.message || 'Invalid OTP');
    }
  };

  const handleRegister = async () => {
    if (!fullName) {
      toast.error('Please enter your full name');
      return;
    }

    setLoading(true);
    const { error } = await signUp(phone, fullName);
    setLoading(false);

    if (error) {
      toast.error(error.message || 'Registration failed');
    } else {
      setStep('otp');
      toast.success('Registration successful! Please verify your phone');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7F9] to-[#FCFFEF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/placeholder.svg" 
            alt="Al Ghurair Exchange" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[#171717] mb-2">
            {t('auth.welcome')}
          </h1>
          <p className="text-[#918EA4]">Secure login with phone verification</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              {step !== 'phone' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setStep('phone')}
                  className="p-0 h-auto"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <CardTitle className="flex-1 text-center">
                {step === 'phone' && 'Sign In'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'register' && 'Create Account'}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'phone' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#171717]">
                    {t('auth.phone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#918EA4]" />
                    <Input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12 border-2 border-[#F6F7F9] focus:border-[#003D31]"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium btn-hover"
                >
                  {loading ? 'Sending...' : t('auth.sendOTP')}
                </Button>

                {/* UAE Pass Option */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#F6F7F9]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#918EA4]">or</span>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  className="w-full h-12 border-2 border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white btn-hover"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Sign in with UAE Pass
                </Button>
              </>
            )}

            {step === 'otp' && (
              <>
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-[#003D31]" />
                  <p className="text-sm text-[#918EA4] mb-4">
                    We've sent a verification code to<br />
                    <span className="font-medium text-[#171717]">{phone}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#171717]">
                    {t('auth.enterOTP')}
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-12 text-center text-2xl font-bold tracking-widest border-2 border-[#F6F7F9] focus:border-[#003D31]"
                    maxLength={6}
                  />
                </div>

                <Button 
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium btn-hover"
                >
                  {loading ? 'Verifying...' : t('auth.verifyOTP')}
                </Button>

                <Button 
                  variant="ghost"
                  onClick={handleSendOTP}
                  className="w-full text-[#003D31] hover:bg-[#F6F7F9]"
                >
                  Resend Code
                </Button>
              </>
            )}

            {step === 'register' && (
              <>
                <div className="text-center mb-4">
                  <p className="text-sm text-[#918EA4]">
                    Looks like you're new here!<br />
                    Let's create your account.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#171717]">
                      {t('auth.fullName')}
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 border-2 border-[#F6F7F9] focus:border-[#003D31]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#171717]">
                      {t('auth.phone')}
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      disabled
                      className="h-12 bg-[#F6F7F9] border-2 border-[#F6F7F9]"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium btn-hover"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-[#003D31] rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-[#918EA4]">Secure</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-[#003D31] rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-[#918EA4]">Fast</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-[#003D31] rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-[#918EA4]">Simple</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
