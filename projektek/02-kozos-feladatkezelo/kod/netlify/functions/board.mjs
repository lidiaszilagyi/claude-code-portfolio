import { emptyBoard, applyOps, viewFor } from "../../lib/board.mjs";
import { store, json, whoIs, noCode, pushTo } from "../../lib/server.mjs";

export default async (req, context) => {
  const me = whoIs(req);
  if (!me) return noCode();
  const s = store();
  try {
    if (req.method === "GET") {
      return json(viewFor((await s.get("board", { type: "json" })) || emptyBoard(), me));
    }
    if (req.method === "POST") {
      const raw = await req.text();
      if (raw.length > 200_000) return json({ error: "too_large" }, 413);
      const { ops } = JSON.parse(raw);
      if (!Array.isArray(ops)) return json({ error: "bad_request" }, 400);
      const board = (await s.get("board", { type: "json" })) || emptyBoard();
      const events = [];
      // Azt, hogy ki küldi a módosítást, mindig a kód dönti el, nem a böngésző.
      applyOps(board, ops.filter((o) => o && typeof o === "object").map((o) => ({ ...o, by: me })), Date.now(), events);
      await s.setJSON("board", board);
      if (events.length) {
        const p = pushTo(s, events).catch(() => {});
        if (context?.waitUntil) context.waitUntil(p); else await p;
      }
      return json(viewFor(board, me));
    }
    return json({ error: "method" }, 405);
  } catch (e) {
    return json({ error: "bad_request" }, 400);
  }
};

export const config = { path: "/api/board" };
