"use client";
import { useEffect, useState } from "react";
import TileCard from "@/components/TileCard";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/tiles")
      .then((res) => res.json())
      .then((data) => {
        const tilesArray = Array.isArray(data) ? data : data.tiles || [];
        setTiles(tilesArray);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(tiles.map((t) => t.category))];

  const filtered = tiles.filter((tile) => {
    const matchSearch = tile.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || tile.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative py-20 px-4 text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        <div className="relative z-10">
          <div className="badge badge-warning badge-lg mb-4 font-semibold">🧱 Gallery</div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            All Tiles Collection
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Browse our complete collection of premium tiles for every style
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search tiles by title..."
              className="input w-full pl-12 pr-4 py-4 text-black rounded-full shadow-xl text-lg border-0 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white shadow-sm sticky top-16 z-40 py-4 px-4">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm rounded-full capitalize whitespace-nowrap ${
                activeCategory === cat
                  ? "btn-primary text-white"
                  : "btn-outline"
              }`}
            >
              {cat === "all" ? "🏠 All" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tiles Grid */}
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-32 gap-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-gray-400">Loading tiles...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl font-bold text-gray-400">No tiles found!</p>
              <p className="text-gray-400 mt-2">Try a different search term</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 font-medium">
                  Showing <span className="text-primary font-bold">{filtered.length}</span> tiles
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((tile) => (
                  <TileCard key={tile.id} tile={tile} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}