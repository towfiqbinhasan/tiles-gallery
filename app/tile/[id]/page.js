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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img src={tile.image} alt={tile.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">{tile.title}</h1>
          <div className="flex items-center gap-2">
            <span className="badge badge-primary badge-lg">{tile.category}</span>
            {tile.inStock ? (
              <span className="badge badge-success badge-lg">In Stock</span>
            ) : (
              <span className="badge badge-error badge-lg">Out of Stock</span>
            )}
          </div>
          <p className="text-gray-600 text-lg">{tile.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">Creator</p>
              <p className="font-semibold">{tile.creator}</p>
            </div>
            <div className="bg-base-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">Material</p>
              <p className="font-semibold">{tile.material}</p>
            </div>
            <div className="bg-base-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">Dimensions</p>
              <p className="font-semibold">{tile.dimensions}</p>
            </div>
            <div className="bg-base-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold text-primary text-xl">${tile.price} {tile.currency}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Style Tags:</p>
            <div className="flex gap-2 flex-wrap">
              {tile.tags?.map((tag) => (
                <span key={tag} className="badge badge-outline badge-primary">{tag}</span>
              ))}
            </div>
          </div>
          <button onClick={() => router.back()} className="btn btn-outline btn-primary w-fit mt-4">
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}