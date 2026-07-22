"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Gem } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Phase 2: Supabase auth integration
    // For now, redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex bg-cream-50">
      {/* ── Left Panel: Branding ────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden bg-cream-100 px-12 py-10">
        {/* Watermark */}
        <div
          className="absolute bottom-[-40px] left-[-30px] select-none pointer-events-none"
          aria-hidden
        >
          <span className="text-[160px] font-black text-primary/[0.06] tracking-tighter leading-none">
            RAMYAS
          </span>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <Gem className="w-5 h-5 text-gold" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-base font-bold text-primary leading-none">
              Ramyas Jewellers
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-[2.6rem] font-black text-primary leading-[1.15] mb-4">
            Jewellery Savings
            <br />
            Scheme Management
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-sm">
            Manage customer savings with absolute confidence and the precision
            of heritage craftsmanship.
          </p>
        </div>

        {/* Jewellery Image */}
        <div className="relative z-10 rounded-2xl overflow-hidden shadow-card-md max-w-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
            alt="Jewellery collection"
            className="w-full h-[320px] object-cover"
          />
        </div>

        {/* Footer note */}
        <p className="mt-auto pt-8 text-xs text-gray-400">
          © 2024 Ramyas Jeweller. All rights reserved.
        </p>
      </div>

      {/* ── Right Panel: Login Form ─────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white lg:bg-cream-50">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Gem className="w-4 h-4 text-gold" strokeWidth={1.8} />
          </div>
          <span className="text-base font-bold text-primary">Ramyas Jewellers</span>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-card-md p-8 lg:p-9">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500">Sign in to your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@aurelian.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm
                             text-gray-800 placeholder:text-gray-400 bg-white
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                             transition-all duration-150"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-gold-dark hover:text-gold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm
                               text-gray-800 placeholder:text-gray-400 bg-white
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                               transition-all duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                               hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4.5 h-4.5" strokeWidth={1.8} />
                    ) : (
                      <Eye className="w-4.5 h-4.5" strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember device */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary
                               focus:ring-primary/20 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-600">Remember this device</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-3.5
                           bg-primary hover:bg-primary-dark text-white font-semibold
                           rounded-xl transition-all duration-150 shadow-sm hover:shadow-md
                           text-sm mt-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Footer links */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
              <span className="text-xs text-gray-400">Admin assistance?</span>
              <button className="text-xs font-semibold text-gray-700 hover:text-primary transition-colors">
                Contact Support
              </button>
            </div>
          </div>

          {/* Request access */}
          <p className="text-center text-sm text-gray-500 mt-5">
            Don&apos;t have an account?{" "}
            <button className="font-semibold text-gray-800 hover:text-primary transition-colors">
              Request access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
