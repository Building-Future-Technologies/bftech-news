"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Post = {
  slug: string;
  title: string;
  body: string;
  image_url: string;
  created_at?: string;
};

export default function PostsFeed() {
  const [weeksLoaded, setWeeksLoaded] = useState<number[]>([0, 1]);
  const [groups, setGroups] = useState<Record<number, Post[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // load initial weeks
    weeksLoaded.forEach((w) => loadWeek(w));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadWeek(weeksAgo: number) {
    if (groups[weeksAgo]) return; // already loaded
    setLoading(true);
    try {
      const res = await fetch(`/api/posts-week?weeksAgo=${weeksAgo}`);
      if (!res.ok) throw new Error("Error al cargar posts");
      const data = await res.json();
      setGroups((g) => ({ ...g, [weeksAgo]: data.posts || [] }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function loadPrevious() {
    const next = Math.max(...weeksLoaded) + 1;
    setWeeksLoaded((arr) => [...arr, next]);
    loadWeek(next);
  }

  function formatWeekLabel(startIso?: string) {
    if (!startIso) return "Semana";
    const d = new Date(startIso);
    const end = new Date(d);
    end.setDate(d.getDate() + 6);
    return `Semana del ${d.toLocaleDateString("es-ES")} - ${end.toLocaleDateString("es-ES")}`;
  }

  return (
    <div style={{ marginTop: 24 }}>
      {weeksLoaded.map((w) => (
        <section key={w} style={{ marginBottom: 28 }}>
          <h2 style={{ color: "#F5C800" }}>
            Semana {w === 0 ? "actual" : `hace ${w} semana(s)`}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {(groups[w] || []).map((post) => (
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
                  <div
                    style={{ position: "relative", width: "100%", height: 180 }}
                  >
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
                          ? new Date(post.created_at).toLocaleDateString(
                              "es-ES",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )
                          : "Fecha no disponible"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {groups[w] && groups[w].length === 0 && (
            <p style={{ color: "#888", marginTop: 12 }}>
              No hay noticias en esta semana.
            </p>
          )}
        </section>
      ))}

      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button
          onClick={loadPrevious}
          style={{
            background: "#F5C800",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Cargar semana anterior"}
        </button>
      </div>
    </div>
  );
}
