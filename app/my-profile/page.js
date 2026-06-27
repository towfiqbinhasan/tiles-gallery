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
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="avatar mb-4">
              <div className="w-28 rounded-full ring ring-primary ring-offset-2">
                <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="profile" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary">{user?.displayName || "No Name"}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="divider"></div>
            <div className="w-full grid grid-cols-1 gap-4 text-left">
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-lg">{user?.displayName || "Not set"}</p>
              </div>
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold text-lg">{user?.email}</p>
              </div>
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="font-semibold text-lg">
                  {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Link href="/my-profile/update" className="btn btn-primary w-full text-white mt-4">
              ✏️ Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}