"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@hotel.com" && password === "password") {
      // Set a fake auth cookie (client-side cookie setting for demo purposes)
      document.cookie = "admin_auth_token=fake-jwt-token; path=/; max-age=86400";
      // Force a hard navigation to apply middleware logic properly
      window.location.href = "/admin/dashboard";
    } else {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4 sm:px-0">
      <div className="w-full max-w-md p-6 sm:p-10 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-[#1e293b] mb-2 tracking-wide">Tantor Resort</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">Management Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#faf8f5] border border-gray-200 rounded-md focus:ring-1 focus:ring-[#1e293b] focus:border-[#1e293b] text-[#1e293b] placeholder-gray-400 transition-all outline-none"
              placeholder="admin@hotel.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#faf8f5] border border-gray-200 rounded-md focus:ring-1 focus:ring-[#1e293b] focus:border-[#1e293b] text-[#1e293b] placeholder-gray-400 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-md text-red-600 text-sm text-center animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#1e293b] hover:bg-black text-white font-medium rounded-md shadow-sm transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider text-sm mt-8"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <div className="mt-10 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p className="mb-2 uppercase tracking-wide">Demo Credentials</p>
          <div className="flex justify-center gap-3">
            <span className="bg-[#faf8f5] px-3 py-1.5 rounded-md border border-gray-200 text-gray-600">admin@hotel.com</span>
            <span className="bg-[#faf8f5] px-3 py-1.5 rounded-md border border-gray-200 text-gray-600">password</span>
          </div>
        </div>
      </div>
    </div>
  );
}
