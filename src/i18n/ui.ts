/**
 * Centralised translation dictionary for krwood.ee
 *
 * Estonian (`et`) is the single source of truth: its keys define the
 * `TranslationKey` union, and the `en` / `pl` / `it` dictionaries are typed as
 * `Dictionary`. If a translation is missing or misspelled in any language,
 * `npm run check` fails at build time instead of silently rendering a raw key.
 */

export const languages = {
  et: 'Eesti',
  en: 'English',
  pl: 'Polski',
  it: 'Italiano',
} as const;

/** Short labels used by the header language switcher (EE | EN | PL | IT). */
export const languageLabels = {
  et: 'EE',
  en: 'EN',
  pl: 'PL',
  it: 'IT',
} as const;

/**
 * BCP 47 tags for <html lang> and hreflang alternates.
 *
 * Language-only, deliberately. Region subtags such as `et-EE` or `pl-PL`
 * narrow targeting to users in that country, which would exclude Estonian
 * and Polish speakers elsewhere in the EU — not what an exporter wants.
 * These values must match the ones emitted in the sitemap; see the
 * `serialize` hook in astro.config.ts.
 */
export const languageTags = {
  et: 'et',
  en: 'en',
  pl: 'pl',
  it: 'it',
} as const;

/**
 * og:locale uses the language_TERRITORY convention rather than BCP 47,
 * so it is kept separate from `languageTags`.
 */
export const ogLocales = {
  et: 'et_EE',
  en: 'en_GB',
  pl: 'pl_PL',
  it: 'it_IT',
} as const;

export const defaultLang = 'et' as const;

/**
 * The locale `hreflang="x-default"` points at — the version for a visitor
 * whose language the site does not have. English, not the default locale:
 * a buyer in Latvia, Lithuania, Finland or Germany reads English, not
 * Estonian. Read by Layout.astro and the sitemap in astro.config.ts.
 */
export const xDefaultLang = 'en' as const;

export type Lang = keyof typeof languages;

/* -------------------------------------------------------------------------- */
/* Estonian — default locale, served at the site root                         */
/* -------------------------------------------------------------------------- */

const et = {
  // --- SEO / document meta -------------------------------------------------
  'meta.title': 'Pelletid (puidugraanulid) ENplus A1 | KR Wood Eesti',
  'meta.description':
    'ENplus A1 pelletid ehk puidugraanulid 6 mm ja 8 mm. Kõrge kütteväärtus, madal tuhasisaldus, 100% okaspuit. Tarne üle Eesti või pealevõtt Loo laost.',
  'meta.ogAlt': 'KR Wood premium pelletid',

  // --- Accessibility -------------------------------------------------------
  'a11y.skipToContent': 'Liigu põhisisu juurde',
  'a11y.openMenu': 'Ava menüü',
  'a11y.closeMenu': 'Sulge menüü',
  'a11y.chooseLanguage': 'Vali keel',
  'a11y.backToTop': 'Tagasi üles',
  'a11y.homepage': 'KR Wood — avaleht',

  // --- Navigation ----------------------------------------------------------
  'nav.features': 'Eelised',
  'nav.specs': 'Tooted',
  'nav.packaging': 'Pakendid',
  'nav.contact': 'Kontakt',
  'nav.cta': 'Küsi pakkumist',

  // --- Hero ----------------------------------------------------------------
  'hero.badge': 'ENplus® A1 sertifitseeritud',
  'hero.title': 'Premium pelletid',
  'hero.titleAccent': 'Teie kodu soojaks',
  'hero.subtitle':
    '100% looduslik okaspuit ilma liimide ja keemiliste lisaaineteta. Kõrge kütteväärtus, madal tuhasisaldus ja ühtlane kvaliteet — soojus, mis hoiab kokku nii Teie raha kui ka loodust.',
  'hero.ctaPrimary': 'Telli kohe',
  'hero.ctaSecondary': 'Vaata tooteid',
  'hero.stat1Value': '4,9+',
  'hero.stat1Unit': 'kWh/kg',
  'hero.stat1Label': 'Kütteväärtus',
  'hero.stat2Value': '< 0,5',
  'hero.stat2Unit': '%',
  'hero.stat2Label': 'Tuhasisaldus',
  'hero.stat3Value': '< 8',
  'hero.stat3Unit': '%',
  'hero.stat3Label': 'Niiskusesisaldus',

  // --- Features ------------------------------------------------------------
  'features.eyebrow': 'Miks KR Wood',
  'features.title': 'Puhas soojus, millele saate kindel olla',
  'features.subtitle':
    'Meie pelletid pressitakse värskest okaspuidu saepurust ilma sideaineteta. Iga partii läbib kvaliteedikontrolli, et Teie katel töötaks tõrgeteta kogu kütteperioodi.',
  'features.heat.title': 'Kõrge kütteväärtus',
  'features.heat.text':
    'Üle 4,9 kWh/kg tähendab rohkem soojust iga koti kohta ja märgatavalt väiksemat kütusekulu kogu hooaja jooksul.',
  'features.ash.title': 'Madal tuhasisaldus',
  'features.ash.text':
    'Alla 0,5% tuhka hoiab katla ja korstna puhtana ning vähendab hoolduse ja tuha eemaldamise vajaduse miinimumini.',
  'features.eco.title': '100% ökoloogiline',
  'features.eco.text':
    'Ainult puhas puit — ei mingeid liime, värve ega keemilisi lisaaineid. CO₂-neutraalne ja täielikult taastuv kütus.',
  'features.quality.title': 'ENplus® A1 kvaliteet',
  'features.quality.text':
    'Iga partii vastab rangele Euroopa standardile: ühtlane läbimõõt, kõrge tihedus ja minimaalne peenosakeste sisaldus.',

  // --- Specifications ------------------------------------------------------
  'specs.eyebrow': 'Tooted',
  'specs.title': 'Pelletid ja tehnilised näitajad',
  'specs.subtitle':
    'ENplus A1 puidugraanulid kahes läbimõõdus, 6 mm ja 8 mm, ning tööstuslikuks kasutuseks mõeldud 8 mm ligniini pelletid. Valige toode vastavalt oma katlale ja kasutusotstarbele.',
  'specs.d6.title': 'Pelletid 6 mm',
  'specs.d6.desc': 'Universaalne valik kodukateldele, pelletikaminatele ja väiksematele süsteemidele.',
  'specs.d6.badge': 'Populaarseim',
  'specs.d8.title': 'Pelletid 8 mm',
  'specs.d8.desc': 'Sobib suurematele katlamajadele, tööstuslikele põletitele ja mahukale tarbimisele.',
  'specs.d8.badge': 'Tööstuslik',
  'specs.lignin.title': 'Ligniini pelletid 8 mm',
  'specs.lignin.desc':
    'Ligniin on looduslik polümeer, mis annab puidule tugevuse — ja üks energiarikkamaid biomassi fraktsioone. 8 mm pelletiks pressitult ja 1000 kg suurkottides tarnituna põleb see kuumemalt kui tavalised puidugraanulid ning leiab kasutust paljudes tööstusharudes.',
  'specs.lignin.badge': 'Energiarikas kütus ja tööstuslik tooraine',
  'specs.table.param': 'Parameeter',
  'specs.table.value': 'Väärtus',
  'specs.row.diameter': 'Läbimõõt',
  'specs.row.length': 'Pikkus',
  'specs.row.calorific': 'Kütteväärtus',
  'specs.row.ash': 'Tuhasisaldus',
  'specs.row.moisture': 'Niiskusesisaldus',
  'specs.row.density': 'Puistetihedus',
  'specs.row.fines': 'Peenosakesed',
  'specs.row.material': 'Tooraine',
  'specs.value.material': 'Okaspuit (mänd, kuusk)',
  'specs.value.length': '10–40 mm',
  'specs.value.calorific': '≥ 4,9 kWh/kg',
  'specs.value.ash': '≤ 0,5 %',
  'specs.value.moisture': '≤ 8 %',
  'specs.value.density': '≥ 650 kg/m³',
  'specs.value.fines': '≤ 1 %',

  // --- Pricing -------------------------------------------------------------
  // Amounts live in src/config/pricing.ts, not here. `{min}` is replaced with
  // the minimum order quantity from that file.
  'price.label': 'Hind',
  'price.perTon': 'tonni kohta',
  'price.vatIncluded': 'Sisaldab {vat}% käibemaksu',
  // Shown only in the export locales (NET_PRICE_LOCALES); required here by type.
  'price.netLabel': 'ilma käibemaksuta',
  'price.wholesaleNote': 'Hulgihind kehtib tellimustele alates {min} tonnist',

  // --- Packaging -----------------------------------------------------------
  'packaging.eyebrow': 'Pakendid',
  'packaging.title': 'Pakendid ja tarne',
  'packaging.subtitle':
    'Valige pakend vastavalt oma ladustamisvõimalustele. Kõik alused on kile all ja ilmastikukindlad.',
  'packaging.bags.title': '15 kg kotid alusel',
  'packaging.bags.desc':
    '65 kotti alusel, kokku 975 kg. Mugav käsitseda ja ladustada — sobib ideaalselt eramajadele.',
  'packaging.bags.spec1': '65 kotti × 15 kg',
  'packaging.bags.spec2': '975 kg alusel',
  'packaging.bags.spec3': 'Termokile kaitse',
  'packaging.bigbag.title': 'Big Bag 1000 kg',
  'packaging.bigbag.desc':
    'Suurkott tõstesangade ja põhjaluugiga. Parim valik suurema koguse soodsaks ladustamiseks.',
  'packaging.bigbag.spec1': '1000 kg suurkott',
  'packaging.bigbag.spec2': 'Tõstesangad',
  'packaging.bigbag.spec3': 'Põhjaluuk tühjendamiseks',
  'packaging.delivery.title': 'Tarne ja eksport',
  'packaging.delivery.desc':
    'Kohaletoimetamine kogu Eestis, sh Tallinnas ja Harjumaal, ning Baltikumis. Kauba saab ka ise peale võtta meie laost Loos, Tallinna külje all. Ekspordime konteinerite ja täisautokoormustega ka mujale Euroopasse.',
  'packaging.delivery.spec1': 'Tarne üle Eesti',
  'packaging.delivery.spec2': 'Baltikum ja EL',
  'packaging.delivery.spec3': 'Täisautokoormused 24 t',
  'packaging.cta': 'Küsi hinnapakkumist',

  // --- Wood pellet FAQ (landing page) --------------------------------------
  // {price6}, {price8}, {perTon}, {min}, {vatNote} and the spec placeholders
  // are filled in by LandingFaq.astro from src/config/pricing.ts and the
  // values above.
  'faq.eyebrow': 'KKK',
  'faq.title': 'Korduma kippuvad küsimused pelletite kohta',
  'faq.q1': 'Kas valida 6 mm või 8 mm pelletid?',
  'faq.a1':
    'Mõlemad on sama ENplus A1 kvaliteediga: kütteväärtus {calorific}, tuhasisaldus {ash} ja niiskusesisaldus {moisture}. Erinevus on läbimõõdus. 6 mm pelletid on universaalne valik kodukateldele, pelletikaminatele ja väiksematele süsteemidele, 8 mm pelletid sobivad suurematele katlamajadele, tööstuslikele põletitele ja mahukale tarbimisele. Kahtluse korral kontrollige, millist läbimõõtu Teie katla tootja soovitab.',
  'faq.q2': 'Mida tähendab ENplus A1?',
  'faq.a2':
    'ENplus on Euroopa puidugraanulite kvaliteedisertifikaat ja A1 on selle kõrgeim kvaliteediklass. See tähendab ühtlast läbimõõtu, kõrget tihedust, madalat tuhasisaldust ja minimaalset peenosakeste sisaldust — pelletid põlevad puhtalt ning katel ja korsten püsivad puhtana.',
  'faq.q3': 'Mis on pelletite hind?',
  'faq.a3':
    '6 mm ENplus A1 pelletid maksavad {price6} {perTon} (hulgihind tellimustele alates {min} tonnist) ja 8 mm pelletid {price8} {perTon}. {vatNote} Täpse pakkumise saamiseks andke teada soovitud kogus, pakend ja tarneaadress.',
  'faq.q4': 'Kas osta 15 kg kotid või Big Bag?',
  'faq.a4':
    '15 kg kotid tarnitakse alustel: 65 kotti, kokku 975 kg alusel, termokile all ja ilmastikukindlalt. Neid on mugav käsitseda ja ladustada, mistõttu sobivad need ideaalselt eramajadele. 1000 kg Big Bag on tõstesangade ja põhjaluugiga suurkott ning parim valik suurema koguse soodsaks ladustamiseks.',
  'faq.q5': 'Kuidas pelleteid hoida?',
  'faq.a5':
    'Hoidke pelleteid kuivas: niiskus kahjustab pelleteid ja vähendab nende kütteväärtust. Meie alused on kile all ja ilmastikukindlad, kuid avatud kotte ja Big Bage tasub hoida siseruumis või katuse all.',
  'faq.q6': 'Kuhu te pelleteid tarnite?',
  'faq.a6':
    'Toimetame pelletid kohale üle Eesti, sealhulgas Tallinnasse ja kogu Harjumaale, ning Baltikumis. Kauba saab ka ise peale võtta meie laost Loos, Tallinna külje all. Ekspordime ka konteinerite ja täisautokoormustega (24 t) mujale Euroopasse.',
  'faq.q7': 'Kas pelletid sisaldavad lisaaineid?',
  'faq.a7':
    'Ei. Pelletid pressitakse värskest okaspuidu saepurust (mänd, kuusk) ilma liimide, sideainete ja keemiliste lisaaineteta — see on 100% looduslik ja taastuv kütus.',

  // --- Contact -------------------------------------------------------------
  'contact.eyebrow': 'Kontakt',
  'contact.title': 'Küsige personaalset pakkumist',
  'contact.subtitle':
    'Kirjutage meile soovitud kogus ja tarneaadress ning vastame Teile hinnapakkumisega ühe tööpäeva jooksul.',
  'contact.form.legend': 'Päringu vorm',
  'contact.form.name': 'Nimi',
  'contact.form.namePlaceholder': 'Teie nimi või ettevõtte nimi',
  'contact.form.email': 'E-post',
  'contact.form.emailPlaceholder': 'teie@email.ee',
  'contact.form.phone': 'Telefon',
  'contact.form.phonePlaceholder': '+372 5123 4567',
  'contact.form.message': 'Sõnum',
  'contact.form.messagePlaceholder': 'Soovitud kogus, pakend (15 kg kotid / Big Bag) ja tarneaadress…',
  'contact.form.optional': 'valikuline',
  'contact.form.submit': 'Saada päring',
  'contact.form.sending': 'Saadan…',
  'contact.form.success': 'Aitäh! Teie päring on saadetud. Võtame Teiega ühendust ühe tööpäeva jooksul.',
  'contact.form.error': 'Saatmine ebaõnnestus. Palun proovige uuesti või helistage meile otse.',
  'contact.form.errorRequired': 'See väli on kohustuslik',
  'contact.form.errorEmail': 'Palun sisestage korrektne e-posti aadress',
  'contact.form.consent': 'Nõustun, et minu andmeid töödeldakse päringule vastamiseks.',
  'contact.form.privacyLink': 'Privaatsuspoliitika',
  'contact.info.title': 'Kontaktandmed',
  'contact.info.phone': 'Telefon',
  'contact.info.email': 'E-post',
  'contact.info.address': 'Aadress',
  'contact.info.hours': 'Lahtiolekuajad',
  'contact.info.hoursValue': 'E–R 9:00–17:00',
  'contact.info.company': 'Ettevõte',
  'contact.info.regCode': 'Registrikood',
  'contact.info.vat': 'KMKR number',
  'contact.info.country': 'Eesti',
  'contact.whatsapp': 'Kirjuta WhatsAppis',
  'contact.whatsappMessage':
    'Tere! Sooviksin küsida pakkumist pelletite kohta.',

  // --- Footer --------------------------------------------------------------
  'footer.tagline':
    'Premium pelletid Eestist. ENplus A1 kvaliteet, usaldusväärne tarne ja aus hinnastamine.',
  'footer.navTitle': 'Navigatsioon',
  'footer.contactTitle': 'Kontakt',
  'footer.legalTitle': 'Õiguslik teave',
  'footer.privacy': 'Privaatsuspoliitika',
  'footer.rights': 'Kõik õigused kaitstud.',
  'footer.visitsTotal': 'Külastusi kokku',
  'footer.visitsToday': 'Täna',
  'footer.socialTitle': 'Jälgi meid',

  // --- Privacy policy page -------------------------------------------------
  'privacy.meta.title': 'Privaatsuspoliitika | KR Wood',
  'privacy.meta.description':
    'KR Wood privaatsuspoliitika — kuidas me kogume, kasutame ja kaitseme Teie isikuandmeid vastavalt GDPR-ile.',
  'privacy.title': 'Privaatsuspoliitika',
  'privacy.updated': 'Viimati uuendatud',
  'privacy.intro':
    'KR Wood austab Teie privaatsust ja töötleb isikuandmeid kooskõlas Euroopa Liidu isikuandmete kaitse üldmäärusega (GDPR). Käesolev poliitika selgitab, milliseid andmeid me kogume ja kuidas neid kasutame.',
  'privacy.s1.title': 'Milliseid andmeid me kogume',
  'privacy.s1.body':
    'Kui täidate meie kontaktvormi, kogume Teie nime, e-posti aadressi, telefoninumbri ja sõnumi sisu. Neid andmeid esitate Te vabatahtlikult päringu saatmisel.',
  'privacy.s2.title': 'Kuidas me andmeid kasutame',
  'privacy.s2.body':
    'Kasutame Teie andmeid ainult selleks, et vastata Teie päringule, koostada hinnapakkumine ja täita võimalikku tellimust. Me ei kasuta Teie andmeid turunduseks ilma Teie eraldi nõusolekuta.',
  'privacy.s3.title': 'Andmete jagamine',
  'privacy.s3.body':
    'Me ei müü ega rendi Teie isikuandmeid kolmandatele isikutele. Andmeid võidakse jagada üksnes tarnepartneritega tellimuse täitmiseks või ametiasutustega, kui seadus seda nõuab.',
  'privacy.s4.title': 'Andmete säilitamine',
  'privacy.s4.body':
    'Säilitame päringute andmeid kuni 24 kuud viimasest kontaktist, misjärel need kustutatakse. Raamatupidamisdokumente säilitame seaduses ettenähtud tähtaja jooksul.',
  'privacy.s5.title': 'Küpsised',
  // Shown when no third-party analytics is enabled.
  'privacy.s5.body':
    'See veebisait on staatiline ega kasuta jälgimisküpsiseid ega kolmandate osapoolte analüütikat. Kirjatüübid on serveeritud meie enda serverist, mistõttu Teie andmeid välistele teenustele ei edastata. Jaluses olev külastusloendur töötab meie enda serveris ja salvestab ainult koondarvud; sama külastuse kahekordse loendamise vältimiseks kasutab see Teie brauseri sessioonimälu ega salvesta isikuandmeid.',
  // Shown instead of the above as soon as a token is set in src/config/analytics.ts.
  'privacy.s5.titleAnalytics': 'Küpsised ja analüütika',
  'privacy.s5.bodyAnalytics':
    'See veebisait ei kasuta jälgimisküpsiseid. Külastajate arvu mõõtmiseks kasutame Cloudflare Web Analyticsit, mis ei sea küpsiseid, ei koosta külastajaprofiile ega jälgi Teid teistel veebisaitidel — kogutakse üksnes koondnäitajaid, näiteks lehevaatamiste arv ja ligikaudne asukoht riigi täpsusega. Volitatud töötleja on Cloudflare, Inc. (USA). Kirjatüübid on serveeritud meie enda serverist. Jaluses olev külastusloendur töötab meie enda serveris ja salvestab ainult koondarvud.',
  'privacy.s6.title': 'Teie õigused',
  'privacy.s6.body':
    'Teil on õigus nõuda ligipääsu oma andmetele, nende parandamist või kustutamist, samuti töötlemise piiramist ja andmete ülekandmist. Nende õiguste kasutamiseks võtke meiega ühendust alltoodud e-posti aadressil.',
  'privacy.s7.title': 'Kontakt',
  'privacy.s7.body':
    'Privaatsusega seotud küsimustes kirjutage meile aadressil:',
  'privacy.back': 'Tagasi avalehele',

  // --- Lignin pellets landing page ----------------------------------------
  'nav.lignin': 'Ligniini pelletid',

  'lignin.meta.title': 'Ligniini pelletid 8 mm | Big Bag 1000 kg | KR Wood',
  'lignin.meta.description':
    'Ligniini pelletid 8 mm, 1000 kg suurkottides. Kõrge kütteväärtusega biokütus ja tööstuslik tooraine asfaldi, betooni ja keemiatööstuse jaoks.',
  'lignin.meta.imageAlt':
    'Ligniini pelletid 8 mm hunnikus tumedal puitpinnal, kõrval klaasist näidisepurk',

  'lignin.hero.badge': '8 mm · Big Bag 1000 kg',
  'lignin.hero.title': 'Ligniini pelletid',
  'lignin.hero.titleAccent': 'Energiarikas kütus ja tööstuslik tooraine',
  'lignin.hero.lead':
    'Ligniin on looduslik polümeer, mis annab puidule tugevuse — ja üks energiarikkamaid biomassi fraktsioone. 8 mm pelletiks pressitult ja 1000 kg suurkottides tarnituna põleb see kuumemalt kui tavalised puidugraanulid ning leiab kasutust paljudes tööstusharudes väljaspool katlamaja.',
  'lignin.hero.ctaPrimary': 'Küsi pakkumist',
  'lignin.hero.ctaSecondary': 'Vaata tehnilisi andmeid',

  'lignin.overview.eyebrow': 'Toote ülevaade',
  'lignin.overview.title': 'Mis on ligniini pelletid',
  'lignin.overview.p1':
    'Ligniin on tselluloosi järel maailma levinuim orgaaniline polümeer. See seob taimekiud omavahel ja muudab puidu jäigaks. Tselluloositööstuse ja biorafineerimise kõrvalsaadusena eraldatuna sisaldab ligniin märgatavalt rohkem energiat kui teda ümbritsev tselluloos — just see teeb temast väärtusliku kütuse.',
  'lignin.overview.p2':
    'Võimalik, et kasutate ligniini juba praegu, ise seda teadmata. Tavaliste puidugraanulite tootmisel kasutatakse ligniini sageli loodusliku sideainena tärklise asemel: kuumus ja rõhk pehmendavad puidu enda ligniini, mis seejärel tahkub ja hoiab graanuli koos. Sünteetilist liimi pole vaja. Käesolev toode koondab sama aine eraldi pelletiks.',

  'lignin.benefits.title': 'Peamised eelised',
  'lignin.benefits.b1.title': 'Kõrgem kütteväärtus',
  'lignin.benefits.b1.text':
    'Ligniin sisaldab kilogrammi kohta rohkem energiat kui tselluloos, seega annab iga tonn rohkem soojust kui tavalised puidugraanulid.',
  'lignin.benefits.b2.title': 'Valmis suuremahuliseks logistikaks',
  'lignin.benefits.b2.text':
    '1000 kg suurkotid tõstesangadega liiguvad tõstuki ja teleskooplaaduriga — käsitsi tõstmist ega aluste lahtivõtmist pole vaja.',
  'lignin.benefits.b3.title': 'Kahesuguse otstarbega materjal',
  'lignin.benefits.b3.text':
    'Sama toode sobib nii tahke biokütusena kui ka toorainena ehitus-, keemia- ja põllumajandustööstusele.',
  'lignin.benefits.b4.title': 'Taastuv kõrvalsaadus',
  'lignin.benefits.b4.text':
    'Ligniin saadakse olemasolevatest tööstusvoogudest, mitte kütuseks kasvatatud puidust — seega ei lisandu survet metsadele.',

  'lignin.audience.title': 'Kellele see sobib',
  'lignin.audience.a1': 'Tööstuslikud katlamajad ja koostootmisjaamad, kes otsivad tonni kohta suuremat energiatihedust',
  'lignin.audience.a2': 'Asfalditehased ja betoonitootjad, kes kasutavad ligniini modifikaatori või plastifikaatorina',
  'lignin.audience.a3': 'Keemia- ja biorafineerimisettevõtted, kes hangivad ligniini toorainena',
  'lignin.audience.a4': 'Põllumajandus- ja söödatootjad, kes valmistavad sorbente ja mullaparandajaid',

  'lignin.specs.title': 'Tehnilised andmed',
  'lignin.specs.subtitle':
    'Tarnime ühes standardformaadis. Küsige iga tarne juurde täielikku analüüsisertifikaati.',
  'lignin.row.packaging': 'Pakend',
  'lignin.row.origin': 'Tooraine',
  'lignin.value.diameter': '8 mm',
  'lignin.value.length': '10–40 mm',
  'lignin.value.packaging': 'Big Bag 1000 kg',
  'lignin.value.calorific': '≥ 5,0 kWh/kg',
  'lignin.value.moisture': '≤ 10 %',
  'lignin.value.ash': '≤ 3 %',
  'lignin.value.density': '≥ 600 kg/m³',
  'lignin.value.origin': 'Puidupõhine ligniin',
  'lignin.specs.note':
    'Väärtused on selle klassi tüüpilised näitajad. Täpsed andmed kinnitatakse iga partii kohta kaasasolevas analüüsisertifikaadis.',

  'lignin.apps.eyebrow': 'Rohkem kui küte',
  'lignin.apps.title': 'Ligniini alternatiivsed tööstuslikud kasutusalad',
  'lignin.apps.subtitle':
    'Ligniin on platvormmaterjal. Selle fenoolne struktuur, siduvusvõime ja hüdrofoobsus teevad temast kasuliku tooraine kaugelt väljaspool energeetikat.',

  'lignin.apps.roads.title': 'Teedeehitus, asfalt ja bituumen',
  'lignin.apps.roads.lead':
    'Ligniini kiireimini kasvav kasutusala. Bituumenile ja teekattele lisatuna asendab see osaliselt naftapõhist sideainet ja toimib antioksüdandina.',
  'lignin.apps.roads.i1': 'Suurendab teekatte vastupidavust ja kasutusiga',
  'lignin.apps.roads.i2': 'Kaitseb pragunemise eest ja aeglustab bituumeni vananemist',
  'lignin.apps.roads.i3': 'Parandab vastupidavust temperatuurikõikumistele ja termilisele pingele',

  'lignin.apps.concrete.title': 'Betoon ja ehitusmaterjalid',
  'lignin.apps.concrete.i1': 'Lignosulfonaadid toimivad plastifikaatorina, suurendades betooni tugevust',
  'lignin.apps.concrete.i2': 'Vähendab segu veevajadust, säilitades töödeldavuse',
  'lignin.apps.concrete.i3': 'Kasutatakse sideainena plaatide ja komposiitide tootmisel',

  'lignin.apps.agri.title': 'Põllumajandus ja loomakasvatus',
  'lignin.apps.agri.i1': 'Enterosorbendid loomadele — seovad ja eemaldavad söödast mükotoksiine',
  'lignin.apps.agri.i2': 'Väetised ja mullaparandajad — parandavad mulla struktuuri, õhustatust ja niiskuse sidumist',
  'lignin.apps.agri.i3': 'Agrokeemia — dispergaator pestitsiidide koostises',

  'lignin.apps.chem.title': 'Keemiatööstus',
  'lignin.apps.chem.i1': 'Vanilliini tootmine',
  'lignin.apps.chem.i2': 'Plastid ja vaigud, asendades mürgist fenooli',
  'lignin.apps.chem.i3': 'Süsinikkiu lähteaine',
  'lignin.apps.chem.i4': 'Aktiivsüsi',

  'lignin.apps.oil.title': 'Naftatootmine ja metallurgia',
  'lignin.apps.oil.i1': 'Lisand puurimisvedelikes',
  'lignin.apps.oil.i2': 'Sideaine valuvormisegudes',

  'lignin.apps.eco.title': 'Ökoloogia ja reostustõrje',
  'lignin.apps.eco.i1':
    'Naftareostuse likvideerimine — ligniin toimib hüdrofoobse sorbendina, sidudes süsivesinikke nii vees kui pinnases',

  // {price}, {perTon}, {vatNote} and the spec placeholders are filled in by
  // LigninPellets.astro from src/config/pricing.ts and the values above.
  'lignin.faq.eyebrow': 'KKK',
  'lignin.faq.title': 'Korduma kippuvad küsimused ligniini pelletite kohta',
  'lignin.faq.q1': 'Mis on ligniini pelletid?',
  'lignin.faq.a1':
    'Ligniini pelletid on 8 mm läbimõõduga pelletid, mis on pressitud ligniinist — looduslikust polümeerist, mis seob puidukiud omavahel ja annab puidule jäikuse. Ligniin eraldatakse tselluloositööstuse ja biorafineerimise kõrvalsaadusena ning see sisaldab kilogrammi kohta rohkem energiat kui teda ümbritsev tselluloos.',
  'lignin.faq.q2': 'Mille poolest erinevad ligniini pelletid tavalistest puidugraanulitest?',
  'lignin.faq.a2':
    'Ligniini pelletite kütteväärtus on {calorific}, ENplus A1 puidugraanulitel {pelletCalorific}, seega annab iga tonn rohkem soojust. Tuhasisaldus on seevastu kõrgem: ligniini pelletitel {ash}, puidugraanulitel {pelletAsh}. Ligniini pelleteid tarnitakse ainult 1000 kg suurkottides ning neid kasutatakse lisaks kütusele ka tööstusliku toorainena.',
  'lignin.faq.q3': 'Kellele ligniini pelletid sobivad?',
  'lignin.faq.a3':
    'Eelkõige tööstuslikele katlamajadele ja koostootmisjaamadele, kes soovivad tonni kohta suuremat energiatihedust. Toorainena kasutavad ligniini ka asfaldi- ja betoonitootjad, keemia- ja biorafineerimisettevõtted ning põllumajandus- ja söödatootjad.',
  'lignin.faq.q4': 'Milleks kasutatakse ligniini peale kütmise?',
  'lignin.faq.a4':
    'Bituumenile ja asfaldile lisatuna pikendab ligniin teekatte eluiga ja aeglustab bituumeni vananemist. Lignosulfonaadid toimivad betoonis plastifikaatorina. Ligniinist valmistatakse ka loomadele mõeldud enterosorbente, mullaparandajaid, vanilliini, vaike, süsinikkiudu ja aktiivsütt; seda kasutatakse puurimisvedelikes, valuvormisegudes ja naftareostuse likvideerimisel.',
  'lignin.faq.q5': 'Kuidas ligniini pelleteid tarnitakse?',
  'lignin.faq.a5':
    'Ligniini pelleteid tarnitakse 1000 kg suurkottides (Big Bag), millel on tõstesangad — neid liigutatakse tõstuki või teleskooplaaduriga. Toimetame kauba kohale üle Eesti ja Baltikumi ning ekspordime täisautokoormustega ka mujale Euroopasse.',
  'lignin.faq.q6': 'Kui palju ligniini pelletid maksavad?',
  'lignin.faq.a6':
    'Ligniini pelletite hind on {price} {perTon}. {vatNote} Täpse pakkumise saamiseks andke teada soovitud kogus ja tarneaadress.',
  'lignin.faq.q7': 'Kas tarnega on kaasas analüüsisertifikaat?',
  'lignin.faq.a7':
    'Jah. Tehnilises tabelis toodud väärtused on selle klassi tüüpilised näitajad; täpsed andmed kinnitatakse iga partii kohta kaasasolevas analüüsisertifikaadis.',

  'lignin.cta.title': 'Vajate ligniini pelleteid suuremas koguses?',
  'lignin.cta.text':
    'Andke teada aastane kogus, tarnekoht ja kavandatav kasutusala ning saadame pakkumise koos analüüsisertifikaadiga.',
  'lignin.cta.button': 'Küsi pakkumist',

  // --- Peat briquettes landing page ----------------------------------------
  // {calorific}, {moisture}, {gas}, {equiv}, {burn}, {woodCalorific}, {packaging},
  // {calcium} and {ph} are filled in by PeatBriquettes.astro from the values
  // below and src/config/peatAsh.ts, so an answer cannot contradict the tables.
  // {price}, {perTon} and {vatNote} come from src/config/pricing.ts — in the
  // FAQ via PeatBriquettes.astro, in the teaser via Specs.astro.
  //
  // Reference figures (net calorific value), Estonian methodology for the
  // energy performance of buildings, annex 4 "Kütuste tarbimisaine alumised
  // kütteväärtused": peat briquettes (moisture ≤ 20 %) 4.2 kWh/kg, wood
  // briquettes (moisture ≤ 12 %) 4.6 kWh/kg — the FAQ compares the two — natural
  // gas 9.3 kWh/m³ — https://www.riigiteataja.ee/aktilisa/1181/0201/2001/MKM_m63_lisa4.pdf
  // 1 t = 4,200 kWh ≈ 450 m³ of gas; drier briquettes reach the 500 m³ that
  // manufacturers quote. "Up to ~8 h" is the manufacturers' burn time.
  'nav.peat': 'Turbabrikett',

  'peat.meta.title': 'Turbabrikett laos — pikk ja ühtlane põlemine | KR Wood',
  'peat.meta.description':
    'Turbabrikett koju ja tööstusele: pikk ja ühtlane põlemine, kütteväärtus ligikaudu 4,2 kWh/kg, madal väävlisisaldus. Laos, kaubaalusel 1000 kg.',

  'peat.stock': 'Laos',
  'peat.hero.title': 'Turbabrikett',
  'peat.hero.titleAccent': 'Pikk ja ühtlane soojus kodule ja tööstusele',
  'peat.hero.lead':
    'Turbabrikett on kuivatatud ja suure rõhu all kokku pressitud turvas — tihe, ühtlase kujuga kütus, mis süttib alustatud tulelt kergesti ja hõõgub tunde. Üks täitmine hoiab ahju või katla soojana kogu öö.',
  'peat.hero.ctaPrimary': 'Küsi pakkumist',
  'peat.hero.ctaWhatsapp': 'Küsi WhatsAppis',
  'peat.whatsappMessage': 'Tere! Sooviksin tellida turbabriketti.',

  'peat.row.form': 'Kuju',
  'peat.row.burn': 'Põlemisaeg',
  'peat.row.availability': 'Saadavus',
  'peat.row.pallet': 'Alus',
  'peat.value.material': 'Freesturvas',
  'peat.value.form': 'Pressitud brikett, sideaineteta',
  'peat.value.calorific': '≈ 4,2 kWh/kg',
  'peat.value.moisture': '≤ 20 %',
  'peat.value.burn': 'kuni ~8 h',
  'peat.value.woodCalorific': '≈ 4,6 kWh/kg',
  'peat.value.packaging': '84 pakki, kokku 1000 kg',
  'peat.value.palletWeight': '1000 kg',
  'peat.fact.pallet': '84 pakki alusel',
  'peat.value.gas': '9,3 kWh/m³',
  'peat.value.equiv': '450–500 m³',

  'peat.equiv.eyebrow': 'Energiasisaldus',
  'peat.equiv.from': '1 tonn turbabriketti',
  'peat.equiv.to': 'maagaasi',
  'peat.equiv.note':
    'Alumise kütteväärtuse järgi: turbabrikett {calorific} (niiskus {moisture}), maagaas {gas}. Kuivem brikett jõuab ülemise piiri lähedale.',

  'peat.about.eyebrow': 'Toote ülevaade',
  'peat.about.title': 'Mis on turbabrikett ja kuidas see põleb?',
  'peat.about.lead':
    'Turbabrikett on tahke kütus, mis valmistatakse freesturbast: turvas kuivatatakse madala niiskuseni ja pressitakse suure rõhu all ilma liimi ja muude sideaineteta. Süüdatuna põleb see alguses lühikese leegiga ja hõõgub seejärel tunde, andes ühtlast soojust.',
  'peat.about.made.title': 'Kuidas turbabriketti valmistatakse',
  'peat.about.made.text':
    'Turvas on tuhandete aastate jooksul rabades ja soodes kogunenud osaliselt lagunenud taimne aines. Briketi jaoks freesitakse kuivendatud raba pealmine kiht peeneks puruks, mis kuivatatakse esmalt väljal ja seejärel tehases ning pressitakse brikettideks. Rõhu ja kuumuse mõjul seovad turba enda looduslikud ühendid osakesed kokku, nii et brikett püsib koos ilma lisanditeta. Tulemus on palju tihedam kui lahtine turvas või küttepuud — igasse kotti ja laoruumi kuupmeetrisse mahub rohkem energiat.',
  'peat.about.burn.title': 'Kuidas turbabrikett põleb',
  'peat.about.burn.text':
    'Süüdatud brikett eraldab kõigepealt lenduvad gaasid ja põleb lühikese ereda leegiga. Kui need on ära põlenud, tekib hõõguv söekiht, mis põleb aeglaselt väljast sissepoole — see ongi pikk faas, mis soojendab ahju või katelt ühtlaselt. Kuna brikett on tihe ja ühtlane, säilitab see põledes kaua oma kuju ja soojusvõimsus püsib stabiilne. Kui pärast leekide vaibumist õhu juurdevoolu vähendada, hõõgub täis kolle mitu tundi — tootjate andmetel kuni umbes 8 tundi, olenevalt ahjust ja tõmbest.',
  'peat.about.use.title': 'Kuidas turbabrikettidega kütta',
  'peat.about.use.text':
    'Süüdake tuli peenpuude või mõne halu abil ja lisage brikette siis, kui koldes on juba süsi. Laduge need hõredalt, et õhk pääseks ligi, ja sulgege õhuklapp osaliselt, kui leegid on vaibunud — mida vähem õhku, seda pikem põlemine. Turbabrikett sobib puu- või söeküttele mõeldud ahjudesse, pliitidesse, suletud kaminasüdamikesse ja tahkekütusekateldesse; pelletipõletisse see ei sobi.',

  'peat.benefits.title': 'Turbabriketi eelised',
  'peat.benefits.b1.title': 'Pikk põlemisaeg',
  'peat.benefits.b1.text':
    'Üks täitmine hõõgub tunde (tootjate andmetel kuni umbes 8 tundi), nii et ahju võib õhtul täita ja maja püsib soojana hommikuni.',
  'peat.benefits.b2.title': 'Ilma söe terava lõhnata',
  'peat.benefits.b2.text':
    'Erinevalt kivisöest põleb turbabrikett ilma raske ja terava suitsulõhnata.',
  'peat.benefits.b3.title': 'Madal väävlisisaldus',
  'peat.benefits.b3.text':
    'Turvas sisaldab enamikust kivisöe sortidest tunduvalt vähem väävlit. Vähem väävlit tähendab vähem söövitavaid sademeid — see on katlale, ahjule ja korstnale säästlikum.',
  'peat.benefits.b4.title': 'Tuhk sobib aeda',
  'peat.benefits.b4.text':
    'Tuhk on mineraalirikas ja aluseline. Jahtunult võib seda õhukese kihina laotada peenardele ja murule väetise ja mullaparandajana — kui koos brikettidega pole põletatud midagi muud.',
  'peat.benefits.b5.title': 'Palju soojust väikeses mahus',
  'peat.benefits.b5.text':
    'Tonn turbabriketti annab umbes sama palju soojust kui {equiv} maagaasi ning sama soojushulga juures võtavad tihedad briketid vähem laoruumi kui küttepuud.',

  'peat.uses.eyebrow': 'Kasutusalad',
  'peat.uses.title': 'Kus turbabriketti kasutada',
  'peat.uses.subtitle':
    'Kõikjal, kus kolle on mõeldud puu- või söeküttele — eramajast tööstusliku katlamajani.',
  'peat.uses.home.title': 'Kodune kasutus',
  'peat.uses.home.lead':
    'Suurepärane kütus eramajadele ja suvilatele, eriti öösiti, kui loeb pikk ja ühtlane põlemine, mitte kiire leek.',
  'peat.uses.home.i1': 'Ahjud ja pliidid',
  'peat.uses.home.i2': 'Suletud kaminasüdamikud',
  'peat.uses.home.i3': 'Tahkekütusekatlad',
  'peat.uses.industry.title': 'Tööstus ja suurtarbijad',
  'peat.uses.industry.lead': 'Levinud tahkekütus ettevõtetes, millel on oma katlamaja:',
  'peat.uses.industry.i1': 'Linnufarmid',
  'peat.uses.industry.i2': 'Kasvuhooned',
  'peat.uses.industry.i3': 'Telliste- ja tsemenditehased',
  'peat.uses.industry.i4': 'Piima- ja konservitööstused',
  'peat.uses.industry.i5': 'Ujulad ja veekeskused',
  'peat.uses.industry.i6': 'Tööstuslikud ja kohalikud katlamajad',
  'peat.uses.industry.i7': 'Soojuselektrijaamad',

  'peat.specs.title': 'Tehnilised andmed',
  'peat.specs.subtitle':
    'Turbabriketi tüüpilised näitajad. Küsige pakkumisega koos ka konkreetse partii andmeid.',
  'peat.specs.note':
    'Kütteväärtus ja niiskus on turbabriketi võrdlusväärtused Eesti hoonete energiatõhususe arvutusmetoodikast. Põlemisaeg sõltub ahjust ja tõmbest.',

  // What to do with the ash. {calcium} and {ph} come from src/config/peatAsh.ts.
  // Safety: fire services advise a lidded metal bin outdoors, as embers in ash
  // stay hot for days. Garden use follows the wood-ash guidance (not on
  // acid-loving plants, potatoes or soil at pH 7+); peat ash holds less
  // potassium than wood ash (Luke, Finland), which the analysis confirms.
  'peat.ash.eyebrow': 'Pärast põlemist',
  'peat.ash.title': 'Mida teha tuhaga?',
  'peat.ash.lead':
    'Turbabrikett jätab tuhka rohkem kui puitbrikett, nii et sellega tasub arvestada. Jahtunud tuhk on kaltsiumirikas ja tugevalt aluseline — aias toimib see eelkõige lubjana, mõõdukalt kasutades ka väetisena.',
  'peat.ash.s1.title': 'Laske tuhal ohutult jahtuda',
  'peat.ash.s1.text':
    'Koguge tuhk kaanega metallnõusse ja viige see õue mittepõlevale pinnale, seintest ja puuriidast eemale. Tuhk võib hõõguda veel mitu päeva — ärge pange seda plastnõusse, prügikotti ega paberi sekka enne, kui see on täiesti külm.',
  'peat.ash.s2.title': 'Kasutage aias',
  'peat.ash.s2.text':
    'Puistake jahtunud tuhka õhukese kihina happelisele mullale — murule, viljapuude alla, kapsapeenrale ja lillepeenardesse — või lisage seda õhukeste kihtidena komposti. Parim aeg on kevad. Kuni kasutamiseni hoidke tuhka kuivas: vihm uhub toitained välja. Tuhk on söövitav, seega kandke kindaid ja ärge puistake seda tuulega.',
  'peat.ash.s3.title': 'Kuhu mitte panna',
  'peat.ash.s3.text':
    'Mitte happelist mulda armastavate taimede alla (mustikad, jõhvikad, rododendronid, kanarbik), mitte kartulipeenrale enne istutamist — see soodustab kärntõbe — ega mullale, mille pH on juba 7 või kõrgem. Ärge segage tuhka värske sõnniku ega lämmastikväetistega ning ärge kasutage seda üldse, kui koldes on põletatud kivisütt, värvitud puitu, plasti või läikivat paberit.',
  'peat.ash.s4.title': 'Mis üle jääb',
  'peat.ash.s4.text':
    'Talvel sobib külm tuhk ka libedale teele libisemise vastu. Kasutamata jäänud tuha andke ära oma omavalitsuse jäätmekäitluse reeglite järgi.',
  'peat.ash.table.title': 'Tuha koostis',
  'peat.ash.table.lead':
    'Tootja laborianalüüs turbabriketi põletamisel tekkinud tuha kohta. Silma paistavad kaltsium ({calcium}) ja kõrge pH ({ph}); kaaliumi ja lämmastikku on vähe.',
  'peat.ash.table.note': 'Väärtused on tootja andmed ja võivad partiiti erineda.',
  'peat.ash.row.ash': 'Tuhasisaldus',
  'peat.ash.row.organic': 'Orgaaniline aine',
  'peat.ash.row.carbon': 'Üldsüsinik (C)',
  'peat.ash.row.nitrogen': 'Üldlämmastik (N)',
  'peat.ash.row.phosphorus': 'Üldfosfor (P₂O₅)',
  'peat.ash.row.potassium': 'Üldkaalium (K₂O)',
  'peat.ash.row.calcium': 'Kaltsium (Ca)',
  'peat.ash.row.magnesium': 'Magneesium (Mg)',
  'peat.ash.row.copper': 'Vask (Cu)',
  'peat.ash.row.zinc': 'Tsink (Zn)',
  'peat.ash.row.cobalt': 'Koobalt (Co)',
  'peat.ash.row.nickel': 'Nikkel (Ni)',
  'peat.ash.row.manganese': 'Mangaan (Mn)',
  'peat.ash.row.ph': 'pH',

  'peat.faq.eyebrow': 'KKK',
  'peat.faq.title': 'Korduma kippuvad küsimused turbabriketi kohta',
  'peat.faq.q1': 'Mis on turbabrikett?',
  'peat.faq.a1':
    'Turbabrikett on freesturbast valmistatud tahke kütus: turvas kuivatatakse ja pressitakse suure rõhu all tihedateks brikettideks ilma sideaineteta. Selle kütteväärtus on {calorific} ning tonn brikette annab umbes sama palju soojust kui {equiv} maagaasi.',
  'peat.faq.q2': 'Kui kaua turbabrikett põleb?',
  'peat.faq.a2':
    'Kui pärast süttimist õhu juurdevoolu vähendada, hõõgub täis kolle mitu tundi — tootjate andmetel {burn}. Tegelik aeg sõltub ahjust, tõmbest ja sellest, kui täis kolle on.',
  'peat.faq.q3': 'Kas turbabriketti saab põletada pelletikatlas?',
  'peat.faq.a3':
    'Ei. Pelletipõleti söödab kütust automaatselt ja vajab kindla suurusega pelleteid. Turbabrikett on mõeldud käsitsi köetavatele ahjudele, pliitidele, suletud kaminasüdamikele ja tahkekütusekateldele. Pelletikatla jaoks valige meie ENplus A1 puidugraanulid.',
  'peat.faq.q4': 'Turbabrikett või puitbrikett — kumb valida?',
  'peat.faq.a4':
    'Mõlemad sobivad käsitsi köetavatele ahjudele ja tahkekütusekateldele. Puitbrikett annab kilogrammi kohta veidi rohkem soojust ({woodCalorific}, turbabrikett {calorific}), põleb kuumema ja kiirema leegiga ning sellest jääb vähe tuhka. Turbabrikett hõõgub kauem ja ühtlasemalt, nii et see sobib eriti ööseks; tuhka jääb sellest märgatavalt rohkem. Paljud kombineerivad: puitbrikett kiireks soojenemiseks, turbabrikett pika ja ühtlase soojuse hoidmiseks.',
  'peat.faq.q5': 'Kui palju turbabrikett maksab?',
  'peat.faq.a5':
    'Turbabrikett maksab {price} {perTon} — see on üks kaubaalus ({packaging}). {vatNote} Täpse pakkumise saamiseks andke teada soovitud kogus ja tarneaadress. Turbabrikett on laos.',
  'peat.faq.q6': 'Kas turbabriketi tuhka võib aias kasutada?',
  'peat.faq.a6':
    'Jah, mõõdukalt. Tuhk on kaltsiumirikas ({calcium}) ja tugevalt aluseline (pH {ph}), nii et aias toimib see eelkõige lubjana; kaaliumi ja lämmastikku on selles vähe. Puistake jahtunud tuhka õhukese kihina happelisele mullale, kuid mitte happelist mulda armastavate taimede ega kartulite alla. Tuhka tekib rohkem kui puitbrikettidest, seega tuleb tuhasahtlit sagedamini tühjendada.',
  'peat.faq.q7': 'Kuidas turbabriketti hoiustada?',
  'peat.faq.a7':
    'Hoidke brikette kuivas ja katuse all, maapinnast eemal — näiteks alusel või riiulil kuuris või katlaruumis. Niiskust imanud brikett annab vähem soojust ja võib mureneda.',

  'peat.faq.q8': 'Kuidas turbabriketti pakitakse?',
  'peat.faq.a8':
    'Turbabrikett tarnitakse pakkidena kaubaalustel: ühel alusel on {packaging}. Pakkumise saamiseks andke teada vajalik kogus ja tarneaadress.',

  'peat.cta.title': 'Vajate turbabriketti?',
  'peat.cta.text':
    'Andke teada vajalik kogus ja tarneaadress ning saadame hinna ja tarnetingimused. Turbabrikett on laos, kauba saab ka ise peale võtta meie laost Loos, Tallinna külje all.',

  'peat.teaser.title': 'Laos ka turbabrikett',
  'peat.teaser.text':
    'Ahjudele ja tahkekütusekateldele: pikk ja ühtlane põlemine kogu ööks. Hind {price} {perTon}. {vatNote}',
  'peat.teaser.link': 'Vaata turbabriketti',
} as const;

/* -------------------------------------------------------------------------- */
/* Types derived from the Estonian dictionary                                 */
/* -------------------------------------------------------------------------- */

export type TranslationKey = keyof typeof et;

/** Every locale must implement exactly the keys defined above. */
type Dictionary = Record<TranslationKey, string>;

/* -------------------------------------------------------------------------- */
/* English — /en/                                                             */
/* -------------------------------------------------------------------------- */

const en: Dictionary = {
  'meta.title': 'Premium Wood Pellets ENplus A1 | KR Wood Estonia',
  'meta.description':
    'ENplus A1 certified wood pellets, 6 mm and 8 mm. High heat output, low ash, 100% natural softwood. Delivery across Estonia, the Baltics and the EU.',
  'meta.ogAlt': 'KR Wood premium wood pellets',

  'a11y.skipToContent': 'Skip to main content',
  'a11y.openMenu': 'Open menu',
  'a11y.closeMenu': 'Close menu',
  'a11y.chooseLanguage': 'Choose language',
  'a11y.backToTop': 'Back to top',
  'a11y.homepage': 'KR Wood — homepage',

  'nav.features': 'Benefits',
  'nav.specs': 'Products',
  'nav.packaging': 'Packaging',
  'nav.contact': 'Contact',
  'nav.cta': 'Get a quote',

  'hero.badge': 'ENplus® A1 certified',
  'hero.title': 'Premium Wood Pellets',
  'hero.titleAccent': 'For Your Home',
  'hero.subtitle':
    '100% natural softwood with no glues or chemical additives. High heat output, low ash content and consistent quality — warmth that saves both your money and the environment.',
  'hero.ctaPrimary': 'Order now',
  'hero.ctaSecondary': 'View products',
  'hero.stat1Value': '4.9+',
  'hero.stat1Unit': 'kWh/kg',
  'hero.stat1Label': 'Heat output',
  'hero.stat2Value': '< 0.5',
  'hero.stat2Unit': '%',
  'hero.stat2Label': 'Ash content',
  'hero.stat3Value': '< 8',
  'hero.stat3Unit': '%',
  'hero.stat3Label': 'Moisture content',

  'features.eyebrow': 'Why KR Wood',
  'features.title': 'Clean heat you can rely on',
  'features.subtitle':
    'Our pellets are pressed from fresh softwood sawdust with no binding agents. Every batch passes quality control so your boiler runs faultlessly through the whole heating season.',
  'features.heat.title': 'High heat output',
  'features.heat.text':
    'Over 4.9 kWh/kg means more warmth from every bag and noticeably lower fuel consumption across the season.',
  'features.ash.title': 'Low ash content',
  'features.ash.text':
    'Under 0.5% ash keeps your boiler and chimney clean, reducing maintenance and ash removal to a minimum.',
  'features.eco.title': '100% eco-friendly',
  'features.eco.text':
    'Pure wood only — no glues, dyes or chemical additives. A CO₂-neutral and fully renewable fuel.',
  'features.quality.title': 'ENplus® A1 quality',
  'features.quality.text':
    'Every batch meets the strict European standard: consistent diameter, high density and minimal fines content.',

  'specs.eyebrow': 'Products',
  'specs.title': 'Pellets and technical specifications',
  'specs.subtitle':
    'ENplus A1 wood pellets in two diameters, 6 mm and 8 mm, plus 8 mm lignin pellets for industrial use. Choose the product that suits your boiler and your application.',
  'specs.d6.title': '6 mm pellets',
  'specs.d6.desc': 'The universal choice for domestic boilers, pellet stoves and smaller systems.',
  'specs.d6.badge': 'Most popular',
  'specs.d8.title': '8 mm pellets',
  'specs.d8.desc': 'Suited to larger boiler houses, industrial burners and high-volume consumption.',
  'specs.d8.badge': 'Industrial',
  'specs.lignin.title': 'Lignin pellets 8 mm',
  'specs.lignin.desc':
    'Lignin is the natural polymer that gives wood its strength — and one of the most energy-dense fractions of biomass. Pressed into 8 mm pellets and supplied in 1000 kg big bags, it burns hotter than conventional wood pellets and is used across a wide range of industries.',
  'specs.lignin.badge': 'Energy-dense fuel and feedstock',
  'specs.table.param': 'Parameter',
  'specs.table.value': 'Value',
  'specs.row.diameter': 'Diameter',
  'specs.row.length': 'Length',
  'specs.row.calorific': 'Calorific value',
  'specs.row.ash': 'Ash content',
  'specs.row.moisture': 'Moisture content',
  'specs.row.density': 'Bulk density',
  'specs.row.fines': 'Fines',
  'specs.row.material': 'Raw material',
  'specs.value.material': 'Softwood (pine, spruce)',
  'specs.value.length': '10–40 mm',
  'specs.value.calorific': '≥ 4.9 kWh/kg',
  'specs.value.ash': '≤ 0.5 %',
  'specs.value.moisture': '≤ 8 %',
  'specs.value.density': '≥ 650 kg/m³',
  'specs.value.fines': '≤ 1 %',

  'price.label': 'Price',
  'price.perTon': 'per tonne',
  'price.vatIncluded': 'Includes {vat}% Estonian VAT',
  'price.netLabel': 'excl. VAT',
  'price.wholesaleNote': 'Wholesale price valid for orders from {min} tonnes',

  'packaging.eyebrow': 'Packaging',
  'packaging.title': 'Packaging and delivery',
  'packaging.subtitle':
    'Choose the format that matches your storage. All pallets are shrink-wrapped and weatherproof.',
  'packaging.bags.title': '15 kg bags on pallets',
  'packaging.bags.desc':
    '65 bags per pallet, 975 kg in total. Easy to handle and store — ideal for private households.',
  'packaging.bags.spec1': '65 bags × 15 kg',
  'packaging.bags.spec2': '975 kg per pallet',
  'packaging.bags.spec3': 'Shrink-wrap protection',
  'packaging.bigbag.title': 'Big Bag 1000 kg',
  'packaging.bigbag.desc':
    'Bulk bag with lifting loops and a bottom discharge spout. The most economical way to store larger volumes.',
  'packaging.bigbag.spec1': '1000 kg bulk bag',
  'packaging.bigbag.spec2': 'Lifting loops',
  'packaging.bigbag.spec3': 'Bottom discharge spout',
  'packaging.delivery.title': 'Delivery and export',
  'packaging.delivery.desc':
    'Delivery throughout Estonia, including Tallinn and Harju County, and the Baltics — or collect from our warehouse in Loo, just outside Tallinn. We also export by container and full truckload across Europe.',
  'packaging.delivery.spec1': 'Estonia-wide delivery',
  'packaging.delivery.spec2': 'Baltics and EU',
  'packaging.delivery.spec3': 'Full truckloads, 24 t',
  'packaging.cta': 'Request a price quote',

  'faq.eyebrow': 'FAQ',
  'faq.title': 'Frequently asked questions about wood pellets',
  'faq.q1': 'Should I choose 6 mm or 8 mm pellets?',
  'faq.a1':
    'Both are the same ENplus A1 quality: a calorific value of {calorific}, ash content of {ash} and moisture content of {moisture}. The difference is the diameter. 6 mm pellets are the universal choice for domestic boilers, pellet stoves and smaller systems; 8 mm pellets suit larger boiler houses, industrial burners and high-volume consumption. If in doubt, check which diameter your boiler manufacturer recommends.',
  'faq.q2': 'What does ENplus A1 mean?',
  'faq.a2':
    'ENplus is the European quality certification for wood pellets, and A1 is its highest quality class. It means a consistent diameter, high density, low ash and minimal fines — pellets that burn cleanly and keep the boiler and chimney clean.',
  'faq.q3': 'How much do wood pellets cost?',
  'faq.a3':
    'ENplus A1 wood pellets cost {price6} {perTon} in 6 mm (wholesale price, for orders from {min} tonnes) and {price8} {perTon} in 8 mm. {vatNote} For an exact quote, tell us the quantity, the packaging and the delivery address.',
  'faq.q4': 'Should I buy 15 kg bags or a Big Bag?',
  'faq.a4':
    '15 kg bags come on pallets: 65 bags, 975 kg per pallet, shrink-wrapped and weatherproof. They are easy to handle and store, which makes them ideal for private households. The 1000 kg Big Bag has lifting loops and a bottom discharge spout, and is the most economical way to store larger volumes.',
  'faq.q5': 'How should wood pellets be stored?',
  'faq.a5':
    'Keep pellets dry: moisture damages pellets and lowers their calorific value. Our pallets are shrink-wrapped and weatherproof, but opened bags and Big Bags are best kept indoors or under a roof.',
  'faq.q6': 'Where do you deliver wood pellets?',
  'faq.a6':
    'We deliver throughout Estonia, Tallinn and Harju County included, and the Baltics, and export by container and full truckload (24 t) across Europe. You can also collect from our warehouse in Loo, just outside Tallinn.',
  'faq.q7': 'Do the pellets contain additives?',
  'faq.a7':
    'No. The pellets are pressed from fresh softwood sawdust (pine, spruce) with no glues, binding agents or chemical additives — a 100% natural, renewable fuel.',

  'contact.eyebrow': 'Contact',
  'contact.title': 'Request a personal quote',
  'contact.subtitle':
    'Tell us the quantity and delivery address you need, and we will come back to you with a price quote within one business day.',
  'contact.form.legend': 'Enquiry form',
  'contact.form.name': 'Name',
  'contact.form.namePlaceholder': 'Your name or company name',
  'contact.form.email': 'Email',
  'contact.form.emailPlaceholder': 'you@email.com',
  'contact.form.phone': 'Phone',
  'contact.form.phonePlaceholder': '+372 5123 4567',
  'contact.form.message': 'Message',
  'contact.form.messagePlaceholder': 'Quantity required, packaging (15 kg bags / Big Bag) and delivery address…',
  'contact.form.optional': 'optional',
  'contact.form.submit': 'Send enquiry',
  'contact.form.sending': 'Sending…',
  'contact.form.success': 'Thank you! Your enquiry has been sent. We will get back to you within one business day.',
  'contact.form.error': 'Sending failed. Please try again or call us directly.',
  'contact.form.errorRequired': 'This field is required',
  'contact.form.errorEmail': 'Please enter a valid email address',
  'contact.form.consent': 'I agree to my data being processed in order to answer my enquiry.',
  'contact.form.privacyLink': 'Privacy policy',
  'contact.info.title': 'Contact details',
  'contact.info.phone': 'Phone',
  'contact.info.email': 'Email',
  'contact.info.address': 'Address',
  'contact.info.hours': 'Opening hours',
  'contact.info.hoursValue': 'Mon–Fri 9:00–17:00',
  'contact.info.company': 'Company',
  'contact.info.regCode': 'Registry code',
  'contact.info.vat': 'VAT number',
  'contact.info.country': 'Estonia',
  'contact.whatsapp': 'Chat on WhatsApp',
  'contact.whatsappMessage':
    'Hello! I would like to request a quote for wood pellets.',

  'footer.tagline':
    'Premium wood pellets from Estonia. ENplus A1 quality, dependable delivery and honest pricing.',
  'footer.navTitle': 'Navigation',
  'footer.contactTitle': 'Contact',
  'footer.legalTitle': 'Legal',
  'footer.privacy': 'Privacy policy',
  'footer.rights': 'All rights reserved.',
  'footer.visitsTotal': 'Total visits',
  'footer.visitsToday': 'Today',
  'footer.socialTitle': 'Follow us',

  'privacy.meta.title': 'Privacy Policy | KR Wood',
  'privacy.meta.description':
    'KR Wood privacy policy — how we collect, use and protect your personal data in accordance with the GDPR.',
  'privacy.title': 'Privacy Policy',
  'privacy.updated': 'Last updated',
  'privacy.intro':
    'KR Wood respects your privacy and processes personal data in accordance with the European Union General Data Protection Regulation (GDPR). This policy explains what data we collect and how we use it.',
  'privacy.s1.title': 'What data we collect',
  'privacy.s1.body':
    'When you fill in our contact form we collect your name, email address, phone number and the content of your message. You provide this data voluntarily when submitting an enquiry.',
  'privacy.s2.title': 'How we use your data',
  'privacy.s2.body':
    'We use your data solely to respond to your enquiry, prepare a price quote and fulfil any resulting order. We do not use your data for marketing without your separate consent.',
  'privacy.s3.title': 'Sharing your data',
  'privacy.s3.body':
    'We do not sell or rent your personal data to third parties. Data may only be shared with delivery partners in order to fulfil an order, or with authorities where required by law.',
  'privacy.s4.title': 'Data retention',
  'privacy.s4.body':
    'We retain enquiry data for up to 24 months from the last contact, after which it is deleted. Accounting records are retained for the period prescribed by law.',
  'privacy.s5.title': 'Cookies',
  'privacy.s5.body':
    'This website is static and uses no tracking cookies or third-party analytics. Fonts are served from our own server, so none of your data is transmitted to external services. The visit counter in the footer runs on our own server and stores only aggregate totals; it uses your browser’s session storage to avoid counting the same visit twice and stores no personal data.',
  'privacy.s5.titleAnalytics': 'Cookies and analytics',
  'privacy.s5.bodyAnalytics':
    'This website uses no tracking cookies. To measure visitor numbers we use Cloudflare Web Analytics, which sets no cookies, builds no visitor profiles and does not follow you across other websites — only aggregate figures such as page views and approximate country-level location are collected. The processor is Cloudflare, Inc. (USA). Fonts are served from our own server. The visit counter in the footer runs on our own server and stores only aggregate totals.',
  'privacy.s6.title': 'Your rights',
  'privacy.s6.body':
    'You have the right to request access to your data, its correction or erasure, as well as restriction of processing and data portability. To exercise these rights, contact us at the email address below.',
  'privacy.s7.title': 'Contact',
  'privacy.s7.body': 'For any privacy-related questions, please write to us at:',
  'privacy.back': 'Back to homepage',

  // --- Lignin pellets landing page ----------------------------------------
  'nav.lignin': 'Lignin pellets',

  'lignin.meta.title': 'Lignin Pellets 8 mm | 1000 kg Big Bags | KR Wood Estonia',
  'lignin.meta.description':
    'Lignin pellets 8 mm in 1000 kg big bags. High-calorific biofuel and industrial raw material for asphalt, concrete, agriculture and chemistry. EU delivery.',
  'lignin.meta.imageAlt':
    'A heap of 8 mm lignin pellets on a dark wooden surface, with a glass sample jar beside it',

  'lignin.hero.badge': '8 mm · Big Bag 1000 kg',
  'lignin.hero.title': 'Lignin Pellets',
  'lignin.hero.titleAccent': 'Energy-dense fuel and industrial raw material',
  'lignin.hero.lead':
    'Lignin is the natural polymer that gives wood its strength — and one of the most energy-dense fractions of biomass. Pressed into 8 mm pellets and supplied in 1000 kg big bags, it burns hotter than conventional wood pellets and feeds a wide range of industries far beyond the boiler room.',
  'lignin.hero.ctaPrimary': 'Request a quote',
  'lignin.hero.ctaSecondary': 'See specifications',

  'lignin.overview.eyebrow': 'Product overview',
  'lignin.overview.title': 'What lignin pellets are',
  'lignin.overview.p1':
    'Lignin is the second most abundant organic polymer on Earth after cellulose. It binds plant fibres together and makes wood rigid. Isolated as a by-product of pulp and biorefinery processes, it carries a markedly higher energy content than the cellulose around it — which is precisely what makes it valuable as a fuel.',
  'lignin.overview.p2':
    'You may already be using lignin without realising it. In the production of standard wood pellets, lignin is frequently used as a natural binder in place of starch: heat and pressure soften the wood’s own lignin, which then sets and holds each pellet together, with no synthetic glue required. This product concentrates that same substance into a pellet of its own.',

  'lignin.benefits.title': 'Key benefits',
  'lignin.benefits.b1.title': 'Higher calorific value',
  'lignin.benefits.b1.text':
    'Lignin carries more energy per kilogram than cellulose, so every tonne delivers more heat than conventional wood pellets.',
  'lignin.benefits.b2.title': 'Bulk-ready logistics',
  'lignin.benefits.b2.text':
    '1000 kg big bags with lifting loops move by forklift or telehandler — no manual bag handling and no pallet breakdown.',
  'lignin.benefits.b3.title': 'Dual-purpose material',
  'lignin.benefits.b3.text':
    'The same product serves both as a solid biofuel and as a feedstock for construction, chemical and agricultural processing.',
  'lignin.benefits.b4.title': 'Renewable by-product',
  'lignin.benefits.b4.text':
    'Lignin is recovered from existing industrial streams rather than grown for fuel, so it places no additional pressure on forests.',

  'lignin.audience.title': 'Who it is for',
  'lignin.audience.a1': 'Industrial boiler houses and CHP plants seeking higher energy density per tonne',
  'lignin.audience.a2': 'Asphalt plants and concrete producers using lignin as a modifier or plasticiser',
  'lignin.audience.a3': 'Chemical and biorefinery operations sourcing lignin as a feedstock',
  'lignin.audience.a4': 'Agricultural and feed manufacturers producing sorbents and soil improvers',

  'lignin.specs.title': 'Technical specifications',
  'lignin.specs.subtitle':
    'Supplied in a single standard format. A full certificate of analysis is available with every delivery.',
  'lignin.row.packaging': 'Packaging',
  'lignin.row.origin': 'Raw material',
  'lignin.value.diameter': '8 mm',
  'lignin.value.length': '10–40 mm',
  'lignin.value.packaging': 'Big Bag 1000 kg',
  'lignin.value.calorific': '≥ 5.0 kWh/kg',
  'lignin.value.moisture': '≤ 10 %',
  'lignin.value.ash': '≤ 3 %',
  'lignin.value.density': '≥ 600 kg/m³',
  'lignin.value.origin': 'Wood-derived lignin',
  'lignin.specs.note':
    'Values are typical for this grade. Exact figures are confirmed per batch on the accompanying certificate of analysis.',

  'lignin.apps.eyebrow': 'Beyond heating',
  'lignin.apps.title': 'Alternative industrial applications of lignin',
  'lignin.apps.subtitle':
    'Lignin is a platform material. Its phenolic structure, binding power and hydrophobic behaviour make it useful well outside the energy sector.',

  'lignin.apps.roads.title': 'Road construction, asphalt and bitumen',
  'lignin.apps.roads.lead':
    'The fastest-growing use for lignin. Added to bitumen and road surfaces, it acts as a partial bio-based replacement for petroleum binder and as an antioxidant.',
  'lignin.apps.roads.i1': 'Increases the durability and service life of road surfaces',
  'lignin.apps.roads.i2': 'Protects against cracking and slows age-hardening of bitumen',
  'lignin.apps.roads.i3': 'Improves resistance to temperature fluctuation and thermal stress',

  'lignin.apps.concrete.title': 'Concrete and building materials',
  'lignin.apps.concrete.i1': 'Lignosulfonates act as plasticisers, increasing concrete strength',
  'lignin.apps.concrete.i2': 'Reduces the water demand of the mix while preserving workability',
  'lignin.apps.concrete.i3': 'Used as a binder in board and composite production',

  'lignin.apps.agri.title': 'Agriculture and animal husbandry',
  'lignin.apps.agri.i1': 'Enterosorbents for livestock — absorb and remove mycotoxins from feed',
  'lignin.apps.agri.i2': 'Fertilisers and soil conditioners — improve structure, aeration and moisture retention',
  'lignin.apps.agri.i3': 'Agrochemistry — dispersant in pesticide formulations',

  'lignin.apps.chem.title': 'Chemical industry',
  'lignin.apps.chem.i1': 'Production of vanillin',
  'lignin.apps.chem.i2': 'Plastics and resins, replacing toxic phenol',
  'lignin.apps.chem.i3': 'Carbon fibre precursor',
  'lignin.apps.chem.i4': 'Activated carbon',

  'lignin.apps.oil.title': 'Oil production and metallurgy',
  'lignin.apps.oil.i1': 'Additive in drilling fluids',
  'lignin.apps.oil.i2': 'Binder material in foundry moulding sands',

  'lignin.apps.eco.title': 'Ecology and spill response',
  'lignin.apps.eco.i1':
    'Oil spill cleanup — lignin acts as a hydrophobic sorbent, binding hydrocarbons on water and in soil',

  'lignin.faq.eyebrow': 'FAQ',
  'lignin.faq.title': 'Frequently asked questions about lignin pellets',
  'lignin.faq.q1': 'What are lignin pellets?',
  'lignin.faq.a1':
    'Lignin pellets are 8 mm pellets pressed from lignin — the natural polymer that binds wood fibres together and makes wood rigid. Lignin is recovered as a by-product of pulp and biorefinery processes, and it carries more energy per kilogram than the cellulose around it.',
  'lignin.faq.q2': 'How do lignin pellets differ from standard wood pellets?',
  'lignin.faq.a2':
    'Lignin pellets have a calorific value of {calorific}, against {pelletCalorific} for ENplus A1 wood pellets, so every tonne delivers more heat. Their ash content is higher, however: {ash} for lignin pellets, {pelletAsh} for wood pellets. Lignin pellets are supplied in 1000 kg big bags only, and are used as an industrial raw material as well as a fuel.',
  'lignin.faq.q3': 'Who are lignin pellets for?',
  'lignin.faq.a3':
    'Mainly industrial boiler houses and CHP plants looking for more energy per tonne. As a raw material, lignin is also used by asphalt and concrete producers, chemical and biorefinery operations, and agricultural and feed manufacturers.',
  'lignin.faq.q4': 'What is lignin used for besides heating?',
  'lignin.faq.a4':
    'Added to bitumen and asphalt, lignin extends the service life of road surfaces and slows the age-hardening of bitumen. Lignosulfonates act as plasticisers in concrete. Lignin is also made into enterosorbents for livestock, soil improvers, vanillin, resins, carbon fibre and activated carbon, and it is used in drilling fluids, foundry moulding sands and oil spill cleanup.',
  'lignin.faq.q5': 'How are lignin pellets delivered?',
  'lignin.faq.a5':
    'Lignin pellets are supplied in 1000 kg big bags with lifting loops, which move by forklift or telehandler. We deliver throughout Estonia and the Baltics, and export by full truckload across Europe.',
  'lignin.faq.q6': 'How much do lignin pellets cost?',
  'lignin.faq.a6':
    'Lignin pellets cost {price} {perTon}. {vatNote} For an exact quote, tell us the quantity you need and the delivery address.',
  'lignin.faq.q7': 'Does each delivery come with a certificate of analysis?',
  'lignin.faq.a7':
    'Yes. The figures in the specification table are typical for this grade; the exact values for each batch are confirmed on the certificate of analysis that accompanies it.',

  'lignin.cta.title': 'Need lignin pellets in volume?',
  'lignin.cta.text':
    'Tell us your annual tonnage, delivery point and intended application, and we will come back with a quote and a certificate of analysis.',
  'lignin.cta.button': 'Request a quote',

  // --- Peat briquettes landing page ----------------------------------------
  'nav.peat': 'Peat briquettes',

  'peat.meta.title': 'Peat Briquettes in Stock — Long, Even Burn | KR Wood',
  'peat.meta.description':
    'Peat briquettes for homes and industry: a long, even burn, about 4.2 kWh/kg, low sulphur and usable ash. In stock in Estonia, 1000 kg per pallet.',

  'peat.stock': 'In stock',
  'peat.hero.title': 'Peat Briquettes',
  'peat.hero.titleAccent': 'Long, steady heat for homes and industry',
  'peat.hero.lead':
    'A peat briquette is dried peat pressed under high pressure into a dense, uniform block that catches readily from a lit fire and smoulders for hours. One load keeps a stove or boiler warm through the night.',
  'peat.hero.ctaPrimary': 'Request a quote',
  'peat.hero.ctaWhatsapp': 'Ask on WhatsApp',
  'peat.whatsappMessage': 'Hello! I would like to order peat briquettes.',

  'peat.row.form': 'Form',
  'peat.row.burn': 'Burn time',
  'peat.row.availability': 'Availability',
  'peat.row.pallet': 'Pallet',
  'peat.value.material': 'Milled peat',
  'peat.value.form': 'Pressed briquette, no binders',
  'peat.value.calorific': '≈ 4.2 kWh/kg',
  'peat.value.moisture': '≤ 20 %',
  'peat.value.burn': 'up to ~8 h',
  'peat.value.woodCalorific': '≈ 4.6 kWh/kg',
  'peat.value.packaging': '84 packs, 1000 kg in total',
  'peat.value.palletWeight': '1000 kg',
  'peat.fact.pallet': '84 packs per pallet',
  'peat.value.gas': '9.3 kWh/m³',
  'peat.value.equiv': '450–500 m³',

  'peat.equiv.eyebrow': 'Energy content',
  'peat.equiv.from': '1 tonne of peat briquettes',
  'peat.equiv.to': 'of natural gas',
  'peat.equiv.note':
    'By net calorific value: peat briquettes {calorific} (moisture {moisture}), natural gas {gas}. Drier briquettes come close to the upper figure.',

  'peat.about.eyebrow': 'Product overview',
  'peat.about.title': 'What is a peat briquette and how does it burn?',
  'peat.about.lead':
    'A peat briquette is a solid fuel made from milled peat: the peat is dried to a low moisture content and pressed under high pressure, without glue or any other binder. Once lit, it burns with a short flame at first and then smoulders for hours, giving off steady heat.',
  'peat.about.made.title': 'How it is made',
  'peat.about.made.text':
    'Peat is partly decomposed plant matter that has built up in bogs and fens over thousands of years. For briquettes, the top layer of a drained bog is milled into a fine crumb, dried first in the field and then at the factory, and pressed into briquettes. Under pressure and heat, natural compounds in the peat itself bind the particles together, so the briquette holds without additives. The result is far denser than loose peat or firewood: more energy fits into every bag and every cubic metre of storage.',
  'peat.about.burn.title': 'How it burns',
  'peat.about.burn.text':
    'A lit briquette first gives off its volatile gases and burns with a short, bright flame. Once these have burnt away, a glowing layer of embers forms and burns slowly from the outside in — the long phase that heats the stove or boiler evenly. Because the briquette is dense and uniform, it keeps its shape for a long time as it burns, and the heat output stays steady. With the air supply turned down once the flames settle, a full firebox smoulders for several hours — up to around 8 hours, according to manufacturers, depending on the stove and the draught.',
  'peat.about.use.title': 'How to fire with it',
  'peat.about.use.text':
    'Start the fire with kindling or a few logs and add the briquettes once there is a bed of embers. Lay them loosely so that air can reach them, and partly close the air damper when the flames have settled — less air, longer burn. Peat briquettes suit stoves, cookers, closed fireplace inserts and solid-fuel boilers built for wood or coal; they do not belong in a pellet burner.',

  'peat.benefits.title': 'Advantages of peat briquettes',
  'peat.benefits.b1.title': 'Long burn time',
  'peat.benefits.b1.text':
    'One load smoulders for hours — up to around 8 hours, according to manufacturers — so the stove can be filled in the evening and the house stays warm until morning.',
  'peat.benefits.b2.title': 'No acrid coal smell',
  'peat.benefits.b2.text': 'Unlike coal, peat briquettes burn without a heavy, acrid smoke smell.',
  'peat.benefits.b3.title': 'Low sulphur content',
  'peat.benefits.b3.text':
    'Peat contains far less sulphur than most coal. Less sulphur means fewer corrosive deposits — gentler on the boiler, the stove and the chimney.',
  'peat.benefits.b4.title': 'Ash for the garden',
  'peat.benefits.b4.text':
    'The ash is mineral-rich and alkaline. Once cold, it can be spread thinly on beds and lawns as a fertiliser and soil improver — provided nothing else was burnt with the briquettes.',
  'peat.benefits.b5.title': 'A lot of heat in little space',
  'peat.benefits.b5.text':
    'A tonne of peat briquettes gives about as much heat as {equiv} of natural gas, and for the same heat the dense briquettes take up less storage space than firewood.',

  'peat.uses.eyebrow': 'Applications',
  'peat.uses.title': 'Where to use peat briquettes',
  'peat.uses.subtitle':
    'Wherever the firebox is built for wood or coal — from a family home to an industrial boiler house.',
  'peat.uses.home.title': 'Homes',
  'peat.uses.home.lead':
    'An excellent fuel for houses and summer cottages, especially at night, when a long, even burn matters more than a quick blaze.',
  'peat.uses.home.i1': 'Stoves and cookers',
  'peat.uses.home.i2': 'Closed fireplace inserts',
  'peat.uses.home.i3': 'Solid-fuel boilers',
  'peat.uses.industry.title': 'Industry and large consumers',
  'peat.uses.industry.lead': 'A widely used solid fuel for businesses with a boiler house of their own:',
  'peat.uses.industry.i1': 'Poultry farms',
  'peat.uses.industry.i2': 'Greenhouses',
  'peat.uses.industry.i3': 'Brick and cement works',
  'peat.uses.industry.i4': 'Dairies and canneries',
  'peat.uses.industry.i5': 'Swimming pools and spa complexes',
  'peat.uses.industry.i6': 'Industrial and municipal boiler houses',
  'peat.uses.industry.i7': 'Thermal power plants',

  'peat.specs.title': 'Specifications',
  'peat.specs.subtitle':
    'Typical values for peat briquettes. Ask for the figures of the current batch together with your quote.',
  'peat.specs.note':
    'Calorific value and moisture are reference values for peat briquettes from the Estonian methodology for calculating the energy performance of buildings. Burn time depends on the stove and the draught.',

  'peat.ash.eyebrow': 'After the fire',
  'peat.ash.title': 'What to do with the ash',
  'peat.ash.lead':
    'Peat briquettes leave more ash than wood briquettes, so it pays to have a plan for it. Once cold, the ash is rich in calcium and strongly alkaline: in the garden it works mainly like lime, and in moderation as a fertiliser.',
  'peat.ash.s1.title': 'Let it cool safely',
  'peat.ash.s1.text':
    'Collect the ash in a metal container with a lid and take it outside onto a non-combustible surface, away from walls and the woodpile. Ash can stay hot for several days — keep it out of plastic bins, bin bags and paper until it is completely cold.',
  'peat.ash.s2.title': 'Use it in the garden',
  'peat.ash.s2.text':
    'Spread the cold ash thinly on acidic soil — lawns, under fruit trees, cabbage and flower beds — or add it to the compost in thin layers. Spring is the best time. Keep the ash dry until you use it: rain washes the nutrients out. It is caustic, so wear gloves and do not spread it in the wind.',
  'peat.ash.s3.title': 'Where not to use it',
  'peat.ash.s3.text':
    'Not around acid-loving plants (blueberries, cranberries, rhododendrons, heather), not on a potato bed before planting — it encourages scab — and not on soil whose pH is already 7 or higher. Do not mix it with fresh manure or nitrogen fertilisers, and do not use it at all if coal, painted wood, plastic or glossy paper was burnt in the firebox.',
  'peat.ash.s4.title': 'Whatever is left over',
  'peat.ash.s4.text':
    'In winter, cold ash also works as grit on icy paths. Whatever you do not use, dispose of according to your municipality’s waste rules.',
  'peat.ash.table.title': 'What the ash contains',
  'peat.ash.table.lead':
    'The manufacturer’s laboratory analysis of ash from burnt peat briquettes. Calcium ({calcium}) and the high pH ({ph}) stand out; there is little potassium or nitrogen.',
  'peat.ash.table.note': 'Figures are the manufacturer’s and may vary from batch to batch.',
  'peat.ash.row.ash': 'Ash content',
  'peat.ash.row.organic': 'Organic matter',
  'peat.ash.row.carbon': 'Total carbon (C)',
  'peat.ash.row.nitrogen': 'Total nitrogen (N)',
  'peat.ash.row.phosphorus': 'Total phosphorus (P₂O₅)',
  'peat.ash.row.potassium': 'Total potassium (K₂O)',
  'peat.ash.row.calcium': 'Calcium (Ca)',
  'peat.ash.row.magnesium': 'Magnesium (Mg)',
  'peat.ash.row.copper': 'Copper (Cu)',
  'peat.ash.row.zinc': 'Zinc (Zn)',
  'peat.ash.row.cobalt': 'Cobalt (Co)',
  'peat.ash.row.nickel': 'Nickel (Ni)',
  'peat.ash.row.manganese': 'Manganese (Mn)',
  'peat.ash.row.ph': 'pH',

  'peat.faq.eyebrow': 'FAQ',
  'peat.faq.title': 'Frequently asked questions about peat briquettes',
  'peat.faq.q1': 'What is a peat briquette?',
  'peat.faq.a1':
    'A peat briquette is a solid fuel made from milled peat, dried and pressed under high pressure into dense briquettes without any binder. Its calorific value is {calorific}, and a tonne of briquettes gives about as much heat as {equiv} of natural gas.',
  'peat.faq.q2': 'How long does a peat briquette burn?',
  'peat.faq.a2':
    'With the air supply turned down after lighting, a full firebox smoulders for several hours — {burn}, according to manufacturers. The actual time depends on the stove, the draught and how full the firebox is.',
  'peat.faq.q3': 'Can I burn peat briquettes in a pellet boiler?',
  'peat.faq.a3':
    'No. A pellet burner feeds fuel automatically and needs pellets of a fixed size. Peat briquettes are for manually loaded stoves, cookers, closed fireplace inserts and solid-fuel boilers. For a pellet boiler, choose our ENplus A1 wood pellets.',
  'peat.faq.q4': 'Peat briquettes or wood briquettes — which should I choose?',
  'peat.faq.a4':
    'Both suit manually loaded stoves and solid-fuel boilers. Wood briquettes give a little more heat per kilogram ({woodCalorific}, against {calorific} for peat), burn hotter and faster with a livelier flame, and leave little ash. Peat briquettes smoulder longer and more evenly, which makes them the better choice for the night, but they leave noticeably more ash. Many people combine the two: wood briquettes to heat up quickly, peat briquettes to hold the heat for hours.',
  'peat.faq.q5': 'How much do peat briquettes cost?',
  'peat.faq.a5':
    'Peat briquettes cost {price} {perTon} — one pallet ({packaging}). {vatNote} For an exact quote, tell us the quantity you need and the delivery address. Peat briquettes are in stock.',
  'peat.faq.q6': 'Can peat briquette ash be used in the garden?',
  'peat.faq.a6':
    'Yes, in moderation. The ash is rich in calcium ({calcium}) and strongly alkaline (pH {ph}), so in the garden it works mainly like lime; it holds little potassium or nitrogen. Spread cold ash thinly on acidic soil, but not under acid-loving plants or on potato beds. There is more of it than with wood briquettes, so the ash pan needs emptying more often.',
  'peat.faq.q7': 'How should peat briquettes be stored?',
  'peat.faq.a7':
    'Keep them dry, under cover and off the ground — on a pallet or a shelf in a shed or boiler room. Briquettes that take on moisture give less heat and can crumble.',

  'peat.faq.q8': 'How are the peat briquettes packed?',
  'peat.faq.a8':
    'Peat briquettes come in packs on pallets: one pallet holds {packaging}. For a quote, tell us the quantity you need and the delivery address.',

  'peat.cta.title': 'Need peat briquettes?',
  'peat.cta.text':
    'Tell us how much you need and where to deliver it, and we will reply with the price and delivery terms. Peat briquettes are in stock, and you can also collect them from our warehouse in Loo, just outside Tallinn.',

  'peat.teaser.title': 'Also in stock: peat briquettes',
  'peat.teaser.text':
    'For stoves and solid-fuel boilers: a long, even burn through the night. {price} {perTon}. {vatNote}',
  'peat.teaser.link': 'See peat briquettes',
};

/* -------------------------------------------------------------------------- */
/* Polish — /pl/                                                              */
/* -------------------------------------------------------------------------- */

const pl: Dictionary = {
  'meta.title': 'Pellet drzewny premium ENplus A1 | KR Wood Estonia',
  'meta.description':
    'Pellet drzewny ENplus A1, 6 mm i 8 mm. Wysoka wartość opałowa, niska zawartość popiołu, 100% naturalne drewno iglaste. Dostawa na terenie UE.',
  'meta.ogAlt': 'KR Wood pellet drzewny premium',

  'a11y.skipToContent': 'Przejdź do treści głównej',
  'a11y.openMenu': 'Otwórz menu',
  'a11y.closeMenu': 'Zamknij menu',
  'a11y.chooseLanguage': 'Wybierz język',
  'a11y.backToTop': 'Powrót do góry',
  'a11y.homepage': 'KR Wood — strona główna',

  'nav.features': 'Zalety',
  'nav.specs': 'Produkty',
  'nav.packaging': 'Opakowania',
  'nav.contact': 'Kontakt',
  'nav.cta': 'Zapytaj o ofertę',

  'hero.badge': 'Certyfikat ENplus® A1',
  'hero.title': 'Pellet drzewny premium',
  'hero.titleAccent': 'Dla Twojego domu',
  'hero.subtitle':
    '100% naturalne drewno iglaste bez klejów i dodatków chemicznych. Wysoka wartość opałowa, niska zawartość popiołu i stała jakość — ciepło, które oszczędza Twoje pieniądze i środowisko.',
  'hero.ctaPrimary': 'Zamów teraz',
  'hero.ctaSecondary': 'Zobacz produkty',
  'hero.stat1Value': '4,9+',
  'hero.stat1Unit': 'kWh/kg',
  'hero.stat1Label': 'Wartość opałowa',
  'hero.stat2Value': '< 0,5',
  'hero.stat2Unit': '%',
  'hero.stat2Label': 'Zawartość popiołu',
  'hero.stat3Value': '< 8',
  'hero.stat3Unit': '%',
  'hero.stat3Label': 'Wilgotność',

  'features.eyebrow': 'Dlaczego KR Wood',
  'features.title': 'Czyste ciepło, na którym możesz polegać',
  'features.subtitle':
    'Nasz pellet jest prasowany ze świeżych trocin drewna iglastego, bez środków wiążących. Każda partia przechodzi kontrolę jakości, aby Twój kocioł pracował bezawaryjnie przez cały sezon grzewczy.',
  'features.heat.title': 'Wysoka wartość opałowa',
  'features.heat.text':
    'Ponad 4,9 kWh/kg oznacza więcej ciepła z każdego worka i zauważalnie niższe zużycie paliwa w skali sezonu.',
  'features.ash.title': 'Niska zawartość popiołu',
  'features.ash.text':
    'Poniżej 0,5% popiołu utrzymuje kocioł i komin w czystości, ograniczając konserwację i usuwanie popiołu do minimum.',
  'features.eco.title': '100% ekologiczny',
  'features.eco.text':
    'Wyłącznie czyste drewno — bez klejów, barwników i dodatków chemicznych. Paliwo neutralne pod względem CO₂ i w pełni odnawialne.',
  'features.quality.title': 'Jakość ENplus® A1',
  'features.quality.text':
    'Każda partia spełnia rygorystyczną normę europejską: stała średnica, wysoka gęstość i minimalna zawartość frakcji drobnych.',

  'specs.eyebrow': 'Produkty',
  'specs.title': 'Pellet i dane techniczne',
  'specs.subtitle':
    'Pellet drzewny ENplus A1 w dwóch średnicach, 6 mm i 8 mm, oraz pellet ligninowy 8 mm do zastosowań przemysłowych. Wybierz produkt dopasowany do swojego kotła i zastosowania.',
  'specs.d6.title': 'Pellet 6 mm',
  'specs.d6.desc': 'Uniwersalny wybór do kotłów domowych, kominków na pellet i mniejszych instalacji.',
  'specs.d6.badge': 'Najpopularniejszy',
  'specs.d8.title': 'Pellet 8 mm',
  'specs.d8.desc': 'Przeznaczony do większych kotłowni, palników przemysłowych i dużego zużycia.',
  'specs.d8.badge': 'Przemysłowy',
  'specs.lignin.title': 'Pellet ligninowy 8 mm',
  'specs.lignin.desc':
    'Lignina to naturalny polimer, który nadaje drewnu wytrzymałość — i jedna z najbardziej energetycznych frakcji biomasy. Sprasowana w pellet 8 mm i dostarczana w big bagach 1000 kg spala się goręcej niż zwykły pellet drzewny i znajduje zastosowanie w wielu branżach.',
  'specs.lignin.badge': 'Biopaliwo i surowiec przemysłowy',
  'specs.table.param': 'Parametr',
  'specs.table.value': 'Wartość',
  'specs.row.diameter': 'Średnica',
  'specs.row.length': 'Długość',
  'specs.row.calorific': 'Wartość opałowa',
  'specs.row.ash': 'Zawartość popiołu',
  'specs.row.moisture': 'Wilgotność',
  'specs.row.density': 'Gęstość nasypowa',
  'specs.row.fines': 'Frakcje drobne',
  'specs.row.material': 'Surowiec',
  'specs.value.material': 'Drewno iglaste (sosna, świerk)',
  'specs.value.length': '10–40 mm',
  'specs.value.calorific': '≥ 4,9 kWh/kg',
  'specs.value.ash': '≤ 0,5 %',
  'specs.value.moisture': '≤ 8 %',
  'specs.value.density': '≥ 650 kg/m³',
  'specs.value.fines': '≤ 1 %',

  'price.label': 'Cena',
  'price.perTon': 'za tonę',
  // "estońskiego" on purpose: Polish VAT is 23%, and a bare 24% reads as a typo.
  'price.vatIncluded': 'Zawiera {vat}% estońskiego VAT',
  'price.netLabel': 'netto (bez VAT)',
  'price.wholesaleNote': 'Cena hurtowa obowiązuje przy zamówieniach od {min} ton',

  'packaging.eyebrow': 'Opakowania',
  'packaging.title': 'Opakowania i dostawa',
  'packaging.subtitle':
    'Wybierz format dopasowany do swoich możliwości magazynowych. Wszystkie palety są foliowane i odporne na warunki atmosferyczne.',
  'packaging.bags.title': 'Worki 15 kg na palecie',
  'packaging.bags.desc':
    '65 worków na palecie, łącznie 975 kg. Łatwe w transporcie i przechowywaniu — idealne dla gospodarstw domowych.',
  'packaging.bags.spec1': '65 worków × 15 kg',
  'packaging.bags.spec2': '975 kg na palecie',
  'packaging.bags.spec3': 'Ochronna folia termokurczliwa',
  'packaging.bigbag.title': 'Big Bag 1000 kg',
  'packaging.bigbag.desc':
    'Worek big bag z uchwytami do podnoszenia i wysypem dolnym. Najbardziej ekonomiczny sposób magazynowania większych ilości.',
  'packaging.bigbag.spec1': 'Worek 1000 kg',
  'packaging.bigbag.spec2': 'Uchwyty do podnoszenia',
  'packaging.bigbag.spec3': 'Wysyp dolny',
  'packaging.delivery.title': 'Dostawa i eksport',
  'packaging.delivery.desc':
    'Dostawa na terenie całej Estonii i krajów bałtyckich, a także odbiór własny z naszego magazynu w Loo pod Tallinnem. Eksportujemy również w kontenerach i pełnych ładunkach samochodowych do całej Europy.',
  'packaging.delivery.spec1': 'Dostawa w całej Estonii',
  'packaging.delivery.spec2': 'Kraje bałtyckie i UE',
  'packaging.delivery.spec3': 'Pełne ładunki 24 t',
  'packaging.cta': 'Zapytaj o wycenę',

  'faq.eyebrow': 'FAQ',
  'faq.title': 'Najczęściej zadawane pytania o pellet drzewny',
  'faq.q1': 'Pellet 6 mm czy 8 mm?',
  'faq.a1':
    'Oba mają tę samą jakość ENplus A1: wartość opałową {calorific}, zawartość popiołu {ash} i wilgotność {moisture}. Różnią się średnicą. Pellet 6 mm to uniwersalny wybór do kotłów domowych, kominków na pellet i mniejszych instalacji, a pellet 8 mm jest przeznaczony do większych kotłowni, palników przemysłowych i dużego zużycia. W razie wątpliwości sprawdź, jaką średnicę zaleca producent Twojego kotła.',
  'faq.q2': 'Co oznacza ENplus A1?',
  'faq.a2':
    'ENplus to europejski certyfikat jakości pelletu drzewnego, a A1 to jego najwyższa klasa jakości. Oznacza stałą średnicę, wysoką gęstość, niską zawartość popiołu i minimalną ilość frakcji drobnych — pellet spala się czysto, a kocioł i komin pozostają czyste.',
  'faq.q3': 'Ile kosztuje pellet drzewny?',
  'faq.a3':
    'Pellet drzewny ENplus A1 kosztuje {price6} {perTon} w średnicy 6 mm (cena hurtowa przy zamówieniach od {min} ton) i {price8} {perTon} w średnicy 8 mm. {vatNote} Aby otrzymać dokładną ofertę, podaj ilość, opakowanie i adres dostawy.',
  'faq.q4': 'Worki 15 kg czy big bag?',
  'faq.a4':
    'Worki 15 kg dostarczamy na paletach: 65 worków, 975 kg na palecie, zabezpieczonych folią termokurczliwą i odpornych na warunki atmosferyczne. Są łatwe w transporcie i przechowywaniu, dlatego idealnie sprawdzają się w gospodarstwach domowych. Big bag 1000 kg ma uchwyty do podnoszenia i wysyp dolny — to najbardziej ekonomiczny sposób magazynowania większych ilości.',
  'faq.q5': 'Jak przechowywać pellet drzewny?',
  'faq.a5':
    'Pellet trzeba chronić przed wilgocią: wilgoć niszczy pellet i obniża jego wartość opałową. Nasze palety są foliowane i odporne na warunki atmosferyczne, ale otwarte worki i big bagi najlepiej trzymać w pomieszczeniu lub pod dachem.',
  'faq.q6': 'Dokąd dostarczacie pellet drzewny?',
  'faq.a6':
    'Dostarczamy na terenie całej Estonii i krajów bałtyckich, a w kontenerach i pełnymi ładunkami (24 t) eksportujemy do całej Europy. Możliwy jest też odbiór własny z naszego magazynu w Loo pod Tallinnem.',
  'faq.q7': 'Czy pellet zawiera dodatki?',
  'faq.a7':
    'Nie. Pellet jest prasowany ze świeżych trocin drewna iglastego (sosna, świerk), bez klejów, środków wiążących i dodatków chemicznych — to w 100% naturalne, odnawialne paliwo.',

  'contact.eyebrow': 'Kontakt',
  'contact.title': 'Zapytaj o indywidualną ofertę',
  'contact.subtitle':
    'Napisz nam, jakiej ilości i adresu dostawy potrzebujesz, a odpowiemy z wyceną w ciągu jednego dnia roboczego.',
  'contact.form.legend': 'Formularz zapytania',
  'contact.form.name': 'Imię i nazwisko',
  'contact.form.namePlaceholder': 'Twoje imię lub nazwa firmy',
  'contact.form.email': 'E-mail',
  'contact.form.emailPlaceholder': 'twoj@email.pl',
  'contact.form.phone': 'Telefon',
  'contact.form.phonePlaceholder': '+48 512 345 678',
  'contact.form.message': 'Wiadomość',
  'contact.form.messagePlaceholder': 'Potrzebna ilość, opakowanie (worki 15 kg / Big Bag) i adres dostawy…',
  'contact.form.optional': 'opcjonalnie',
  'contact.form.submit': 'Wyślij zapytanie',
  'contact.form.sending': 'Wysyłanie…',
  'contact.form.success': 'Dziękujemy! Twoje zapytanie zostało wysłane. Odezwiemy się w ciągu jednego dnia roboczego.',
  'contact.form.error': 'Wysyłanie nie powiodło się. Spróbuj ponownie lub zadzwoń do nas bezpośrednio.',
  'contact.form.errorRequired': 'To pole jest wymagane',
  'contact.form.errorEmail': 'Podaj poprawny adres e-mail',
  'contact.form.consent': 'Wyrażam zgodę na przetwarzanie moich danych w celu udzielenia odpowiedzi na zapytanie.',
  'contact.form.privacyLink': 'Polityka prywatności',
  'contact.info.title': 'Dane kontaktowe',
  'contact.info.phone': 'Telefon',
  'contact.info.email': 'E-mail',
  'contact.info.address': 'Adres',
  'contact.info.hours': 'Godziny otwarcia',
  'contact.info.hoursValue': 'Pn–Pt 9:00–17:00',
  'contact.info.company': 'Firma',
  'contact.info.regCode': 'Numer rejestrowy',
  'contact.info.vat': 'Numer VAT',
  'contact.info.country': 'Estonia',
  'contact.whatsapp': 'Napisz na WhatsAppie',
  'contact.whatsappMessage':
    'Dzień dobry! Chciałbym poprosić o ofertę na pellet drzewny.',

  'footer.tagline':
    'Pellet drzewny premium z Estonii. Jakość ENplus A1, niezawodna dostawa i uczciwe ceny.',
  'footer.navTitle': 'Nawigacja',
  'footer.contactTitle': 'Kontakt',
  'footer.legalTitle': 'Informacje prawne',
  'footer.privacy': 'Polityka prywatności',
  'footer.rights': 'Wszelkie prawa zastrzeżone.',
  'footer.visitsTotal': 'Wszystkich wizyt',
  'footer.visitsToday': 'Dziś',
  'footer.socialTitle': 'Obserwuj nas',

  'privacy.meta.title': 'Polityka prywatności | KR Wood',
  'privacy.meta.description':
    'Polityka prywatności KR Wood — jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe zgodnie z RODO.',
  'privacy.title': 'Polityka prywatności',
  'privacy.updated': 'Ostatnia aktualizacja',
  'privacy.intro':
    'KR Wood szanuje Twoją prywatność i przetwarza dane osobowe zgodnie z Ogólnym rozporządzeniem o ochronie danych Unii Europejskiej (RODO). Niniejsza polityka wyjaśnia, jakie dane zbieramy i w jaki sposób je wykorzystujemy.',
  'privacy.s1.title': 'Jakie dane zbieramy',
  'privacy.s1.body':
    'Po wypełnieniu formularza kontaktowego zbieramy Twoje imię, adres e-mail, numer telefonu oraz treść wiadomości. Dane te podajesz dobrowolnie, wysyłając zapytanie.',
  'privacy.s2.title': 'Jak wykorzystujemy dane',
  'privacy.s2.body':
    'Wykorzystujemy Twoje dane wyłącznie w celu udzielenia odpowiedzi na zapytanie, przygotowania wyceny i realizacji ewentualnego zamówienia. Nie wykorzystujemy Twoich danych do celów marketingowych bez odrębnej zgody.',
  'privacy.s3.title': 'Udostępnianie danych',
  'privacy.s3.body':
    'Nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych podmiotom trzecim. Dane mogą być udostępniane wyłącznie partnerom logistycznym w celu realizacji zamówienia lub organom władzy, gdy wymaga tego prawo.',
  'privacy.s4.title': 'Okres przechowywania',
  'privacy.s4.body':
    'Dane z zapytań przechowujemy do 24 miesięcy od ostatniego kontaktu, po czym są usuwane. Dokumenty księgowe przechowujemy przez okres wymagany przepisami prawa.',
  'privacy.s5.title': 'Pliki cookie',
  'privacy.s5.body':
    'Ta strona jest statyczna i nie używa plików cookie śledzących ani analityki podmiotów trzecich. Czcionki są serwowane z naszego własnego serwera, więc żadne Twoje dane nie są przekazywane do usług zewnętrznych. Licznik odwiedzin w stopce działa na naszym serwerze i przechowuje wyłącznie sumy zbiorcze; korzysta z pamięci sesji przeglądarki, aby nie liczyć tej samej wizyty dwukrotnie, i nie zapisuje żadnych danych osobowych.',
  'privacy.s5.titleAnalytics': 'Pliki cookie i analityka',
  'privacy.s5.bodyAnalytics':
    'Ta strona nie używa plików cookie śledzących. Do pomiaru liczby odwiedzin korzystamy z Cloudflare Web Analytics, które nie ustawia plików cookie, nie tworzy profili użytkowników i nie śledzi Cię na innych stronach — zbierane są wyłącznie dane zbiorcze, takie jak liczba odsłon i przybliżona lokalizacja na poziomie kraju. Podmiotem przetwarzającym jest Cloudflare, Inc. (USA). Czcionki są serwowane z naszego własnego serwera. Licznik odwiedzin w stopce działa na naszym serwerze i przechowuje wyłącznie sumy zbiorcze.',
  'privacy.s6.title': 'Twoje prawa',
  'privacy.s6.body':
    'Masz prawo żądać dostępu do swoich danych, ich sprostowania lub usunięcia, a także ograniczenia przetwarzania i przeniesienia danych. Aby skorzystać z tych praw, skontaktuj się z nami pod adresem e-mail podanym poniżej.',
  'privacy.s7.title': 'Kontakt',
  'privacy.s7.body': 'W sprawach dotyczących prywatności prosimy o kontakt pod adresem:',
  'privacy.back': 'Powrót na stronę główną',

  // --- Lignin pellets landing page ----------------------------------------
  'nav.lignin': 'Pellet ligninowy',

  'lignin.meta.title': 'Pellet ligninowy 8 mm hurt | Big Bag 1000 kg | KR Wood',
  'lignin.meta.description':
    'Pellet ligninowy 8 mm w big bagach 1000 kg — hurt prosto od producenta z Estonii. Pełne tiry 24 t, import pelletu z dostawą na terenie całej Polski.',
  'lignin.meta.imageAlt':
    'Kopiec pelletu ligninowego 8 mm na ciemnym drewnianym blacie, obok szklany słoiczek z próbką',

  'lignin.hero.badge': '8 mm · Big Bag 1000 kg · hurt',
  'lignin.hero.title': 'Pellet ligninowy',
  'lignin.hero.titleAccent': 'Biopaliwo i surowiec przemysłowy — hurt prosto od producenta z Estonii',
  'lignin.hero.lead':
    'Lignina to naturalny polimer, który nadaje drewnu wytrzymałość — i jedna z najbardziej energetycznych frakcji biomasy. Sprasowana w pellet 8 mm i dostarczana w big bagach 1000 kg spala się goręcej niż zwykły pellet drzewny i znajduje zastosowanie w wielu branżach daleko poza kotłownią. Sprzedajemy wyłącznie w hurcie: pełnymi tirami po 24 tony, prosto od producenta z Estonii.',
  'lignin.hero.ctaPrimary': 'Zapytaj o ofertę',
  'lignin.hero.ctaSecondary': 'Zobacz dane techniczne',

  'lignin.overview.eyebrow': 'Opis produktu',
  'lignin.overview.title': 'Czym jest pellet ligninowy',
  'lignin.overview.p1':
    'Lignina jest drugim po celulozie najpowszechniejszym polimerem organicznym na Ziemi. To ona spaja włókna roślinne i nadaje drewnu sztywność. Wyodrębniona jako produkt uboczny przemysłu celulozowego i biorafinerii zawiera wyraźnie więcej energii niż otaczająca ją celuloza — i właśnie to czyni ją wartościowym paliwem.',
  'lignin.overview.p2':
    'Być może już używasz ligniny, nie zdając sobie z tego sprawy. W produkcji standardowego pelletu drzewnego lignina jest często wykorzystywana jako naturalne spoiwo zamiast skrobi: ciepło i ciśnienie zmiękczają własną ligninę drewna, która następnie twardnieje i spaja pellet, bez potrzeby stosowania syntetycznego kleju. Ten produkt koncentruje tę samą substancję w osobnym pellecie.',

  'lignin.benefits.title': 'Najważniejsze zalety',
  'lignin.benefits.b1.title': 'Wyższa wartość opałowa',
  'lignin.benefits.b1.text':
    'Lignina zawiera więcej energii w kilogramie niż celuloza, więc każda tona daje więcej ciepła niż zwykły pellet drzewny.',
  'lignin.benefits.b2.title': 'Logistyka gotowa na duże wolumeny',
  'lignin.benefits.b2.text':
    'Big bagi 1000 kg z uchwytami przenosi się wózkiem widłowym lub ładowarką teleskopową — bez ręcznego przenoszenia worków i rozbierania palet.',
  'lignin.benefits.b3.title': 'Materiał o podwójnym zastosowaniu',
  'lignin.benefits.b3.text':
    'Ten sam produkt służy jako stałe biopaliwo oraz jako surowiec dla budownictwa, przemysłu chemicznego i rolnictwa.',
  'lignin.benefits.b4.title': 'Odnawialny produkt uboczny',
  'lignin.benefits.b4.text':
    'Lignina pochodzi z istniejących strumieni przemysłowych, a nie z drewna uprawianego na paliwo, więc nie zwiększa presji na lasy.',

  'lignin.audience.title': 'Dla kogo',
  'lignin.audience.a1': 'Przemysłowe kotłownie i elektrociepłownie szukające większej gęstości energii na tonę',
  'lignin.audience.a2': 'Wytwórnie mas bitumicznych i producenci betonu stosujący ligninę jako modyfikator lub plastyfikator',
  'lignin.audience.a3': 'Zakłady chemiczne i biorafinerie pozyskujące ligninę jako surowiec',
  'lignin.audience.a4': 'Producenci rolni i paszowi wytwarzający sorbenty i polepszacze gleby',

  'lignin.specs.title': 'Dane techniczne',
  'lignin.specs.subtitle':
    'Dostarczamy w jednym standardowym formacie — big bag 1000 kg, w hurcie od pełnego tira 24 t. Do każdej dostawy dostępny jest pełny certyfikat analizy.',
  'lignin.row.packaging': 'Opakowanie',
  'lignin.row.origin': 'Surowiec',
  'lignin.value.diameter': '8 mm',
  'lignin.value.length': '10–40 mm',
  'lignin.value.packaging': 'Big Bag 1000 kg',
  'lignin.value.calorific': '≥ 5,0 kWh/kg',
  'lignin.value.moisture': '≤ 10 %',
  'lignin.value.ash': '≤ 3 %',
  'lignin.value.density': '≥ 600 kg/m³',
  'lignin.value.origin': 'Lignina drzewna',
  'lignin.specs.note':
    'Wartości są typowe dla tej klasy. Dokładne dane potwierdzane są dla każdej partii w załączonym certyfikacie analizy.',

  'lignin.apps.eyebrow': 'Więcej niż ogrzewanie',
  'lignin.apps.title': 'Alternatywne zastosowania przemysłowe ligniny',
  'lignin.apps.subtitle':
    'Lignina jest materiałem platformowym. Jej fenolowa struktura, zdolność wiązania i hydrofobowość sprawiają, że jest przydatna daleko poza energetyką.',

  'lignin.apps.roads.title': 'Budowa dróg, asfalt i bitum',
  'lignin.apps.roads.lead':
    'Najszybciej rosnące zastosowanie ligniny. Dodawana do bitumu i nawierzchni drogowych częściowo zastępuje lepiszcze naftowe i działa jako przeciwutleniacz.',
  'lignin.apps.roads.i1': 'Zwiększa trwałość i żywotność nawierzchni drogowych',
  'lignin.apps.roads.i2': 'Chroni przed pękaniem i spowalnia starzenie się bitumu',
  'lignin.apps.roads.i3': 'Poprawia odporność na wahania temperatury i naprężenia termiczne',

  'lignin.apps.concrete.title': 'Beton i materiały budowlane',
  'lignin.apps.concrete.i1': 'Lignosulfoniany działają jako plastyfikatory, zwiększając wytrzymałość betonu',
  'lignin.apps.concrete.i2': 'Zmniejszają zapotrzebowanie mieszanki na wodę, zachowując urabialność',
  'lignin.apps.concrete.i3': 'Stosowane jako spoiwo w produkcji płyt i kompozytów',

  'lignin.apps.agri.title': 'Rolnictwo i hodowla zwierząt',
  'lignin.apps.agri.i1': 'Enterosorbenty dla zwierząt — wiążą i usuwają mikotoksyny z paszy',
  'lignin.apps.agri.i2': 'Nawozy i polepszacze gleby — poprawiają strukturę, napowietrzenie i retencję wody',
  'lignin.apps.agri.i3': 'Agrochemia — dyspergator w formulacjach pestycydów',

  'lignin.apps.chem.title': 'Przemysł chemiczny',
  'lignin.apps.chem.i1': 'Produkcja waniliny',
  'lignin.apps.chem.i2': 'Tworzywa sztuczne i żywice, zastępujące toksyczny fenol',
  'lignin.apps.chem.i3': 'Prekursor włókna węglowego',
  'lignin.apps.chem.i4': 'Węgiel aktywny',

  'lignin.apps.oil.title': 'Wydobycie ropy i metalurgia',
  'lignin.apps.oil.i1': 'Dodatek do płuczek wiertniczych',
  'lignin.apps.oil.i2': 'Spoiwo w masach formierskich w odlewnictwie',

  'lignin.apps.eco.title': 'Ekologia i usuwanie skażeń',
  'lignin.apps.eco.i1':
    'Usuwanie wycieków ropy — lignina działa jako sorbent hydrofobowy, wiążąc węglowodory na wodzie i w glebie',

  'lignin.faq.eyebrow': 'FAQ',
  'lignin.faq.title': 'Najczęściej zadawane pytania o pellet ligninowy',
  'lignin.faq.q1': 'Czym jest pellet ligninowy?',
  'lignin.faq.a1':
    'Pellet ligninowy to pellet o średnicy 8 mm sprasowany z ligniny — naturalnego polimeru, który spaja włókna drewna i nadaje mu sztywność. Lignina jest pozyskiwana jako produkt uboczny przemysłu celulozowego i biorafinerii i zawiera więcej energii w kilogramie niż otaczająca ją celuloza.',
  'lignin.faq.q2': 'Czym pellet ligninowy różni się od zwykłego pelletu drzewnego?',
  'lignin.faq.a2':
    'Wartość opałowa pelletu ligninowego wynosi {calorific}, a pelletu drzewnego ENplus A1 {pelletCalorific}, więc każda tona daje więcej ciepła. Zawartość popiołu jest natomiast wyższa: {ash} w pellecie ligninowym wobec {pelletAsh} w pellecie drzewnym. Pellet ligninowy dostarczamy wyłącznie w big bagach 1000 kg i służy on nie tylko jako paliwo, ale też jako surowiec przemysłowy.',
  'lignin.faq.q3': 'Dla kogo jest pellet ligninowy?',
  'lignin.faq.a3':
    'Przede wszystkim dla przemysłowych kotłowni i elektrociepłowni, które szukają większej gęstości energii na tonę. Jako surowiec ligninę wykorzystują też wytwórnie mas bitumicznych, producenci betonu, zakłady chemiczne i biorafinerie oraz producenci rolni i paszowi.',
  'lignin.faq.q4': 'Do czego oprócz ogrzewania wykorzystuje się ligninę?',
  'lignin.faq.a4':
    'Dodawana do bitumu i asfaltu lignina wydłuża żywotność nawierzchni drogowych i spowalnia starzenie się bitumu. Lignosulfoniany działają w betonie jako plastyfikatory. Z ligniny wytwarza się także enterosorbenty dla zwierząt, polepszacze gleby, wanilinę, żywice, włókno węglowe i węgiel aktywny; stosuje się ją również w płuczkach wiertniczych, masach formierskich i przy usuwaniu wycieków ropy.',
  'lignin.faq.q5': 'Jak dostarczany jest pellet ligninowy?',
  'lignin.faq.a5':
    'Pellet ligninowy dostarczamy w big bagach 1000 kg z uchwytami do podnoszenia, które przenosi się wózkiem widłowym lub ładowarką teleskopową. Sprzedajemy w hurcie, pełnymi tirami po 24 t, z dostawą pod wskazany adres w dowolnym regionie Polski.',
  'lignin.faq.q6': 'Ile kosztuje pellet ligninowy?',
  'lignin.faq.a6':
    'Cena pelletu ligninowego wynosi {price} {perTon}. {vatNote} Aby otrzymać dokładną ofertę, podaj potrzebną ilość i adres dostawy.',
  'lignin.faq.q7': 'Czy do dostawy dołączany jest certyfikat analizy?',
  'lignin.faq.a7':
    'Tak. Wartości w tabeli danych technicznych są typowe dla tej klasy; dokładne dane dla każdej partii potwierdza dołączony do niej certyfikat analizy.',

  'lignin.cta.title': 'Potrzebujesz pelletu ligninowego w hurcie?',
  'lignin.cta.text':
    'Podaj roczny tonaż, miejsce dostawy w Polsce i planowane zastosowanie, a przyślemy ofertę hurtową wraz z certyfikatem analizy. Wysyłamy prosto od producenta z Estonii, pełnymi tirami po 24 t.',
  'lignin.cta.button': 'Zapytaj o ofertę',

  // --- Peat briquettes landing page ----------------------------------------
  'nav.peat': 'Brykiet torfowy',

  'peat.meta.title': 'Brykiet torfowy — dostępny od ręki w Estonii | KR Wood',
  'peat.meta.description':
    'Brykiet torfowy do domu i przemysłu: długie, równe spalanie, ok. 4,2 kWh/kg, niska zawartość siarki. Dostępny od ręki w Estonii, 1000 kg na palecie.',

  'peat.stock': 'Dostępny od ręki',
  'peat.hero.title': 'Brykiet torfowy',
  'peat.hero.titleAccent': 'Długie, równe ciepło dla domu i przemysłu',
  'peat.hero.lead':
    'Brykiet torfowy to wysuszony torf sprasowany pod wysokim ciśnieniem w zwarte bryły o jednakowym kształcie. Łatwo zajmuje się od rozpalonego ognia i tli się godzinami — jeden załadunek utrzymuje ciepło w piecu lub kotle przez całą noc.',
  'peat.hero.ctaPrimary': 'Zapytaj o ofertę',
  'peat.hero.ctaWhatsapp': 'Zapytaj na WhatsAppie',
  'peat.whatsappMessage': 'Dzień dobry! Chciałbym zamówić brykiet torfowy.',

  'peat.row.form': 'Postać',
  'peat.row.burn': 'Czas palenia',
  'peat.row.availability': 'Dostępność',
  'peat.row.pallet': 'Paleta',
  'peat.value.material': 'Torf frezowy',
  'peat.value.form': 'Prasowany brykiet bez lepiszczy',
  'peat.value.calorific': '≈ 4,2 kWh/kg',
  'peat.value.moisture': '≤ 20 %',
  'peat.value.burn': 'do ~8 h',
  'peat.value.woodCalorific': '≈ 4,6 kWh/kg',
  'peat.value.packaging': '84 opakowania, łącznie 1000 kg',
  'peat.value.palletWeight': '1000 kg',
  'peat.fact.pallet': '84 opakowania na palecie',
  'peat.value.gas': '9,3 kWh/m³',
  'peat.value.equiv': '450–500 m³',

  'peat.equiv.eyebrow': 'Wartość energetyczna',
  'peat.equiv.from': '1 tona brykietu torfowego',
  'peat.equiv.to': 'gazu ziemnego',
  'peat.equiv.note':
    'Według wartości opałowej: brykiet torfowy {calorific} (wilgotność {moisture}), gaz ziemny {gas}. Suchszy brykiet zbliża się do górnej granicy.',

  'peat.about.eyebrow': 'Opis produktu',
  'peat.about.title': 'Czym jest brykiet torfowy i jak się pali?',
  'peat.about.lead':
    'Brykiet torfowy to paliwo stałe z torfu frezowego: torf suszy się do niskiej wilgotności i prasuje pod wysokim ciśnieniem, bez kleju i innych lepiszczy. Po rozpaleniu najpierw pali się krótkim płomieniem, a potem tli się godzinami, oddając równe ciepło.',
  'peat.about.made.title': 'Jak powstaje',
  'peat.about.made.text':
    'Torf to częściowo rozłożona materia roślinna, która gromadziła się w torfowiskach przez tysiące lat. Do produkcji brykietów wierzchnią warstwę osuszonego torfowiska frezuje się na drobną kruszonkę, suszy najpierw na polu, a potem w zakładzie, i prasuje w brykiety. Pod wpływem ciśnienia i temperatury naturalne związki zawarte w samym torfie wiążą cząstki ze sobą, więc brykiet trzyma się bez dodatków. Jest przy tym znacznie gęstszy niż luźny torf czy drewno opałowe — w każdym worku i w każdym metrze sześciennym składziku mieści się więcej energii.',
  'peat.about.burn.title': 'Jak się pali',
  'peat.about.burn.text':
    'Rozpalony brykiet najpierw uwalnia gazy lotne i pali się krótkim, jasnym płomieniem. Gdy się wypalą, powstaje warstwa żaru, która spala się powoli od zewnątrz do środka — to długa faza, w której piec lub kocioł nagrzewa się równomiernie. Ponieważ brykiet jest zwarty i jednolity, długo zachowuje kształt, a moc grzewcza pozostaje stabilna. Jeśli po opadnięciu płomieni przymkniesz dopływ powietrza, pełne palenisko tli się przez kilka godzin — według producentów nawet do około 8 godzin, zależnie od pieca i ciągu.',
  'peat.about.use.title': 'Jak nim palić',
  'peat.about.use.text':
    'Rozpal ogień drobnym drewnem lub kilkoma polanami i dokładaj brykiety, gdy w palenisku jest już żar. Układaj je luźno, żeby docierało do nich powietrze, a gdy płomienie opadną, częściowo przymknij przepustnicę — mniej powietrza to dłuższe palenie. Brykiet torfowy nadaje się do pieców, kuchni węglowych, zamkniętych wkładów kominkowych i kotłów na paliwo stałe przeznaczonych do drewna lub węgla; nie nadaje się do palników na pellet.',

  'peat.benefits.title': 'Zalety brykietu torfowego',
  'peat.benefits.b1.title': 'Długi czas palenia',
  'peat.benefits.b1.text':
    'Jeden załadunek tli się godzinami (według producentów nawet do około 8 godzin), więc piec można załadować wieczorem, a w domu jest ciepło do rana.',
  'peat.benefits.b2.title': 'Bez ostrego zapachu węgla',
  'peat.benefits.b2.text':
    'W odróżnieniu od węgla brykiet torfowy pali się bez ciężkiego, gryzącego zapachu dymu.',
  'peat.benefits.b3.title': 'Niska zawartość siarki',
  'peat.benefits.b3.text':
    'Torf zawiera znacznie mniej siarki niż większość gatunków węgla. Mniej siarki to mniej korozyjnych osadów — kocioł, piec i komin dłużej pozostają w dobrym stanie.',
  'peat.benefits.b4.title': 'Popiół do ogrodu',
  'peat.benefits.b4.text':
    'Popiół jest bogaty w minerały i ma odczyn zasadowy. Po wystygnięciu można go rozsypywać cienką warstwą na grządkach i trawniku jako nawóz i środek poprawiający glebę — o ile razem z brykietem nie spalano niczego innego.',
  'peat.benefits.b5.title': 'Dużo ciepła w małej objętości',
  'peat.benefits.b5.text':
    'Tona brykietu torfowego daje mniej więcej tyle ciepła co {equiv} gazu ziemnego, a przy tej samej ilości ciepła zwarte brykiety zajmują mniej miejsca w składziku niż drewno opałowe.',

  'peat.uses.eyebrow': 'Zastosowanie',
  'peat.uses.title': 'Gdzie stosować brykiet torfowy',
  'peat.uses.subtitle':
    'Wszędzie tam, gdzie palenisko jest przeznaczone do drewna lub węgla — od domu jednorodzinnego po przemysłową kotłownię.',
  'peat.uses.home.title': 'Gospodarstwa domowe',
  'peat.uses.home.lead':
    'Świetne paliwo do domów i domków letniskowych, szczególnie na noc, gdy liczy się długie i równe spalanie, a nie szybki płomień.',
  'peat.uses.home.i1': 'Piece i kuchnie węglowe',
  'peat.uses.home.i2': 'Zamknięte wkłady kominkowe',
  'peat.uses.home.i3': 'Kotły na paliwo stałe',
  'peat.uses.industry.title': 'Przemysł i duzi odbiorcy',
  'peat.uses.industry.lead': 'Popularne paliwo stałe w firmach z własną kotłownią:',
  'peat.uses.industry.i1': 'Fermy drobiu',
  'peat.uses.industry.i2': 'Szklarnie',
  'peat.uses.industry.i3': 'Cegielnie i cementownie',
  'peat.uses.industry.i4': 'Mleczarnie i zakłady konserwowe',
  'peat.uses.industry.i5': 'Baseny i kompleksy rekreacyjne',
  'peat.uses.industry.i6': 'Kotłownie przemysłowe i komunalne',
  'peat.uses.industry.i7': 'Elektrociepłownie',

  'peat.specs.title': 'Dane techniczne',
  'peat.specs.subtitle':
    'Typowe wartości dla brykietu torfowego. Wraz z ofertą poproś o dane bieżącej partii.',
  'peat.specs.note':
    'Wartość opałowa i wilgotność to wartości referencyjne dla brykietu torfowego z estońskiej metodyki obliczania charakterystyki energetycznej budynków. Czas palenia zależy od pieca i ciągu.',

  'peat.ash.eyebrow': 'Po spaleniu',
  'peat.ash.title': 'Co zrobić z popiołem?',
  'peat.ash.lead':
    'Brykiet torfowy zostawia więcej popiołu niż brykiet drzewny, więc warto mieć na niego plan. Wystygnięty popiół jest bogaty w wapń i silnie zasadowy: w ogrodzie działa przede wszystkim jak wapno, a stosowany z umiarem — także jak nawóz.',
  'peat.ash.s1.title': 'Pozwól mu bezpiecznie wystygnąć',
  'peat.ash.s1.text':
    'Zbieraj popiół do metalowego pojemnika z pokrywą i wynoś go na zewnątrz, na niepalne podłoże, z dala od ścian i drewna opałowego. Popiół może być gorący jeszcze przez kilka dni — dopóki całkiem nie wystygnie, nie wsypuj go do plastikowego kosza, worka na śmieci ani do papieru.',
  'peat.ash.s2.title': 'Wykorzystaj w ogrodzie',
  'peat.ash.s2.text':
    'Rozsypuj wystygnięty popiół cienką warstwą na kwaśnej glebie — na trawniku, pod drzewami owocowymi, na grządkach z kapustą i na rabatach — albo dodawaj go cienkimi warstwami do kompostu. Najlepsza pora to wiosna. Do czasu użycia przechowuj popiół w suchym miejscu: deszcz wypłukuje z niego składniki. Popiół jest żrący, więc używaj rękawic i nie rozsypuj go na wietrze.',
  'peat.ash.s3.title': 'Gdzie go nie stosować',
  'peat.ash.s3.text':
    'Nie pod rośliny lubiące kwaśną glebę (borówki, żurawiny, różaneczniki, wrzosy), nie na grządkę ziemniaków przed sadzeniem — sprzyja to parchowi — i nie na glebę, której pH wynosi już 7 lub więcej. Nie mieszaj popiołu ze świeżym obornikiem ani z nawozami azotowymi i nie używaj go wcale, jeśli w palenisku spalano węgiel, malowane drewno, plastik lub kolorowy papier.',
  'peat.ash.s4.title': 'Co zostanie',
  'peat.ash.s4.text':
    'Zimą zimny popiół sprawdza się też jako posypka na oblodzone ścieżki. To, czego nie wykorzystasz, wyrzuć zgodnie z zasadami gospodarki odpadami w twojej gminie.',
  'peat.ash.table.title': 'Skład popiołu',
  'peat.ash.table.lead':
    'Analiza laboratoryjna producenta dla popiołu ze spalonego brykietu torfowego. Wyróżniają się wapń ({calcium}) i wysokie pH ({ph}); potasu i azotu jest niewiele.',
  'peat.ash.table.note': 'Wartości podaje producent; mogą się różnić w zależności od partii.',
  'peat.ash.row.ash': 'Zawartość popiołu',
  'peat.ash.row.organic': 'Substancja organiczna',
  'peat.ash.row.carbon': 'Węgiel ogółem (C)',
  'peat.ash.row.nitrogen': 'Azot ogółem (N)',
  'peat.ash.row.phosphorus': 'Fosfor ogółem (P₂O₅)',
  'peat.ash.row.potassium': 'Potas ogółem (K₂O)',
  'peat.ash.row.calcium': 'Wapń (Ca)',
  'peat.ash.row.magnesium': 'Magnez (Mg)',
  'peat.ash.row.copper': 'Miedź (Cu)',
  'peat.ash.row.zinc': 'Cynk (Zn)',
  'peat.ash.row.cobalt': 'Kobalt (Co)',
  'peat.ash.row.nickel': 'Nikiel (Ni)',
  'peat.ash.row.manganese': 'Mangan (Mn)',
  'peat.ash.row.ph': 'pH',

  'peat.faq.eyebrow': 'FAQ',
  'peat.faq.title': 'Najczęściej zadawane pytania o brykiet torfowy',
  'peat.faq.q1': 'Czym jest brykiet torfowy?',
  'peat.faq.a1':
    'Brykiet torfowy to paliwo stałe z torfu frezowego, wysuszonego i sprasowanego pod wysokim ciśnieniem w zwarte brykiety bez lepiszczy. Jego wartość opałowa wynosi {calorific}, a tona brykietu daje mniej więcej tyle ciepła co {equiv} gazu ziemnego.',
  'peat.faq.q2': 'Jak długo pali się brykiet torfowy?',
  'peat.faq.a2':
    'Jeśli po rozpaleniu przymkniesz dopływ powietrza, pełne palenisko tli się przez kilka godzin — według producentów {burn}. Rzeczywisty czas zależy od pieca, ciągu i stopnia wypełnienia paleniska.',
  'peat.faq.q3': 'Czy brykiet torfowy można spalać w kotle na pellet?',
  'peat.faq.a3':
    'Nie. Palnik pelletowy podaje paliwo automatycznie i wymaga granulatu o określonej wielkości. Brykiet torfowy jest przeznaczony do ręcznie ładowanych pieców, kuchni węglowych, zamkniętych wkładów kominkowych i kotłów na paliwo stałe. Do kotła na pellet wybierz nasz pellet drzewny ENplus A1.',
  'peat.faq.q4': 'Brykiet torfowy czy brykiet drzewny — co wybrać?',
  'peat.faq.a4':
    'Oba nadają się do ręcznie ładowanych pieców i kotłów na paliwo stałe. Brykiet drzewny daje nieco więcej ciepła z kilograma ({woodCalorific} wobec {calorific} dla torfowego), pali się goręcej i szybciej, żywszym płomieniem, i zostawia mało popiołu. Brykiet torfowy tli się dłużej i równiej, dlatego lepiej sprawdza się na noc, ale popiołu zostaje z niego wyraźnie więcej. Wiele osób łączy oba: drzewny, by szybko nagrzać dom, torfowy, by utrzymać ciepło przez wiele godzin.',
  'peat.faq.q5': 'Ile kosztuje brykiet torfowy?',
  'peat.faq.a5':
    'Brykiet torfowy kosztuje {price} {perTon}, czyli za jedną paletę ({packaging}). {vatNote} Aby otrzymać dokładną ofertę, podaj potrzebną ilość i adres dostawy. Brykiet torfowy jest dostępny od ręki.',
  'peat.faq.q6': 'Czy popiół z brykietu torfowego można stosować w ogrodzie?',
  'peat.faq.a6':
    'Tak, z umiarem. Popiół jest bogaty w wapń ({calcium}) i silnie zasadowy (pH {ph}), więc w ogrodzie działa przede wszystkim jak wapno; potasu i azotu zawiera niewiele. Rozsypuj zimny popiół cienką warstwą na kwaśnej glebie, ale nie pod rośliny lubiące kwaśne podłoże i nie na grządki ziemniaków. Popiołu jest więcej niż z brykietu drzewnego, więc popielnik trzeba częściej opróżniać.',
  'peat.faq.q7': 'Jak przechowywać brykiet torfowy?',
  'peat.faq.a7':
    'W suchym miejscu, pod dachem i nie bezpośrednio na ziemi — na palecie lub regale w szopie albo w kotłowni. Brykiet, który nasiąknie wilgocią, daje mniej ciepła i może się kruszyć.',

  'peat.faq.q8': 'Jak pakowany jest brykiet torfowy?',
  'peat.faq.a8':
    'Brykiet torfowy dostarczamy w opakowaniach na paletach: jedna paleta to {packaging}. Aby otrzymać ofertę, podaj potrzebną ilość i adres dostawy.',

  'peat.cta.title': 'Potrzebujesz brykietu torfowego?',
  'peat.cta.text':
    'Podaj potrzebną ilość i adres dostawy, a prześlemy cenę i warunki dostawy. Brykiet torfowy jest dostępny od ręki, możliwy jest też odbiór własny z magazynu w Loo pod Tallinnem.',

  'peat.teaser.title': 'Dostępny także brykiet torfowy',
  'peat.teaser.text':
    'Do pieców i kotłów na paliwo stałe: długie, równe spalanie przez całą noc. Cena: {price} {perTon}. {vatNote}',
  'peat.teaser.link': 'Zobacz brykiet torfowy',
};

/* -------------------------------------------------------------------------- */
/* Italian — /it/                                                             */
/* -------------------------------------------------------------------------- */

// Informal "tu" throughout, as is standard for Italian B2B and retail sites.
// Typographic apostrophes (’) keep the single-quoted strings unescaped.
const it: Dictionary = {
  'meta.title': 'Pellet di legno ENplus A1 da 6 e 8 mm | KR Wood Estonia',
  'meta.description':
    'Pellet di legno certificato ENplus A1 da 6 mm e 8 mm. Alto potere calorifico, basso contenuto di ceneri, 100% conifera naturale. Consegna in Italia.',
  'meta.ogAlt': 'Pellet di legno premium KR Wood',

  'a11y.skipToContent': 'Vai al contenuto principale',
  'a11y.openMenu': 'Apri il menu',
  'a11y.closeMenu': 'Chiudi il menu',
  'a11y.chooseLanguage': 'Scegli la lingua',
  'a11y.backToTop': 'Torna su',
  'a11y.homepage': 'KR Wood — home page',

  'nav.features': 'Vantaggi',
  'nav.specs': 'Prodotti',
  'nav.packaging': 'Confezioni',
  'nav.contact': 'Contatti',
  'nav.cta': 'Richiedi preventivo',

  'hero.badge': 'Certificato ENplus® A1',
  'hero.title': 'Pellet di legno premium',
  'hero.titleAccent': 'Per il calore della tua casa',
  'hero.subtitle':
    '100% legno di conifera naturale, senza colle né additivi chimici. Alto potere calorifico, basso contenuto di ceneri e qualità costante: un calore che fa bene al portafoglio e all’ambiente.',
  'hero.ctaPrimary': 'Ordina ora',
  'hero.ctaSecondary': 'Scopri i prodotti',
  'hero.stat1Value': '4,9+',
  'hero.stat1Unit': 'kWh/kg',
  'hero.stat1Label': 'Potere calorifico',
  'hero.stat2Value': '< 0,5',
  'hero.stat2Unit': '%',
  'hero.stat2Label': 'Ceneri',
  'hero.stat3Value': '< 8',
  'hero.stat3Unit': '%',
  'hero.stat3Label': 'Umidità',

  'features.eyebrow': 'Perché KR Wood',
  'features.title': 'Calore pulito su cui puoi contare',
  'features.subtitle':
    'Il nostro pellet nasce da segatura fresca di conifera, pressata senza leganti aggiunti. Ogni lotto è sottoposto a controllo qualità, perché la tua stufa o caldaia funzioni senza intoppi per tutta la stagione di riscaldamento.',
  'features.heat.title': 'Alto potere calorifico',
  'features.heat.text':
    'Oltre 4,9 kWh/kg: più calore da ogni sacco e consumi sensibilmente più bassi per tutta la stagione.',
  'features.ash.title': 'Basso contenuto di ceneri',
  'features.ash.text':
    'Meno dello 0,5% di ceneri: stufa, caldaia e canna fumaria restano pulite, con manutenzione e rimozione della cenere ridotte al minimo.',
  'features.eco.title': '100% ecologico',
  'features.eco.text':
    'Solo legno puro: niente colle, coloranti o additivi chimici. Un combustibile neutro in termini di CO₂ e completamente rinnovabile.',
  'features.quality.title': 'Qualità ENplus® A1',
  'features.quality.text':
    'Ogni lotto rispetta i rigorosi requisiti dello standard europeo: diametro uniforme, alta densità e un contenuto minimo di polveri.',

  'specs.eyebrow': 'Prodotti',
  'specs.title': 'Pellet e caratteristiche tecniche',
  'specs.subtitle':
    'Pellet di legno ENplus A1 in due diametri, 6 mm e 8 mm, e pellet di lignina da 8 mm per uso industriale. Scegli il prodotto adatto alla tua stufa o caldaia e al tuo impiego.',
  'specs.d6.title': 'Pellet 6 mm',
  'specs.d6.desc': 'La scelta universale per caldaie domestiche, stufe a pellet e piccoli impianti.',
  'specs.d6.badge': 'Il più richiesto',
  'specs.d8.title': 'Pellet 8 mm',
  'specs.d8.desc': 'Ideale per grandi centrali termiche, bruciatori industriali e consumi elevati.',
  'specs.d8.badge': 'Industriale',
  'specs.lignin.title': 'Pellet di lignina 8 mm',
  'specs.lignin.desc':
    'La lignina è il polimero naturale che conferisce resistenza al legno, nonché una delle frazioni più energetiche della biomassa. Pressata in pellet da 8 mm e fornita in big bag da 1000 kg, sviluppa più calore del normale pellet di legno e trova impiego in numerosi settori industriali.',
  'specs.lignin.badge': 'Combustibile ad alta resa e materia prima',
  'specs.table.param': 'Parametro',
  'specs.table.value': 'Valore',
  'specs.row.diameter': 'Diametro',
  'specs.row.length': 'Lunghezza',
  'specs.row.calorific': 'Potere calorifico',
  'specs.row.ash': 'Ceneri',
  'specs.row.moisture': 'Umidità',
  'specs.row.density': 'Densità apparente',
  'specs.row.fines': 'Fini',
  'specs.row.material': 'Materia prima',
  'specs.value.material': 'Legno di conifera (pino, abete rosso)',
  'specs.value.length': '10–40 mm',
  'specs.value.calorific': '≥ 4,9 kWh/kg',
  'specs.value.ash': '≤ 0,5 %',
  'specs.value.moisture': '≤ 8 %',
  'specs.value.density': '≥ 650 kg/m³',
  'specs.value.fines': '≤ 1 %',

  'price.label': 'Prezzo',
  'price.perTon': 'a tonnellata',
  // "estone" on purpose: Italian IVA is 22%, and a bare 24% reads as a typo.
  // English and Polish name the Estonian rate the same way.
  'price.vatIncluded': 'IVA estone al {vat}% inclusa',
  'price.netLabel': 'IVA esclusa',
  'price.wholesaleNote': 'Prezzo all’ingrosso valido per ordini a partire da {min} tonnellate',

  'packaging.eyebrow': 'Confezioni',
  'packaging.title': 'Confezioni e consegna',
  'packaging.subtitle':
    'Scegli la confezione più adatta ai tuoi spazi di stoccaggio. Tutti i bancali sono cellofanati e protetti dalle intemperie.',
  'packaging.bags.title': 'Sacchi da 15 kg su bancale',
  'packaging.bags.desc':
    '65 sacchi per bancale, 975 kg in totale. Facili da movimentare e da stoccare: ideali per l’uso domestico.',
  'packaging.bags.spec1': '65 sacchi × 15 kg',
  'packaging.bags.spec2': '975 kg per bancale',
  'packaging.bags.spec3': 'Protezione con film termoretraibile',
  'packaging.bigbag.title': 'Big Bag da 1000 kg',
  'packaging.bigbag.desc':
    'Big bag con maniglie di sollevamento e scarico dal fondo. La soluzione più conveniente per stoccare grandi quantità.',
  'packaging.bigbag.spec1': 'Sacco da 1000 kg',
  'packaging.bigbag.spec2': 'Maniglie di sollevamento',
  'packaging.bigbag.spec3': 'Scarico dal fondo',
  'packaging.delivery.title': 'Consegna in Italia e in Europa',
  'packaging.delivery.desc':
    'Consegniamo in Italia, in container e a carico completo, così come in Estonia, nei Paesi baltici e nel resto d’Europa. È possibile anche il ritiro presso il nostro magazzino di Loo, alle porte di Tallinn.',
  'packaging.delivery.spec1': 'Consegna in Italia',
  'packaging.delivery.spec2': 'Estonia, Paesi baltici e UE',
  'packaging.delivery.spec3': 'Bilico completo da 24 t',
  'packaging.cta': 'Richiedi un preventivo',

  'faq.eyebrow': 'FAQ',
  'faq.title': 'Domande frequenti sul pellet di legno',
  'faq.q1': 'Meglio il pellet da 6 mm o da 8 mm?',
  'faq.a1':
    'Entrambi hanno la stessa qualità ENplus A1: potere calorifico {calorific}, ceneri {ash} e umidità {moisture}. Cambia il diametro. Il pellet da 6 mm è la scelta universale per caldaie domestiche, stufe a pellet e piccoli impianti; quello da 8 mm è ideale per grandi centrali termiche, bruciatori industriali e consumi elevati. Nel dubbio, verifica il diametro consigliato dal produttore della tua stufa o caldaia.',
  'faq.q2': 'Che cosa significa ENplus A1?',
  'faq.a2':
    'ENplus è la certificazione europea di qualità del pellet di legno e A1 è la sua classe più alta. Significa diametro uniforme, alta densità, basso contenuto di ceneri e minimo contenuto di fini: un pellet che brucia in modo pulito e mantiene puliti stufa, caldaia e canna fumaria.',
  'faq.q3': 'Quanto costa il pellet di legno?',
  'faq.a3':
    'Il pellet di legno ENplus A1 da 6 mm costa {price6} {perTon} (prezzo all’ingrosso per ordini a partire da {min} tonnellate), quello da 8 mm {price8} {perTon}. {vatNote} Per un preventivo preciso, indicaci quantità, confezione e indirizzo di consegna.',
  'faq.q4': 'Meglio i sacchi da 15 kg o il big bag?',
  'faq.a4':
    'I sacchi da 15 kg sono forniti su bancale: 65 sacchi, 975 kg per bancale, cellofanati e protetti dalle intemperie. Facili da movimentare e da stoccare, sono ideali per l’uso domestico. Il big bag da 1000 kg ha maniglie di sollevamento e scarico dal fondo: è la soluzione più conveniente per stoccare grandi quantità.',
  'faq.q5': 'Come si conserva il pellet di legno?',
  'faq.a5':
    'Il pellet va tenuto all’asciutto: l’umidità lo danneggia e ne riduce il potere calorifico. I nostri bancali sono cellofanati e protetti dalle intemperie, ma i sacchi aperti e i big bag vanno conservati al chiuso o sotto una tettoia.',
  'faq.q6': 'Dove consegnate il pellet di legno?',
  'faq.a6':
    'Consegniamo in Italia, in container e a carico completo (24 t), così come in Estonia, nei Paesi baltici e nel resto d’Europa. È possibile anche il ritiro presso il nostro magazzino di Loo, alle porte di Tallinn.',
  'faq.q7': 'Il pellet contiene additivi?',
  'faq.a7':
    'No. Il pellet è prodotto con segatura fresca di conifera (pino, abete rosso), senza colle, leganti o additivi chimici: un combustibile naturale al 100% e rinnovabile.',

  'contact.eyebrow': 'Contatti',
  'contact.title': 'Richiedi un preventivo personalizzato',
  'contact.subtitle':
    'Indicaci la quantità desiderata e l’indirizzo di consegna: ti invieremo un preventivo entro un giorno lavorativo.',
  'contact.form.legend': 'Modulo di richiesta',
  'contact.form.name': 'Nome',
  'contact.form.namePlaceholder': 'Il tuo nome o la ragione sociale',
  'contact.form.email': 'E-mail',
  'contact.form.emailPlaceholder': 'nome@esempio.it',
  'contact.form.phone': 'Telefono',
  'contact.form.phonePlaceholder': '+39 312 345 6789',
  'contact.form.message': 'Messaggio',
  'contact.form.messagePlaceholder':
    'Quantità desiderata, confezione (sacchi da 15 kg / Big Bag) e indirizzo di consegna…',
  'contact.form.optional': 'facoltativo',
  'contact.form.submit': 'Invia richiesta',
  'contact.form.sending': 'Invio in corso…',
  'contact.form.success': 'Grazie! La tua richiesta è stata inviata. Ti risponderemo entro un giorno lavorativo.',
  'contact.form.error': 'Invio non riuscito. Riprova oppure chiamaci direttamente.',
  'contact.form.errorRequired': 'Campo obbligatorio',
  'contact.form.errorEmail': 'Inserisci un indirizzo e-mail valido',
  'contact.form.consent': 'Acconsento al trattamento dei miei dati personali per la gestione della mia richiesta.',
  'contact.form.privacyLink': 'Informativa sulla privacy',
  'contact.info.title': 'Recapiti',
  'contact.info.phone': 'Telefono',
  'contact.info.email': 'E-mail',
  'contact.info.address': 'Indirizzo',
  'contact.info.hours': 'Orari di apertura',
  'contact.info.hoursValue': 'Lun–Ven 9:00–17:00',
  'contact.info.company': 'Azienda',
  'contact.info.regCode': 'Registro imprese',
  'contact.info.vat': 'Partita IVA',
  'contact.info.country': 'Estonia',
  'contact.whatsapp': 'Scrivici su WhatsApp',
  'contact.whatsappMessage':
    'Buongiorno! Vorrei richiedere un preventivo per il pellet di legno.',

  'footer.tagline':
    'Pellet di legno premium dall’Estonia. Qualità ENplus A1, consegne affidabili e prezzi trasparenti.',
  'footer.navTitle': 'Navigazione',
  'footer.contactTitle': 'Contatti',
  'footer.legalTitle': 'Note legali',
  'footer.privacy': 'Informativa sulla privacy',
  'footer.rights': 'Tutti i diritti riservati.',
  'footer.visitsTotal': 'Visite totali',
  'footer.visitsToday': 'Oggi',
  'footer.socialTitle': 'Seguici',

  'privacy.meta.title': 'Informativa sulla privacy | KR Wood',
  'privacy.meta.description':
    'Informativa sulla privacy di KR Wood: come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali ai sensi del GDPR.',
  'privacy.title': 'Informativa sulla privacy',
  'privacy.updated': 'Ultimo aggiornamento',
  'privacy.intro':
    'KR Wood rispetta la tua privacy e tratta i dati personali in conformità al Regolamento generale sulla protezione dei dati dell’Unione europea (GDPR). La presente informativa spiega quali dati raccogliamo e come li utilizziamo.',
  'privacy.s1.title': 'Quali dati raccogliamo',
  'privacy.s1.body':
    'Quando compili il modulo di contatto, raccogliamo nome, indirizzo e-mail, numero di telefono e testo del messaggio. Ci fornisci questi dati volontariamente al momento dell’invio della richiesta.',
  'privacy.s2.title': 'Come utilizziamo i dati',
  'privacy.s2.body':
    'Utilizziamo i tuoi dati esclusivamente per rispondere alla tua richiesta, preparare un preventivo ed evadere l’eventuale ordine. Non utilizziamo i tuoi dati a fini di marketing senza uno specifico consenso.',
  'privacy.s3.title': 'Comunicazione dei dati',
  'privacy.s3.body':
    'Non vendiamo né cediamo a terzi i tuoi dati personali. I dati possono essere comunicati esclusivamente ai partner logistici, per evadere un ordine, o alle autorità, quando previsto dalla legge.',
  'privacy.s4.title': 'Conservazione dei dati',
  'privacy.s4.body':
    'Conserviamo i dati delle richieste per un massimo di 24 mesi dall’ultimo contatto, dopodiché vengono cancellati. I documenti contabili sono conservati per il periodo previsto dalla legge.',
  'privacy.s5.title': 'Cookie',
  'privacy.s5.body':
    'Questo sito è statico e non utilizza cookie di tracciamento né strumenti di analisi di terze parti. I font sono ospitati sul nostro server, perciò nessuno dei tuoi dati viene trasmesso a servizi esterni. Il contatore delle visite nel piè di pagina funziona sul nostro server e memorizza solo totali aggregati; per non conteggiare due volte la stessa visita utilizza la memoria di sessione del browser e non registra alcun dato personale.',
  'privacy.s5.titleAnalytics': 'Cookie e statistiche',
  'privacy.s5.bodyAnalytics':
    'Questo sito non utilizza cookie di tracciamento. Per misurare il numero di visitatori utilizziamo Cloudflare Web Analytics, che non imposta cookie, non crea profili dei visitatori e non ti segue su altri siti: vengono raccolti solo dati aggregati, come il numero di pagine visualizzate e la posizione approssimativa a livello di Paese. Il responsabile del trattamento è Cloudflare, Inc. (USA). I font sono ospitati sul nostro server. Il contatore delle visite nel piè di pagina funziona sul nostro server e memorizza solo totali aggregati.',
  'privacy.s6.title': 'I tuoi diritti',
  'privacy.s6.body':
    'Hai il diritto di chiedere l’accesso ai tuoi dati, la loro rettifica o cancellazione, nonché la limitazione del trattamento e la portabilità dei dati. Per esercitare questi diritti, scrivici all’indirizzo e-mail indicato qui sotto.',
  'privacy.s7.title': 'Contatti',
  'privacy.s7.body': 'Per qualsiasi domanda relativa alla privacy, scrivici all’indirizzo:',
  'privacy.back': 'Torna alla home page',

  // --- Lignin pellets landing page ----------------------------------------
  'nav.lignin': 'Pellet di lignina',

  'lignin.meta.title': 'Pellet di lignina 8 mm | Big Bag da 1000 kg | KR Wood',
  'lignin.meta.description':
    'Pellet di lignina 8 mm in big bag da 1000 kg, con consegna in Italia: biocombustibile ad alto potere calorifico e materia prima per asfalti e calcestruzzo.',
  'lignin.meta.imageAlt':
    'Mucchio di pellet di lignina da 8 mm su un piano di legno scuro, accanto a un barattolo di vetro con un campione',

  'lignin.hero.badge': '8 mm · Big Bag 1000 kg',
  'lignin.hero.title': 'Pellet di lignina',
  'lignin.hero.titleAccent': 'Combustibile ad alta densità energetica e materia prima industriale',
  'lignin.hero.lead':
    'La lignina è il polimero naturale che conferisce resistenza al legno, nonché una delle frazioni più energetiche della biomassa. Pressata in pellet da 8 mm e fornita in big bag da 1000 kg, sviluppa più calore del normale pellet di legno e alimenta numerosi settori industriali, ben oltre il locale caldaia.',
  'lignin.hero.ctaPrimary': 'Richiedi un preventivo',
  'lignin.hero.ctaSecondary': 'Vedi i dati tecnici',

  'lignin.overview.eyebrow': 'Il prodotto',
  'lignin.overview.title': 'Che cos’è il pellet di lignina',
  'lignin.overview.p1':
    'Dopo la cellulosa, la lignina è il polimero organico più diffuso sulla Terra: lega tra loro le fibre vegetali e rende rigido il legno. Isolata come sottoprodotto dell’industria della cellulosa e delle bioraffinerie, ha un contenuto energetico nettamente superiore a quello della cellulosa che la circonda, ed è proprio questo a renderla preziosa come combustibile.',
  'lignin.overview.p2':
    'Forse usi già la lignina senza saperlo. Nella produzione del normale pellet di legno la lignina funge spesso da legante naturale al posto dell’amido: calore e pressione ammorbidiscono la lignina contenuta nel legno stesso, che poi si indurisce e tiene insieme ogni pellet, senza bisogno di colle sintetiche. Questo prodotto concentra la stessa sostanza in un pellet a sé.',

  'lignin.benefits.title': 'Vantaggi principali',
  'lignin.benefits.b1.title': 'Potere calorifico più elevato',
  'lignin.benefits.b1.text':
    'La lignina contiene più energia per chilogrammo rispetto alla cellulosa: ogni tonnellata sviluppa quindi più calore del normale pellet di legno.',
  'lignin.benefits.b2.title': 'Logistica pronta per grandi volumi',
  'lignin.benefits.b2.text':
    'I big bag da 1000 kg con maniglie di sollevamento si movimentano con carrello elevatore o sollevatore telescopico: nessun sacco da spostare a mano e nessun bancale da smontare.',
  'lignin.benefits.b3.title': 'Materiale a doppio impiego',
  'lignin.benefits.b3.text':
    'Lo stesso prodotto funge sia da biocombustibile solido sia da materia prima per l’edilizia, l’industria chimica e l’agricoltura.',
  'lignin.benefits.b4.title': 'Sottoprodotto rinnovabile',
  'lignin.benefits.b4.text':
    'La lignina si recupera da processi industriali già esistenti, non da legno coltivato a scopo energetico: nessuna pressione aggiuntiva sulle foreste.',

  'lignin.audience.title': 'A chi si rivolge',
  'lignin.audience.a1':
    'Centrali termiche industriali e impianti di cogenerazione che cercano una maggiore densità energetica per tonnellata',
  'lignin.audience.a2':
    'Impianti di asfalto e produttori di calcestruzzo che impiegano la lignina come modificante o fluidificante',
  'lignin.audience.a3': 'Aziende chimiche e bioraffinerie che si approvvigionano di lignina come materia prima',
  'lignin.audience.a4': 'Aziende agroindustriali e mangimistiche che realizzano adsorbenti e ammendanti del suolo',

  'lignin.specs.title': 'Dati tecnici',
  'lignin.specs.subtitle':
    'Forniamo un unico formato standard. Con ogni consegna è disponibile un certificato di analisi completo.',
  'lignin.row.packaging': 'Confezione',
  'lignin.row.origin': 'Materia prima',
  'lignin.value.diameter': '8 mm',
  'lignin.value.length': '10–40 mm',
  'lignin.value.packaging': 'Big Bag da 1000 kg',
  'lignin.value.calorific': '≥ 5,0 kWh/kg',
  'lignin.value.moisture': '≤ 10 %',
  'lignin.value.ash': '≤ 3 %',
  'lignin.value.density': '≥ 600 kg/m³',
  'lignin.value.origin': 'Lignina di origine legnosa',
  'lignin.specs.note':
    'I valori sono quelli tipici di questa classe. I dati esatti di ogni lotto sono confermati nel certificato di analisi che lo accompagna.',

  'lignin.apps.eyebrow': 'Oltre il riscaldamento',
  'lignin.apps.title': 'Applicazioni industriali alternative della lignina',
  'lignin.apps.subtitle':
    'La lignina è un materiale piattaforma: la sua struttura fenolica, il potere legante e l’idrofobicità la rendono utile ben oltre il settore energetico.',

  'lignin.apps.roads.title': 'Costruzioni stradali, asfalto e bitume',
  'lignin.apps.roads.lead':
    'L’impiego della lignina in più rapida crescita. Aggiunta al bitume e alle pavimentazioni stradali, sostituisce in parte il legante di origine petrolifera con un’alternativa di origine biologica e agisce da antiossidante.',
  'lignin.apps.roads.i1': 'Aumenta la durabilità e la vita utile delle pavimentazioni stradali',
  'lignin.apps.roads.i2': 'Protegge dalla fessurazione e rallenta l’invecchiamento del bitume',
  'lignin.apps.roads.i3': 'Migliora la resistenza agli sbalzi di temperatura e agli stress termici',

  'lignin.apps.concrete.title': 'Calcestruzzo e materiali da costruzione',
  'lignin.apps.concrete.i1': 'I lignosolfonati agiscono da fluidificanti e aumentano la resistenza del calcestruzzo',
  'lignin.apps.concrete.i2': 'Riduce l’acqua d’impasto a parità di lavorabilità',
  'lignin.apps.concrete.i3': 'Impiegata come legante nella produzione di pannelli e compositi',

  'lignin.apps.agri.title': 'Agricoltura e zootecnia',
  'lignin.apps.agri.i1': 'Adsorbenti per il bestiame: trattengono ed eliminano le micotossine presenti nei mangimi',
  'lignin.apps.agri.i2': 'Fertilizzanti e ammendanti: migliorano struttura, aerazione e ritenzione idrica del suolo',
  'lignin.apps.agri.i3': 'Agrochimica: disperdente nelle formulazioni di agrofarmaci',

  'lignin.apps.chem.title': 'Industria chimica',
  'lignin.apps.chem.i1': 'Produzione di vanillina',
  'lignin.apps.chem.i2': 'Plastiche e resine, in sostituzione del fenolo tossico',
  'lignin.apps.chem.i3': 'Precursore della fibra di carbonio',
  'lignin.apps.chem.i4': 'Carbone attivo',

  'lignin.apps.oil.title': 'Industria petrolifera e metallurgia',
  'lignin.apps.oil.i1': 'Additivo per fluidi di perforazione',
  'lignin.apps.oil.i2': 'Legante nelle sabbie da fonderia',

  'lignin.apps.eco.title': 'Ecologia e bonifiche',
  'lignin.apps.eco.i1':
    'Bonifica degli sversamenti di petrolio: la lignina agisce da assorbente idrofobo e trattiene gli idrocarburi in acqua e nel suolo',

  'lignin.faq.eyebrow': 'FAQ',
  'lignin.faq.title': 'Domande frequenti sul pellet di lignina',
  'lignin.faq.q1': 'Che cos’è il pellet di lignina?',
  'lignin.faq.a1':
    'Il pellet di lignina è un pellet da 8 mm di diametro ottenuto pressando la lignina, il polimero naturale che lega tra loro le fibre del legno e lo rende rigido. La lignina si recupera come sottoprodotto dell’industria della cellulosa e delle bioraffinerie e contiene più energia per chilogrammo della cellulosa che la circonda.',
  'lignin.faq.q2': 'Che differenza c’è tra il pellet di lignina e il normale pellet di legno?',
  'lignin.faq.a2':
    'Il pellet di lignina ha un potere calorifico di {calorific} (pellet di legno ENplus A1: {pelletCalorific}), quindi ogni tonnellata sviluppa più calore. Il contenuto di ceneri è però più elevato: {ash} contro {pelletAsh} del pellet di legno. Il pellet di lignina è fornito esclusivamente in big bag da 1000 kg e si utilizza non solo come combustibile, ma anche come materia prima industriale.',
  'lignin.faq.q3': 'A chi è adatto il pellet di lignina?',
  'lignin.faq.a3':
    'Soprattutto alle centrali termiche industriali e agli impianti di cogenerazione che cercano più energia per tonnellata. Come materia prima, la lignina è utilizzata anche da produttori di asfalto e calcestruzzo, aziende chimiche e bioraffinerie, nonché da aziende agroindustriali e mangimistiche.',
  'lignin.faq.q4': 'A che cosa serve la lignina, oltre al riscaldamento?',
  'lignin.faq.a4':
    'Aggiunta al bitume e all’asfalto, la lignina prolunga la vita utile delle pavimentazioni stradali e rallenta l’invecchiamento del bitume. Nel calcestruzzo i lignosolfonati agiscono da fluidificanti. Dalla lignina si ricavano inoltre adsorbenti per mangimi, ammendanti, vanillina, resine, fibra di carbonio e carbone attivo; si impiega anche nei fluidi di perforazione, nelle sabbie da fonderia e nella bonifica degli sversamenti di petrolio.',
  'lignin.faq.q5': 'Come viene consegnato il pellet di lignina?',
  'lignin.faq.a5':
    'Il pellet di lignina è fornito in big bag da 1000 kg, che grazie alle maniglie di sollevamento si movimentano con carrello elevatore o sollevatore telescopico. Consegniamo in Italia, così come in Estonia, nei Paesi baltici e nel resto d’Europa.',
  'lignin.faq.q6': 'Quanto costa il pellet di lignina?',
  'lignin.faq.a6':
    'Il pellet di lignina costa {price} {perTon}. {vatNote} Per un preventivo preciso, indicaci la quantità desiderata e l’indirizzo di consegna.',
  'lignin.faq.q7': 'Ogni consegna è accompagnata da un certificato di analisi?',
  'lignin.faq.a7':
    'Sì. I valori riportati nella tabella dei dati tecnici sono quelli tipici di questa classe; i dati esatti di ogni lotto sono confermati nel certificato di analisi che lo accompagna.',

  'lignin.cta.title': 'Hai bisogno di grandi quantità di pellet di lignina?',
  'lignin.cta.text':
    'Indicaci il fabbisogno annuo in tonnellate, il luogo di consegna e l’impiego previsto: ti invieremo un preventivo insieme al certificato di analisi.',
  'lignin.cta.button': 'Richiedi un preventivo',

  // --- Peat briquettes landing page ----------------------------------------
  'nav.peat': 'Bricchetti di torba',

  'peat.meta.title': 'Bricchetti di torba disponibili — KR Wood Estonia',
  'peat.meta.description':
    'Bricchetti di torba per casa e industria: combustione lunga e regolare, circa 4,2 kWh/kg, basso tenore di zolfo. Disponibili in Estonia, 1000 kg per bancale.',

  'peat.stock': 'Disponibili a magazzino',
  'peat.hero.title': 'Bricchetti di torba',
  'peat.hero.titleAccent': 'Calore lungo e costante per casa e industria',
  'peat.hero.lead':
    'Il bricchetto di torba è torba essiccata e pressata ad alta pressione in un blocco compatto e regolare, che prende fuoco facilmente da un fuoco già avviato e arde lentamente per ore. Una sola carica mantiene calde stufa o caldaia per tutta la notte.',
  'peat.hero.ctaPrimary': 'Richiedi un preventivo',
  'peat.hero.ctaWhatsapp': 'Chiedi su WhatsApp',
  'peat.whatsappMessage': 'Buongiorno! Vorrei ordinare i bricchetti di torba.',

  'peat.row.form': 'Forma',
  'peat.row.burn': 'Durata di combustione',
  'peat.row.availability': 'Disponibilità',
  'peat.row.pallet': 'Bancale',
  'peat.value.material': 'Torba fresata',
  'peat.value.form': 'Bricchetto pressato, senza leganti',
  'peat.value.calorific': '≈ 4,2 kWh/kg',
  'peat.value.moisture': '≤ 20 %',
  'peat.value.burn': 'fino a ~8 h',
  'peat.value.woodCalorific': '≈ 4,6 kWh/kg',
  'peat.value.packaging': '84 confezioni, 1000 kg in totale',
  'peat.value.palletWeight': '1000 kg',
  'peat.fact.pallet': '84 confezioni per bancale',
  'peat.value.gas': '9,3 kWh/m³',
  'peat.value.equiv': '450–500 m³',

  'peat.equiv.eyebrow': 'Contenuto energetico',
  'peat.equiv.from': '1 tonnellata di bricchetti di torba',
  'peat.equiv.to': 'di gas naturale',
  'peat.equiv.note':
    'In base al potere calorifico inferiore: bricchetti di torba {calorific} (umidità {moisture}), gas naturale {gas}. I bricchetti più secchi si avvicinano al valore superiore.',

  'peat.about.eyebrow': 'Panoramica del prodotto',
  'peat.about.title': 'Che cos’è il bricchetto di torba e come brucia?',
  'peat.about.lead':
    'Il bricchetto di torba è un combustibile solido ricavato dalla torba fresata: la torba viene essiccata fino a una bassa umidità e pressata ad alta pressione, senza colla né altri leganti. Una volta acceso, brucia prima con una fiamma breve e poi arde lentamente per ore, cedendo un calore costante.',
  'peat.about.made.title': 'Come si produce',
  'peat.about.made.text':
    'La torba è materia vegetale parzialmente decomposta che si è accumulata nelle torbiere nel corso di migliaia di anni. Per i bricchetti, lo strato superficiale di una torbiera drenata viene fresato in una granella fine, essiccato prima sul campo e poi in stabilimento, e pressato in bricchetti. Con la pressione e il calore, i composti naturali della torba stessa legano le particelle tra loro, così il bricchetto resta compatto senza additivi. Il risultato è molto più denso della torba sciolta o della legna da ardere: in ogni sacco e in ogni metro cubo di magazzino c’è più energia.',
  'peat.about.burn.title': 'Come brucia',
  'peat.about.burn.text':
    'Una volta acceso, il bricchetto rilascia prima i gas volatili e brucia con una fiamma breve e viva. Quando questi si sono consumati, si forma uno strato di brace che brucia lentamente dall’esterno verso l’interno: è la fase lunga, quella che scalda in modo uniforme la stufa o la caldaia. Essendo denso e omogeneo, il bricchetto mantiene a lungo la sua forma mentre brucia e la resa termica resta stabile. Riducendo l’aria quando le fiamme si sono calmate, un focolare pieno arde per diverse ore — fino a circa 8 ore secondo i produttori, a seconda della stufa e del tiraggio.',
  'peat.about.use.title': 'Come usarli',
  'peat.about.use.text':
    'Avvia il fuoco con legnetti o qualche ciocco e aggiungi i bricchetti quando c’è già un letto di brace. Disponili senza stiparli, perché l’aria possa raggiungerli, e chiudi in parte la serranda dell’aria quando le fiamme si sono calmate: meno aria significa una combustione più lunga. I bricchetti di torba sono adatti a stufe, cucine a legna, inserti per camino chiusi e caldaie a combustibile solido progettati per legna o carbone; non vanno usati nei bruciatori a pellet.',

  'peat.benefits.title': 'Vantaggi dei bricchetti di torba',
  'peat.benefits.b1.title': 'Lunga durata di combustione',
  'peat.benefits.b1.text':
    'Una carica arde per ore — fino a circa 8 ore secondo i produttori — così la stufa si può caricare la sera e la casa resta calda fino al mattino.',
  'peat.benefits.b2.title': 'Senza l’odore acre del carbone',
  'peat.benefits.b2.text':
    'A differenza del carbone, i bricchetti di torba bruciano senza un odore di fumo pesante e acre.',
  'peat.benefits.b3.title': 'Basso tenore di zolfo',
  'peat.benefits.b3.text':
    'La torba contiene molto meno zolfo della maggior parte dei carboni. Meno zolfo significa meno depositi corrosivi: caldaia, stufa e canna fumaria si conservano meglio.',
  'peat.benefits.b4.title': 'Cenere per l’orto',
  'peat.benefits.b4.text':
    'La cenere è ricca di minerali e alcalina. Una volta fredda, si può spargere in uno strato sottile su aiuole e prato come fertilizzante e ammendante, purché insieme ai bricchetti non sia stato bruciato nient’altro.',
  'peat.benefits.b5.title': 'Tanto calore in poco spazio',
  'peat.benefits.b5.text':
    'Una tonnellata di bricchetti di torba dà all’incirca lo stesso calore di {equiv} di gas naturale e, a parità di calore, i bricchetti compatti occupano meno spazio della legna da ardere.',

  'peat.uses.eyebrow': 'Impieghi',
  'peat.uses.title': 'Dove usare i bricchetti di torba',
  'peat.uses.subtitle':
    'Ovunque ci sia un focolare progettato per legna o carbone: dalla casa privata alla centrale termica industriale.',
  'peat.uses.home.title': 'Uso domestico',
  'peat.uses.home.lead':
    'Un ottimo combustibile per case e seconde case, soprattutto di notte, quando conta una combustione lunga e regolare più di una fiamma veloce.',
  'peat.uses.home.i1': 'Stufe e cucine a legna',
  'peat.uses.home.i2': 'Inserti per camino chiusi',
  'peat.uses.home.i3': 'Caldaie a combustibile solido',
  'peat.uses.industry.title': 'Industria e grandi utenze',
  'peat.uses.industry.lead': 'Un combustibile solido diffuso nelle aziende con una propria centrale termica:',
  'peat.uses.industry.i1': 'Allevamenti avicoli',
  'peat.uses.industry.i2': 'Serre',
  'peat.uses.industry.i3': 'Fornaci di laterizi e cementifici',
  'peat.uses.industry.i4': 'Caseifici e conservifici',
  'peat.uses.industry.i5': 'Piscine e centri benessere',
  'peat.uses.industry.i6': 'Centrali termiche industriali e comunali',
  'peat.uses.industry.i7': 'Centrali termoelettriche',

  'peat.specs.title': 'Dati tecnici',
  'peat.specs.subtitle':
    'Valori tipici dei bricchetti di torba. Insieme al preventivo, chiedici i dati del lotto attuale.',
  'peat.specs.note':
    'Potere calorifico e umidità sono valori di riferimento per i bricchetti di torba, tratti dalla metodologia estone per il calcolo della prestazione energetica degli edifici. La durata di combustione dipende dalla stufa e dal tiraggio.',

  'peat.ash.eyebrow': 'Dopo la combustione',
  'peat.ash.title': 'Cosa fare con la cenere?',
  'peat.ash.lead':
    'I bricchetti di torba lasciano più cenere dei bricchetti di legno, quindi conviene sapere cosa farne. Una volta fredda, la cenere è ricca di calcio e fortemente alcalina: in giardino agisce soprattutto come la calce e, con moderazione, anche come fertilizzante.',
  'peat.ash.s1.title': 'Lasciala raffreddare in sicurezza',
  'peat.ash.s1.text':
    'Raccogli la cenere in un contenitore di metallo con coperchio e portala all’aperto, su una superficie non infiammabile, lontano da pareti e cataste di legna. La cenere può restare calda per diversi giorni: finché non è completamente fredda, non metterla in bidoni di plastica, sacchetti o insieme alla carta.',
  'peat.ash.s2.title': 'Usala in giardino',
  'peat.ash.s2.text':
    'Spargi la cenere fredda in uno strato sottile sui terreni acidi — prato, sotto gli alberi da frutto, aiuole di cavoli e di fiori — oppure aggiungila al compost a strati sottili. Il momento migliore è la primavera. Fino all’uso tienila all’asciutto: la pioggia ne dilava i nutrienti. È caustica, quindi usa i guanti e non spargerla quando c’è vento.',
  'peat.ash.s3.title': 'Dove non usarla',
  'peat.ash.s3.text':
    'Non intorno alle piante acidofile (mirtilli, mirtilli rossi, rododendri, erica), non sull’aiuola delle patate prima di piantarle, perché favorisce la scabbia, e non su terreni con pH già pari o superiore a 7. Non mescolarla con letame fresco o concimi azotati e non usarla affatto se nel focolare sono stati bruciati carbone, legno verniciato, plastica o carta patinata.',
  'peat.ash.s4.title': 'Quello che avanza',
  'peat.ash.s4.text':
    'D’inverno la cenere fredda funziona anche come antiscivolo sui vialetti ghiacciati. Quella che non usi smaltiscila secondo le regole di raccolta del tuo comune.',
  'peat.ash.table.title': 'Composizione della cenere',
  'peat.ash.table.lead':
    'Analisi di laboratorio del produttore sulla cenere dei bricchetti di torba bruciati. Spiccano il calcio ({calcium}) e il pH elevato ({ph}); potassio e azoto sono scarsi.',
  'peat.ash.table.note': 'Valori forniti dal produttore; possono variare da lotto a lotto.',
  'peat.ash.row.ash': 'Contenuto di ceneri',
  'peat.ash.row.organic': 'Sostanza organica',
  'peat.ash.row.carbon': 'Carbonio totale (C)',
  'peat.ash.row.nitrogen': 'Azoto totale (N)',
  'peat.ash.row.phosphorus': 'Fosforo totale (P₂O₅)',
  'peat.ash.row.potassium': 'Potassio totale (K₂O)',
  'peat.ash.row.calcium': 'Calcio (Ca)',
  'peat.ash.row.magnesium': 'Magnesio (Mg)',
  'peat.ash.row.copper': 'Rame (Cu)',
  'peat.ash.row.zinc': 'Zinco (Zn)',
  'peat.ash.row.cobalt': 'Cobalto (Co)',
  'peat.ash.row.nickel': 'Nichel (Ni)',
  'peat.ash.row.manganese': 'Manganese (Mn)',
  'peat.ash.row.ph': 'pH',

  'peat.faq.eyebrow': 'FAQ',
  'peat.faq.title': 'Domande frequenti sui bricchetti di torba',
  'peat.faq.q1': 'Che cos’è il bricchetto di torba?',
  'peat.faq.a1':
    'Il bricchetto di torba è un combustibile solido ricavato dalla torba fresata, essiccata e pressata ad alta pressione in bricchetti compatti senza leganti. Il suo potere calorifico è di {calorific} e una tonnellata di bricchetti dà all’incirca lo stesso calore di {equiv} di gas naturale.',
  'peat.faq.q2': 'Quanto dura la combustione di un bricchetto di torba?',
  'peat.faq.a2':
    'Riducendo l’aria dopo l’accensione, un focolare pieno arde per diverse ore — {burn} secondo i produttori. La durata effettiva dipende dalla stufa, dal tiraggio e da quanto è pieno il focolare.',
  'peat.faq.q3': 'Si possono bruciare i bricchetti di torba in una caldaia a pellet?',
  'peat.faq.a3':
    'No. Il bruciatore a pellet alimenta il combustibile in automatico e richiede pellet di dimensioni definite. I bricchetti di torba sono pensati per stufe, cucine a legna, inserti per camino chiusi e caldaie a combustibile solido caricate a mano. Per una caldaia a pellet scegli il nostro pellet di legno ENplus A1.',
  'peat.faq.q4': 'Bricchetti di torba o bricchetti di legno: cosa scegliere?',
  'peat.faq.a4':
    'Entrambi sono adatti a stufe e caldaie a combustibile solido caricate a mano. I bricchetti di legno danno un po’ più di calore per chilogrammo ({woodCalorific}, contro {calorific} della torba), bruciano più caldi e più in fretta, con una fiamma più viva, e lasciano poca cenere. I bricchetti di torba ardono più a lungo e in modo più uniforme, quindi sono la scelta migliore per la notte, ma lasciano sensibilmente più cenere. Molti li combinano: legno per scaldare in fretta, torba per mantenere il calore per ore.',
  'peat.faq.q5': 'Quanto costano i bricchetti di torba?',
  'peat.faq.a5':
    'I bricchetti di torba costano {price} {perTon}, cioè un bancale ({packaging}). {vatNote} Per un preventivo preciso, indicaci la quantità desiderata e l’indirizzo di consegna. I bricchetti di torba sono disponibili a magazzino.',
  'peat.faq.q6': 'La cenere dei bricchetti di torba si può usare in giardino?',
  'peat.faq.a6':
    'Sì, con moderazione. La cenere è ricca di calcio ({calcium}) e fortemente alcalina (pH {ph}), quindi in giardino agisce soprattutto come la calce; contiene poco potassio e poco azoto. Spargi la cenere fredda in uno strato sottile sui terreni acidi, ma non sotto le piante acidofile né sulle aiuole di patate. È più abbondante di quella dei bricchetti di legno, quindi il cassetto della cenere va svuotato più spesso.',
  'peat.faq.q7': 'Come conservare i bricchetti di torba?',
  'peat.faq.a7':
    'All’asciutto, al coperto e sollevati da terra, per esempio su un bancale o uno scaffale in una rimessa o nel locale caldaia. I bricchetti che assorbono umidità rendono meno calore e possono sbriciolarsi.',

  'peat.faq.q8': 'Come sono confezionati i bricchetti di torba?',
  'peat.faq.a8':
    'I bricchetti di torba sono forniti in confezioni su bancale: un bancale contiene {packaging}. Per un preventivo, indicaci la quantità di cui hai bisogno e l’indirizzo di consegna.',

  'peat.cta.title': 'Ti servono bricchetti di torba?',
  'peat.cta.text':
    'Indicaci la quantità di cui hai bisogno e dove consegnarla: ti invieremo il prezzo e le condizioni di consegna. I bricchetti di torba sono disponibili a magazzino, con possibilità di ritiro presso il nostro magazzino di Loo, alle porte di Tallinn.',

  'peat.teaser.title': 'Disponibili anche i bricchetti di torba',
  'peat.teaser.text':
    'Per stufe e caldaie a combustibile solido: una combustione lunga e regolare per tutta la notte. Prezzo: {price} {perTon}. {vatNote}',
  'peat.teaser.link': 'Scopri i bricchetti di torba',
};

/* -------------------------------------------------------------------------- */

export const ui: Record<Lang, Dictionary> = { et, en, pl, it };

/* -------------------------------------------------------------------------- */
/* Market-specific copy                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Copy that deliberately exists in one market only.
 *
 * The three dictionaries above are exhaustive on purpose — a key missing from
 * one of them is a bug, and `npm run check` catches it. This layer is the
 * opposite: the keys here are *expected* to be absent from most locales,
 * because the section they drive is written for a single market. Translating
 * it would mean shipping copy nobody reads, and an empty stub would render a
 * blank section.
 *
 * A component looks a key up and renders its section only if something comes
 * back, so the section appears wherever its copy exists and nowhere else.
 * Opening another market is then a change to this data, not to any component.
 *
 * Do not move general copy in here to dodge translating it.
 */
const plOnly = {
  // Wholesale and delivery — Polish buyers search transactional terms
  // (hurt, tir 24 t, import) that the other two markets do not.
  'lignin.trade.eyebrow': 'Hurt i dostawa',
  'lignin.trade.title': 'Pellet ligninowy hurtowo — prosto od producenta',
  'lignin.trade.lead':
    'Dla odbiorców przemysłowych jesteśmy producentem i hurtownią pelletu jednocześnie — towar jedzie z naszego zakładu pod Tallinnem, nie od pośrednika. Kupujesz w cenie hurtowej, z jednym punktem kontaktu na całe zamówienie.',

  'lignin.trade.i1.title': 'Pełne tiry 24 t',
  'lignin.trade.i1.text':
    'Podstawowa jednostka sprzedaży to pełna naczepa big bagów 1000 kg, czyli pellet 24t. Przy takim wolumenie koszt transportu na tonę jest najniższy.',

  'lignin.trade.i2.title': 'Dostawa na terenie całej Polski',
  'lignin.trade.i2.text':
    'Transport organizujemy sami — pellet z dostawą pod wskazany adres zakładu lub bazy magazynowej, w dowolnym regionie kraju.',

  'lignin.trade.i3.title': 'Import pelletu z Estonii bez odprawy',
  'lignin.trade.i3.text':
    'Estonia i Polska należą do jednolitego rynku UE, więc import pelletu nie wymaga cła ani odprawy celnej. Zasady rozliczenia VAT przy zakupie firmowym potwierdzamy w ofercie.',

  'lignin.trade.i4.title': 'Szukasz pelletu drzewnego?',
  'lignin.trade.i4.text':
    'Jako producent pelletu drzewnego oferujemy również pellet ENplus® A1 w średnicach 6 i 8 mm: pellet na palecie (65 worków po 15 kg, 975 kg na palecie) albo w big bagach 1000 kg. Cała paleta pelletu i pełne tiry dostępne z tego samego zakładu.',
} as const;

export type MarketKey = keyof typeof plOnly;

/** Per-locale market copy. Every entry is optional, by design. */
export const uiMarket: Partial<Record<Lang, Partial<Record<MarketKey, string>>>> = {
  pl: plOnly,
};
