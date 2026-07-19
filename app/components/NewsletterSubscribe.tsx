"use client";

import { FormEvent, useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();
    if (
      !normalizedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setStatus("error");
      setMessage("Introduce un correo válido.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Error al suscribirse.");
      }

      setEmail("");
      setStatus("success");
      setMessage("¡Gracias! Te hemos añadido a la newsletter.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo completar la suscripción.",
      );
    }
  };

  return (
    <section
      style={{
        background: "rgba(245, 200, 0, 0.08)",
        border: "1px solid rgba(245, 200, 0, 0.35)",
        borderRadius: 16,
        padding: "1rem",
        margin: "0 auto 1.5rem",
        maxWidth: 620,
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, color: "#F5C800", fontSize: "1.4rem" }}>
            Suscríbete a la newsletter
          </h2>
          <p
            style={{
              color: "#ccc",
              marginTop: 6,
              lineHeight: 1.4,
              fontSize: "0.95rem",
            }}
          >
            Recibe un resumen semanal de las noticias más importantes de
            tecnología. ¡GRATIS!
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          style={{
            alignSelf: "flex-start",
            padding: "0.75rem 1.2rem",
            borderRadius: 10,
            border: "none",
            background: "#F5C800",
            color: "#0a0a0a",
            fontWeight: 700,
            cursor: "pointer",
            minWidth: 140,
          }}
        >
          {showForm ? "Ocultar" : "Suscribirme"}
        </button>

        {showForm ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <label style={{ flex: "1 1 220px", minWidth: 0 }}>
              <span className="sr-only">Correo electrónico</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@ejemplo.com"
                aria-label="Correo electrónico"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.9rem",
                  borderRadius: 10,
                  border: "1px solid #333",
                  background: "#111",
                  color: "#fff",
                  fontSize: "0.95rem",
                }}
              />
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: "0.75rem 1.2rem",
                borderRadius: 10,
                border: "none",
                background: "#F5C800",
                color: "#0a0a0a",
                fontWeight: 700,
                cursor: status === "loading" ? "not-allowed" : "pointer",
                minWidth: 130,
              }}
            >
              {status === "loading" ? "Guardando…" : "Enviar"}
            </button>
          </form>
        ) : null}

        {message ? (
          <p
            style={{
              margin: 0,
              color: status === "success" ? "#B7F54B" : "#ff8383",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
