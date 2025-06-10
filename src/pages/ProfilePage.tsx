
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  User, 
  Shield, 
  Settings, 
  CreditCard, 
  Bell, 
  Globe, 
  Palette, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const profileInfo = {
    name: user?.user_metadata?.full_name || 'Ahmed Al Mansouri',
    phone: user?.user_metadata?.phone || '+971 50 123 4567',
    email: user?.email || 'ahmed@example.com',
    location: 'Dubai, UAE',
    memberSince: '2023',
    kycStatus: 'verified'
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { id: 'personal', icon: User, label: 'Personal Information', description: 'Update your details' },
        { id: 'security', icon: Shield, label: 'Security & Privacy', description: 'Manage your security settings' },
        { id: 'cards', icon: CreditCard, label: 'Cards & Accounts', description: 'Manage payment methods' },
        { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Configure alerts' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'language', icon: Globe, label: 'Language', description: language === 'en' ? 'English' : 'العربية' },
        { id: 'theme', icon: Palette, label: 'Appearance', description: theme === 'light' ? 'Light Mode' : 'Dark Mode' },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', icon: HelpCircle, label: 'Help & Support', description: '24/7 customer service' },
        { id: 'settings', icon: Settings, label: 'App Settings', description: 'Configure app preferences' },
      ]
    }
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-[#003D31] to-[#002822] text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-[#F0FF3D] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-[#003D31]" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white text-[#003D31] hover:bg-gray-100 p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{profileInfo.name}</h1>
              <p className="text-[#F0FF3D] text-sm mb-2">Member since {profileInfo.memberSince}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-[#F0FF3D] text-[#003D31] text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  KYC Verified
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-[#F0FF3D]" />
              <span>{profileInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-[#F0FF3D]" />
              <span>{profileInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-[#F0FF3D]" />
              <span>{profileInfo.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.title}>
          <h2 className="text-lg font-semibold text-[#171717] mb-4">{section.title}</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === section.items.length - 1;
                
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#F6F7F9] transition-colors ${
                      !isLast ? 'border-b border-[#F6F7F9]' : ''
                    }`}
                    onClick={() => {
                      if (item.id === 'language') {
                        setLanguage(language === 'en' ? 'ar' : 'en');
                      } else if (item.id === 'theme') {
                        toggleTheme();
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#F6F7F9] rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#003D31]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#171717] text-sm">{item.label}</p>
                        <p className="text-xs text-[#918EA4]">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#918EA4]" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Logout Button */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
