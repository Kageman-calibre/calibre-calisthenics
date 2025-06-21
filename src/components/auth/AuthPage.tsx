
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell } from 'lucide-react';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, { full_name: fullName });
    
    if (error) {
      toast({
        title: "Sign Up Error", 
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Please check your email to confirm your account.",
      });
    }
    
    setLoading(false);
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
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-gold-burgundy text-black hover:opacity-90 font-bold"
                  disabled={loading}
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
                    minLength={6}
                    required
                  />
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
