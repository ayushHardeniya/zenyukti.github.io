import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Discord, Github, Cross } from "./icons";
const API_BASE_URL = "http://localhost:5001";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [photo,setPhoto] = useState("");
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Community", href: "/community" },
    { name: "Join Us", href: "/join-us" },
    { name: "Contact", href: "/contact" },
  ];

  // Function to verify token and get current user
  // Update the verifyTokenAndGetUser function in Header.tsx
// Change the API endpoint from /api/v1/users/me to /api/auth/me

const verifyTokenAndGetUser = async () => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setPhoto("");
      setLoading(false);
      console.log("No Token in localstorage.")
      return;
    }

    // Make API call to get current user with Authorization header
    // CHANGED: from /api/v1/users/me to /api/auth/me
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User data received:", data); // Debug log
      setIsLoggedIn(true);
      setUser(data.data.user);
      
    } else {
      console.error("Token verification failed:", response.status, response.statusText);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
 
  } finally {
    setLoading(false);
  }
};

  // Re-verify when component mounts or location changes (for auth callback)
  useEffect(() => {
    verifyTokenAndGetUser();
  }, [location.pathname]);

  // Also listen for storage changes (if token is set in another tab)
  useEffect(() => {
    const handleStorageChange = (e: { key: string; }) => {
      if (e.key === 'token') {
        verifyTokenAndGetUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);

    navigate("/login");
  };

  if (loading) {
    return (
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D0BAQHGv2tcJ0RJ3w/company-logo_200_200/B4DZe1rfTUH4AM-/0/1751099766431/zenyukti_logo"
                  alt="zenyukti_logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                ZenYukti
              </span>
            </Link>
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D0BAQHGv2tcJ0RJ3w/company-logo_200_200/B4DZe1rfTUH4AM-/0/1751099766431/zenyukti_logo"
                alt="zenyukti_logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              ZenYukti
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <a
                href="https://discord.gg/HuBa9r33kW"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Discord className="w-4 h-4 mr-2" /> Discord
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-neon-green hover:bg-neon-green/90 shadow-neon"
            >
              <a
                href="https://github.com/ZenYukti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.photo || "/assets/avatar.webp"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-primary cursor-pointer hover:border-primary/80 transition-colors"
                    title={user?.displayName || user?.email || "User"}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/assets/avatar.webp";
                    }}
                  />
                  <span className="text-sm text-foreground font-medium">
                    Hello! {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:bg-red-500 hover:text-white border-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="bg-neon-green hover:bg-neon-green/90 shadow-neon"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <Cross className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-border">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={user?.photo || "/assets/avatar.webp"}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border-2 border-primary"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/avatar.webp";
                      }}
                    />
                    <span className="text-sm text-foreground font-medium">
                      {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:bg-red-500 hover:text-white border-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-neon-green hover:bg-neon-green/90"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;