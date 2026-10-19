# AI-előszűrés – tesztforgatókönyv és eredmények

**Cél:** ellenőrizni, hogy az AI-előszűrés a szabálylista szerint dönt-e. Minden esethez várt javaslat tartozik; a teszteket a weboldali űrlapon keresztül, teljes folyamatban futtattam (űrlap → feldolgozás → AI → táblázat → csapatlevél).

## Tesztesetek és első kör eredménye

| # | Légitársaság és útvonal | Tényállás | Várt javaslat | AI javaslata | Eredmény |
|---|-------------------------|-----------|---------------|--------------|----------|
| 1 | Wizz Air, Budapest – Barcelona | Műszaki hiba, 4 óra késés | VIHETŐ (2.) | VIHETŐ | ✅ Egyezik |
| 2 | Wizz Air, Róma – Barcelona | Saját pilóták sztrájkja, 5 óra | VIHETŐ (6a, 3.) | VIHETŐ | ✅ Egyezik |
| 3 | Ryanair, Budapest – Dublin | Vihar és köd, törlés | NEM VIHETŐ (4.)* | NEM VIHETŐ | ✅ Egyezik |
| 4 | Lufthansa, Budapest – Frankfurt | Műszaki hiba, 5 óra | VIHETŐ (6b, 2.) | – | Nincs rögzítve |
| 5 | Lufthansa, Frankfurt – Madrid | Műszaki hiba, 4 óra | BIZONYTALAN (6d)* | VIHETŐ | ❌ Eltér |
| 6 | Turkish Airlines, Budapest – Isztambul | Műszaki hiba, 4 óra | VIHETŐ (6c) | – | Nincs rögzítve |
| 7 | Turkish Airlines, Isztambul – Budapest | Műszaki hiba, 4 óra | VIHETŐ ügyvédi felszólítással* | – | Nincs rögzítve |
| 8 | Emirates, Dubaj – Budapest | Műszaki hiba, 4 óra | BIZONYTALAN (6c)* | BIZONYTALAN | ✅ Egyezik |
| 9 | Ryanair, Budapest – London | Nincs leírás | BIZONYTALAN (5.) | BIZONYTALAN | ✅ Egyezik |
| 10 | Wizz Air, Budapest – Milánó | 2 óra 10 perc késés | NEM VIHETŐ (1.) | NEM VIHETŐ | ✅ Egyezik |

**Összesítés:** 7 rögzített esetből 6 egyezett (86%).
\* A teszt óta a jogászokkal pontosított szabályok szerint ezeknek az eseteknek a várt eredménye megváltozott (időjárás → bizonytalan; nem EU-s érkező járat → nem vihető; 6d → nem vihető), ezért új tesztkör szükséges.

## Az eltérés kezelése

Az 5. esetnél az AI vihetőnek ítélte az ügyet, pedig Budapest nem érintett, és a jogosultság az ügyfél lakcímén múlik, amelyet az AI szándékosan nem lát. Javaslatom a szabály szigorítása volt; a jogászokkal egyeztetve a 6d szabály lett belőle, a módosítás után az esetet újra kell tesztelni.

## Tesztelési módszer

- Előbb az egyértelmű esetek (1., 3., 9.), ha ezek rendben vannak, a lánc alapvetően működik.
- Utána a képviselhetőségi határesetek (5–8.), végül a 2. és 10. eset.
- Futásonként legfeljebb 5 eset, hogy a script ne lépje túl az időkorlátot.
- Értékeléskor a JAVASLAT sor és a hivatkozott szabály számít, nem a pontos megfogalmazás, mert az AI szövege futásonként eltérhet.
- Hibaüzenet (pl. `credit_balance_exhausted`) az API-egyenleg vagy a kulcs hibáját jelzi, nem a teszteset hibáját.

## Költségmérés

A 7 teszt összesen kb. 0,03 USD-t fogyasztott, vagyis kb. 0,004 USD értékelésenként, a nyilvános árlista alapján készült becslés alsó határán.
