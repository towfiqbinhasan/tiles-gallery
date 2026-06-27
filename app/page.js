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
        setTiles(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
     {/* Banner */}
<div
  className="hero min-h-[500px]"
  style={{
     backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="hero-content text-center text-white">
    <div className="max-w-2xl">
      <h1 className="text-5xl font-bold mb-6">
        Discover Your Perfect Aesthetic
      </h1>
      <p className="text-lg mb-8 opacity-90">
        Explore our premium collection of tiles for every style and space.
      </p>
      <Link href="/all-tiles" className="btn btn-white btn-lg text-primary font-bold">
        Browse Now
      </Link>
    </div>
  </div>
</div>
      {/* Marquee */}
      <div className="bg-primary text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          ✨ New Arrivals: Ceramic Blue Tile &nbsp;|&nbsp; 
          🏆 Weekly Feature: Modern Geometric Patterns &nbsp;|&nbsp; 
          🌟 Join the Community &nbsp;|&nbsp; 
          🎨 Premium Marble Collection &nbsp;|&nbsp; 
          🔥 Hot Deal: Rustic Wood Tiles &nbsp;|&nbsp;
          ✨ New Arrivals: Ceramic Blue Tile &nbsp;|&nbsp; 
          🏆 Weekly Feature: Modern Geometric Patterns &nbsp;|&nbsp; 
          🌟 Join the Community &nbsp;|&nbsp;
        </div>
      </div>

      {/* Featured Tiles */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Tiles</h2>
        <p className="text-center text-gray-500 mb-10">
          Handpicked premium tiles just for you
        </p>

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

        <div className="text-center mt-10">
          <Link href="/all-tiles" className="btn btn-primary btn-lg text-white">
            View All Tiles
          </Link>
        </div>
      </div>
    </div>
  );
}