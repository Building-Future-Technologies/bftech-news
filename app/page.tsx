import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const revalidate = 300; // ISR cada 5 min

export default async function Home() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            color: "#F5C800",
            fontFamily: "sans-serif",
            margin: "0 auto",
            maxWidth: 800,
            fontSize: "4rem",
            fontWeight: 900,
            letterSpacing: "0.18em",
            lineHeight: 1.05,
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(245, 200, 0, 0.35)",
            background: "linear-gradient(90deg, #F5C800 0%, #ffffff 35%, #F5C800 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Tech News
        </h1>
        <p
          style={{
            color: "#aaa",
            maxWidth: 760,
            margin: "1rem auto 0",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Últimas novedades, análisis y tendencias del mundo tecnológico en un solo lugar.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {posts?.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid #F5C800",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: 180 }}>
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <h3 style={{ color: "#fff", margin: 0 }}>{post.title}</h3>
                <p style={{ color: "#aaa", fontSize: 14 }}>
                  {post.body.slice(0, 100)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
