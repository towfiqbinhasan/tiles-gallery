"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back! 🎉");
      router.push("/");
    } catch (error) {
      toast.error("Invalid email or password!");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome! 🎉");
      router.push("/");
    } catch (error) {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-purple-900/80"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="text-5xl mb-4">🧱</div>
          <h1 className="text-4xl font-black mb-4 leading-tight">
            Welcome to<br />
            <span className="text-yellow-400">TilesGallery</span>
          </h1>
          <p className="text-lg opacity-80 mb-8">
            Discover premium tiles for your perfect space. Login to explore our exclusive collection.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">✓</div>
              <p className="opacity-90">20+ Premium Tile Collections</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">✓</div>
              <p className="opacity-90">Exclusive Member Discounts</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">✓</div>
              <p className="opacity-90">Free Design Consultation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-4xl">🧱</span>
            <h2 className="text-2xl font-black text-primary mt-2">TilesGallery</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-400">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-xl">📧</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Email Address</p>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-transparent font-medium text-gray-800 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-xl">🔐</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent font-medium text-gray-800 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-primary"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-white text-base shadow-lg h-14"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "🚀 Login to Account"
                )}
              </button>
            </form>

            <div className="divider text-gray-300 text-sm my-6">OR CONTINUE WITH</div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full h-14 gap-3 text-base hover:bg-gray-50 border-gray-200"
            >
              <img src="https://www.google.com/favicon.ico" alt="google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-center mt-6 text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}