
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (phone: string, otp: string) => Promise<{ error: any }>;
  signUp: (phone: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  sendOTP: (phone: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DEMO MODE: Create a demo user for preview purposes
    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@example.com',
      phone: '+971501234567',
      app_metadata: {},
      user_metadata: {
        full_name: 'Ahmed Al Mansouri',
        phone: '+971501234567'
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      phone_confirmed_at: new Date().toISOString(),
      confirmation_sent_at: new Date().toISOString(),
      recovery_sent_at: new Date().toISOString(),
      email_change_sent_at: new Date().toISOString(),
      new_email: null,
      new_phone: null,
      invited_at: null,
      action_link: null,
      email_change: null,
      phone_change: null,
      role: 'authenticated',
      last_sign_in_at: new Date().toISOString(),
      identities: [],
      factors: [],
      is_anonymous: false
    } as User;
    
    const demoSession = {
      access_token: 'demo-token',
      refresh_token: 'demo-refresh',
      user: demoUser,
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600
    } as Session;
    
    // Set demo user and session after a short delay to simulate loading
    setTimeout(() => {
      setUser(demoUser);
      setSession(demoSession);
      setLoading(false);
    }, 1000);

    // For demo purposes, don't unsubscribe
    return () => {};
  }, []);

  const sendOTP = async (phone: string) => {
    try {
      // Demo mode: Always succeed
      toast.success('Demo mode: OTP sent successfully');
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (phone: string, otp: string) => {
    try {
      // Demo mode: Always succeed with demo user
      toast.success('Demo mode: Sign in successful');
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (phone: string, fullName: string) => {
    try {
      // Demo mode: Always succeed
      toast.success('Demo mode: Sign up successful');
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    // Demo mode: Just show success message
    toast.success('Demo mode: Signed out successfully');
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    sendOTP
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
