import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = String(body.user || "");
    const pass = String(body.pass || "");

    const expectedUser = process.env.NEW_POST_USER || "admin";
    const expectedPass = process.env.NEW_POST_PASS || "password";
    const token = process.env.NEW_POST_TOKEN || "1";

    if (user === expectedUser && pass === expectedPass) {
      const res = NextResponse.json({ ok: true });
      res.headers.set(
        "Set-Cookie",
        `editor_auth=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60}`,
      );
      return res;
    }

    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 },
    );
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
