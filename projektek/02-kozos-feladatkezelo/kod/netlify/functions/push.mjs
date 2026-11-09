import { createHash } from "node:crypto";
import { store, json, whoIs, noCode } from "../../lib/server.mjs";

const keyOf = (endpoint) => "sub/" + createHash("sha256").update(endpoint).digest("hex");

export default async (req) => {
  const me = whoIs(req);
  if (!me) return noCode();
  try {
    if (req.method === "GET") return json({ publicKey: Netlify.env.get("VAPID_PUBLIC_KEY") || "" });
    const body = JSON.parse((await req.text()).slice(0, 5000));
    const endpoint = body?.subscription?.endpoint;
    if (typeof endpoint !== "string" || !endpoint.startsWith("https://")) return json({ error: "bad_request" }, 400);
    const s = store();
    if (req.method === "DELETE") { await s.delete(keyOf(endpoint)); return json({ ok: true }); }
    if (req.method === "POST") {
      await s.setJSON(keyOf(endpoint), { person: me, subscription: body.subscription, at: Date.now() });
      return json({ ok: true });
    }
    return json({ error: "method" }, 405);
  } catch { return json({ error: "bad_request" }, 400); }
};
export const config = { path: "/api/push" };
