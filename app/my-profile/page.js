"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function MyProfilePage() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
      if (!currentUser) {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 h-48 relative">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600')`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-black text-white opacity-30 tracking-widest">MY PROFILE</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-20 pb-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Profile Header */}
          <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-gray-100">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-400 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            <h2 className="text-2xl font-black text-gray-800">{user?.displayName || "No Name"}</h2>
            <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
            <div className="badge badge-primary badge-lg mt-3 font-semibold">✨ Premium Member</div>
          </div>

          {/* Info Section */}
          <div className="p-6 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Information</h3>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-primary/5 transition">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">👤</div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">Full Name</p>
                <p className="font-bold text-gray-800">{user?.displayName || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-primary/5 transition">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">📧</div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">Email Address</p>
                <p className="font-bold text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-primary/5 transition">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">📅</div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">Account Created</p>
                <p className="font-bold text-gray-800">
                  {new Date(user?.metadata?.creationTime).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-primary/5 transition">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-xl">🔐</div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">Last Sign In</p>
                <p className="font-bold text-gray-800">
                  {new Date(user?.metadata?.lastSignInTime).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-8 space-y-3">
            <Link
              href="/my-profile/update"
              className="btn btn-primary w-full text-white shadow-lg text-base"
            >
              ✏️ Update Profile
            </Link>
            <Link
              href="/all-tiles"
              className="btn btn-outline w-full text-base"
            >
              🧱 Browse Tiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}