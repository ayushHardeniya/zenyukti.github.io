import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, HashRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Domains from "./pages/Join-us";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import CodeOfConduct from "./pages/CodeOfConduct";
import TermsOfService from "./pages/TermsOfService";
import CountdownGate from "./components/Countdown";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AuthCallback from "./auth/callback";
const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5001/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data.user);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <CountdownGate>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/join-us" element={<Domains />} />
              <Route path="/NotFound" element={<NotFound />} />
              <Route path="/community" element={<Community />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/codeofconduct" element={<CodeOfConduct />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/zenyukti.github.io/auth/callback" element={<AuthCallback />} />

            </Routes>
          </CountdownGate>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
