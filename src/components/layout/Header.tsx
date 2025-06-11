
import { Bell, Globe, Moon, Sun, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const pageTitle = getPageTitle(location.pathname, t);

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 border-b border-[#F6F7F9] dark:border-gray-700 safe-area-top sticky top-0 z-50 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {!isHomePage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2 h-auto hover:bg-[#F6F7F9] dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-[#918EA4] dark:text-gray-300" />
            </Button>
          )}
          
          {isHomePage ? (
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-[#003D31] to-[#002822] rounded-lg flex items-center justify-center shadow-lg">
                <img 
                  src="/lovable-uploads/43e1811d-01e3-492d-ae97-297a3e5efc27.png" 
                  alt="Al Ghurair Exchange"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-[#171717] dark:text-white text-lg">Al Ghurair</span>
                <p className="text-xs text-[#918EA4] dark:text-gray-300 -mt-1">Exchange</p>
              </div>
            </div>
          ) : (
            <h1 className="text-lg font-semibold text-[#171717] dark:text-white truncate max-w-48 animate-slide-in">
              {pageTitle}
            </h1>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1">
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-[#F6F7F9] dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 group"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5 text-[#918EA4] dark:text-gray-300 group-hover:text-[#003D31] dark:group-hover:text-white transition-colors" />
                <span className="ml-1 text-xs font-medium text-[#918EA4] dark:text-gray-300 uppercase group-hover:text-[#003D31] dark:group-hover:text-white transition-colors">
                  {language}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-gray-800 border border-[#F6F7F9] dark:border-gray-600 shadow-xl animate-scale-in">
              <DropdownMenuItem 
                onClick={() => setLanguage('en')}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-[#F6F7F9] dark:hover:bg-gray-700",
                  language === 'en' && "bg-[#F6F7F9] dark:bg-gray-700 text-[#003D31] dark:text-white font-medium"
                )}
              >
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('ar')}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-[#F6F7F9] dark:hover:bg-gray-700",
                  language === 'ar' && "bg-[#F6F7F9] dark:bg-gray-700 text-[#003D31] dark:text-white font-medium"
                )}
              >
                🇦🇪 العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2 h-auto hover:bg-[#F6F7F9] dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 group"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-[#918EA4] dark:text-gray-300 group-hover:text-[#003D31] dark:group-hover:text-white transition-all duration-300" />
            ) : (
              <Sun className="w-5 h-5 text-[#918EA4] dark:text-gray-300 group-hover:text-yellow-500 transition-all duration-300" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/notifications')}
            className="p-2 h-auto relative hover:bg-[#F6F7F9] dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 group"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 text-[#918EA4] dark:text-gray-300 group-hover:text-[#003D31] dark:group-hover:text-white transition-colors" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs animate-pulse bg-red-500 hover:bg-red-600"
            >
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
};

// Helper function to get page titles
const getPageTitle = (pathname: string, t: any): string => {
  const titleMap: Record<string, string> = {
    '/send-money': t('services.sendMoney'),
    '/pay-bills': t('services.payBills'),
    '/qr-pay': t('services.qrPay'),
    '/cards': t('services.manageCards'),
    '/transactions': t('nav.transactions'),
    '/notifications': t('profile.notifications'),
    '/profile': t('profile.myProfile'),
    '/services': t('nav.services'),
  };
  
  return titleMap[pathname] || 'Al Ghurair Exchange';
};

export default Header;
