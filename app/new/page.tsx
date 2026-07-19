'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('sourceUrl', sourceUrl);
    formData.append('image', image);

    const res = await fetch('/api/posts', { method: 'POST', body: formData });
    setLoading(false);
    if (res.ok) router.push('/');
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ color: '#F5C800' }}>Nueva noticia</h1>
        <input placeholder="Titular" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Resumen / texto de la noticia" value={body} onChange={e => setBody(e.target.value)} rows={6} required />
        <input placeholder="URL fuente (opcional)" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] ?? null)} required />
        <button disabled={loading} type="submit" style={{ background: '#F5C800', color: '#000', padding: '12px', fontWeight: 700 }}>
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
}