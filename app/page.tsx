import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import NewsletterSubscribe from "./components/NewsletterSubscribe";

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
          Últimas novedades, análisis y tendencias del mundo tecnológico en un
          solo lugar.
        </p>
      </div>
      <NewsletterSubscribe />

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
            className="newsCard"
            style={{ display: "block", textDecoration: "none" }}
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
              <div
                style={{
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 170,
                }}
              >
                <div>
                  <h3
                    className="newsTitle"
                    style={{ color: "#F5C800", margin: 0 }}
                  >
                    {post.title}
                  </h3>
                  <p style={{ color: "#aaa", fontSize: 14, marginTop: 12 }}>
                    {post.body.slice(0, 100)}...
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 16,
                  }}
                >
                  <span style={{ color: "#888", fontSize: 12 }}>
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Fecha no disponible"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
