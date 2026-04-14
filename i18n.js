/**
 * SnowIT i18n — Bosnian (bs) default, English (en) secondary
 * Usage: include this script at the bottom of each page body.
 * Mark translatable elements with data-i18n="key" attribute.
 * For attributes: data-i18n-placeholder="key", data-i18n-title="key"
 */

const SNOWIT_TRANSLATIONS = {
    bs: {
        // Nav
        'nav.home': 'Naslovna',
        'nav.about': 'O nama',
        'nav.usluge': 'Usluge',
        'nav.portfolio': 'Portfolio',
        'nav.careers': 'Karijere',
        'nav.contact': 'Kontakt',
        'nav.cta': 'Upit',

        // Index — Hero
        'index.hero.badge': 'Enterprise IT Partner',
        'index.hero.h1': 'Enterprise IT rješenja iz <span class="highlight">Balkana</span>',
        'index.hero.subtitle': 'Pouzdanost na nivou zdravstvene industrije. Moderno inženjerstvo. Globalni standardi. Gradimo sisteme koji skaliraju.',
        'index.hero.cta.primary': 'Pokreni Projekat',
        'index.hero.cta.ghost': 'Pogledaj Radove',
        'index.hero.card1.title': 'Dostupnost',
        'index.hero.card1.label': 'Dostupnost Sistema',
        'index.hero.card2.title': 'Sigurnost',
        'index.hero.card2.label': 'Usklađeni Sistemi',
        'index.hero.card3.title': 'Tim',
        'index.hero.card3.label': 'Inženjera',

        // Index — Features
        'index.features.h2': 'Što gradimo',
        'index.features.subtitle': 'Enterprise softver koji radi. Bez izuzetaka.',
        'index.features.01.title': 'Zdravstveni Sistemi',
        'index.features.01.desc': 'HIPAA-usklađene platforme za bolnice, klinike i agencije za kućnu njegu. Real-time monitoring, sigurni podaci, nula zastoja.',
        'index.features.02.title': 'Enterprise Integracija',
        'index.features.02.desc': 'Povežite legacy sisteme s modernom infrastrukturom. API-ji, mikroservisi i data pipeline-ovi koji skaliraju s vašim poslovanjem.',
        'index.features.03.title': 'Cloud Infrastruktura',
        'index.features.03.desc': 'Multi-cloud arhitektura, automatizirani deployment-i i 24/7 monitoring. Vaši sistemi rade, mi brinemo o ostatku.',

        // Index — About
        'index.about.label': 'O SnowIT-u',
        'index.about.h2': 'Enterprise IT iz Balkana',
        'index.about.p1': 'SnowIT je kompanija za razvoj softvera sa sjedištem u Sarajevu, Bosna i Hercegovina, specijalizirana za zdravstvenu tehnologiju i enterprise softver za tržišta SAD-a i EU.',
        'index.about.unique': 'Što nas čini posebnim:',
        'index.about.li1': 'Specijalizacija u zdravstvu s HIPAA ekspertizom',
        'index.about.li2': 'AI-augmented razvoj za bržu isporuku',
        'index.about.li3': '50% profita doniramo u dobrotvorne svrhe',
        'index.about.li4': 'Inženjerstvo europskog kvaliteta po konkurentnim cijenama',
        'index.about.stat1.label': 'Godina Iskustva',
        'index.about.stat2.label': 'Isporučenih Projekata',
        'index.about.stat3.label': 'Dostupnost SLA',
        'index.about.stat4.label': 'Profita za Dobrotvorne',

        // Index — Contact
        'index.contact.label': 'Kontaktirajte Nas',
        'index.contact.h2': 'Izgradimo Nešto Sjajno',
        'index.contact.desc': 'Spremni za vaš sljedeći projekat? Kontaktirajte nas za besplatnu konsultaciju.',
        'index.contact.location': 'Sarajevo, Bosna i Hercegovina',
        'index.contact.label.name': 'Ime',
        'index.contact.label.email': 'Email',
        'index.contact.label.company': 'Kompanija',
        'index.contact.label.company.optional': '(opcionalno)',
        'index.contact.label.message': 'Poruka',
        'index.contact.placeholder.name': 'Vaše ime',
        'index.contact.placeholder.company': 'Vaša kompanija',
        'index.contact.placeholder.message': 'Recite nam o vašem projektu...',
        'index.contact.btn.send': 'Pošalji Poruku',
        'index.contact.alt': 'Ili nam pišite direktno na',

        // Footer
        'footer.tagline': 'Enterprise IT rješenja iz Balkana. Pouzdanost na nivou zdravstvene industrije. Moderno inženjerstvo.',
        'footer.services': 'Usluge',
        'footer.services.healthcare': 'Zdravstveni Sistemi',
        'footer.services.enterprise': 'Enterprise Integracija',
        'footer.services.cloud': 'Cloud Infrastruktura',
        'footer.company': 'Kompanija',
        'footer.company.about': 'O Nama',
        'footer.company.portfolio': 'Portfolio',
        'footer.company.careers': 'Karijere',
        'footer.company.contact': 'Kontakt',
        'footer.copyright': '© 2026 SnowIT. Sva prava zadržana.',
        'footer.credit': '',

        // Usluge — Hero
        'usluge.hero.badge': 'Digitalna transformacija',
        'usluge.hero.h1': 'Lansiranje vašeg <span class="highlight">digitalnog prisustva</span>',
        'usluge.hero.subtitle': 'Web stranica, LinkedIn, email — sve što vam treba da započnete online. Profesionalno. Brzo. Pristupačno.',
        'usluge.hero.stat1.value': '10+ godina',
        'usluge.hero.stat1.label': 'Iskustva',
        'usluge.hero.stat2.value': '15+ inženjera',
        'usluge.hero.stat2.label': 'Tim eksperata',

        // Usluge — AI Services
        'usluge.ai.label': 'Napredne usluge',
        'usluge.ai.h2': 'AI Usluge',
        'usluge.ai.desc': 'Enterprise AI sigurnost i infrastruktura za organizacije koje grade ili deployuju AI sisteme u produkciji.',
        'usluge.ai.card1.badge': 'AI Sigurnost',
        'usluge.ai.card1.title': 'Agentna sigurnost',
        'usluge.ai.card1.desc': 'Procjena prijetnji, testiranje prompt injection napada i zaštita AI agentnih sistema. Osiguravamo vaše AI deployment rješenja prije nego napadači pronađu ranjivosti.',
        'usluge.ai.card1.li1': 'Threat modeling za AI sisteme',
        'usluge.ai.card1.li2': 'Prompt injection testiranje',
        'usluge.ai.card1.li3': 'Pregled privilegija i dozvola',
        'usluge.ai.card1.li4': 'Preporuke za hardening',
        'usluge.ai.card1.cta': 'Kontaktiraj nas',
        'usluge.ai.card2.badge': 'AI Infrastruktura',
        'usluge.ai.card2.title': 'AI Harness Engineering',
        'usluge.ai.card2.desc': 'Dizajn i implementacija produkcijskih AI agent harnessa — multi-model ruting, orkestrator hijerarhije, deterministički alati i horizontalno skaliranje timova.',
        'usluge.ai.card2.li1': 'Arhitektura agent harnessa',
        'usluge.ai.card2.li2': 'Multi-model ruting (cijena/kapacitet)',
        'usluge.ai.card2.li3': 'Orkestracija timova agenata',
        'usluge.ai.card2.li4': 'RAG/LightRAG integracija',
        'usluge.ai.card2.cta': 'Kontaktiraj nas',

        // Usluge — Pricing
        'usluge.pricing.label': 'Naši paketi',
        'usluge.pricing.h2': 'Odaberite pravi paket za vas',
        'usluge.pricing.desc': 'Prilagođeni paketi za svaki biznis. Kontaktirajte nas za ponudu.',
        'usluge.pricing.card1.name': 'Digital Presence',
        'usluge.pricing.card1.desc': 'Osnovna online prisutnost — web stranica, logo, email setup.',
        'usluge.pricing.card1.subtext': '3-5 dana isporuke',
        'usluge.pricing.card1.li1': 'Moderna web stranica (5-10 stranica)',
        'usluge.pricing.card1.li2': 'Profesionalan logo dizajn',
        'usluge.pricing.card1.li3': 'Email setup (yourname@domain.ba)',
        'usluge.pricing.card1.li4': 'DNS & SSL konfiguracija',
        'usluge.pricing.card1.li5': 'Hosting uključen (1 godina)',
        'usluge.pricing.card1.cta': 'Kontaktiraj nas',
        'usluge.pricing.card2.name': 'LinkedIn Launch',
        'usluge.pricing.card2.desc': 'Profesionalna LinkedIn prisutnost sa inicijalnim content planom.',
        'usluge.pricing.card2.subtext': '2-3 dana isporuke',
        'usluge.pricing.card2.li1': 'Company page kreiranje & setup',
        'usluge.pricing.card2.li2': 'Profesionalan banner dizajn',
        'usluge.pricing.card2.li3': '5 inicijalnih postova (grafike + tekst)',
        'usluge.pricing.card2.li4': 'SEO optimizacija profila',
        'usluge.pricing.card2.li5': 'Posting raspored & upustva',
        'usluge.pricing.card2.cta': 'Kontaktiraj nas',
        'usluge.pricing.card3.badge': 'Najpopularniji',
        'usluge.pricing.card3.name': 'Full Digital Start',
        'usluge.pricing.card3.desc': 'Kompletan digitalni start — web, LinkedIn, Google, sve u jednom.',
        'usluge.pricing.card3.subtext': '5-7 dana isporuke',
        'usluge.pricing.card3.li1': '<strong>SVE iz Digital Presence paketa</strong>',
        'usluge.pricing.card3.li2': '<strong>SVE iz LinkedIn Launch paketa</strong>',
        'usluge.pricing.card3.li3': 'Google Business Profile setup',
        'usluge.pricing.card3.li4': 'Google Maps & SEO optimizacija',
        'usluge.pricing.card3.li5': '30 dana tehničke podrške',
        'usluge.pricing.card3.li6': 'Mjesečni SEO report (prvi mjesec)',
        'usluge.pricing.card3.cta': 'Započni sada',

        // Usluge — Process
        'usluge.process.label': 'Kako funkcioniše',
        'usluge.process.h2': 'Jednostavan proces u 3 koraka',
        'usluge.process.step1.title': 'Razgovor',
        'usluge.process.step1.desc': 'Pošaljite upit, odgovaramo odmah. Razgovaramo o vašim potrebama i ciljevima. Definišemo scope projekta.',
        'usluge.process.step2.title': 'Izrada',
        'usluge.process.step2.desc': 'Naš tim razvija sve elemente vašeg digitalnog prisustva. Transparentan proces sa redovnim update-ima.',
        'usluge.process.step3.title': 'Lansiranje',
        'usluge.process.step3.desc': 'Pregled, revizije, finalizacija. Lansiranje vašeg digitalnog prisustva uz kompletnu dokumentaciju i podršku.',

        // Usluge — CTA
        'usluge.cta.h2': 'Spremni za digitalni start?',
        'usluge.cta.desc': 'Kontaktirajte nas danas i započnite vašu digitalnu transformaciju. Besplatna konsultacija za sve nove klijente.',
        'usluge.cta.btn': 'Kontaktirajte nas',

        // Usluge — Footer (specific)
        'usluge.footer.services.usluge': 'Usluge (BA)',

        // Portfolio — Hero
        'portfolio.hero.h1': 'Naši Radovi',
        'portfolio.hero.desc': 'Pogledajte kako smo transformirali operacije za zdravstvene institucije, transportne sisteme i enterprise klijente. Stvarna rješenja, stvarni rezultati.',

        // Portfolio — Case Study 1
        'portfolio.cs1.subtitle': 'Fintech i Plaćanja',
        'portfolio.cs1.title': 'Platna Platforma',
        'portfolio.cs1.desc': 'Moderni platni sistem za Bosnu i regiju, koji omogućava digitalna plaćanja u ekonomiji zavisnoj od gotovine. BLIK-style dizajn, PSD2-usklađen, arhitektura konzorcija banaka. Lansiranje Q1 2026.',
        'portfolio.cs1.stat1.label': 'Volumen Transakcija (Cilj)',
        'portfolio.cs1.stat2.label': 'PCI-DSS Usklađenost',
        'portfolio.cs1.stat3.label': 'Podržanih Banaka',
        'portfolio.cs1.stat4.label': 'Zemalja',
        'portfolio.cs1.tech.label': 'Tehnološki Stack',
        'portfolio.cs1.features.title': 'Osnovne Funkcionalnosti',
        'portfolio.cs1.f1': 'Platno sučelje na prvom mjestu mobitel',
        'portfolio.cs1.f2': 'Direktna integracija banaka (BLIK)',
        'portfolio.cs1.f3': 'Generisanje QR koda za plaćanje',
        'portfolio.cs1.f4': 'Historija transakcija i analitika',
        'portfolio.cs1.f5': 'PCI-DSS Level 1 usklađenost',
        'portfolio.cs1.f6': 'Real-time poravnanje',
        'portfolio.cs1.f7': 'Sistem za detekciju prevare',
        'portfolio.cs1.f8': 'Podrška za više zemalja',

        // Portfolio — Case Study 2
        'portfolio.cs2.subtitle': 'Enterprise Softver',
        'portfolio.cs2.title': 'Modernizacija Legacy Sistema',
        'portfolio.cs2.desc': 'Transformacija legacy enterprise sistema u modernu, cloud-native arhitekturu. Migracija podataka sa 20-godišnjeg monolita na mikroservise. Migracija bez zastoja, 100% integritet podataka sačuvan.',
        'portfolio.cs2.stat1.label': 'Migriranih Podataka',
        'portfolio.cs2.stat2.label': 'Zastoji',
        'portfolio.cs2.stat3.label': 'Poboljšanje Performansi',
        'portfolio.cs2.stat4.label': 'Smanjenje Troškova',
        'portfolio.cs2.tech.label': 'Tehnološki Stack',
        'portfolio.cs2.features.title': 'Rezultati Projekta',
        'portfolio.cs2.f1': 'Kontejnerizirana arhitektura mikroservisa',
        'portfolio.cs2.f2': 'Kubernetes orkestracija u velikom obimu',
        'portfolio.cs2.f3': 'Automatizovani pipeline za deployment (CI/CD)',
        'portfolio.cs2.f4': 'Migracija baze podataka (bez zastoja)',
        'portfolio.cs2.f5': 'Infrastructure as Code (Terraform)',
        'portfolio.cs2.f6': 'Stack za praćenje i monitoring',
        'portfolio.cs2.f7': 'Sistemi za disaster recovery i backup',
        'portfolio.cs2.f8': 'Obuka tima i transfer znanja',

        // Portfolio — CTA
        'portfolio.cta.h3': 'Spremni za Transformaciju Vaših Operacija?',
        'portfolio.cta.desc': 'Porazgovarajmo o tome kako vam SnowIT može pomoći da postignete slične rezultate. Zakažite besplatnu konsultaciju s našim timom.',
        'portfolio.cta.btn': 'Počnite Danas',

        // Careers — Hero
        'careers.hero.badge': 'SnowIT zapošljava',
        'careers.hero.h1': 'Gradite Zdravstvenu Tehnologiju Koja Je Važna',
        'careers.hero.desc': 'Pridružite se osnivačkom timu SnowIT-a. Gradimo budućnost zdravstvenog softvera iz Sarajeva, s utjecajem na pacijente širom SAD-a i dalje.',

        // Careers — Why
        'careers.why.label': 'Zašto nam se pridružiti',
        'careers.why.h2': 'Što čini SnowIT drugačijim',
        'careers.why.c1.title': 'Smislen Rad',
        'careers.why.c1.desc': 'Vaš kod direktno utječe na njegu pacijenata. Gradite zdravstveni softver koji smanjuje administrativno opterećenje i poboljšava kliničke ishode za stvarne agencije i stvarne pacijente.',
        'careers.why.c2.title': '50% za Dobrotvorne',
        'careers.why.c2.desc': 'Doniramo polovinu profita zdravstvenim dobrotvornim organizacijama. Svaki projekat na kojem radite finansira pristup zdravstvenoj zaštiti zajednicama u potrebi. Profit s ciljem.',
        'careers.why.c3.title': 'Globalna Izloženost',
        'careers.why.c3.desc': 'Radite s klijentima iz SAD-a i EU. Naučite međunarodne standarde (HIPAA, HL7 FHIR, PCI-DSS). Izgradite ekspertizu na projektima koji su globalno važni.',
        'careers.why.c4.title': 'AI-Augmented Razvoj',
        'careers.why.c4.desc': 'Koristimo napredne AI alate (Claude, GitHub Copilot) za rutinski kod. Vi se fokusirate na teške probleme, zanimljivu arhitekturu i stvarnu inovaciju.',
        'careers.why.c5.title': 'Konkurentna Plata + Kapital',
        'careers.why.c5.desc': 'Plate iznad tržišnog prosjeka za Bosnu. Dijeljenje profita za članove osnivačkog tima. Plaćamo za talent i nagrađujemo rezultate.',
        'careers.why.c6.title': 'Remote-First Kultura',
        'careers.why.c6.desc': 'Radite iz našeg sarajevskog ureda ili od kuće. Fleksibilan raspored, async-first komunikacija, poštovanje ravnoteže posla i privatnog života. Vi upravljate vlastitim vremenom.',

        // Careers — Jobs
        'careers.jobs.h2': 'Otvorene Pozicije',
        'careers.jobs.desc': 'Aktivno zapošljavamo talentirane inženjere. Prijavite se ili nas kontaktirajte na',
        'careers.jobs.desc2': 'ako imate pitanja.',
        'careers.job1.title': 'Senior Full-Stack Programer',
        'careers.job1.location': 'Sarajevo / Remote',
        'careers.job1.experience': '5+ godina iskustva',
        'careers.job1.desc': 'Vodite razvoj naše HIPAA-usklađene zdravstvene platforme. Bit ćete odgovorni za arhitekturu funkcionalnosti, mentorstvo mlađih programera i direktan rad s klijentima u zdravstvu. Ovo je uloga u osnivačkom timu s pravim utjecajem.',
        'careers.job1.techstack.label': 'Tehnološki Stack',
        'careers.job1.type.label': 'Vrsta',
        'careers.job1.type.value': 'Puno radno vrijeme, Stalno',
        'careers.job1.req.h4': 'Tražene Vještine',
        'careers.job1.req1': '5+ godina full-stack razvoja',
        'careers.job1.req2': 'Expertiza u Reactu (TypeScript poželjno)',
        'careers.job1.req3': 'Node.js / Express backend',
        'careers.job1.req4': 'PostgreSQL dizajn baze podataka',
        'careers.job1.req5': 'AWS ili cloud infrastruktura',
        'careers.job1.req6': 'Znanje o zdravstvu/usklađenosti (prednost)',
        'careers.job1.apply': 'Apliciraj Sada',
        'careers.job2.title': 'Full-Stack Programer',
        'careers.job2.location': 'Sarajevo / Remote',
        'careers.job2.experience': '2-4 godine iskustva',
        'careers.job2.desc': 'Razvijajte funkcionalnosti za naše platforme za zdravstvo i plaćanja. Radite na stvarnim izazovima u zdravstvu i fintechu. Imat ćete mentorstvo od našeg senior tima i razvijati vještine na produkcijskim sistemima.',
        'careers.job2.techstack.label': 'Tehnološki Stack',
        'careers.job2.type.label': 'Vrsta',
        'careers.job2.type.value': 'Puno radno vrijeme, Stalno',
        'careers.job2.req.h4': 'Tražene Vještine',
        'careers.job2.req1': '2-4 godine razvojnog iskustva',
        'careers.job2.req2': 'Dobro poznavanje Reacta',
        'careers.job2.req3': 'Neko backend iskustvo (Node.js, Python, itd)',
        'careers.job2.req4': 'Osnove SQL/baza podataka',
        'careers.job2.req5': 'Git i kontrola verzija',
        'careers.job2.req6': 'Portfolio ili GitHub projekti',
        'careers.job2.apply': 'Apliciraj Sada',
        'careers.job3.title': 'DevOps / Cloud Inženjer',
        'careers.job3.location': 'Sarajevo / Remote',
        'careers.job3.experience': '3+ godine iskustva',
        'careers.job3.desc': 'Dizajnirajte i održavajte HIPAA-usklađenu cloud infrastrukturu. Bavit ćete se AWS-om, Kubernetesom, CI/CD pipeline-ima i infrastructure-as-code za zdravstvene sisteme. Ova uloga je ključna za našu fazu skaliranja.',
        'careers.job3.techstack.label': 'Tehnološki Stack',
        'careers.job3.type.label': 'Vrsta',
        'careers.job3.type.value': 'Puno radno vrijeme, Stalno',
        'careers.job3.req.h4': 'Tražene Vještine',
        'careers.job3.req1': '3+ godina cloud/DevOps iskustva',
        'careers.job3.req2': 'Poznavanje AWS-a (EC2, RDS, S3)',
        'careers.job3.req3': 'Docker i kontejnerizacija',
        'careers.job3.req4': 'Osnove Kubernetesa',
        'careers.job3.req5': 'Infrastructure-as-Code (Terraform)',
        'careers.job3.req6': 'Znanje HIPAA/usklađenosti (prednost)',
        'careers.job3.apply': 'Apliciraj Sada',

        // Careers — Culture
        'careers.culture.label': 'Kako radimo',
        'careers.culture.h2': 'Naše Vrijednosti i Kultura',
        'careers.culture.v1.title': 'Kvalitet Prije Svega',
        'careers.culture.v1.desc': 'Isporučujemo solidan kod, ne brze zakrpe. Code review-i, testiranje, dokumentacija. Ponosni smo na ono što gradimo.',
        'careers.culture.v2.title': 'Transparentnost i Poštenje',
        'careers.culture.v2.desc': 'Bez korporativnog BS-a. Direktan feedback, jasni prioriteti, iskrenost o izazovima. Poštujemo vašu inteligenciju.',
        'careers.culture.v3.title': 'Kontinuirano Učenje',
        'careers.culture.v3.desc': 'Budžet za kurseve, konferencije i alate. Rastemo zajedno. Zdravstvo + fintech = uvijek učimo.',
        'careers.culture.v4.title': 'Misijsko Orijentisani',
        'careers.culture.v4.desc': 'Naša obaveza od 50% za dobrotvorne znači da vaš rad ima stvarni utjecaj. Gradite nešto što je važno.',
        'careers.culture.v5.title': 'Povjerenje i Vlasništvo',
        'careers.culture.v5.desc': 'Vi ste vlasnici vaših projekata. Bez mikromenadžmenta. Zapošljavamo pametne ljude i vjerujemo im da rade odlično.',
        'careers.culture.v6.title': 'Ravnoteža Posla i Privatnog',
        'careers.culture.v6.desc': 'Remote-first, fleksibilno radno vrijeme. Poštovanje vašeg vremena i privatnog života. Iscrpljenost ovdje nije znak časti.',

        // Careers — FAQ
        'careers.faq.label': 'Pitanja?',
        'careers.faq.h2': 'Često Postavljana Pitanja',
        'careers.faq.q1': 'Trebam li iskustvo u zdravstvu da apliciram?',
        'careers.faq.a1': 'Uopće ne. Zapošljavamo na osnovu tehničkih vještina i sposobnosti rješavanja problema. Naučit ćemo vas najboljim praksama u zdravstvu, HIPAA usklađenosti i industrijskim standardima. Vaše inženjenske vještine se lako prenose.',
        'careers.faq.q2': 'Je li dostupan remote rad?',
        'careers.faq.a2': 'Da, 100%. Smo remote-first. Imamo ured u Sarajevu za one koji to žele, ali remote je naš standard. Radite od bilo gdje, pod uvjetom da možete osigurati preklapanje 8:00-17:00 CET za sastanke.',
        'careers.faq.q3': 'Koji je raspon plata?',
        'careers.faq.a3': 'Navedeno u svakom opisu posla. Plaćamo iznad tržišnih cijena za Bosnu/regiju. Konkurentno s EU platama. Za članove osnivačkog tima nudimo kapital/dijeljenje profita. Plate su transparentne — bez iznenađenja.',
        'careers.faq.q4': 'Kakav je proces zapošljavanja?',
        'careers.faq.a4': 'Brz i respektabilan: 1) Telefonski razgovor (30 min) 2) Tehnički zadatak (kod kuće, realan) 3) Tehnički intervju (90 min) 4) Razgovor o kulturi. Ukupno: 1-2 sedmice. Brzo se krećemo.',
        'careers.faq.q5': 'Nudite li beneficije?',
        'careers.faq.a5': 'Da. Zdravstveno osiguranje (pokrivamo 100%), budžet za laptop/opremu, budžet za profesionalni razvoj, fleksibilno radno vrijeme, neograničen godišnji odmor (razumno). Još smo startup, ali brinemo o timu.',
        'careers.faq.q6': 'Koliko dugo traju projekti?',
        'careers.faq.a6': 'Obično 6-18 mjeseci po velikom projektu. Naša zdravstvena platforma je naš glavni fokus. Ne skačemo između klijenata svaki mjesec. Imat ćete kontinuitet i duboko znanje o onome što gradite.',

        // Careers — CTA
        'careers.cta.h3': 'Spremni da Izgradite Nešto Smisleno?',
        'careers.cta.desc': 'Pošaljite CV, portfolio i kratku napomenu o tome zašto ste zainteresovani. Javit ćemo se unutar 48 sati.',
        'careers.cta.btn': 'Apliciraj Sada',
        'careers.cta.questions': 'Ili pitanja?',
        'careers.cta.email': 'Pišite nam',
    },

    en: {
        // Nav
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.usluge': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.careers': 'Careers',
        'nav.contact': 'Contact',
        'nav.cta': 'Get Quote',

        // Index — Hero
        'index.hero.badge': 'Enterprise IT Partner',
        'index.hero.h1': 'Enterprise IT solutions from the <span class="highlight">Balkans</span>',
        'index.hero.subtitle': 'Healthcare-grade reliability. Modern engineering. Global standards. We build systems that scale.',
        'index.hero.cta.primary': 'Start Project',
        'index.hero.cta.ghost': 'View Work',
        'index.hero.card1.title': 'Uptime',
        'index.hero.card1.label': 'System Availability',
        'index.hero.card2.title': 'Security',
        'index.hero.card2.label': 'Compliant Systems',
        'index.hero.card3.title': 'Team',
        'index.hero.card3.label': 'Engineers',

        // Index — Features
        'index.features.h2': 'What we build',
        'index.features.subtitle': 'Enterprise software that works. No excuses, no exceptions.',
        'index.features.01.title': 'Healthcare Systems',
        'index.features.01.desc': 'HIPAA-compliant platforms for hospitals, clinics, and home health agencies. Real-time monitoring, secure data, zero downtime.',
        'index.features.02.title': 'Enterprise Integration',
        'index.features.02.desc': 'Connect legacy systems with modern infrastructure. APIs, microservices, and data pipelines that scale with your business.',
        'index.features.03.title': 'Cloud Infrastructure',
        'index.features.03.desc': 'Multi-cloud architecture, automated deployments, and 24/7 monitoring. Your systems run, we handle the rest.',

        // Index — About
        'index.about.label': 'About SnowIT',
        'index.about.h2': 'Enterprise IT from the Balkans',
        'index.about.p1': 'SnowIT is a software development company based in Sarajevo, Bosnia and Herzegovina, specializing in healthcare technology and enterprise software for US and EU markets.',
        'index.about.unique': 'What makes us unique:',
        'index.about.li1': 'Healthcare specialization with HIPAA expertise',
        'index.about.li2': 'AI-augmented development for faster delivery',
        'index.about.li3': '50% of profits donated to charity',
        'index.about.li4': 'European-quality engineering at competitive rates',
        'index.about.stat1.label': 'Years Experience',
        'index.about.stat2.label': 'Projects Delivered',
        'index.about.stat3.label': 'Uptime SLA',
        'index.about.stat4.label': 'Profits to Charity',

        // Index — Contact
        'index.contact.label': 'Get in Touch',
        'index.contact.h2': "Let's Build Something Great",
        'index.contact.desc': 'Ready to start your next project? Contact us for a free consultation.',
        'index.contact.location': 'Sarajevo, Bosnia and Herzegovina',
        'index.contact.label.name': 'Name',
        'index.contact.label.email': 'Email',
        'index.contact.label.company': 'Company',
        'index.contact.label.company.optional': '(optional)',
        'index.contact.label.message': 'Message',
        'index.contact.placeholder.name': 'Your name',
        'index.contact.placeholder.company': 'Your company',
        'index.contact.placeholder.message': 'Tell us about your project...',
        'index.contact.btn.send': 'Send Message',
        'index.contact.alt': 'Or email us directly at',

        // Footer
        'footer.tagline': 'Enterprise IT solutions from the Balkans. Healthcare-grade reliability. Modern engineering.',
        'footer.services': 'Services',
        'footer.services.healthcare': 'Healthcare Systems',
        'footer.services.enterprise': 'Enterprise Integration',
        'footer.services.cloud': 'Cloud Infrastructure',
        'footer.company': 'Company',
        'footer.company.about': 'About Us',
        'footer.company.portfolio': 'Portfolio',
        'footer.company.careers': 'Careers',
        'footer.company.contact': 'Contact',
        'footer.copyright': '© 2026 SnowIT. All rights reserved.',
        'footer.credit': '',

        // Usluge — Hero
        'usluge.hero.badge': 'Digital transformation',
        'usluge.hero.h1': 'Launch your <span class="highlight">digital presence</span>',
        'usluge.hero.subtitle': 'Website, LinkedIn, email — everything you need to get started online. Professional. Fast. Affordable.',
        'usluge.hero.stat1.value': '10+ years',
        'usluge.hero.stat1.label': 'Experience',
        'usluge.hero.stat2.value': '15+ engineers',
        'usluge.hero.stat2.label': 'Expert team',

        // Usluge — AI Services
        'usluge.ai.label': 'Advanced services',
        'usluge.ai.h2': 'AI Services',
        'usluge.ai.desc': 'Enterprise AI security and infrastructure for organizations building or deploying AI systems in production.',
        'usluge.ai.card1.badge': 'AI Security',
        'usluge.ai.card1.title': 'Agentic Security',
        'usluge.ai.card1.desc': 'Threat assessment, prompt injection attack testing, and AI agent system protection. We secure your AI deployments before attackers find vulnerabilities.',
        'usluge.ai.card1.li1': 'Threat modeling for AI systems',
        'usluge.ai.card1.li2': 'Prompt injection testing',
        'usluge.ai.card1.li3': 'Privilege and permission review',
        'usluge.ai.card1.li4': 'Hardening recommendations',
        'usluge.ai.card1.cta': 'Contact us',
        'usluge.ai.card2.badge': 'AI Infrastructure',
        'usluge.ai.card2.title': 'AI Harness Engineering',
        'usluge.ai.card2.desc': 'Design and implementation of production AI agent harnesses — multi-model routing, orchestrator hierarchies, deterministic tools, and horizontal team scaling.',
        'usluge.ai.card2.li1': 'Agent harness architecture',
        'usluge.ai.card2.li2': 'Multi-model routing (cost/capacity)',
        'usluge.ai.card2.li3': 'Agent team orchestration',
        'usluge.ai.card2.li4': 'RAG/LightRAG integration',
        'usluge.ai.card2.cta': 'Contact us',

        // Usluge — Pricing
        'usluge.pricing.label': 'Our packages',
        'usluge.pricing.h2': 'Choose the right package for you',
        'usluge.pricing.desc': 'Custom packages for every business. Contact us for a quote.',
        'usluge.pricing.card1.name': 'Digital Presence',
        'usluge.pricing.card1.desc': 'Basic online presence — website, logo, email setup.',
        'usluge.pricing.card1.subtext': '3-5 day delivery',
        'usluge.pricing.card1.li1': 'Modern website (5-10 pages)',
        'usluge.pricing.card1.li2': 'Professional logo design',
        'usluge.pricing.card1.li3': 'Email setup (yourname@domain.ba)',
        'usluge.pricing.card1.li4': 'DNS & SSL configuration',
        'usluge.pricing.card1.li5': 'Hosting included (1 year)',
        'usluge.pricing.card1.cta': 'Contact us',
        'usluge.pricing.card2.name': 'LinkedIn Launch',
        'usluge.pricing.card2.desc': 'Professional LinkedIn presence with an initial content plan.',
        'usluge.pricing.card2.subtext': '2-3 day delivery',
        'usluge.pricing.card2.li1': 'Company page creation & setup',
        'usluge.pricing.card2.li2': 'Professional banner design',
        'usluge.pricing.card2.li3': '5 initial posts (graphics + text)',
        'usluge.pricing.card2.li4': 'Profile SEO optimization',
        'usluge.pricing.card2.li5': 'Posting schedule & instructions',
        'usluge.pricing.card2.cta': 'Contact us',
        'usluge.pricing.card3.badge': 'Most popular',
        'usluge.pricing.card3.name': 'Full Digital Start',
        'usluge.pricing.card3.desc': 'Complete digital start — web, LinkedIn, Google, all in one.',
        'usluge.pricing.card3.subtext': '5-7 day delivery',
        'usluge.pricing.card3.li1': '<strong>EVERYTHING from Digital Presence</strong>',
        'usluge.pricing.card3.li2': '<strong>EVERYTHING from LinkedIn Launch</strong>',
        'usluge.pricing.card3.li3': 'Google Business Profile setup',
        'usluge.pricing.card3.li4': 'Google Maps & SEO optimization',
        'usluge.pricing.card3.li5': '30 days technical support',
        'usluge.pricing.card3.li6': 'Monthly SEO report (first month)',
        'usluge.pricing.card3.cta': 'Start now',

        // Usluge — Process
        'usluge.process.label': 'How it works',
        'usluge.process.h2': 'Simple 3-step process',
        'usluge.process.step1.title': 'Conversation',
        'usluge.process.step1.desc': 'Send an inquiry, we respond immediately. We discuss your needs and goals. We define the project scope.',
        'usluge.process.step2.title': 'Development',
        'usluge.process.step2.desc': 'Our team develops all elements of your digital presence. Transparent process with regular updates.',
        'usluge.process.step3.title': 'Launch',
        'usluge.process.step3.desc': 'Review, revisions, finalization. Launching your digital presence with complete documentation and support.',

        // Usluge — CTA
        'usluge.cta.h2': 'Ready for your digital start?',
        'usluge.cta.desc': 'Contact us today and begin your digital transformation. Free consultation for all new clients.',
        'usluge.cta.btn': 'Contact us',

        // Usluge — Footer (specific)
        'usluge.footer.services.usluge': 'Services (BA)',

        // Portfolio — Hero
        'portfolio.hero.h1': 'Our Work',
        'portfolio.hero.desc': 'See how we\'ve transformed operations for healthcare institutions, transportation systems, and enterprise clients. Real solutions, real results.',

        // Portfolio — Case Study 1
        'portfolio.cs1.subtitle': 'Fintech & Payments',
        'portfolio.cs1.title': 'Payment Platform',
        'portfolio.cs1.desc': 'A modern payment system for Bosnia and the region, enabling digital payments in a cash-dependent economy. BLIK-style design, PSD2-compliant, bank consortium architecture. Launching Q1 2026.',
        'portfolio.cs1.stat1.label': 'Transaction Volume (Target)',
        'portfolio.cs1.stat2.label': 'PCI-DSS Compliance',
        'portfolio.cs1.stat3.label': 'Supported Banks',
        'portfolio.cs1.stat4.label': 'Countries',
        'portfolio.cs1.tech.label': 'Technology Stack',
        'portfolio.cs1.features.title': 'Core Features',
        'portfolio.cs1.f1': 'Mobile-first payment interface',
        'portfolio.cs1.f2': 'Direct bank integration (BLIK)',
        'portfolio.cs1.f3': 'QR code payment generation',
        'portfolio.cs1.f4': 'Transaction history & analytics',
        'portfolio.cs1.f5': 'PCI-DSS Level 1 compliance',
        'portfolio.cs1.f6': 'Real-time settlement',
        'portfolio.cs1.f7': 'Fraud detection system',
        'portfolio.cs1.f8': 'Multi-country support',

        // Portfolio — Case Study 2
        'portfolio.cs2.subtitle': 'Enterprise Software',
        'portfolio.cs2.title': 'Legacy System Modernization',
        'portfolio.cs2.desc': 'Transformation of a legacy enterprise system into a modern, cloud-native architecture. Data migration from 20-year-old monolith to microservices. Zero downtime migration, 100% data integrity maintained.',
        'portfolio.cs2.stat1.label': 'Data Migrated',
        'portfolio.cs2.stat2.label': 'Downtime',
        'portfolio.cs2.stat3.label': 'Performance Improvement',
        'portfolio.cs2.stat4.label': 'Cost Reduction',
        'portfolio.cs2.tech.label': 'Technology Stack',
        'portfolio.cs2.features.title': 'Project Outcomes',
        'portfolio.cs2.f1': 'Containerized microservices architecture',
        'portfolio.cs2.f2': 'Kubernetes orchestration at scale',
        'portfolio.cs2.f3': 'Automated deployment pipeline (CI/CD)',
        'portfolio.cs2.f4': 'Database migration (zero downtime)',
        'portfolio.cs2.f5': 'Infrastructure as Code (Terraform)',
        'portfolio.cs2.f6': 'Observability & monitoring stack',
        'portfolio.cs2.f7': 'Disaster recovery & backup systems',
        'portfolio.cs2.f8': 'Team training & knowledge transfer',

        // Portfolio — CTA
        'portfolio.cta.h3': 'Ready to Transform Your Operations?',
        'portfolio.cta.desc': "Let's discuss how SnowIT can help you achieve similar results. Schedule a free consultation with our team.",
        'portfolio.cta.btn': 'Get Started Today',

        // Careers — Hero
        'careers.hero.badge': 'SnowIT is Hiring',
        'careers.hero.h1': 'Build Healthcare Technology That Matters',
        'careers.hero.desc': "Join SnowIT's founding team. We're building the future of healthcare software from Sarajevo, while impacting patients across the US and beyond.",

        // Careers — Why
        'careers.why.label': 'Why Join Us',
        'careers.why.h2': 'What Makes SnowIT Different',
        'careers.why.c1.title': 'Meaningful Work',
        'careers.why.c1.desc': 'Your code directly impacts patient care. Build healthcare software that reduces administrative burden and improves clinical outcomes for real agencies and real patients.',
        'careers.why.c2.title': '50% to Charity',
        'careers.why.c2.desc': 'We donate half our profits to healthcare charities. Every project you work on funds healthcare access for communities in need. Profit with purpose.',
        'careers.why.c3.title': 'Global Exposure',
        'careers.why.c3.desc': 'Work with US and EU clients. Learn international standards (HIPAA, HL7 FHIR, PCI-DSS). Build your expertise on projects that matter globally.',
        'careers.why.c4.title': 'AI-Augmented Development',
        'careers.why.c4.desc': 'We use cutting-edge AI tools (Claude, GitHub Copilot) to handle boilerplate. You focus on hard problems, interesting architecture, and real innovation.',
        'careers.why.c5.title': 'Competitive Pay + Equity',
        'careers.why.c5.desc': 'Above-market salaries for Bosnia. Profit-sharing for founding team members. We pay for talent, and we reward results.',
        'careers.why.c6.title': 'Remote-First Culture',
        'careers.why.c6.desc': 'Work from our Sarajevo office or from home. Flexible schedule, async-first communication, respect for work-life balance. You own your time.',

        // Careers — Jobs
        'careers.jobs.h2': 'Open Positions',
        'careers.jobs.desc': "We're actively hiring talented engineers. Apply now or reach out to",
        'careers.jobs.desc2': 'if you have questions.',
        'careers.job1.title': 'Senior Full-Stack Developer',
        'careers.job1.location': 'Sarajevo / Remote',
        'careers.job1.experience': '5+ years experience',
        'careers.job1.desc': "Lead development on our HIPAA-compliant healthcare platform. You'll own feature architecture, mentor junior developers, and work directly with healthcare clients. This is a founding team role with real impact.",
        'careers.job1.techstack.label': 'Tech Stack',
        'careers.job1.type.label': 'Type',
        'careers.job1.type.value': 'Full-Time, Permanent',
        'careers.job1.req.h4': 'Required Skills',
        'careers.job1.req1': '5+ years full-stack development',
        'careers.job1.req2': 'React expertise (TypeScript preferred)',
        'careers.job1.req3': 'Node.js / Express backend',
        'careers.job1.req4': 'PostgreSQL database design',
        'careers.job1.req5': 'AWS or cloud infrastructure',
        'careers.job1.req6': 'Healthcare/compliance knowledge (nice-to-have)',
        'careers.job1.apply': 'Apply Now',
        'careers.job2.title': 'Full-Stack Developer',
        'careers.job2.location': 'Sarajevo / Remote',
        'careers.job2.experience': '2-4 years experience',
        'careers.job2.desc': "Build features for our Healthcare and Payment platforms. Work on real-world healthcare and fintech challenges. You'll have mentorship from our senior team and grow your skills on production systems.",
        'careers.job2.techstack.label': 'Tech Stack',
        'careers.job2.type.label': 'Type',
        'careers.job2.type.value': 'Full-Time, Permanent',
        'careers.job2.req.h4': 'Required Skills',
        'careers.job2.req1': '2-4 years development experience',
        'careers.job2.req2': 'Comfortable with React',
        'careers.job2.req3': 'Some backend experience (Node.js, Python, etc)',
        'careers.job2.req4': 'SQL/database basics',
        'careers.job2.req5': 'Git and version control',
        'careers.job2.req6': 'Portfolio or GitHub projects',
        'careers.job2.apply': 'Apply Now',
        'careers.job3.title': 'DevOps / Cloud Engineer',
        'careers.job3.location': 'Sarajevo / Remote',
        'careers.job3.experience': '3+ years experience',
        'careers.job3.desc': "Architect and maintain HIPAA-compliant cloud infrastructure. You'll handle AWS, Kubernetes, CI/CD pipelines, and infrastructure-as-code for healthcare systems. This role is critical for our scaling phase.",
        'careers.job3.techstack.label': 'Tech Stack',
        'careers.job3.type.label': 'Type',
        'careers.job3.type.value': 'Full-Time, Permanent',
        'careers.job3.req.h4': 'Required Skills',
        'careers.job3.req1': '3+ years cloud/DevOps experience',
        'careers.job3.req2': 'AWS proficiency (EC2, RDS, S3)',
        'careers.job3.req3': 'Docker and containerization',
        'careers.job3.req4': 'Kubernetes basics',
        'careers.job3.req5': 'Infrastructure-as-Code (Terraform)',
        'careers.job3.req6': 'HIPAA/compliance knowledge (nice-to-have)',
        'careers.job3.apply': 'Apply Now',

        // Careers — Culture
        'careers.culture.label': 'How We Work',
        'careers.culture.h2': 'Our Values & Culture',
        'careers.culture.v1.title': 'Quality First',
        'careers.culture.v1.desc': 'We ship solid code, not quick hacks. Code reviews, testing, documentation. We take pride in what we build.',
        'careers.culture.v2.title': 'Transparent & Honest',
        'careers.culture.v2.desc': 'No corporate BS. Direct feedback, clear priorities, honest about challenges. We respect your intelligence.',
        'careers.culture.v3.title': 'Continuous Learning',
        'careers.culture.v3.desc': 'Budget for courses, conferences, and tools. We grow together. Healthcare + fintech = always learning.',
        'careers.culture.v4.title': 'Mission-Driven',
        'careers.culture.v4.desc': 'Our 50% to charity commitment means your work has real impact. You\'re building something that matters.',
        'careers.culture.v5.title': 'Trust & Ownership',
        'careers.culture.v5.desc': 'You own your projects. No micromanagement. We hire smart people and trust them to do great work.',
        'careers.culture.v6.title': 'Work-Life Balance',
        'careers.culture.v6.desc': 'Remote-first, flexible hours. Respect for your time and personal life. Burnout is not a badge of honor here.',

        // Careers — FAQ
        'careers.faq.label': 'Questions?',
        'careers.faq.h2': 'Frequently Asked Questions',
        'careers.faq.q1': 'Do I need healthcare experience to apply?',
        'careers.faq.a1': "Not at all. We hire for technical skills and problem-solving ability. We'll teach you healthcare best practices, HIPAA compliance, and industry standards. Your software engineering skills transfer well.",
        'careers.faq.q2': 'Is remote work available?',
        'careers.faq.a2': "Yes, 100%. We're remote-first. We have an office in Sarajevo for those who want it, but remote is our default. Work from anywhere, as long as you can commit to 8am-5pm CET overlap for meetings.",
        'careers.faq.q3': "What's the salary range?",
        'careers.faq.a3': "Listed in each job description. We pay above-market rates for Bosnia/region. Competitive with EU salaries. For founding team members, we offer equity/profit-sharing. Salary is transparent — no surprises.",
        'careers.faq.q4': "What's the hiring process?",
        'careers.faq.a4': "Quick and respectful: 1) Phone screening (30 min) 2) Technical assignment (take-home, realistic) 3) Technical interview (90 min) 4) Culture fit conversation. Total time: 1-2 weeks. We move fast.",
        'careers.faq.q5': 'Do you offer benefits?',
        'careers.faq.a5': "Yes. Health insurance (we cover 100%), laptop/equipment budget, professional development budget, flexible hours, unlimited PTO (within reason). We're still a startup, but we take care of our team.",
        'careers.faq.q6': 'How long are projects?',
        'careers.faq.a6': "Usually 6-18 months per major project. Our healthcare platform is our main focus. We're not jumping between clients every month. You'll have continuity and deep knowledge of what you're building.",

        // Careers — CTA
        'careers.cta.h3': 'Ready to Build Something Meaningful?',
        'careers.cta.desc': "Send your CV, portfolio, and a note about why you're interested. We'll be in touch within 48 hours.",
        'careers.cta.btn': 'Apply Now',
        'careers.cta.questions': 'Or questions?',
        'careers.cta.email': 'Email us',
    }
};

// ─── Core i18n engine ───────────────────────────────────────────────────────

const DEFAULT_LANG = 'bs';
const STORAGE_KEY = 'snowit-lang';

function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
}

function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    updateToggle(lang);
    document.documentElement.lang = lang;
}

function t(key, lang) {
    const dict = SNOWIT_TRANSLATIONS[lang] || SNOWIT_TRANSLATIONS[DEFAULT_LANG];
    return dict[key] !== undefined ? dict[key] : (SNOWIT_TRANSLATIONS[DEFAULT_LANG][key] || key);
}

function applyLang(lang) {
    // Text content (supports innerHTML for keys with HTML tags like <span class="highlight">)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key, lang);
        if (val === undefined) return;

        // If element has child elements (e.g. SVG icons), only update the first text node
        const hasChildElements = el.querySelector('*') !== null;
        if (hasChildElements) {
            // Find or create leading text node (before first child element)
            let textNode = null;
            for (let i = 0; i < el.childNodes.length; i++) {
                if (el.childNodes[i].nodeType === Node.TEXT_NODE) {
                    textNode = el.childNodes[i];
                    break;
                }
            }
            if (textNode) {
                textNode.textContent = val.replace(/<[^>]+>/g, ''); // strip any HTML from val for safety
            } else {
                // Insert text node at the beginning
                el.insertBefore(document.createTextNode(val.replace(/<[^>]+>/g, '')), el.firstChild);
            }
        } else if (val.includes('<')) {
            // Use innerHTML for values that contain HTML markup
            el.innerHTML = val;
        } else {
            el.textContent = val;
        }
    });

    // Full innerHTML replacement (for elements with embedded HTML like <span class="highlight">)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const val = t(key, lang);
        if (val !== undefined) {
            el.innerHTML = val;
        }
    });

    // Placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key, lang);
    });

    // Title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = t(key, lang);
    });

    // aria-label attribute
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        el.setAttribute('aria-label', t(key, lang));
    });
}

function updateToggle(lang) {
    const btns = document.querySelectorAll('.lang-toggle-btn');
    btns.forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        btn.classList.toggle('active', btnLang === lang);
    });
}

function initI18n() {
    const lang = getCurrentLang();
    document.documentElement.lang = lang;
    applyLang(lang);
    updateToggle(lang);

    // Attach toggle click handlers
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.getAttribute('data-lang');
            setLang(newLang);
        });
    });
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}
