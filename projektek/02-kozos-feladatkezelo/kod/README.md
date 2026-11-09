# Forráskód

Az éles változat anonimizált másolata: a szereplők nevei helyett szerepek (Partner, Ügyfél, Irodavezető), az élő cím helyett mintacím (`pelda-feladatok.netlify.app`) szerepel. Valós ügyféladat nincs benne.

## Felépítés

| Útvonal | Mit csinál |
|---|---|
| `public/index.html` | Egyoldalas webapp: lista, tábla, archívum, feladatablak, megosztás, értesítés-feliratkozás |
| `public/sw.js` | Service worker a push-értesítések megjelenítéséhez |
| `public/outlook/` | Outlook-bővítmény: „Feladattá alakítom” panel és manifest |
| `teams/manifest.json` | Teams személyes fül |
| `lib/board.mjs` | A tábla szabályai: láthatóság (`canSee`, `viewFor`), jogosultság, előzmények, értesítési események |
| `lib/server.mjs` | Tárhely, belépőkód-ellenőrzés, push-küldés |
| `lib/digest.mjs` | Reggeli összefoglaló összeállítása |
| `netlify/functions/board.mjs` | `/api/board` – olvasás és módosítások |
| `netlify/functions/push.mjs` | `/api/push` – értesítés-feliratkozás |
| `netlify/functions/reggeli.mjs` | Óránként futó ütemezett függvény: napi mentés, reggel 7-kor összefoglaló |

## Futtatás saját Netlify-fiókban

1. `npm install`
2. Környezeti változók: `CODE_P1`, `CODE_P2`, `CODE_P3` (a három személyes belépőkód), `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` (a push-értesítésekhez, pl. `npx web-push generate-vapid-keys`).
3. A `lib/server.mjs` VAPID-címét és a manifestek URL-jeit cseréld a saját címedre.
4. Telepítés a Netlify CLI-vel vagy a Netlify felületén.
