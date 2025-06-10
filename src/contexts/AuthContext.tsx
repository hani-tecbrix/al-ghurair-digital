
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // DEMO MODE: Create a demo user for preview purposes
    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@example.com',
      phone: '+971501234567',
      user_metadata: {
        full_name: 'Ahmed Al Mansouri',
        phone: '+971501234567'
      }
    } as User;
    
    const demoSession = {
      access_token: 'demo-token',
      refresh_token: 'demo-refresh',
      user: demoUser
    } as Session;
    
    // Set demo user and session after a short delay to simulate loading
    setTimeout(() => {
      setUser(demoUser);
      setSession(demoSession);
      setLoading(false);
    }, 1000);

    // Comment out the supabase auth listener for demo purposes
    /*
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && session) {
          navigate('/');
        } else if (event === 'SIGNED_OUT') {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Handle initial routing
      if (!session && !location.pathname.includes('/auth') && !location.pathname.includes('/splash')) {
        navigate('/splash');
      }
    });

    return () => subscription.unsubscribe();
    */
   
    // For demo purposes, don't unsubscribe
    return () => {};
  }, []);

  const sendOTP = async (phone: string) => {
    try {
      // Demo mode: Always succeed
      toast.success('Demo mode: OTP sent successfully');
      return { error: null };
      
      /*
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
        options: {
          data: {
            phone: phone
          }
        }
      });
      return { error };
      */
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (phone: string, otp: string) => {
    try {
      // Demo mode: Always succeed with demo user
      toast.success('Demo mode: Sign in successful');
      
      // Navigate to home after "successful" login
      setTimeout(() => {
        navigate('/');
      }, 500);
      
      return { error: null };
      
      /*
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms'
      });
      return { error };
      */
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (phone: string, fullName: string) => {
    try {
      // Demo mode: Always succeed
      toast.success('Demo mode: Sign up successful');
      return { error: null };
      
      /*
      const { error } = await supabase.auth.signUp({
        phone: phone,
        password: Math.random().toString(36).substring(7), // Temporary password
        options: {
          data: {
            phone: phone,
            full_name: fullName
          }
        }
      });
      return { error };
      */
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    // Demo mode: Just navigate to auth page
    toast.success('Demo mode: Signed out successfully');
    navigate('/auth');
    
    /*
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
    */
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
