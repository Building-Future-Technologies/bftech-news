"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // check session
    fetch("/api/auth/check").then((res) => {
      setAuthChecked(true);
      setIsAuthed(res.ok);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("sourceUrl", sourceUrl);
    formData.append("image", image);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
      credentials: "same-origin",
    });
    setLoading(false);
    if (res.ok) router.push("/");
    else if (res.status === 401)
      alert("No autorizado. Por favor, inicia sesión.");
    else alert("Error al publicar");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      if (res.ok) {
        setIsAuthed(true);
      } else {
        const data = await res.json();
        setLoginError(data.error || "Error de login");
      }
    } catch (err) {
      setLoginError("Error de red");
    }
  }

  if (!authChecked)
    return (
      <div style={{ padding: 24, color: "#fff" }}>Comprobando sesión...</div>
    );

  if (!isAuthed)
    return (
      <div
        style={{
          background: "#0a0a0a",
          minHeight: "100vh",
          color: "#fff",
          padding: "2rem",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            maxWidth: 400,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <h2 style={{ color: "#F5C800" }}>
            Iniciar sesión para crear una noticia
          </h2>
          <input
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          {loginError && <div style={{ color: "#f66" }}>{loginError}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="submit"
              style={{
                background: "#F5C800",
                border: "none",
                padding: "8px 12px",
                borderRadius: 6,
              }}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    );

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 600,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h1 style={{ color: "#F5C800" }}>Nueva noticia</h1>
        <input
          placeholder="Titular"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Resumen / texto de la noticia"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
        />
        <input
          placeholder="URL fuente (opcional)"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          required
        />
        <button
          disabled={loading}
          type="submit"
          style={{
            background: "#F5C800",
            color: "#000",
            padding: "12px",
            fontWeight: 700,
          }}
        >
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
}
