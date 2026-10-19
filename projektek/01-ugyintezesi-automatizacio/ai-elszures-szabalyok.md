# AI-előszűrés – döntési szabályok

Az AI egyetlen, a kódban rögzített szabálylista (`AI_RULES`) alapján ad előzetes javaslatot. A javaslat csak segédlet, a döntést mindig a jogászok hozzák meg. A szabályokat jogi átnézés után véglegesítjük.

## Bemenet

| Az AI megkapja | Az AI nem kapja meg |
|----------------|---------------------|
| légitársaság, járatszám, útvonal, esemény (késés/törlés), utazás dátuma, az ügyfél tényállás-leírása (személyes adatok nélkül) | ügyfél neve, e-mail címe, lakcíme |

Modell: OpenAI gpt-4o, legfeljebb 400 token válasz.

## Szabályok

| # | Szabály | Hatás a javaslatra |
|---|---------|--------------------|
| 1 | Késésnél kártérítés csak akkor jár, ha a végső célállomásra legalább 3 órás késéssel érkezett az utas. | 3 órán belül: nem vihető |
| 2 | Műszaki hiba jellemzően nem rendkívüli körülmény (kivéve rejtett gyártási hiba). | Vihető |
| 3 | A légitársaság saját személyzetének sztrájkja jellemzően nem rendkívüli körülmény. | Vihető |
| 4 | Külső szereplő sztrájkja, légiirányítási korlátozás, biztonsági kockázat jellemzően rendkívüli körülmény. | Nem vihető |
| 4/b | Időjárásra hivatkozó elutasításnál a hivatkozás megalapozottságát vizsgálni kell. | Bizonytalan |
| 5 | Ha a leírásból nem derül ki az ok. | Bizonytalan |
| 6a | Magyarországi székhelyű légitársaság: minden járata képviselhető. | Képviselhető |
| 6b | EU-s légitársaság, ha Budapest az indulási vagy érkezési hely. | Képviselhető |
| 6c | Nem EU-s légitársaság: csak a Budapestről induló járat vihető. | Induló: vihető, érkező: nem |
| 6d | EU-s, nem magyar székhelyű légitársaság, Budapest nélküli útvonal (magyar lakcímnél az ügyvéd felülbírálhatja, de az AI a lakcímet nem látja). | Nem vihető |
| 6e | Minden más eset. | Bizonytalan |

## A válasz formája

Legfeljebb 4–5 mondat, három szempont szerint:

1. Formális hiányosságok az adatokban
2. Rendkívüli körülmény vagy normál üzemi kockázat
3. Kötött záró sor: `JAVASLAT: VIHETŐ`, `JAVASLAT: NEM VIHETŐ` vagy `JAVASLAT: BIZONYTALAN - TOVÁBBI INFÓ KELL`

A záró sor alapján színeződik a táblázat „AI vélemény” cellája: zöld (vihető), piros (nem vihető), sárga (jogásznak meg kell néznie), szürke (hiba, nincs értékelhető javaslat).

A promptban három beépített mintapélda mutatja az elvárt válaszformát (műszaki hiba → vihető; időjárás → bizonytalan; hiányzó leírás → bizonytalan).

## Kártalanítás a távolság alapján (EU 261/2004, 7. cikk)

| Légvonalbeli távolság | Kártalanítás / fő |
|-----------------------|-------------------|
| 1500 km-ig | 250 EUR |
| 1500–3500 km | 400 EUR |
| 3500 km felett | 600 EUR (EU-n belüli járatnál 400 EUR) |

A határértékekhez közeli eseteket az ügyvéd ellenőrzi; az 50%-os csökkentést a számítás nem alkalmazza.

## Bővítés

Új szabály vagy példa a szabálylista szövegének bővítésével adható hozzá; mentés és ugyanazon webalkalmazás-telepítés új verziója után él. Kódmódosítás nem kell.
