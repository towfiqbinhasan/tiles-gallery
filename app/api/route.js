import { NextResponse } from "next/server";
import tiles from "@/data/tiles.json";

export async function GET() {
  return NextResponse.json(tiles);
}