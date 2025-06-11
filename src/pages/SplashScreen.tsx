
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
    }, 2500);

    return () => clearTimeout(timer);
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003D31] via-[#002822] to-[#001A15] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#F0FF3D] animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-[#F0FF3D] animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/2 w-16 h-16 rounded-full bg-[#F0FF3D] animate-pulse delay-700"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F0FF3D]/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Logo and Branding */}
      <div className="text-center z-10 animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <div className="w-32 h-32 mx-auto mb-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/43e1811d-01e3-492d-ae97-297a3e5efc27.png" 
              alt="Al Ghurair Exchange Logo" 
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-white dark:text-gray-100 text-4xl font-bold mb-3 tracking-tight">Al Ghurair</h1>
          <p className="text-[#F0FF3D] dark:text-[#F0FF3D] text-xl font-semibold tracking-wide">Exchange</p>
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2 animate-slide-up mb-6">
          <div className="w-3 h-3 bg-[#F0FF3D] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#F0FF3D] rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-[#F0FF3D] rounded-full animate-bounce delay-200"></div>
        </div>
        
        <div className="space-y-2 text-white/80 dark:text-gray-300">
          <p className="text-base font-medium">Secure • Fast • Reliable</p>
          <p className="text-sm">Your trusted money exchange partner</p>
        </div>
      </div>
      
      {/* Bottom branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/60 dark:text-gray-400 text-sm">Powered by cutting-edge technology</p>
      </div>
    </div>
  );
};

export default SplashScreen;
