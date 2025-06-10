
import { Bell, Globe, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-[#F6F7F9] safe-area-top">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img 
            src="/placeholder.svg" 
            alt="Al Ghurair" 
            className="w-8 h-8"
          />
          <span className="font-bold text-[#171717] text-lg">Al Ghurair</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="p-2 h-auto"
          >
            <Globe className="w-5 h-5 text-[#918EA4]" />
            <span className="ml-1 text-xs font-medium text-[#918EA4] uppercase">
              {language}
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2 h-auto"
          >
            <Palette className="w-5 h-5 text-[#918EA4]" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/notifications')}
            className="p-2 h-auto relative"
          >
            <Bell className="w-5 h-5 text-[#918EA4]" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
