
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
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7F9] via-[#FCFFEF] to-[#F0FF3D]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-xl flex items-center justify-center">
            <img 
              src="/lovable-uploads/43e1811d-01e3-492d-ae97-297a3e5efc27.png" 
              alt="Al Ghurair Exchange"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#171717] mb-2 tracking-tight">
            {t('auth.welcome')}
          </h1>
          <p className="text-[#918EA4] text-lg">Secure login with phone verification</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md animate-scale-in">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              {step !== 'phone' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setStep('phone')}
                  className="p-0 h-auto hover:scale-105 transition-transform"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <CardTitle className="flex-1 text-center text-xl">
                {step === 'phone' && 'Sign In'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'register' && 'Create Account'}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'phone' && (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-[#171717]">
                    {t('auth.phone')}
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#918EA4] group-focus-within:text-[#003D31] transition-colors" />
                    <Input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-14 border-2 border-[#F6F7F9] focus:border-[#003D31] text-lg rounded-xl transition-all duration-200 hover:border-[#003D31]/50"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-[#003D31] to-[#002822] hover:from-[#002822] hover:to-[#001A15] text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    t('auth.sendOTP')
                  )}
                </Button>

                {/* UAE Pass Option */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#F6F7F9]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-[#918EA4] font-medium">or</span>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  className="w-full h-14 border-2 border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Shield className="w-6 h-6 mr-3" />
                  Sign in with UAE Pass
                </Button>
              </>
            )}

            {step === 'otp' && (
              <>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#003D31]/10 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-[#003D31] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#171717] mb-2">Check your phone</h3>
                    <p className="text-sm text-[#918EA4] mb-4">
                      We've sent a verification code to<br />
                      <span className="font-semibold text-[#171717] text-base">{phone}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-[#171717]">
                    {t('auth.enterOTP')}
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-14 text-center text-2xl font-bold tracking-widest border-2 border-[#F6F7F9] focus:border-[#003D31] rounded-xl transition-all duration-200"
                    maxLength={6}
                  />
                </div>

                <Button 
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-[#003D31] to-[#002822] hover:from-[#002822] hover:to-[#001A15] text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    t('auth.verifyOTP')
                  )}
                </Button>

                <Button 
                  variant="ghost"
                  onClick={handleSendOTP}
                  className="w-full text-[#003D31] hover:bg-[#F6F7F9] h-12 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Resend Code
                </Button>
              </>
            )}

            {step === 'register' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#003D31] to-[#002822] rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#171717] mb-2">Welcome to Al Ghurair!</h3>
                  <p className="text-sm text-[#918EA4]">
                    Let's create your account to get started.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#171717]">
                      {t('auth.fullName')}
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-14 border-2 border-[#F6F7F9] focus:border-[#003D31] text-lg rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#171717]">
                      {t('auth.phone')}
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      disabled
                      className="h-14 bg-[#F6F7F9] border-2 border-[#F6F7F9] text-lg rounded-xl"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-[#003D31] to-[#002822] hover:from-[#002822] hover:to-[#001A15] text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-slide-up">
          <div className="space-y-3 group">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#003D31] to-[#002822] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-[#918EA4] font-medium">Bank-level Security</p>
          </div>
          <div className="space-y-3 group">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#003D31] to-[#002822] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-[#918EA4] font-medium">Instant Transfer</p>
          </div>
          <div className="space-y-3 group">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#003D31] to-[#002822] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-[#918EA4] font-medium">Easy Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
