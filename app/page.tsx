import Link from "next/link";
import NewsletterSubscribe from "./components/NewsletterSubscribe";
import PostsFeed from "./components/PostsFeed";

export default function Home() {
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

      <PostsFeed />
    </div>
  );
}
