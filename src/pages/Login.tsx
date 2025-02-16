import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        variant: "destructive",
        title: "Invalid password",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      await signUp(email, password);
      toast({
        title: "Account created successfully",
        description: "You can now sign in with your credentials.",
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      let errorMessage = "An error occurred";
      
      if (error instanceof Error) {
        if (error.message.includes("User already registered")) {
          errorMessage = "An account with this email already exists. Please sign in instead.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        variant: "destructive",
        title: "Invalid password",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      await signIn(email, password);
      navigate("/stock-report");
    } catch (error) {
      let errorMessage = "An error occurred";
      
      if (error instanceof Error) {
        errorMessage = "Invalid email or password. Please try again.";
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-aires-navy to-aires-blue">
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl animate-fade-up">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-heading text-center text-aires-navy">
              AIRES
            </CardTitle>
            <CardDescription className="text-center text-aires-gray">
              Enter your credentials to access the investor portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-aires-gray" />
                      <Input
                        type="email"
                        placeholder="Email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-aires-gray" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-aires-navy hover:bg-aires-blue transition-colors duration-300"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-aires-gray" />
                      <Input
                        type="email"
                        placeholder="Email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-aires-gray" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-aires-navy hover:bg-aires-blue transition-colors duration-300"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;