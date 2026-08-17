import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const weeksAgo = Number(url.searchParams.get("weeksAgo") ?? "0");

  const today = new Date();
  const thisWeekStart = startOfWeek(today);
  const targetStart = new Date(thisWeekStart);
  targetStart.setDate(thisWeekStart.getDate() - weeksAgo * 7);
  const targetEnd = new Date(targetStart);
  targetEnd.setDate(targetStart.getDate() + 7);

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .gte("created_at", targetStart.toISOString())
    .lt("created_at", targetEnd.toISOString())
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    posts,
    start: targetStart.toISOString(),
    end: targetEnd.toISOString(),
  });
}
