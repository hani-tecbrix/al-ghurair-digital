
import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.profile': 'Profile',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.send': 'Send',
    'common.save': 'Save',
    
    // Auth
    'auth.welcome': 'Welcome to Al Ghurair Exchange',
    'auth.phone': 'Phone Number',
    'auth.fullName': 'Full Name',
    'auth.sendOTP': 'Send OTP',
    'auth.verifyOTP': 'Verify OTP',
    'auth.enterOTP': 'Enter OTP',
    
    // Dashboard
    'dashboard.balance': 'Available Balance',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.sendMoney': 'Send Money',
    'dashboard.payBills': 'Pay Bills',
    'dashboard.qrPay': 'QR Pay',
    'dashboard.addCard': 'Add Card',
    
    // Services
    'services.sendMoney': 'Send Money',
    'services.payBills': 'Pay Bills',
    'services.qrPay': 'QR Pay',
    'services.manageCards': 'Manage Cards',
    'services.recipients': 'Recipients',
    
    // Profile
    'profile.myProfile': 'My Profile',
    'profile.settings': 'Settings',
    'profile.notifications': 'Notifications',
    'profile.language': 'Language',
    'profile.theme': 'Theme',
    'profile.logout': 'Logout',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.profile': 'الملف الشخصي',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.continue': 'متابعة',
    'common.send': 'إرسال',
    'common.save': 'حفظ',
    
    // Auth
    'auth.welcome': 'مرحباً بك في الغرير للصرافة',
    'auth.phone': 'رقم الهاتف',
    'auth.fullName': 'الاسم الكامل',
    'auth.sendOTP': 'إرسال الرمز',
    'auth.verifyOTP': 'تحقق من الرمز',
    'auth.enterOTP': 'أدخل الرمز',
    
    // Dashboard
    'dashboard.balance': 'الرصيد المتاح',
    'dashboard.quickActions': 'إجراءات سريعة',
    'dashboard.recentTransactions': 'المعاملات الأخيرة',
    'dashboard.sendMoney': 'إرسال المال',
    'dashboard.payBills': 'دفع الفواتير',
    'dashboard.qrPay': 'الدفع بـ QR',
    'dashboard.addCard': 'إضافة بطاقة',
    
    // Services
    'services.sendMoney': 'إرسال المال',
    'services.payBills': 'دفع الفواتير',
    'services.qrPay': 'الدفع بـ QR',
    'services.manageCards': 'إدارة البطاقات',
    'services.recipients': 'المستفيدون',
    
    // Profile
    'profile.myProfile': 'ملفي الشخصي',
    'profile.settings': 'الإعدادات',
    'profile.notifications': 'الإشعارات',
    'profile.language': 'اللغة',
    'profile.theme': 'المظهر',
    'profile.logout': 'تسجيل الخروج',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
