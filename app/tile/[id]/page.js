"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function TileDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    fetch(`/api/tiles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authChecked, user, id, router]);

  if (!authChecked || (user && loading)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!tile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Background */}
      <div className="bg-gradient-to-r from-primary to-purple-600 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="btn btn-sm btn-ghost text-white border-white/30 hover:bg-white/20"
          >
            ← Back to Gallery
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left - Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full h-[450px] object-cover"
              />
            </div>
            {/* Stock Badge */}
            <div className="absolute top-4 left-4">
              {tile.inStock ? (
                <span className="badge badge-success badge-lg font-bold shadow-lg">✅ In Stock</span>
              ) : (
                <span className="badge badge-error badge-lg font-bold shadow-lg">❌ Out of Stock</span>
              )}
            </div>
            {/* Price Badge */}
            <div className="absolute bottom-4 right-4 bg-white rounded-2xl px-4 py-2 shadow-xl">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-black text-primary">${tile.price}</p>
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Title & Category */}
            <div>
              <span className="badge badge-primary badge-lg mb-3 capitalize">{tile.category}</span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
                {tile.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-primary pl-4">
              {tile.description}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">👨‍🎨 Creator</p>
                <p className="font-bold text-gray-800">{tile.creator}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">🪨 Material</p>
                <p className="font-bold text-gray-800">{tile.material}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">📐 Dimensions</p>
                <p className="font-bold text-gray-800">{tile.dimensions}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">💰 Currency</p>
                <p className="font-bold text-gray-800">{tile.currency}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-3">🏷️ Style Tags:</p>
              <div className="flex gap-2 flex-wrap">
                {tile.tags?.map((tag) => (
                  <span key={tag} className="badge badge-outline badge-primary badge-lg px-4 py-3 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap pt-2">
              <button className="btn btn-primary btn-lg flex-1 text-white shadow-lg">
                🛒 Add to Wishlist
              </button>
              <button
                onClick={() => router.back()}
                className="btn btn-outline btn-lg"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}