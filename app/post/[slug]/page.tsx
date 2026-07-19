import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export const revalidate = 300;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
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