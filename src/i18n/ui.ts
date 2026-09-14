/**
 * Centralised translation dictionary for krwood.ee
 *
 * Estonian (`et`) is the single source of truth: its keys define the
 * `TranslationKey` union, and the `en` / `pl` dictionaries are typed as
 * `Dictionary`. If a translation is missing or misspelled in any language,
 * `npm run check` fails at build time instead of silently rendering a raw key.
 */

export const languages = {
  et: 'Eesti',
  en: 'English',
  pl: 'Polski',
} as const;

/** Short labels used by the header language switcher (EE | EN | PL). */
export const languageLabels = {
  et: 'EE',
  en: 'EN',
  pl: 'PL',
} as const;

/** BCP 47 tags for <html lang> and hreflang alternates. */
export const languageTags = {
  et: 'et-EE',
  en: 'en',
  pl: 'pl-PL',
} as const;

export const defaultLang = 'et' as const;

export type Lang = keyof typeof languages;

/* -------------------------------------------------------------------------- */
/* Estonian — default locale, served at the site root                         */
/* -------------------------------------------------------------------------- */

const et = {
  // --- SEO / document meta -------------------------------------------------
  'meta.title': 'KR Wood — Premium puidugraanulid | ENplus A1 pellet Eestist',
  'meta.description':
    'KR Wood pakub ENplus A1 sertifitseeritud puidugraanuleid 6 mm ja 8 mm. Kõrge kütteväärtus, madal tuhasisaldus, 100% looduslik okaspuit. Tarne üle Eesti ja Baltikumi.',
  'meta.ogAlt': 'KR Wood premium puidugraanulid',

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
  'hero.title': 'Premium puidugraanulid',
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
    'Meie graanulid pressitakse värskest okaspuidu saepurust ilma sideaineteta. Iga partii läbib kvaliteedikontrolli, et Teie katel töötaks tõrgeteta kogu kütteperioodi.',
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
  'specs.title': 'Graanulid ja tehnilised näitajad',
  'specs.subtitle':
    'Kaks läbimõõtu, üks kvaliteedistandard. Valige süsteem, mis sobib Teie katlaga — tehnilised näitajad on mõlemal tootel ENplus A1 tasemel.',
  'specs.d6.title': 'Graanulid 6 mm',
  'specs.d6.desc': 'Universaalne valik kodukateldele, pelletikaminatele ja väiksematele süsteemidele.',
  'specs.d6.badge': 'Populaarseim',
  'specs.d8.title': 'Graanulid 8 mm',
  'specs.d8.desc': 'Sobib suurematele katlamajadele, tööstuslikele põletitele ja mahukale tarbimisele.',
  'specs.d8.badge': 'Tööstuslik',
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
    'Kohaletoimetamine kogu Eestis ja Baltikumis. Ekspordime konteinerite ja täisautokoormustega ka mujale Euroopasse.',
  'packaging.delivery.spec1': 'Tarne üle Eesti',
  'packaging.delivery.spec2': 'Baltikum ja EL',
  'packaging.delivery.spec3': 'Täisautokoormused 24 t',
  'packaging.cta': 'Küsi hinnapakkumist',

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

  // --- Footer --------------------------------------------------------------
  'footer.tagline':
    'Premium puidugraanulid Eestist. ENplus A1 kvaliteet, usaldusväärne tarne ja aus hinnastamine.',
  'footer.navTitle': 'Navigatsioon',
  'footer.contactTitle': 'Kontakt',
  'footer.legalTitle': 'Õiguslik teave',
  'footer.privacy': 'Privaatsuspoliitika',
  'footer.rights': 'Kõik õigused kaitstud.',
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
  'privacy.s5.body':
    'See veebisait on staatiline ega kasuta jälgimisküpsiseid ega kolmandate osapoolte analüütikat. Kirjatüübid on serveeritud meie enda serverist, mistõttu Teie andmeid välistele teenustele ei edastata.',
  'privacy.s6.title': 'Teie õigused',
  'privacy.s6.body':
    'Teil on õigus nõuda ligipääsu oma andmetele, nende parandamist või kustutamist, samuti töötlemise piiramist ja andmete ülekandmist. Nende õiguste kasutamiseks võtke meiega ühendust alltoodud e-posti aadressil.',
  'privacy.s7.title': 'Kontakt',
  'privacy.s7.body':
    'Privaatsusega seotud küsimustes kirjutage meile aadressil:',
  'privacy.back': 'Tagasi avalehele',
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
  'meta.title': 'KR Wood — Premium Wood Pellets | ENplus A1 Pellets from Estonia',
  'meta.description':
    'KR Wood supplies ENplus A1 certified wood pellets in 6 mm and 8 mm. High heat output, low ash content, 100% natural softwood. Delivery across Estonia, the Baltics and the EU.',
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
    'Two diameters, one quality standard. Choose the format that suits your boiler — both products meet ENplus A1 specifications.',
  'specs.d6.title': '6 mm pellets',
  'specs.d6.desc': 'The universal choice for domestic boilers, pellet stoves and smaller systems.',
  'specs.d6.badge': 'Most popular',
  'specs.d8.title': '8 mm pellets',
  'specs.d8.desc': 'Suited to larger boiler houses, industrial burners and high-volume consumption.',
  'specs.d8.badge': 'Industrial',
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
    'Delivery throughout Estonia and the Baltics. We also export by container and full truckload across Europe.',
  'packaging.delivery.spec1': 'Estonia-wide delivery',
  'packaging.delivery.spec2': 'Baltics and EU',
  'packaging.delivery.spec3': 'Full truckloads, 24 t',
  'packaging.cta': 'Request a price quote',

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

  'footer.tagline':
    'Premium wood pellets from Estonia. ENplus A1 quality, dependable delivery and honest pricing.',
  'footer.navTitle': 'Navigation',
  'footer.contactTitle': 'Contact',
  'footer.legalTitle': 'Legal',
  'footer.privacy': 'Privacy policy',
  'footer.rights': 'All rights reserved.',
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
    'This website is static and uses no tracking cookies or third-party analytics. Fonts are served from our own server, so none of your data is transmitted to external services.',
  'privacy.s6.title': 'Your rights',
  'privacy.s6.body':
    'You have the right to request access to your data, its correction or erasure, as well as restriction of processing and data portability. To exercise these rights, contact us at the email address below.',
  'privacy.s7.title': 'Contact',
  'privacy.s7.body': 'For any privacy-related questions, please write to us at:',
  'privacy.back': 'Back to homepage',
};

/* -------------------------------------------------------------------------- */
/* Polish — /pl/                                                              */
/* -------------------------------------------------------------------------- */

const pl: Dictionary = {
  'meta.title': 'KR Wood — Pellet drzewny premium | Pellet ENplus A1 z Estonii',
  'meta.description':
    'KR Wood dostarcza pellet drzewny z certyfikatem ENplus A1 w średnicach 6 mm i 8 mm. Wysoka wartość opałowa, niska zawartość popiołu, 100% naturalne drewno iglaste. Dostawa na terenie Estonii, Bałtyki i UE.',
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
    'Dwie średnice, jeden standard jakości. Wybierz format odpowiedni dla swojego kotła — oba produkty spełniają wymagania ENplus A1.',
  'specs.d6.title': 'Pellet 6 mm',
  'specs.d6.desc': 'Uniwersalny wybór do kotłów domowych, kominków na pellet i mniejszych instalacji.',
  'specs.d6.badge': 'Najpopularniejszy',
  'specs.d8.title': 'Pellet 8 mm',
  'specs.d8.desc': 'Przeznaczony do większych kotłowni, palników przemysłowych i dużego zużycia.',
  'specs.d8.badge': 'Przemysłowy',
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
    'Dostawa na terenie całej Estonii i krajów bałtyckich. Eksportujemy również w kontenerach i pełnych ładunkach samochodowych do całej Europy.',
  'packaging.delivery.spec1': 'Dostawa w całej Estonii',
  'packaging.delivery.spec2': 'Kraje bałtyckie i UE',
  'packaging.delivery.spec3': 'Pełne ładunki 24 t',
  'packaging.cta': 'Zapytaj o wycenę',

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

  'footer.tagline':
    'Pellet drzewny premium z Estonii. Jakość ENplus A1, niezawodna dostawa i uczciwe ceny.',
  'footer.navTitle': 'Nawigacja',
  'footer.contactTitle': 'Kontakt',
  'footer.legalTitle': 'Informacje prawne',
  'footer.privacy': 'Polityka prywatności',
  'footer.rights': 'Wszelkie prawa zastrzeżone.',
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
    'Ta strona jest statyczna i nie używa plików cookie śledzących ani analityki podmiotów trzecich. Czcionki są serwowane z naszego własnego serwera, więc żadne Twoje dane nie są przekazywane do usług zewnętrznych.',
  'privacy.s6.title': 'Twoje prawa',
  'privacy.s6.body':
    'Masz prawo żądać dostępu do swoich danych, ich sprostowania lub usunięcia, a także ograniczenia przetwarzania i przeniesienia danych. Aby skorzystać z tych praw, skontaktuj się z nami pod adresem e-mail podanym poniżej.',
  'privacy.s7.title': 'Kontakt',
  'privacy.s7.body': 'W sprawach dotyczących prywatności prosimy o kontakt pod adresem:',
  'privacy.back': 'Powrót na stronę główną',
};

/* -------------------------------------------------------------------------- */

export const ui: Record<Lang, Dictionary> = { et, en, pl };
