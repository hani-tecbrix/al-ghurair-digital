
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
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#F6F7F9] safe-area-bottom z-40"
      role="navigation"
      aria-label="Main navigation"
    >
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
                  "flex flex-col items-center justify-center space-y-1 p-3 rounded-xl transition-all duration-300 min-w-[60px] relative group",
                  "focus:outline-none focus:ring-2 focus:ring-[#003D31] focus:ring-offset-2",
                  isActive 
                    ? "text-[#003D31] bg-[#F0FF3D]/20 scale-110" 
                    : "text-[#918EA4] hover:text-[#171717] hover:bg-[#F6F7F9] hover:scale-105"
                )}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive && "scale-110",
                  !isActive && "group-hover:scale-105"
                )} />
                <span className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isActive && "font-semibold"
                )}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-[#003D31] rounded-full animate-scale-in"></div>
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
