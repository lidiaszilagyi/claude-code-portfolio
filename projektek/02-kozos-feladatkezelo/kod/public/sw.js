self.addEventListener("push", (e) => {
  let d = { title: "Közös feladatok", body: "" };
  try { d = e.data.json(); } catch {}
  const opt = { body: d.body || "" };
  if (d.tag) opt.tag = d.tag;
  e.waitUntil(self.registration.showNotification(d.title || "Közös feladatok", opt));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window" }).then((l) => (l[0] ? l[0].focus() : clients.openWindow("/"))));
});
