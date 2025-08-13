import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        alert(`Login failed: ${data.message || "Please check your credentials."}`);
        return;
      }

      // ✅ Save both JWT token and user data from ApiResponse's `data` object
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      } else {
        console.warn("Token not found in response:", data);
      }

      if (data.data?.user) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
      } else {
        console.warn("User data not found in response:", data);
      }




      alert("✅ Logged in successfully!");
      setEmail("");
      setPassword("");

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Failed to login. Please check if the server is running and try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    const backendURL =
      window.location.hostname === "localhost"
        ? "http://localhost:5001" 
        : "https://zenyukti.github.io"; 

    window.location.href = `${backendURL}/api/auth/google`;
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0d0d1f] to-[#1a1a2e] text-white px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
        Welcome Back 👋
      </h1>
      <p className="text-lg mb-8 text-gray-400 text-center">
        Log in to your ZenYukti account
      </p>

      <div className="w-full max-w-md space-y-5 bg-[#111827] p-8 rounded-2xl shadow-lg shadow-violet-800/20">
        {/* Email Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <div className="flex items-center bg-[#1f2937] rounded-md px-3 py-2">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <div className="flex items-center bg-[#1f2937] rounded-md px-3 py-2">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex justify-between text-sm text-gray-400">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-purple-600" />
            <span>Remember me</span>
          </label>
          <a href="#" className="hover:text-purple-400">Forgot Password?</a>
        </div>

        {/* Login Button */}
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-800/40 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-700" />
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-700" />
        </div>

        {/* Google Sign-in Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800"
          disabled={loading}
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="w-5 h-5" />
          Sign in with Google
        </Button>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}