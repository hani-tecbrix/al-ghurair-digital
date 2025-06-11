
import { Bell, Globe, Palette, ArrowLeft } from 'lucide-react';
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
    <header className="bg-white border-b border-[#F6F7F9] safe-area-top sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {!isHomePage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2 h-auto hover:bg-[#F6F7F9] rounded-lg transition-all duration-200"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-[#918EA4]" />
            </Button>
          )}
          
          {isHomePage ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#003D31] to-[#002822] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <span className="font-bold text-[#171717] text-lg">Al Ghurair</span>
            </div>
          ) : (
            <h1 className="text-lg font-semibold text-[#171717] truncate max-w-48">
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
                className="p-2 h-auto hover:bg-[#F6F7F9] rounded-lg transition-all duration-200"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5 text-[#918EA4]" />
                <span className="ml-1 text-xs font-medium text-[#918EA4] uppercase">
                  {language}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 bg-white border border-[#F6F7F9] shadow-lg">
              <DropdownMenuItem 
                onClick={() => setLanguage('en')}
                className={cn("cursor-pointer", language === 'en' && "bg-[#F6F7F9]")}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('ar')}
                className={cn("cursor-pointer", language === 'ar' && "bg-[#F6F7F9]")}
              >
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2 h-auto hover:bg-[#F6F7F9] rounded-lg transition-all duration-200"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <Palette className="w-5 h-5 text-[#918EA4]" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/notifications')}
            className="p-2 h-auto relative hover:bg-[#F6F7F9] rounded-lg transition-all duration-200"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 text-[#918EA4]" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs animate-pulse"
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
    '/transactions': 'Transactions',
    '/notifications': t('profile.notifications'),
    '/profile': t('profile.myProfile'),
    '/services': t('nav.services'),
  };
  
  return titleMap[pathname] || 'Al Ghurair Exchange';
};

export default Header;
