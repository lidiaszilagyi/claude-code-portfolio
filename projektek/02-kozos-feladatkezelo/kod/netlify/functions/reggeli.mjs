import { getStore } from "@netlify/blobs";
import { digestFor, localDate, localHour } from "../../lib/digest.mjs";
import { pushTo } from "../../lib/server.mjs";

// Óránként fut: mindig frissíti az aznapi biztonsági mentést (30 napig őrizzük),
// és magyar idő szerint reggel 7-kor elküldi a napi összefoglalót.
export default async () => {
  const s = getStore({ name: "kozos-feladatok", consistency: "strong" });
  const board = await s.get("board", { type: "json" });
  if (!board) return;
  const today = localDate();

  await s.setJSON("backup/" + today, board);
  const { blobs } = await s.list({ prefix: "backup/" });
  const keep = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  for (const b of blobs) if (b.key.slice(7) < keep) await s.delete(b.key);

  if (localHour() !== 7) return;
  const live = { ...board, tasks: board.tasks.filter((t) => !t.deleted) };
  const msgs = board.people
    .map((p) => ({ p, m: digestFor(live, p.id, today) }))
    .filter((x) => x.m)
    .map((x) => ({ to: x.p.id, title: x.m.title, body: x.m.body, tag: "napi-osszefoglalo" }));
  await pushTo(s, msgs);
};
export const config = { schedule: "0 * * * *" };
