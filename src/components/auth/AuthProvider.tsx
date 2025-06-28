
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, validateEmail, validateUserInput } from '@/utils/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Log security events (in production, send to logging service)
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user?.id);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed for user:', session?.user?.id);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      // Validate inputs
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } };
      }

      // Sanitize user data
      const sanitizedUserData = userData ? {
        ...userData,
        full_name: userData.full_name ? sanitizeInput(userData.full_name) : undefined
      } : undefined;

      // Validate additional user data
      if (sanitizedUserData?.full_name) {
        const validation = validateUserInput(sanitizedUserData.full_name, 50);
        if (!validation.isValid) {
          return { error: { message: validation.message } };
        }
      }

      // Use dynamic redirect URL that works for any deployment
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: sanitizedUserData
        }
      });

      // Log signup attempts (in production, log to secure service)
      if (error) {
        console.warn('Signup attempt failed:', { email: email.trim().toLowerCase(), error: error.message });
      } else {
        console.log('Signup successful:', { email: email.trim().toLowerCase() });
      }

      return { error };
    } catch (error) {
      console.error('Signup error:', error);
      return { error: { message: 'An unexpected error occurred during signup' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Validate email format
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      // Log signin attempts (in production, log to secure service)
      if (error) {
        console.warn('Signin attempt failed:', { email: email.trim().toLowerCase(), error: error.message });
      } else {
        console.log('Signin successful:', { email: email.trim().toLowerCase() });
      }

      return { error };
    } catch (error) {
      console.error('Signin error:', error);
      return { error: { message: 'An unexpected error occurred during signin' } };
    }
  };

  const signOut = async () => {
    try {
      const userId = user?.id;
      await supabase.auth.signOut();
      
      // Log signout (in production, log to secure service)
      console.log('User signed out:', userId);
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};
