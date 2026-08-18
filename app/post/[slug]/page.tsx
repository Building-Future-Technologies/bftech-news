import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("title, body, image_url, source_url")
    .eq("slug", slug)
    .single();

  if (!post) {
    return {};
  }

  const description = post.body
    ? post.body.replace(/\s+/g, " ").trim().slice(0, 160)
    : "Artículo de BFTech News";

  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://www.bftech.news"}/post/${slug}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: "BFTech News",
      type: "article",
      publishedTime: new Date().toISOString(),
      images: [
        {
          url: post.image_url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.image_url],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Link href="/" style={{ color: "#F5C800", textDecoration: "none" }}>
          ← Volver
        </Link>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 400,
            marginTop: 24,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <h1
          style={{
            color: "#F5C800",
            marginTop: 24,
            fontSize: 36,
            lineHeight: 1.2,
            fontWeight: 800,
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            color: "#ddd",
            fontSize: 18,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            marginTop: 20,
          }}
        >
          {post.body}
        </p>

        {post.source_url && (
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#F5C800", display: "inline-block", marginTop: 24 }}
          >
            Ver fuente original →
          </a>
        )}
      </div>
    </div>
  );
}
