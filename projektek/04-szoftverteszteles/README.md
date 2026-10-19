# Szoftvertesztelés és minőségbiztosítás

2016 óta dolgozom szoftvertesztelőként, manuális teszteléstől a tesztautomatizálásig. Ez a háttér határozza meg, ahogyan ma AI-eszközökkel fejlesztek: minden rendszerhez várt eredményekkel ellátott tesztforgatókönyvet írok, és az eltéréseket dokumentálom.

## Szakmai előzmények

| Időszak | Pozíció | Cég | Fő feladatok |
|---------|---------|-----|--------------|
| 2022 – | Test Automation Engineer | Morgan Stanley | Tesztautomatizálás (jelenleg szülői szabadságon) |
| 2021 – 2022 | Software QA Tester (szerződéses) | ITware | Android tabletes alkalmazás manuális tesztelése |
| 2020 – 2022 | QA Test Automation Engineer | Voodoo Park | Automata tesztek .NET/C# keretrendszerben, Gherkin/Cucumber tesztesetek, Git, Jenkins, Visual Studio, Jira Xray, akadálymentességi webtesztelés, backend API-tesztelés (Swagger, Insomnia), Drupal/CMS-alapú oldalak, Figma, InVision, Windows és Mac |
| 2020 | Manual Tester | Intland Software | Tesztesetek és tesztdokumentáció írása, regressziós tesztelés, Windows és Linux szerver, codeBeamer |
| 2018 – 2020 | Test Specialist | IBM | Manuális és automatizált tesztfuttatás, tesztforgatókönyvek írása, Selenium, Angular |
| 2017 – 2018 | Project Manager | Capsys Informatikai Kft. | Dokumentáció, prezentációk, kapcsolattartás az üzleti, pénzügyi, fejlesztési és BA-területtel |
| 2016 – 2017 | Software Tester | ITware Kft. | Tesztesetek dokumentálása és futtatása, TestLink, Jira, Confluence, kommunikáció a fejlesztőkkel |

**Eszközök:** Selenium · .NET/C# · Gherkin/Cucumber · Jenkins · Git · Visual Studio · Jira (Xray) · TestLink · Confluence · codeBeamer · Swagger · Insomnia · Figma · InVision

## Friss munkák

### Weboldal-teszttervezés – jogi iroda kártérítési weboldala

Átfogó teszttervet készítettem egy WordPress/Elementor alapú, ügyféladatot gyűjtő weboldalhoz. A terv területei:

- funkcionális tesztelés (űrlapok, navigáció, CTA-k)
- design és reszponzivitás
- akadálymentesség
- teljesítmény
- biztonság
- GDPR-megfelelés

**Két kiemelt megállapítás:**
1. Valószínűsíthetően duplikált fejléc-CTA a DOM-ban (akadálymentességi és SEO-kockázat)
2. Nem igazolt GDPR-hozzájárulási jelölőnégyzet a kárigénylő űrlapon a személyes adatok beküldése előtt

### AI-válaszok validálása

Az [ügyintézési automatizáció](../01-ugyintezesi-automatizacio/) AI-előszűréséhez 10 esetes tesztforgatókönyvet írtam várt eredményekkel, határesetekkel és ajánlott futtatási sorrenddel: [tesztforgatókönyv](../01-ugyintezesi-automatizacio/tesztforgatokonyv.md).
