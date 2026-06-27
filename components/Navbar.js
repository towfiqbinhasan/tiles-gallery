"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧱</span>
          <span className="text-xl font-bold text-primary">TilesGallery</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li><Link href="/" className="font-medium hover:text-primary transition">Home</Link></li>
          <li><Link href="/all-tiles" className="font-medium hover:text-primary transition">All Tiles</Link></li>
          {user && <li><Link href="/my-profile" className="font-medium hover:text-primary transition">My Profile</Link></li>}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full border-2 border-primary"
              />
              <button onClick={handleLogout} className="btn btn-sm btn-error text-white rounded-full px-4">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-sm btn-primary text-white rounded-full px-6">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 flex flex-col gap-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="font-medium hover:text-primary py-2 border-b">🏠 Home</Link>
          <Link href="/all-tiles" onClick={() => setMenuOpen(false)} className="font-medium hover:text-primary py-2 border-b">🖼️ All Tiles</Link>
          {user && (
            <Link href="/my-profile" onClick={() => setMenuOpen(false)} className="font-medium hover:text-primary py-2 border-b">👤 My Profile</Link>
          )}
          {user ? (
            <div className="flex items-center gap-3 pt-2">
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
              <div>
                <p className="font-semibold text-sm">{user.displayName || "User"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="btn btn-sm btn-error text-white ml-auto rounded-full">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="btn btn-primary text-white rounded-full w-full">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}