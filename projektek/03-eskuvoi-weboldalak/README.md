# Esküvői weboldalak, digitális meghívók és webshop – saját vállalkozás

**Vállalkozás:** Assistance And More – esküvői asszisztencia és weboldal-készítés
**Időszak:** 2026 – folyamatban
**Szerepem:** minden: tervezés, fejlesztés, tartalom, telepítés, üzemeltetés

A vállalkozás ötletét a saját, külföldön tartott esküvőnk adta: a vendégeknek (kb. 70 fő, két országból) saját fejlesztésű esküvői weboldalt készítettem, és ez rengeteget egyszerűsített a szervezésen.

## 1. Saját üzleti weboldal – [eskuvo.assistanceandmore.hu](https://eskuvo.assistanceandmore.hu)

**Ez a fő Claude Code-projektem.** A korábbi Canva-oldalt teljesen újraépítettem: a tervet Claude design-eszközével kezdtem, a fejlesztést Claude Code-dal végzem egy privát GitHub-repóban. 2026. szeptember 28. óta 54 commit készült, ebből 19 a commit-előzmények szerint Claude Code-munkamenetben készült, az én feladatleírásom és ellenőrzésem alapján. A forráskódot kérésre szívesen megmutatom.

**Felépítés**

- **Saját statikus oldalgenerátor Node.js-ben:** a tartalom JSON-fájlokban van (főoldal, blog, webshop, szolgáltatói oldal, impresszum, jogi oldalak), a build-scriptek ebből állítják elő a HTML-oldalakat mindhárom nyelven.
- **Három nyelv, két domain:** magyar változat az eskuvo., angol és spanyol a wedding. aldomainen, oldalanként egyetlen kanonikus címmel és 308-as átirányításokkal a két domain között.
- **Szerver nélküli API (Vercel Functions):** kapcsolatfelvételi űrlap és hírlevél-feliratkozás, a beérkező adatok Google Sheets táblázatba kerülnek.
- **SEO:** strukturált adatok (JSON-LD), sitemap hreflang-jelölésekkel, `llms.txt`, nyelvenkénti meta leírások, cikkenként és nyelvenként egyedi megosztási kép (og:image).
- **Integrációk:** Calendly időpontfoglalás, SalesAutopilot hírlevél, közösségi megosztás, VirtualJog jogi dokumentumok beágyazása, letölthető nyereményjáték-szabályzat PDF-ben.
- **Telepítés:** GitHub → Vercel automatikus telepítés; a domain DNS-beállítását (Rackhost) én végeztem, az átállás leállás nélkül történt.

**Példák a Claude Code-dal megoldott feladatokra**

- Domainek közötti átirányítási logika újratervezése, hogy minden oldalnak egy címe legyen
- Beégetett magyar feliratok felkutatása és lefordítása az angol és spanyol oldalakon
- A Facebook nem töltötte be a link-előnézetet (1,7 MB-os kép volt beállítva) → kis méretű, méretjelöléssel ellátott megosztási kép
- Az impresszum adatainak kiszervezése JSON-ba úgy, hogy a többi nyelv kimenete bájtra változatlan maradjon

## 2. Többnyelvű esküvői weboldal-demó (Elena & Mateo)

Bemutató projekt egy kitalált párnak, a vállalkozás portfóliójához.

- **Stack:** React, Tailwind CSS, lucide-react, Vite; tervezett telepítés Vercelre
- **Három nyelv** (angol, spanyol, magyar): 463 fordítási kulcs, ellenőrzötten nulla eltéréssel; nyelvfüggő dátum- és számformázás
- **Interaktív funkciók:**
  - élő időjárás-widget (Open-Meteo API, éghajlati átlaggal mint tartalékkal)
  - Google Térkép-linkek minden helyszínhez
  - Google Naptár-link és Apple Naptár `.ics` letöltés (helyes UTC-időbélyegekkel)
  - vendégenkénti QR-kód (`?code=` paraméterrel automatikusan kitöltött vendégkereséssel)
  - böngészős értesítés-demó és e-mail emlékeztető feliratkozás
  - másolható Instagram-hashtag

## 3. Mintaoldalak és digitális meghívók

- **Négy esküvői weboldal-sablon** különböző stílusokban (pl. bohém-vintage, mediterrán), amelyeket egy esküvői kiállításon mutatok be a pároknak.
- **Interaktív save-the-date és köszönőoldal** (editorial és „whimsy” kézrajzos stílus), megosztható linkként, Netlify-on hosztolva saját aldomainen: [meghivo.assistanceandmore.hu](https://meghivo.assistanceandmore.hu)
- A sablonok nyelvenként bővíthetők (HU/EN/ES).

## 4. Webshop (indítás alatt)

- Platformválasztás összehasonlítás alapján (UNAS, Shoprenter, WooCommerce, Shopify, egyedi fejlesztés) → UNAS
- Digitális termékek: weboldal-sablonok, interaktív meghívók két árszinten, nyelvi kiegészítőkkel
- Integrációk: Barion fizetés, Billingo számlázás, Google Analytics, Meta Pixel
- Előbb tesztoldalon élesítem, az éles oldal a végleges állapotig változatlan marad

## Képernyőképek

Lásd: [kepek/](kepek/)
