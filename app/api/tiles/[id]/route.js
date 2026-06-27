import { NextResponse } from "next/server";
import tilesData from "@/data/tiles.json";

export async function GET(request, { params }) {
  const { id } = await params;
  const tiles = tilesData.tiles || tilesData;
  const tile = tiles.find((t) => t.id === id);
  
  if (!tile) {
    return NextResponse.json({ error: "Tile not found" }, { status: 404 });
  }
  
  return NextResponse.json(tile);
}