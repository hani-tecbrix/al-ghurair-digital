
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Globe, Moon, Sun, LogOut, Settings, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#003D31] to-[#002822] dark:from-[#F0FF3D] dark:to-[#E0EF2D] rounded-xl flex items-center justify-center shadow-lg">
            <img 
              src="/lovable-uploads/43e1811d-01e3-492d-ae97-297a3e5efc27.png" 
              alt="Al Ghurair Exchange"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#003D31] dark:text-white">Al Ghurair</h1>
            <p className="text-xs text-[#918EA4] dark:text-gray-400 -mt-1">Exchange</p>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLanguageChange}
            className="h-9 w-9 p-0 rounded-lg hover:bg-[#F6F7F9] dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
          >
            <Badge 
              variant="outline" 
              className="text-xs px-2 py-1 border-[#F0FF3D] text-[#003D31] dark:text-[#F0FF3D] dark:border-[#F0FF3D] bg-[#F0FF3D]/10 dark:bg-[#F0FF3D]/10 hover:bg-[#F0FF3D]/20 dark:hover:bg-[#F0FF3D]/20 transition-colors cursor-pointer"
              onClick={handleLanguageChange}
            >
              {language.toUpperCase()}
            </Badge>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0 rounded-lg hover:bg-[#F6F7F9] dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-[#918EA4] dark:text-gray-400" />
            ) : (
              <Sun className="h-4 w-4 text-[#918EA4] dark:text-gray-400" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/notifications')}
            className="h-9 w-9 p-0 rounded-lg hover:bg-[#F6F7F9] dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 relative"
          >
            <Bell className="h-4 w-4 text-[#918EA4] dark:text-gray-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
          </Button>

          
        </div>
      </div>
    </header>
  );
};

export default Header;
