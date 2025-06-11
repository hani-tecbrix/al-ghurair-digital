
import { createContext, useContext, useState, useEffect } from 'react';

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
    'nav.transactions': 'Transactions',
    'nav.profile': 'Profile',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.send': 'Send',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.retry': 'Retry',
    'common.close': 'Close',
    
    // Auth
    'auth.welcome': 'Welcome to Al Ghurair Exchange',
    'auth.phone': 'Phone Number',
    'auth.fullName': 'Full Name',
    'auth.sendOTP': 'Send OTP',
    'auth.verifyOTP': 'Verify OTP',
    'auth.enterOTP': 'Enter OTP',
    
    // Dashboard
    'dashboard.balance': 'Available Balance',
    'dashboard.quickActions': 'Financial Services',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.sendMoney': 'International Transfer',
    'dashboard.payBills': 'Bill Payment',
    'dashboard.qrPay': 'QR Payment',
    'dashboard.addCard': 'Manage Cards',
    
    // Services
    'services.sendMoney': 'International Transfer',
    'services.payBills': 'Bill Payment',
    'services.qrPay': 'QR Payment',
    'services.manageCards': 'Manage Cards',
    'services.recipients': 'Beneficiaries',
    
    // Profile
    'profile.myProfile': 'My Profile',
    'profile.settings': 'Settings',
    'profile.notifications': 'Notifications',
    'profile.language': 'Language',
    'profile.theme': 'Theme',
    'profile.logout': 'Logout',
    'profile.uaePassVerified': 'UAE Pass Verified',
    'profile.notVerified': 'Not Verified',
    
    // Transactions
    'transaction.completed': 'Completed',
    'transaction.inProcess': 'In Process',
    'transaction.scheduled': 'Scheduled',
    'transaction.failed': 'Failed',
    'transaction.pending': 'Pending',
    
    // Cards
    'cards.addNew': 'Add New Card',
    'cards.freeze': 'Freeze Card',
    'cards.unfreeze': 'Unfreeze Card',
    'cards.setAsDefault': 'Set as Default',
    'cards.viewDetails': 'View Details',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.transactions': 'المعاملات',
    'nav.profile': 'الملف الشخصي',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.continue': 'متابعة',
    'common.send': 'إرسال',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.confirm': 'تأكيد',
    'common.retry': 'إعادة المحاولة',
    'common.close': 'إغلاق',
    
    // Auth
    'auth.welcome': 'مرحباً بك في الغرير للصرافة',
    'auth.phone': 'رقم الهاتف',
    'auth.fullName': 'الاسم الكامل',
    'auth.sendOTP': 'إرسال الرمز',
    'auth.verifyOTP': 'تحقق من الرمز',
    'auth.enterOTP': 'أدخل الرمز',
    
    // Dashboard
    'dashboard.balance': 'الرصيد المتاح',
    'dashboard.quickActions': 'الخدمات المالية',
    'dashboard.recentTransactions': 'المعاملات الأخيرة',
    'dashboard.sendMoney': 'التحويل الدولي',
    'dashboard.payBills': 'دفع الفواتير',
    'dashboard.qrPay': 'الدفع بـ QR',
    'dashboard.addCard': 'إدارة البطاقات',
    
    // Services
    'services.sendMoney': 'التحويل الدولي',
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
    'profile.uaePassVerified': 'تم التحقق بممر الإمارات',
    'profile.notVerified': 'غير محقق',
    
    // Transactions
    'transaction.completed': 'مكتمل',
    'transaction.inProcess': 'قيد المعالجة',
    'transaction.scheduled': 'مجدول',
    'transaction.failed': 'فشل',
    'transaction.pending': 'معلق',
    
    // Cards
    'cards.addNew': 'إضافة بطاقة جديدة',
    'cards.freeze': 'تجميد البطاقة',
    'cards.unfreeze': 'إلغاء تجميد البطاقة',
    'cards.setAsDefault': 'تعيين كافتراضي',
    'cards.viewDetails': 'عرض التفاصيل',
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

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
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
