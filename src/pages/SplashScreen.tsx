
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          navigate('/');
        } else {
          navigate('/auth');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003D31] to-[#002822] flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#F0FF3D] animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-[#F0FF3D] animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/2 w-16 h-16 rounded-full bg-[#F0FF3D] animate-pulse delay-700"></div>
      </div>
      
      {/* Logo and Branding */}
      <div className="text-center z-10">
        <div className="mb-8 animate-slide-down">
          <img 
            src="/placeholder.svg" 
            alt="Al Ghurair Exchange Logo" 
            className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl"
          />
          <h1 className="text-white text-3xl font-bold mb-2">Al Ghurair</h1>
          <p className="text-[#F0FF3D] text-lg font-medium">Exchange</p>
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2 animate-slide-up">
          <div className="w-2 h-2 bg-[#F0FF3D] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#F0FF3D] rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-[#F0FF3D] rounded-full animate-pulse delay-200"></div>
        </div>
        
        <p className="text-white/70 text-sm mt-4">Secure • Fast • Reliable</p>
      </div>
    </div>
  );
};

export default SplashScreen;
