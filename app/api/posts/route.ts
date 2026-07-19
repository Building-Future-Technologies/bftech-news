import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // service key, no la anon, porque escribimos desde server
);

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const sourceUrl = formData.get('sourceUrl') as string;
  const image = formData.get('image') as File;

  const slug = slugify(title);
  const ext = image.name.split('.').pop();
  const path = `${slug}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('post-images')
    .upload(path, image, { contentType: image.type });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage.from('post-images').getPublicUrl(path);

  const { error } = await supabase.from('posts').insert({
    slug, title, body, source_url: sourceUrl, image_url: publicUrl,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slug });
}