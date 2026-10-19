# Esküvői weboldalak, digitális meghívók és webshop – saját vállalkozás

**Vállalkozás:** Assistance And More – esküvői asszisztencia és weboldal-készítés
**Időszak:** 2026 – folyamatban
**Szerepem:** minden: tervezés, fejlesztés, tartalom, telepítés, üzemeltetés

A vállalkozás ötletét a saját, külföldön tartott esküvőnk adta: a vendégeknek (kb. 70 fő, két országból) saját fejlesztésű esküvői weboldalt készítettem, és ez rengeteget egyszerűsített a szervezésen.

## 1. Saját üzleti weboldal – [eskuvo.assistanceandmore.hu](https://eskuvo.assistanceandmore.hu)

- A korábbi Canva-oldalt teljesen újraépítettem; a tervet Claude design-eszközével kezdtem, a kódot GitHub-repóban kezelem.
- **Telepítés:** GitHub → Vercel automatikus telepítés, a domain DNS-beállítását (Rackhost) én végeztem el, az átállás leállás nélkül történt.
- **Integrációk:** kapcsolatfelvételi űrlap, Calendly időpontfoglalás, SalesAutopilot hírlevél-feliratkozás.
- Tervezett: angol/spanyol változat külön aldomainen.

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
