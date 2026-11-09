import { getStore, getDeployStore } from "@netlify/blobs";
import { createHash, timingSafeEqual } from "node:crypto";
import webpush from "web-push";

export function store() {
  const opts = { name: "kozos-feladatok", consistency: "strong" };
  // Éles adat csak az éles oldalról kerül a közös tárba.
  if (Netlify.context?.deploy?.context === "production") return getStore(opts);
  return getDeployStore(opts);
}

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const h = (s) => createHash("sha256").update(String(s)).digest();

// Személyes belépőkód: mindhárom embernek saját kódja van, a kód dönti el, ki ő.
// Visszaadja a személy azonosítóját (p1/p2/p3), vagy null-t, ha a kód nem jó.
export function whoIs(req) {
  const got = (req.headers.get("x-kod") || "").trim().toLowerCase();
  let who = null;
  for (const id of ["p1", "p2", "p3"]) {
    const code = (Netlify.env.get("CODE_" + id.toUpperCase()) || "").trim().toLowerCase();
    if (code && got && timingSafeEqual(h(got), h(code))) who = id;
  }
  return who;
}
export const noCode = () => json({ error: "code" }, 401);

// Böngészős értesítés küldése: messages = [{to: személy, title, body, tag?}]
export async function pushTo(s, messages) {
  if (!messages.length) return;
  const pub = Netlify.env.get("VAPID_PUBLIC_KEY"), priv = Netlify.env.get("VAPID_PRIVATE_KEY");
  if (!pub || !priv) return;
  webpush.setVapidDetails("https://pelda-feladatok.netlify.app", pub, priv);
  const { blobs } = await s.list({ prefix: "sub/" });
  await Promise.allSettled(blobs.map(async (b) => {
    const sub = await s.get(b.key, { type: "json" });
    if (!sub) return;
    for (const m of messages.filter((x) => x.to === sub.person)) {
      try { await webpush.sendNotification(sub.subscription, JSON.stringify({ title: m.title, body: m.body, tag: m.tag || "" })); }
      catch (e) { if (e.statusCode === 404 || e.statusCode === 410) { await s.delete(b.key); return; } }
    }
  }));
}
