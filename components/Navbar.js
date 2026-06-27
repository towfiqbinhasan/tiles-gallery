"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="navbar-start">
        <Link href="/" className="text-2xl font-bold text-primary">
          🧱 TilesGallery
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link href="/" className="font-medium">Home</Link></li>
          <li><Link href="/all-tiles" className="font-medium">All Tiles</Link></li>
          {user && <li><Link href="/my-profile" className="font-medium">My Profile</Link></li>}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="profile"
              className="w-9 h-9 rounded-full border-2 border-primary"
            />
            <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-sm btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}