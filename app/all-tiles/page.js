"use client";
import { useEffect, useState } from "react";
import TileCard from "@/components/TileCard";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

  const filtered = tiles.filter((tile) =>
    tile.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">
          All Tiles Collection
        </h1>
        <p className="text-gray-500 mb-6">
          Browse our complete collection of premium tiles
        </p>
        <input
          type="text"
          placeholder="🔍 Search tiles by title..."
          className="input input-bordered w-full max-w-lg shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No tiles found!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 mb-4">
            Showing {filtered.length} tiles
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}