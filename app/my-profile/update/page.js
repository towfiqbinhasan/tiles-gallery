"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      if (newPassword && currentPassword) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
        toast.success("Profile and password updated!");
      } else {
        toast.success("Profile updated successfully!");
      }

      router.push("/my-profile");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Current password is wrong!");
      } else {
        toast.error("Update failed! " + error.message);
      }
    }
    setLoading(false);
  };

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
          <h1 className="text-3xl font-black text-white opacity-30 tracking-widest">UPDATE PROFILE</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-20 pb-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-gray-100">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-xl font-black text-gray-800">Edit Your Profile</h2>
            <p className="text-gray-400 text-sm mt-1">Update your information below</p>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="p-6 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Basic Info</h3>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">👤</div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-semibold mb-1">Full Name</p>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-transparent font-bold text-gray-800 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">🖼️</div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-semibold mb-1">Photo URL</p>
                <input
                  type="url"
                  placeholder="Enter photo URL"
                  className="w-full bg-transparent font-bold text-gray-800 outline-none"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
            </div>

            <div className="divider text-xs text-gray-400">Change Password (Optional)</div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-xl">🔐</div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-semibold mb-1">Current Password</p>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full bg-transparent font-bold text-gray-800 outline-none"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🔑</div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-semibold mb-1">New Password</p>
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  className="w-full bg-transparent font-bold text-gray-800 outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="btn btn-primary w-full text-white shadow-lg text-base"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "✅ Update Information"
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-outline w-full text-base"
              >
                ← Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}