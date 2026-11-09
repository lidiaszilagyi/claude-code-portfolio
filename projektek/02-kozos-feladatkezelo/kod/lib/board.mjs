// A közös tábla szabályai: minden módosítás egy-egy kis művelet, amit a szerver
// a legfrissebb állapotra alkalmaz, így két ember egyszerre is szerkeszthet.

export const STATUSES = ["todo", "doing", "done"];
export const PRIOS = ["low", "mid", "high"];
const ST = { todo: "Teendő", doing: "Folyamatban", done: "Lezárt" };
const PR = { high: "Sürgős", mid: "Normál", low: "Ráér" };
export const TRASH_DAYS = 30;
export const ADMIN = "p1";          // ő mindent lát, és ő írhatja át a neveket
export const RESTRICTED = ["p3"];   // ő alapból semmit sem lát, csak amit kifejezetten megosztottak vele

// Ki mit láthat. A korlátozott néző KIZÁRÓLAG azt látja, ami a saját nevén van,
// vagy amit kifejezetten megosztottak vele (shared === true). Minden más rejtve marad előle.
export function canSee(task, viewer) {
  if (!RESTRICTED.includes(viewer)) return true;
  return task.owner === viewer || task.shared === true;
}
// A tábla annak a szemével, aki kéri (a szerver csak ezt adja ki).
export function viewFor(board, viewer) {
  return { ...board, me: viewer, tasks: board.tasks.filter((t) => canSee(t, viewer)) };
}

export function emptyBoard() {
  return {
    rev: 0,
    people: [
      { id: "p1", name: "Partner" },
      { id: "p2", name: "Ügyfél" },
      { id: "p3", name: "Irodavezető" },
    ],
    tasks: [],
  };
}

const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");
const okId = (v) => typeof v === "string" && /^[a-z0-9_-]{4,40}$/i.test(v);
const short = (s, n = 120) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

// events: ide kerülnek az azonnali értesítések ({to, title, body}); nem része a mentett táblának.
export function applyOps(board, ops, now = Date.now(), events = []) {
  if (!Array.isArray(ops)) throw new Error("ops");
  const personIds = new Set(board.people.map((p) => p.id));
  const name = (id) => board.people.find((p) => p.id === id)?.name || "Valaki";
  const oname = (id) => (personIds.has(id) ? name(id) : "nincs gazdája");
  // a 30 napnál régebben törölt feladatok végleg kikerülnek
  board.tasks = board.tasks.filter((t) => !t.deleted || now - t.deleted.at < TRASH_DAYS * 864e5);

  for (const op of ops.slice(0, 50)) {
    if (!op || typeof op !== "object") continue;
    const by = personIds.has(op.by) ? op.by : "";
    // Ami valakinek a nevén van, azt csak ő kezelheti; a gazdátlan feladathoz bárki hozzányúlhat.
    if (!by) continue;
    const mayManage = (task) => canSee(task, by) && (!personIds.has(task.owner) || task.owner === by);
    const log = (task, text) => {
      (task.log ||= []).push({ at: now, by, text });
      if (task.log.length > 150) task.log.splice(0, task.log.length - 150);
    };
    const find = (id) => board.tasks.find((x) => x.id === id);

    if (op.type === "upsert" && op.task && okId(op.task.id)) {
      const t = op.task;
      let cur = find(t.id);
      if (cur && (cur.deleted || !mayManage(cur))) continue;
      const isNew = !cur;
      if (isNew) {
        if (board.tasks.length >= 1000) continue;
        cur = {
          id: t.id, title: "", desc: "", status: "todo", owner: "", due: "",
          prio: "mid", cat: "", shared: RESTRICTED.includes(by), comments: [], log: [], createdAt: now, createdBy: by,
        };
        board.tasks.push(cur);
      }
      const changes = [];
      if ("title" in t) {
        const v = str(t.title, 200).trim() || cur.title || "Névtelen feladat";
        if (v !== cur.title && !isNew) changes.push(`átnevezte: „${short(v, 60)}”`);
        cur.title = v;
      }
      if ("desc" in t) {
        const v = str(t.desc, 4000);
        if (v !== cur.desc && !isNew) changes.push("módosította a leírást");
        cur.desc = v;
      }
      if ("status" in t && STATUSES.includes(t.status) && cur.status !== t.status) {
        if (!isNew) changes.push(`státusz: ${ST[cur.status]} → ${ST[t.status]}`);
        cur.closedAt = t.status === "done" ? now : null;
        cur.closedBy = t.status === "done" ? by : "";
        cur.status = t.status;
      }
      if ("owner" in t) {
        const v = personIds.has(t.owner) ? t.owner : "";
        if (v !== cur.owner) {
          if (!isNew) changes.push(`átadta: ${oname(cur.owner)} → ${oname(v)}`);
          cur.owner = v;
          if (v && v !== by) events.push({ to: v, title: "Új feladat került a nevedre", body: `${cur.title || str(t.title, 200)}\n${name(by)} tette rád`, _t: cur.id });
        }
      }
      if ("due" in t) {
        const v = /^\d{4}-\d{2}-\d{2}$/.test(t.due) ? t.due : "";
        if (v !== cur.due && !isNew) changes.push(v ? `határidő: ${v}` : "törölte a határidőt");
        cur.due = v;
      }
      if ("prio" in t && PRIOS.includes(t.prio) && cur.prio !== t.prio) {
        if (!isNew) changes.push(`prioritás: ${PR[t.prio]}`);
        cur.prio = t.prio;
      }
      if ("cat" in t) {
        const v = str(t.cat, 40).trim();
        if (v !== cur.cat && !isNew) changes.push(v ? `kategória: ${v}` : "törölte a kategóriát");
        cur.cat = v;
      }
      if ("shared" in t && !RESTRICTED.includes(by)) {
        const v = t.shared === true;
        if (v !== (cur.shared === true) && !isNew) changes.push(v ? `megosztotta vele: ${name(RESTRICTED[0])}` : `megszüntette a megosztást (${name(RESTRICTED[0])} már nem látja)`);
        cur.shared = v;
      }
      if (isNew) log(cur, `létrehozta (${oname(cur.owner)}${cur.owner ? " nevére" : ""})`);
      else if (changes.length) log(cur, changes.join("; "));
      if (!isNew && cur.ask && cur.owner === by) delete cur.ask; // a gazda foglalkozott vele
      cur.updatedAt = now;
    }

    else if (op.type === "delete" && okId(op.id)) {
      const cur = find(op.id);
      if (!cur || cur.deleted || !mayManage(cur)) continue;
      cur.deleted = { at: now, by };
      log(cur, "a lomtárba tette");
    }

    else if (op.type === "restore" && okId(op.id)) {
      const cur = find(op.id);
      if (!cur || !cur.deleted || !mayManage(cur)) continue;
      delete cur.deleted;
      log(cur, "visszaállította a lomtárból");
    }

    else if ((op.type === "comment" || op.type === "ask") && okId(op.id) && op.comment && okId(op.comment.id)) {
      const cur = find(op.id);
      const text = str(op.comment.text, 2000).trim();
      if (!cur || cur.deleted || !canSee(cur, by) || !text || cur.comments.length >= 300) continue;
      if (cur.comments.some((c) => c.id === op.comment.id)) continue;
      const isAsk = op.type === "ask" && personIds.has(cur.owner) && cur.owner !== by;
      cur.comments.push({ id: op.comment.id, by, text, at: now, ...(isAsk ? { ask: true } : {}) });
      if (isAsk) {
        cur.ask = { by, at: now, text: short(text) };
        log(cur, `kérést küldött a gazdának: „${short(text, 60)}”`);
        events.push({ to: cur.owner, title: `Kérés: ${cur.title}`, body: `${name(by)}: ${short(text)}`, _t: cur.id });
      } else if (personIds.has(cur.owner) && cur.owner !== by) {
        events.push({ to: cur.owner, title: `Új megjegyzés: ${cur.title}`, body: `${name(by)}: ${short(text)}`, _t: cur.id });
      } else if (cur.owner === by && cur.ask) {
        if (cur.ask.by && cur.ask.by !== by) events.push({ to: cur.ask.by, title: `Válasz a kérésedre: ${cur.title}`, body: `${name(by)}: ${short(text)}`, _t: cur.id });
        delete cur.ask;
      }
      cur.updatedAt = now;
    }

    // Megosztás be/ki: a gazda (vagy gazdátlannál bárki, aki nem korlátozott), és mindig az ADMIN.
    else if (op.type === "share" && okId(op.id) && !RESTRICTED.includes(by)) {
      const cur = find(op.id);
      if (!cur || cur.deleted || !(by === ADMIN || mayManage(cur))) continue;
      const v = op.shared === true;
      if (v === (cur.shared === true)) continue;
      cur.shared = v;
      log(cur, v ? `megosztotta vele: ${name(RESTRICTED[0])}` : `megszüntette a megosztást (${name(RESTRICTED[0])} már nem látja)`);
      cur.updatedAt = now;
    }

    else if (op.type === "ackask" && okId(op.id)) {
      const cur = find(op.id);
      if (cur && cur.ask && cur.owner === by) { delete cur.ask; log(cur, "látta a kérést"); }
    }

    else if (op.type === "people" && by === ADMIN && Array.isArray(op.people)) {
      for (const p of op.people) {
        const cur = board.people.find((x) => x.id === p?.id);
        const nm = str(p?.name, 40).trim();
        if (cur && nm) cur.name = nm;
      }
    }
  }
  // értesítés csak annak megy, aki a feladatot (még) láthatja
  for (let i = events.length - 1; i >= 0; i--) {
    const t = board.tasks.find((x) => x.id === events[i]._t);
    if (!t || t.deleted || !canSee(t, events[i].to)) events.splice(i, 1); else delete events[i]._t;
  }
  board.rev = (board.rev || 0) + 1;
  return board;
}
