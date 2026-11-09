// Reggeli összefoglaló egy ember nyitott feladataiból.
export function localDate(now = new Date(), tz = "Europe/Budapest") {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: tz }).format(now); // ÉÉÉÉ-HH-NN
}
export function localHour(now = new Date(), tz = "Europe/Budapest") {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }).format(now)) % 24;
}
export function digestFor(board, personId, today) {
  const mine = board.tasks.filter((t) => t.status !== "done" && t.owner === personId);
  if (!mine.length) return null;
  const t1 = new Date(today + "T12:00:00Z"); t1.setUTCDate(t1.getUTCDate() + 1);
  const tomorrow = t1.toISOString().slice(0, 10);
  const late = mine.filter((t) => t.due && t.due < today);
  const now = mine.filter((t) => t.due === today);
  const soon = mine.filter((t) => t.due === tomorrow);
  const parts = [];
  if (late.length) parts.push(`${late.length} lejárt`);
  if (now.length) parts.push(`${now.length} ma esedékes`);
  if (soon.length) parts.push(`${soon.length} holnap esedékes`);
  const first = [...late, ...now, ...soon, ...mine].filter((t, i, a) => a.indexOf(t) === i).slice(0, 3).map((t) => "• " + t.title);
  return {
    title: `${mine.length} nyitott feladat van nálad` + (parts.length ? ` (${parts.join(", ")})` : ""),
    body: first.join("\n") + (mine.length > 3 ? `\n… és még ${mine.length - 3}` : ""),
  };
}
