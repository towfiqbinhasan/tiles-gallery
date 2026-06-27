"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TileCard from "@/components/TileCard";

export default function Home() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tiles")
      .then((res) => res.json())
      .then((data) => {
        const tilesArray = Array.isArray(data) ? data : data.tiles || [];
        setTiles(tilesArray.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="hero min-h-[600px] relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        <div className="hero-content text-center text-white relative z-10">
          <div className="max-w-3xl">
            <div className="badge badge-warning badge-lg mb-4 font-semibold">✨ Premium Collection</div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Discover Your
              <span className="block text-yellow-400">Perfect Aesthetic</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-xl mx-auto">
              Explore our premium collection of tiles crafted for every style and space.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/all-tiles" className="btn btn-warning btn-lg font-bold shadow-xl">
                🧱 Browse Now
              </Link>
              <Link href="/register" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-primary text-white py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-black">20+</p>
            <p className="text-sm opacity-80">Premium Tiles</p>
          </div>
          <div>
            <p className="text-3xl font-black">8</p>
            <p className="text-sm opacity-80">Categories</p>
          </div>
          <div>
            <p className="text-3xl font-black">100%</p>
            <p className="text-sm opacity-80">Quality</p>
          </div>
          <div>
            <p className="text-3xl font-black">Free</p>
            <p className="text-sm opacity-80">Shipping</p>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-yellow-400 text-black py-3 overflow-hidden font-semibold">
        <div className="animate-marquee whitespace-nowrap">
          ✨ New Arrivals: Ceramic Blue Tile &nbsp;|&nbsp;
          🏆 Weekly Feature: Modern Geometric Patterns &nbsp;|&nbsp;
          🌟 Join the Community &nbsp;|&nbsp;
          🎨 Premium Marble Collection &nbsp;|&nbsp;
          🔥 Hot Deal: Rustic Wood Tiles &nbsp;|&nbsp;
          💎 Luxury Black Marble &nbsp;|&nbsp;
          ✨ New Arrivals: Ceramic Blue Tile &nbsp;|&nbsp;
          🏆 Weekly Feature: Modern Geometric Patterns &nbsp;|&nbsp;
        </div>
      </div>

      {/* Featured Tiles */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="badge badge-primary badge-lg mb-3">Featured</div>
            <h2 className="text-4xl font-black mb-3">Featured Tiles</h2>
            <p className="text-gray-500 text-lg">Handpicked premium tiles just for you</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiles.map((tile) => (
                <TileCard key={tile.id} tile={tile} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/all-tiles" className="btn btn-primary btn-lg text-white shadow-lg">
              View All Tiles →
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-3">Why Choose Us?</h2>
          <p className="text-gray-500">We provide the best tiles for your home</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-lg p-6 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
            <p className="text-gray-500">All tiles are carefully selected for premium quality and durability.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-500">Quick and safe delivery to your doorstep anywhere.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6 text-center">
            <div className="text-5xl mb-4">💎</div>
            <h3 className="text-xl font-bold mb-2">Unique Designs</h3>
            <p className="text-gray-500">Exclusive designs you won't find anywhere else.</p>
          </div>
        </div>
      </div>
    </div>
  );
}