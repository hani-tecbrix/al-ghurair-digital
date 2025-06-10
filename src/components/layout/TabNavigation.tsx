
import { Home, CreditCard, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const TabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'home',
      label: t('nav.home'),
      icon: Home,
      path: '/'
    },
    {
      id: 'services',
      label: t('nav.services'),
      icon: CreditCard,
      path: '/services'
    },
    {
      id: 'profile',
      label: t('nav.profile'),
      icon: User,
      path: '/profile'
    }
  ];

  const isActiveTab = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F6F7F9] safe-area-bottom">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = isActiveTab(tab.path);
            
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all duration-200",
                  isActive 
                    ? "text-[#003D31] bg-[#F0FF3D]/20" 
                    : "text-[#918EA4] hover:text-[#171717] hover:bg-[#F6F7F9]"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-[#003D31] rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;
