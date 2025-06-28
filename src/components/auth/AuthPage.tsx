
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Enhanced password validation
const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  return { isValid: true, message: '' };
};

// Enhanced email validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input to prevent basic XSS
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>'"]/g, '');
};

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Rate limiting - lock account after 5 failed attempts for 15 minutes
  const isAccountLocked = lockoutTime && Date.now() < lockoutTime;
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  const validateInputs = (isSignUp: boolean): boolean => {
    const errors: string[] = [];
    
    if (!validateEmail(email)) {
      errors.push('Please enter a valid email address');
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.push(passwordValidation.message);
    }
    
    if (isSignUp && fullName.trim().length < 2) {
      errors.push('Full name must be at least 2 characters long');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleFailedAttempt = () => {
    const newFailedAttempts = failedAttempts + 1;
    setFailedAttempts(newFailedAttempts);
    
    if (newFailedAttempts >= MAX_ATTEMPTS) {
      setLockoutTime(Date.now() + LOCKOUT_DURATION);
      toast({
        title: "Account Temporarily Locked",
        description: "Too many failed attempts. Please try again in 15 minutes.",
        variant: "destructive",
      });
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAccountLocked) {
      toast({
        title: "Account Locked",
        description: "Please wait before trying again.",
        variant: "destructive",
      });
      return;
    }

    if (!validateInputs(false)) {
      return;
    }

    setLoading(true);
    
    const { error } = await signIn(email.trim(), password);
    
    if (error) {
      handleFailedAttempt();
      // Generic error message to prevent information disclosure
      toast({
        title: "Sign In Failed",
        description: "Invalid credentials. Please check your email and password.",
        variant: "destructive",
      });
    } else {
      // Reset failed attempts on successful login
      setFailedAttempts(0);
      setLockoutTime(null);
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs(true)) {
      return;
    }

    setLoading(true);
    
    // Sanitize inputs
    const sanitizedFullName = sanitizeInput(fullName.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    
    const { error } = await signUp(sanitizedEmail, password, { full_name: sanitizedFullName });
    
    if (error) {
      // Handle specific error cases without exposing sensitive information
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.message.includes('already registered')) {
        errorMessage = "An account with this email already exists.";
      } else if (error.message.includes('invalid email')) {
        errorMessage = "Please enter a valid email address.";
      }
      
      toast({
        title: "Registration Error",
        description: errorMessage,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration Successful!",
        description: "Please check your email to confirm your account.",
      });
      // Clear form on successful registration
      setEmail('');
      setPassword('');
      setFullName('');
    }
    
    setLoading(false);
  };

  const getRemainingLockoutTime = (): string => {
    if (!lockoutTime) return '';
    const remaining = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
    return `${remaining} minute${remaining !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen gradient-black-burgundy flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/50 backdrop-blur-lg border-gold/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 gradient-gold-burgundy rounded-full">
              <Dumbbell className="h-8 w-8 text-black" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gold tracking-wider">CALIBRE</CardTitle>
          <CardDescription className="text-white/80">
            Welcome to your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {validationErrors.length > 0 && (
            <Alert className="mb-4 border-red-500/20 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                {validationErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}
          
          {isAccountLocked && (
            <Alert className="mb-4 border-yellow-500/20 bg-yellow-500/10">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-400">
                Account locked. Try again in {getRemainingLockoutTime()}.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-gold/20">
              <TabsTrigger value="signin" className="text-white data-[state=active]:bg-gold data-[state=active]:text-black">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-gold data-[state=active]:text-black">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/30 border-gold/20 text-white focus:border-gold"
                    required
                    autoComplete="email"
                    disabled={isAccountLocked || loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/30 border-gold/20 text-white focus:border-gold"
                    required
                    autoComplete="current-password"
                    disabled={isAccountLocked || loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-gold-burgundy text-black hover:opacity-90 font-bold"
                  disabled={loading || isAccountLocked}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-black/30 border-gold/20 text-white focus:border-gold"
                    required
                    autoComplete="name"
                    disabled={loading}
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-white">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/30 border-gold/20 text-white focus:border-gold"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword" className="text-white">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/30 border-gold/20 text-white focus:border-gold"
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <p className="text-xs text-white/60">
                    Password must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-gold-burgundy text-black hover:opacity-90 font-bold"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
