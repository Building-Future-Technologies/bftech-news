import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/editor_auth=([^;]+)/);
  const token = process.env.NEW_POST_TOKEN || "1";
  if (match && match[1] === token) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false }, { status: 401 });
}
