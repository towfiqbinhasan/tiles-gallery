import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Auth handled by Firebase" });
}

export async function POST() {
  return NextResponse.json({ message: "Auth handled by Firebase" });
}