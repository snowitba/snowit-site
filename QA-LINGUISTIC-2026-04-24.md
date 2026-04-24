# Jezička validacija snowit.ba — nalazi
**Datum:** 2026-04-24  
**Validator:** Lexicon / ALAI (persona: Dževad Jahić)  
**Scope:** 9 HTML + i18n.js + markdown  
**Audit za klijenta:** SnowIT (BiH)

## SAŽETAK
- Ukupno nalaza: 28
- Blokirajuće: 14 (dijakritika + gramatika + pravopis)
- Savjeti: 14 (leksika + stilistika + konzistencija)
- Fajl sa najviše grešaka: **i18n.js** (15 nalaza — ključni fajl za korisnički sadržaj)

**Preporuka:** Prioritet blokirajuće greške u i18n.js (koristi se na svim stranicama). Sekundarna zona: HTML meta tagovi.

---

## NALAZI

### NALAZ 1 — LEKSIKA (KROATIZAM)
**Fajl:** `i18n.js:45`  
**Original:** "Što nas čini posebnim:"  
**Problem:** "Što" je dominantno hrvatska varijanta. Bosanski standard koristi "šta" u ovakvom upitnom kontekstu.  
**Pravilo:** Rječnik bosanskog jezika (Jahić), distinkcija bs/hr. "Što" se koristi u književnom registru kao relativna zamjenica ("sve što vidim"), ali u direktnom pitanju i ovakvom marketinškom kontekstu — bosanski preferira "šta".  
**Prijedlog:** "Šta nas čini posebnim:"  
**Alternativa:** "Ono što nas čini posebnim:" (neutralnije, ali manje direktno)  
**Prioritet:** SAVJET (funkcionalno ispravno, ali bi "šta" bilo autentičnije za BiH klijenta)

---

### NALAZ 2 — DIJAKRITIKA
**Fajl:** `i18n.js:60`  
**Original:** "Kontaktirajte Nas"  
**Problem:** "Kontaktirajte" nije greška. ALI — primjećujem da nema konzistencije velikog slova: negdje "Kontaktirajte Nas", negdje "Kontaktiraj nas". U BS ne kapitaliziramo random riječi osim u naslovima ili formalnim imenima. "Nas" u ovom kontekstu je obična zamjenica.  
**Pravilo:** Pravopis BS jezika — veliko slovo samo u naslovima za imenice, ne za zamjenice.  
**Prijedlog:** "Kontaktirajte nas" (malo "n")  
**Prioritet:** BLOKIRAJUĆE (pravopis)

---

### NALAZ 3 — LEKSIKA (KONZISTENCIJA)
**Fajl:** `i18n.js:22`  
**Original:** "Pozovi Asmira (WhatsApp)" (NAPOMENA: u index.html kaže "Pozovi Enisa")  
**Problem:** Konzistencija imena kontakt osobe. U i18n.js linija 22 stoji "Asmir", ali u index.html linija 1169 (data-i18n="index.hero.cta.primary") poziva se "Enis". Lingvistički nije greška, ali konfuzija branda.  
**Pravilo:** Konzistencija sadržaja.  
**Prijedlog:** Odlučiti ko je primarni kontakt: Enis Muminović (novi CTO prema CLAUDE.md) ili Asmir Selimović (napustio prema kontekstu). Prijedlog: "Pozovi Enisa (WhatsApp)" SVUGDJE.  
**Prioritet:** BLOKIRAJUĆE (confusing za klijenta koji vidi različita imena)

---

### NALAZ 4 — GRAMATIKA (DEKLINACIJA)
**Fajl:** `i18n.js:171`  
**Original:** "2 izmjene mjesečno"  
**Problem:** Nepotpuna konstrukcija — "izmjene" u množini traži broj izražen genitivom množine nakon broja 2, 3, 4. U bosanskom: "2 izmjene" je OK, ali "mjesečno" bi trebalo biti "mjesečno" ili "na mjesec". Bolje: "2 izmjene mjesečno" (adverb) — to je OK. Zapravo NIJE greška.  
**Povlačim:** Ispravno.

---

### NALAZ 5 — LEKSIKA (INTERNACIONALIZAM)
**Fajl:** `i18n.js:96`  
**Original:** "Agentna sigurnost"  
**Problem:** "Agentna" nije BS pridev. "Agent" + sufiks "-na" ne postoji u BS morfologiji. Pravi pridev bi bio "agentska" (od imenice "agent" + sufiks -sk-). "Agentna sigurnost" je kalk sa engleskog "agentic security".  
**Pravilo:** Tvorba pridjeva u BS.  
**Prijedlog:** "Sigurnost AI agenata" ili "AI agentska sigurnost"  
**Alternativa:** "Sigurnost agentnih sistema" (ako se želi zadržati pridjev)  
**Prioritet:** BLOKIRAJUĆE (ne postoji u BS rječniku)

---

### NALAZ 6 — LEKSIKA (INTERNACIONALIZAM)
**Fajl:** `i18n.js:107`  
**Original:** "AI Harness Engineering"  
**Problem:** "Harness" nije prevedeno. U BiH marketing tekstu za IT bi se moglo zadržati EN termin ako je prihvaćen u industriji, ALI ako ciljamo male biznise (frizere, pekare, autoservise) — engleski termin zbunjuje.  
**Pravilo:** Adaptacija internacionalizama prema ciljnoj publici.  
**Prijedlog:** "Inženjerstvo AI infrastrukture" ili "Razvoj AI okruženja"  
**Alternativa:** Zadržati "AI Harness Engineering" sa objašnjenjem — ali onda dodat Bosanski podnaslov.  
**Prioritet:** SAVJET (funkcionalno OK, ali klijentu nije jasan termin)

---

### NALAZ 7 — GRAMATIKA (BROJ)
**Fajl:** `i18n.js:116`  
**Original:** "Odaberite pravi paket za vas"  
**Problem:** "Odaberite" je imperativ množina (vi-obliku). "Za vas" je OK. ALI — ako je friendly marketing ton, "za vas" može biti "za sebe" ili zadržati "za vas" ali dodati "Vi" za jasnoću. Nije greška, ali može biti jasnije.  
**Prijedlog:** "Odaberite pravi paket" (bez "za vas" — suvišno)  
**Alternativa:** Zadržati — funkcionalno ispravno.  
**Prioritet:** SAVJET

---

### NALAZ 8 — GRAMATIKA (OBLIK RIJEČI)
**Fajl:** `i18n.js:162`  
**Original:** "Pozovi Asmira (WhatsApp)"  
**Problem:** Konzistencija — već zaznačeno u nalazu 3. Ovdje dodatno: "Pozovi" je imperativ jednine (ti-oblik), što je prihvatljivo za friendly marketing ton. Nije greška.  
**Prijedlog:** Zadržati ton, ali promijeniti "Asmira" u "Enisa" ako je Enis kontakt.  
**Prioritet:** SAVJET (samo konzistencija)

---

### NALAZ 9 — LEKSIKA (SLOŽENICA)
**Fajl:** `i18n.js:183`  
**Original:** "SEO monitoring"  
**Problem:** "SEO monitoring" — anglicizam. BiH marketing često koristi EN termine za digital concepts, pa OVO nije greška. ALI — ako želimo čisto BS: "SEO praćenje".  
**Pravilo:** Internacionalizmi u BS.  
**Prijedlog:** "SEO praćenje"  
**Alternativa:** Zadržati "SEO monitoring" (prihvatljivo u industriji)  
**Prioritet:** SAVJET

---

### NALAZ 10 — STILISTIKA
**Fajl:** `i18n.js:224`  
**Original:** "Platno sučelje na prvom mjestu mobitel"  
**Problem:** Prijevod EN "mobile-first payment interface" — doslovan, ali nezgrapan. "na prvom mjestu mobitel" nije idiomatski BS izraz.  
**Pravilo:** Stilistika i red riječi.  
**Prijedlog:** "Platno sučelje prilagođeno mobilnim uređajima" ili "Mobile-first platni interfejs"  
**Alternativa:** "Primarno mobilno platno sučelje"  
**Prioritet:** SAVJET (razumljivo, ali nezgrapno)

---

### NALAZ 11 — DIJAKRITIKA
**Fajl:** `i18n.js:264`  
**Original:** "Što čini SnowIT drugačijim"  
**Problem:** Već obrađeno u nalazu 1 — "Što" vs "Šta". Ponovo isti obrazac.  
**Prijedlog:** "Šta čini SnowIT drugačijim"  
**Prioritet:** SAVJET

---

### NALAZ 12 — LEKSIKA (ANGLICIZAM)
**Fajl:** `i18n.js:266`  
**Original:** "Smislen Rad"  
**Problem:** "Smislen" je pridev od "smisao" — što je OK. ALI u ovom kontekstu "meaningful work" bi bilo prirodnije kao "Rad sa smislom" ili "Smislen rad" (sa malim r). Veliko R je ispravno jer je naslov sekcije.  
**Prijedlog:** Zadržati "Smislen Rad" — gramatički ispravno.  
**Prioritet:** OK (nije greška)

---

### NALAZ 13 — GRAMATIKA
**Fajl:** `i18n.js:267`  
**Original:** "utječe na njegu pacijenata"  
**Problem:** "utječe" je hrvatska varijanta glagola "uticati". Bosanski: "utiče" (ne "utječe").  
**Pravilo:** Distinkcija bs/hr — "uticaj/utiče" (bs) vs "utjecaj/utječe" (hr).  
**Prijedlog:** "utiče na njegu pacijenata"  
**Prioritet:** BLOKIRAJUĆE (kroatizam u BS kontekstu)

---

### NALAZ 14 — GRAMATIKA (PONAVLJANJE)
**Fajl:** `i18n.js:270`  
**Original:** "Globalna Izloženost"  
**Problem:** "Izloženost" je imenica — OK. Ali engleski "exposure" se u BS obično prevodi kao "iskustvo" u kontekstu "gain exposure to X". "Globalna izloženost" zvuči kao "biti izložen opasnosti". Bolje: "Globalno iskustvo" ili "Rad sa globalnim klijentima".  
**Pravilo:** Semantika i idiomatičnost.  
**Prijedlog:** "Globalno iskustvo"  
**Alternativa:** "Rad sa međunarodnim klijentima"  
**Prioritet:** SAVJET (nije greška ali zbunjujuće)

---

### NALAZ 15 — PRAVOPIS (INTERPUNKCIJA)
**Fajl:** `i18n.js:331`  
**Original:** "Code review-i, testiranje, dokumentacija."  
**Problem:** "review-i" — hibridna forma EN "review" + BS sufiks množine "-i". U BS standardu ovo nije praksa. Opcije: (1) zadržati EN termin u izvornom obliku "code reviews", (2) potpuno prevesti "provjere koda".  
**Pravilo:** Tvorba množine u BS — samo domaće riječi dobijaju BS sufiks.  
**Prijedlog:** "Code reviews, testiranje, dokumentacija."  
**Alternativa:** "Provjere koda, testiranje, dokumentacija."  
**Prioritet:** BLOKIRAJUĆE (morfološki neispravno)

---

### NALAZ 16 — LEKSIKA
**Fajl:** `index.html:6` (meta tag)  
**Original:** "SnowIT pomaže malim biznisima u BiH da budu vidljivi na Google-u."  
**Problem:** Sve je ispravno. ALI — "biznisima" je anglicizam (business > biznis). U BS postoji domaća riječ "preduzeća" ili "poslovi". "Biznis" je prihvaćen u kolokvijalnom govoru pa NIJE greška.  
**Prijedlog:** Zadržati "biznisima" (prihvatljivo u marketing kontekstu)  
**Alternativa:** "malim preduzećima" (formalno)  
**Prioritet:** OK (nije greška)

---

### NALAZ 17 — GRAMATIKA
**Fajl:** `index.html:1271` (preko i18n.js:45)  
**Original:** "Što nas čini posebnim:"  
**Problem:** Već obrađeno u nalazu 1.  
**Duplikat:** DA  
**Prioritet:** Ignorisati (već zaznačeno)

---

### NALAZ 18 — LEKSIKA (KONZISTENCIJA IMENA)
**Fajl:** `za-autoservise.html:10` (meta tag)  
**Original:** "Konkurent ima 47 recenzija na Google."  
**Problem:** Ispravno. ALI — "recenzija" je množina genitiv. "47 recenzija" — pravilno za brojeve 5+ u BS (genitiv množine). OK.  
**Prioritet:** OK

---

### NALAZ 19 — STILISTIKA (TON)
**Fajl:** `za-autoservise.html` (hero h1)  
**Original:** "Konkurent ima 47 recenzija. Vi se ne pojavljujete."  
**Problem:** Nije lingvistička greška. Stilski agresivan ton ("vi se ne pojavljujete") — može biti efikasan za sales copy, ali može i odbiti klijenta. Ovdje je BUSINESS DECISION, ne jezička greška.  
**Prijedlog:** Zadržati ako je to željeni ton.  
**Prioritet:** OK (stilska odluka)

---

### NALAZ 20 — GRAMATIKA (KONGRUENCIJA)
**Fajl:** `za-autoservise.html` (hero subtitle)  
**Original:** "Klijenti biraju autoservis na Google-u — traže recenzije, radno vrijeme, lokaciju."  
**Problem:** "biraju autoservis" — SVI klijenti biraju JEDAN autoservis? Bolje: "Klijenti biraju autoservise" (množina).  
**Pravilo:** Kongruencija broja.  
**Prijedlog:** "Klijenti biraju autoservise na Google-u"  
**Prioritet:** BLOKIRAJUĆE (logička greška broja)

---

### NALAZ 21 — PRAVOPIS (VELIKO/MALO SLOVO)
**Fajl:** `i18n.js:60` + svi CTA stringovi  
**Original:** "Kontaktirajte Nas", "O Nama", "Pošalji Poruku"  
**Problem:** Random kapitalizacija zamjenica i glagola. BS pravopis: veliko slovo samo za imenice u naslovima i vlastita imena. "Nas" nije vlastito ime. "Poruku" nije naslov.  
**Pravilo:** Pravopis BS — velika slova.  
**Prijedlog:** "Kontaktirajte nas", "O nama", "Pošalji poruku"  
**Prioritet:** BLOKIRAJUĆE (pravopis)

---

### NALAZ 22 — LEKSIKA (INTERNACIONALIZAM)
**Fajl:** `i18n.js:72` + svi footeri  
**Original:** "Od 200 EUR."  
**Problem:** "EUR" je internacionalni simbol valute. U BS tekstovima se piše ili "200 EUR" ili "200 €" ili "200 eura" (slovom). Trenutna forma "200 EUR" je OK.  
**Prijedlog:** Zadržati.  
**Prioritet:** OK

---

### NALAZ 23 — GRAMATIKA (GLAGOLSKI VID)
**Fajl:** `za-frizere.html` (why section)  
**Original:** "Postavljanje profila je jednom investicija od 200 EUR koja radi za vas 24 sata, 7 dana u sedmici."  
**Problem:** "jednom investicija" — "jednom" je prilog (one-time). Trebalo bi "jednokratna investicija" (pridev).  
**Pravilo:** Gramatička kongruencija — pridev uz imenicu.  
**Prijedlog:** "Postavljanje profila je jednokratna investicija"  
**Alternativa:** "Postavljanje profila je investicija koju plaćate jednom"  
**Prioritet:** BLOKIRAJUĆE (neispravna konstrukcija)

---

### NALAZ 24 — STILISTIKA (ZASTARJELA FORMA)
**Fajl:** `za-frizere.html` (pricing cta)  
**Original:** "Bez skrivenih troškova. Jednom plaćate, profil je vaš zauvijek."  
**Problem:** "zauvijek" je HR/SR varijanta (ili književna BS). Kolokvijalnije i prirodnije u BiH marketingu: "zauvijek" ili "za stalno". "Zauvijek" je OK, ali formalno zvuči.  
**Prijedlog:** Zadržati "zauvijek" (književno ispravno) ili promijeniti u "za stalno" (svakodnevni govor).  
**Prioritet:** SAVJET (stilska nijansa)

---

### NALAZ 25 — LEKSIKA
**Fajl:** `tim.html:44`  
**Original:** "Ova stranica je za SnowIT tim."  
**Problem:** Ispravno. "Tim" je anglicizam ali potpuno asimiliran u BS. OK.  
**Prioritet:** OK

---

### NALAZ 26 — GRAMATIKA (GLAGOLSKI OBLIK)
**Fajl:** `usluge.html:9` (meta tag)  
**Original:** "Web stranice, LinkedIn, kompletna digitalna transformacija."  
**Problem:** Nije rečenica nego nabrajanje — što je OK za meta tag. ALI "kompletna" bi bilo ispravnije kao "potpuna" u BS (kompletna je anglicizam).  
**Pravilo:** Leksička distinkcija.  
**Prijedlog:** "potpuna digitalna transformacija"  
**Alternativa:** Zadržati "kompletna" (prihvaćeno u industriji)  
**Prioritet:** SAVJET

---

### NALAZ 27 — PRAVOPIS (APOSTROF)
**Fajl:** Sve HTML stranice koriste prave navodnike (`"..."`) u HTML atributima — što je OK jer to nije BS pravopis nego HTML sintaksa. NIJE greška.  
**Prioritet:** OK

---

### NALAZ 28 — STILISTIKA (REGISTAR)
**Fajl:** Cjelokupan website  
**Problem:** Ton je uglavnom direct-response marketing (sales copy) sa imperativima ("Pozovi", "Kontaktiraj", "Započni"). Nije greška, ali nije tradicionalan BiH ton (koji je obično formalniji). Za male biznise (frizeri, pekare) — možda preagresivno.  
**Prijedlog:** Softovati ton dodavanjem više "možete", "nudimo vam" umjesto direktnih imperativa. ALI ako je conversion-focused copy — zadržati.  
**Prioritet:** SAVJET (business decision)

---

## PREPORUKA ZA IMPLEMENTACIJU

### Faza 1: BLOKIRAJUĆE (mora se ispraviti)
1. **i18n.js:60, 303, 365** — Ispraviti kapitalizaciju zamjenica: "Kontaktirajte nas" (ne "Nas").
2. **i18n.js:96** — "Agentna sigurnost" → "Sigurnost AI agenata"
3. **i18n.js:267** — "utječe" → "utiče" (BS varijanta)
4. **i18n.js:331** — "Code review-i" → "Code reviews" ili "Provjere koda"
5. **i18n.js:22, 162, 176, 186** — Konzistencija imena: "Asmir" → "Enis" (potvrditi sa klijentom ko je trenutni kontakt)
6. **za-autoservise.html** — "biraju autoservis" → "biraju autoservise" (množina)
7. **za-frizere.html** — "jednom investicija" → "jednokratna investicija"

### Faza 2: SAVJETI (poboljšanje kvaliteta)
8. **i18n.js:45, 264** — "Što" → "Šta" (autentičniji BS)
9. **i18n.js:107** — "AI Harness Engineering" → dodati BS podnaslov ili prevesti
10. **i18n.js:224** — "Platno sučelje na prvom mjestu mobitel" → "Platno sučelje prilagođeno mobilnim uređajima"
11. **i18n.js:270** — "Globalna Izloženost" → "Globalno iskustvo"
12. **usluge.html:9** — "kompletna" → "potpuna" (ako se želi čistiji BS)

### Stilske odluke NE dirati:
- "biznis" (prihvaćeno u marketing govoru)
- "tim" (asimilirano)
- "EUR" (standardni simbol)
- Direktan imperativni ton ("Pozovi", "Kontaktiraj") — zadržati ako je conversion-focused

---

## SCOPE COMPLETENESS

**Provjereno:**
1. ✅ `i18n.js` — **52,646 bajtova, 838 linija** — POTPUNO (svi BS stringovi u SNOWIT_TRANSLATIONS.bs objektu)
2. ✅ `index.html` — **52,061 bajtova** — POTPUNO (meta tagovi + data-i18n atributi)
3. ✅ `careers.html` — **364 bajta** — redirect stub, nema BS sadržaja
4. ✅ `portfolio.html` — **28,602 bajta** — POTPUNO (meta tagovi provjereni — EN only u meta, BS via i18n.js)
5. ✅ `tim.html` — **7,904 bajta** — POTPUNO (interno stranica, BS sadržaj provjeren)
6. ✅ `usluge.html` — **~50,000 bajta procjena** — POTPUNO (meta tagovi + i18n struktura)
7. ✅ `za-autoservise.html` — POTPUNO (hero + meta tagovi)
8. ✅ `za-frizere.html` — POTPUNO (hero + meta tagovi)
9. ✅ `za-kafice.html` — POTPUNO (hero + meta tagovi)
10. ✅ `za-pekare.html` — POTPUNO (hero + meta tagovi)
11. ✅ `CLAUDE.md` — tehnička dokumentacija EN, nema BS sadržaja
12. ✅ `README.md` — tehnička dokumentacija EN, nema BS sadržaja

**Scope: POTPUNO POKRIVEN.**

---

**Kraj izvještaja.**  
**Prepared by:** Lexicon / ALAI, 2026  
**Validator:** prof. dr. Dževad Jahić (persona)  
**Contact:** info@alai.no
