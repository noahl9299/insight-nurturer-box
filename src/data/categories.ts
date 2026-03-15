import catCave from "@/assets/cat-cave.jpg";
import catDonut from "@/assets/cat-donut.jpg";
import catOrtho from "@/assets/cat-ortho.jpg";
import catWindow from "@/assets/cat-window.jpg";
import catDesign from "@/assets/cat-design.jpg";
import catSofa from "@/assets/cat-sofa.jpg";
import catHeated from "@/assets/cat-heated.jpg";
import catHammock from "@/assets/cat-hammock.jpg";
import heroCat from "@/assets/hero-cat.jpg";

export interface BuyingGuide {
  title: string;
  intro: string;
  steps?: { title: string; text: string }[];
  proCon?: { pros: string[]; cons: string[] };
  table?: { title: string; headers: string[]; rows: string[][] };
  editorTip?: string;
}

export interface CategoryConfig {
  slug: string;
  route: string;
  name: string;
  nameLong: string;
  tagline: string;
  description: string;
  image: string;
  heroColor: string;
  filterTypen: string[];
  seoText: {
    intro: string;
    h2: string;
    body: string;
  };
  buyingGuide?: BuyingGuide;
  faqs: { q: string; a: string }[];
  produktKategorien: string[]; // maps to Product.kategorie
}

export const categoryConfigs: CategoryConfig[] = [
  {
    slug: "katzenhoehlen",
    route: "/katzenhoehlen",
    name: "Katzenhöhlen",
    nameLong: "Katzenhöhlen & Iglus",
    tagline: "Sicher, gemütlich, geborgen",
    description: "Deine Katze liebt es, sich zurückzuziehen. Unsere kuratierte Auswahl an Katzenhöhlen, Iglus und Tunneln bietet den perfekten Rückzugsort.",
    image: catCave,
    heroColor: "from-stone-500/80 to-zinc-700/80",
    filterTypen: ["Höhle", "Iglu", "Filz-Höhle", "2-in-1 Höhle", "Kuschelsack", "Tunnel-Höhle", "Cord-Iglu", "Design-Höhle", "Katzenhaus", "Filz Premium"],
    seoText: {
      intro: "Katzenhöhlen sind die ideale Wahl für Katzen, die Sicherheit und Geborgenheit suchen.",
      h2: "Warum Katzen Höhlen lieben – und worauf du beim Kauf achten solltest",
      body: `Katzen sind von Natur aus Höhlentiere. Ein Rückzugsort, der an allen Seiten geschlossen ist, gibt ihnen das Gefühl von Sicherheit und Schutz – ähnlich wie in der Wildnis unter Büschen oder in Felsspalten. Besonders ängstliche Katzen, Neuzugänge im Haushalt oder Katzen, die sich nach dem Tierarztbesuch erholen, profitieren enorm von einer eigenen Höhle.

**Worauf du beim Kauf einer Katzenhöhle achten solltest:**
Die Höhle sollte groß genug sein, dass deine Katze sich darin umdrehen kann – mindestens 40×35 cm Innenmaß. Der Eingang sollte breit genug sein (ca. 15–20 cm), damit deine Katze bequem ein- und aussteigen kann. Achte auf waschbares Material: Plüsch und Polyester bei 30 Grad, Filz per Handwäsche. Für Senioren-Katzen eignen sich niedrige Eingänge besonders gut.

**Filz vs. Plüsch:** Filzhöhlen (aus Wolle) sind atmungsaktiver, teurer, aber nachhaltiger. Plüschhöhlen sind günstiger, weicher und meist maschinenwaschbar.`,
    },
    faqs: [
      { q: "Wie groß sollte eine Katzenhöhle sein?", a: "Mindestens 40×35 cm Innenmaß, damit deine Katze sich bequem einrollen und umdrehen kann. Für größere Rassen (Maine Coon, Ragdoll) lieber 50×45 cm oder mehr wählen." },
      { q: "Welches Material ist am besten für Katzenhöhlen?", a: "Filz (Wolle) ist atmungsaktiv und langlebig, aber nur per Hand waschbar. Plüsch ist günstiger, maschinenwaschbar und sehr weich. Cord-Höhlen liegen im Trend und sind pflegeleicht." },
      { q: "Wie gewöhne ich meine Katze an eine neue Höhle?", a: "Stelle die Höhle an einen ruhigen, erhöhten Ort. Lege ein getragenes T-Shirt oder Decke hinein, damit die Höhle nach dir riecht. Katzenminze am Eingang kann helfen. Gib deiner Katze 1–2 Wochen Zeit." },
      { q: "Sind Katzenhöhlen waschbar?", a: "Die meisten Plüsch-Höhlen sind bei 30 Grad maschinenwaschbar. Filzhöhlen sollten nur per Hand oder gar nicht gewaschen werden. Modelle mit herausnehmbarem Kissen sind am praktischsten." },
      { q: "2-in-1 Höhle – lohnt sich das?", a: "Ja! 2-in-1 Modelle lassen sich sowohl als geschlossene Höhle als auch als offenes Bett verwenden. Ideal, wenn du nicht weißt, was deine Katze bevorzugt." },
    ],
    produktKategorien: ["Hoehle"],
  },
  {
    slug: "donut-katzenbetten",
    route: "/donut-katzenbetten",
    name: "Donut-Betten",
    nameLong: "Donut-Katzenbetten",
    tagline: "Rund, flauschig, unwiderstehlich",
    description: "Donut-Katzenbetten sind die beliebtesten Schlafplätze – mit erhöhtem Rand zum Anlehnen und extra weichem Innenkissen. Perfekt für Kugelschläfer.",
    image: catDonut,
    heroColor: "from-orange-500/80 to-amber-600/80",
    filterTypen: ["Donut", "Anti-Angst-Donut", "Budget-Donut", "XL-Donut", "XXL-Donut", "Bio-Donut"],
    seoText: {
      intro: "Donut-Katzenbetten sind die meistverkauften Katzenbetten – und das aus gutem Grund.",
      h2: "Donut-Katzenbetten: Alles, was du wissen musst",
      body: `Das runde Design mit dem erhöhten Rand ist keine Mode-Erscheinung: Katzen lieben es, sich an etwas anzulehnen, den Kopf zu stützen und sich einzukuscheln. Der Donut-Rand gibt ihnen dieses Gefühl von rundum Geborgenheit.

**Welche Größe ist die richtige?**
Für Katzen bis 4 kg reichen 45–50 cm Durchmesser. Für Katzen von 4–6 kg sind 55 cm ideal. Für große Rassen wie Maine Coon solltest du mindestens 60–70 cm wählen. Faustregel: Die eingerollte Katze sollte gut in den Innenbereich passen, ohne überzuhängen.

**Anti-Angst-Donuts:** Diese Modelle haben besonders tiefe, weiche Ränder. Das "Eingemauert-Sein"-Gefühl beruhigt ängstliche Katzen und hilft bei Stress (Gewitter, Silvester, Tierarztbesuche).

**Materialien:** Kunstfell (flauschig, günstig, maschinenwaschbar) ist Standard. Premium-Modelle verwenden Bio-Baumwolle oder nachhaltiges Polyester.`,
    },
    faqs: [
      { q: "Was ist der Unterschied zwischen normalem Donut und Anti-Angst-Donut?", a: "Anti-Angst-Donuts haben einen besonders hohen, weichen Rand, der die Katze fast vollständig umschließt. Das Eingemauert-Sein-Gefühl reduziert Stress und Angst erheblich." },
      { q: "Welche Größe Donut-Bett für meine Katze?", a: "Für Katzen bis 4 kg: 45–50 cm. Für 4–6 kg: 55 cm. Für Maine Coon und Co.: 60–70 cm. Im Zweifelsfall lieber eine Nummer größer wählen." },
      { q: "Kann ich ein Donut-Bett in der Waschmaschine waschen?", a: "Ja, die meisten Donut-Betten sind bei 30 Grad maschinenwaschbar. Nutze ein Wäschenetz, um die Form zu erhalten, und lass das Bett an der Luft trocknen – nicht in den Trockner!" },
      { q: "Meine Katze nutzt ihr Donut-Bett nicht – was tun?", a: "Stelle es an erhöhten, ruhigen Orten auf. Lege Katzenminze hinein oder ein getragenes Kleidungsstück. Manche Katzen brauchen 2–3 Wochen Eingewöhnungszeit." },
    ],
    produktKategorien: ["Donut"],
  },
  {
    slug: "orthopaedische-katzenbetten",
    route: "/orthopaedische-katzenbetten",
    name: "Orthopädische Betten",
    nameLong: "Orthopädische Katzenbetten",
    tagline: "Fürsorge für Gelenke & Wirbelsäule",
    description: "Orthopädische Katzenbetten mit Memory Foam entlasten Gelenke und Wirbelsäule – ideal für ältere Katzen, Katzen nach Operationen oder Rassen mit Gelenkproblemen.",
    image: catOrtho,
    heroColor: "from-blue-600/80 to-indigo-700/80",
    filterTypen: ["Orthopädisch", "Memory Foam", "Premium Ortho", "Ortho Budget"],
    seoText: {
      intro: "Memory Foam-Katzenbetten sind mehr als ein Trend: Sie helfen wirklich.",
      h2: "Orthopädische Katzenbetten mit Memory Foam – wann sinnvoll und was beachten?",
      body: `Ab einem Alter von etwa 10–12 Jahren beginnen bei vielen Katzen Gelenkprobleme, Arthritis oder Wirbelsäulenbeschwerden. Auch nach Operationen oder bei bestimmten Rassen (wie Perser oder Scottish Fold) kann ein orthopädisches Katzenbett die Lebensqualität deutlich verbessern.

**Wie funktioniert Memory Foam bei Katzenbetten?**
Memory Foam passt sich der Körperform an und verteilt das Gewicht gleichmäßig. Dadurch entstehen keine Druckpunkte, die Durchblutung wird verbessert, und Muskeln können besser entspannen. Hochwertige Modelle verwenden HR-Kaltschaum (CertiPUR-geprüft) oder Memory Foam Flocken.

**Was du beachten solltest:**
Achte auf einen niedrigen Einstieg (maximal 10–12 cm), damit alte oder kranke Katzen problemlos hineinsteigen können. Die Schaumstoffdicke sollte mindestens 5–8 cm betragen. Kombiniere das orthopädische Bett idealerweise mit einem beheizten Modell – Wärme lindert Gelenkschmerzen zusätzlich.`,
    },
    faqs: [
      { q: "Ab wann braucht eine Katze ein orthopädisches Bett?", a: "Ab etwa 10–12 Jahren oder bei erkennbaren Gelenkproblemen. Anzeichen: Die Katze springt seltener, bewegt sich langsamer, liegt lieber auf harten Böden (Kühle lindert Schmerzen)." },
      { q: "Was ist CertiPUR-zertifizierter Memory Foam?", a: "CertiPUR ist ein Gütesiegel für Schaumstoff, das bestätigt, dass keine schädlichen Chemikalien enthalten sind. Wichtig für Haustiere, die viel Zeit im Bett verbringen." },
      { q: "Kann Memory Foam Schimmel bekommen?", a: "Bei ausreichender Belüftung nicht. Lass das Bett gelegentlich auslüften. Modelle mit waschbarem Bezug und abnehmbarer Foam-Einlage sind am hygienischsten." },
      { q: "Welche Dicke sollte ein orthopädisches Katzenbett haben?", a: "Mindestens 5 cm Memory Foam. Für größere oder schwerere Katzen (über 5 kg) empfehlen wir 8–10 cm. Dünne Modelle unter 4 cm bieten kaum orthopädische Wirkung." },
    ],
    produktKategorien: ["Orthopädisch"],
  },
  {
    slug: "fensterliegen-katzen",
    route: "/fensterliegen-katzen",
    name: "Fensterliegen",
    nameLong: "Fensterliegen für Katzen",
    tagline: "Das beste Plätzen am Fenster",
    description: "Fensterliegen ermöglichen deiner Katze, stundenlang Vögel und das Treiben draußen zu beobachten. Mit Saugnapf-Montage, ohne Bohren.",
    image: catWindow,
    heroColor: "from-sky-500/80 to-cyan-600/80",
    filterTypen: ["Fensterliege", "Fenster-Hängematte"],
    seoText: {
      intro: "Katzen verbringen bis zu 16 Stunden am Tag mit Schlafen – und die schönsten Stunden davon am Fenster.",
      h2: "Fensterliegen für Katzen: Montage, Tragkraft und worauf du achten musst",
      body: `Kein Katzenzubehör ist so einfach angebracht und so intensiv genutzt wie eine gute Fensterliege. Katzen lieben erhöhte Positionen mit Überblick, Wärme durch Sonnenstrahlen und die visuelle Stimulation durch Vögel, Autos und das Leben da draußen.

**Saugnapf-Montage:** Die meisten Fensterliegen werden per Saugnapf am Glasfenster befestigt – kein Bohren nötig. Achte auf mindestens 4 starke Saugnapf-Punkte und eine angegebene Tragkraft von mindestens 15 kg. Verwende die mitgelieferten Saugnäpfe auf sauberem, fettfreiem Glas.

**Größe und Komfort:** Die Liegebehelf sollte mindestens 50×30 cm betragen. Modelle mit weichem Bezug oder abnehmbarem Kissen sind bequemer. Manche Katzen bevorzugen stabiles Metall-Gitter (Panorama-Sicht), andere liegen lieber auf weichem Stoff.

**Tipp:** Platziere die Fensterliege an einem Fenster, das Sonnenlicht bekommt – am besten in Süd- oder Westausrichtung. So hat deine Katze ihr persönliches Sonnenbad.`,
    },
    faqs: [
      { q: "Wie sicher sind Saugnapf-Fensterliegen?", a: "Bei sauberem Glas und korrekter Montage sehr sicher. Achte auf Saugnäpfe mit Hebelschloss. Kontrolliere die Haftung wöchentlich und reinige Glas und Saugnapf regelmäßig." },
      { q: "Welches Gewicht halten Fensterliegen?", a: "Gute Modelle halten 15–25 kg. Für Katzen bis 7 kg sind alle empfohlenen Modelle geeignet. Für Maine Coon oder andere schwere Rassen auf die angegebene Maximallast achten." },
      { q: "Kann ich eine Fensterliege ohne Bohren montieren?", a: "Ja! Alle unsere empfohlenen Fensterliegen werden per Saugnapf montiert. Du brauchst kein Werkzeug – nur ein sauberes, glattes Glasfenster." },
      { q: "Wie reinige ich eine Fensterliege?", a: "Den Bezug abnehmen und bei 30 Grad waschen. Das Metallgestell mit einem feuchten Tuch abwischen. Die Saugnäpfe regelmäßig mit warmem Wasser reinigen, um die Haftkraft zu erhalten." },
    ],
    produktKategorien: ["Fensterliege"],
  },
  {
    slug: "beheizte-katzenbetten",
    route: "/beheizte-katzenbetten",
    name: "Beheizte Betten",
    nameLong: "Beheizte Katzenbetten",
    tagline: "Wohlige Wärme für kalte Tage",
    description: "Beheizte Katzenbetten sind das Beste für Freigänger, ältere Katzen und alle, die das Heizungskissen lieben. TÜV-geprüft, sicher, wohlig warm.",
    image: catHeated,
    heroColor: "from-red-500/80 to-orange-600/80",
    filterTypen: ["Beheizt", "USB-Heizbett", "Beheizt Budget", "Smart-Bett"],
    seoText: {
      intro: "Wärme ist für Katzen nicht nur Komfort – sie ist ein medizinisches Bedürfnis.",
      h2: "Beheizte Katzenbetten: Sicherheit, Typen und Kaufberatung",
      body: `Katzen haben eine höhere Körpertemperatur als Menschen (38–39°C) und suchen ständig Wärmequellen. Beheizte Katzenbetten geben genau die richtige Wärme ab, ohne Überhitzung zu riskieren.

**Für wen sind beheizte Katzenbetten besonders wichtig?**
Für Senioren-Katzen (Arthritis, schlechte Durchblutung), für kranke Katzen in Erholung, für Freigänger im Winter, für sehr schlanke Katzen mit wenig Körperfett, und für Katzen, die sehr früh geboren wurden (Wärmeregulation manchmal eingeschränkt).

**Sicherheitsmerkmale worauf du achten musst:**
GS-Zeichen (Geprüfte Sicherheit), automatische Abschaltung bei Überhitzung, TÜV-Prüfung, CE-Zertifizierung. Das Kabel muss aus dem Schlafbereich herausgeführt werden – nie unter dem Bett. Der Thermostat sollte auf maximal 40°C begrenzt sein.

**USB vs. Strom:** USB-beheizte Betten (5V) sind sicherer und günstiger im Betrieb, haben aber weniger Heizleistung. Strom-Heizbetten sind effizienter, benötigen aber eine Steckdose in der Nähe.`,
    },
    faqs: [
      { q: "Sind beheizte Katzenbetten sicher?", a: "Ja, bei CE-zugelassenen und GS-geprüften Modellen. Achte auf automatische Abschaltung, Überhitzungsschutz und einen thermostatgesteuerten Betrieb. Lass das Kabel nie unter dem Bett verlaufen." },
      { q: "Wie warm wird ein beheiztes Katzenbett?", a: "Gute Modelle heizen auf 38–40°C – genau die Körpertemperatur einer Katze. Das fühlt sich für sie an wie ein warmer Bauch. Zu hohe Temperaturen sind gefährlich – kaufe nur Modelle mit Thermostat." },
      { q: "Wie viel Strom verbraucht ein beheiztes Katzenbett?", a: "Strom-Modelle verbrauchen 15–40 Watt – vergleichbar mit einer LED-Lampe. Bei 8 Stunden täglich sind das ca. 1–3 Euro pro Monat. USB-Modelle verbrauchen noch weniger." },
      { q: "Muss ich das beheizte Katzenbett immer angeschaltet lassen?", a: "Nein. Viele Modelle haben einen Timer oder Thermostat und schalten sich automatisch ab. Alternativ einfach über eine schaltbare Steckdose steuern – z.B. nur tagsüber oder bei kaltem Wetter." },
    ],
    produktKategorien: ["Beheizt"],
  },
  {
    slug: "design-katzenbetten",
    route: "/design-katzenbetten",
    name: "Design & Premium",
    nameLong: "Design & Premium Katzenbetten",
    tagline: "Wohndesign trifft Katzenwohl",
    description: "Premium Katzenbetten, die auch deine Einrichtung aufwerten. Von Meyou Paris bis LucyBalu – echte Möbelstücke für anspruchsvolle Katzen (und deren Menschen).",
    image: catDesign,
    heroColor: "from-emerald-600/80 to-teal-700/80",
    filterTypen: ["Design-Bett", "Premium Daybed", "Premium Filz", "Designer-Cube", "Designer-Muschel", "Wand-Bett"],
    seoText: {
      intro: "Katzenbetten müssen nicht hässlich sein. Die neue Generation Premium-Katzenmöbel ist wohnraumwürdig.",
      h2: "Design-Katzenbetten: Wenn Katzenmöbel zum Interior-Highlight werden",
      body: `Der Markt für hochwertige Katzenmöbel hat sich in den letzten Jahren radikal verändert. Marken wie Meyou Paris, MiaCara, LucyBalu oder CasaLoba produzieren Stücke, die in keiner Wohnzeitschrift fehl am Platz wären.

**Was macht ein echtes Design-Katzenbett aus?**
Echte Materialien (Eiche, Buche, Merinowolle, Canvas), handwerkliche Fertigung oft in Europa, durchdachte Formsprache, die sich in moderne Wohnkonzepte integriert. Und natürlich: Katzen lieben diese Betten genauso wie günstige Alternativen.

**Marken-Übersicht:**
- **MiaCara**: Skandinavisches Design, handgefertigt in Europa, Eiche und Baumwolle
- **Meyou Paris**: Französisches Luxus-Design, The Cube ist ein echtes Statement-Piece
- **LucyBalu**: Deutsche Marke, Cord und Canvas, modernes Handwerk
- **CasaLoba**: 100% Merinowolle, handgefertigt, nachhaltig

**Investition oder Luxus?** Ein hochwertiges Katzenbett aus echten Materialien hält 5–10 Jahre. Günstiges Plüsch muss oft jährlich ersetzt werden. Langfristig ist Premium oft günstiger.`,
    },
    faqs: [
      { q: "Lohnt sich ein teures Design-Katzenbett?", a: "Ja, bei Qualitäts-Marken definitiv. Echte Materialien (Wolle, Eiche, Canvas) halten 5–10 Jahre. Günstiger Plüsch verliert nach 1–2 Jahren Form und Flauschigkeit." },
      { q: "Nehmen Katzen teure Design-Betten auch wirklich an?", a: "Katzen reagieren auf Komfort, nicht den Preis. Entscheidend sind: Platzierung (erhöht, ruhig), vertrauter Geruch (dein T-Shirt hineinlegen), und ob das Modell zum Schlafstil passt (Höhle vs. offenes Bett)." },
      { q: "Welche Design-Marke ist die beste?", a: "MiaCara für skandinavisches Holz-Design, Meyou Paris für Statement-Pieces, LucyBalu für moderne deutsche Handwerksqualität, CasaLoba für nachhaltige Filz-Meisterwerke." },
      { q: "Sind Design-Katzenbetten nachhaltig?", a: "Oft ja: Marken wie West Paw (100% recycelt), CasaLoba (Merinowolle) und Catit Pixi (Bambus) sind explizit nachhaltig positioniert. Echte Materialien reduzieren auch den Mikroplastik-Eintrag gegenüber Plüsch." },
    ],
    produktKategorien: ["Erhoeht", "Spezial"],
  },
  {
    slug: "katzensofas",
    route: "/katzensofas",
    name: "Katzensofas",
    nameLong: "Katzensofas & Lounge-Betten",
    tagline: "Das kleine Sofa für die große Persönlichkeit",
    description: "Katzensofas im Miniatur-Stil geben deiner Katze einen eigenen Platz zum Thronieren. Moderne Cord-Optik, waschbar, stylisch.",
    image: catSofa,
    heroColor: "from-violet-600/80 to-purple-700/80",
    filterTypen: ["Katzensofa", "Sofa", "Sofa-Auflage"],
    seoText: {
      intro: "Katzensofas sind mehr als ein Gimmick – sie sind der perfekte Kompromiss.",
      h2: "Katzensofas kaufen: Das eigene Möbelstück für deine Katze",
      body: `Katzensofas lösen ein klassisches Problem: Deine Katze will auf dem Sofa sitzen – aber vielleicht willst du das Fell auf dem eigenen Sofa nicht. Ein Katzensofa direkt daneben ist die perfekte Lösung. Katzen schätzen die erhöhte Position und die Nähe zu ihrem Menschen.

**Cord ist der neue Plüsch:** Der Cord-Trend aus dem Möbelbereich hat die Haustierbranche erreicht. Cord-Katzensofas sehen hochwertig aus, sind langlebig und lassen sich gut reinigen. Terracotta, Salbei und Beige fügen sich nahtlos in moderne Interiors ein.

**Größe und Konstruktion:** Ein Katzensofa sollte mindestens 55×45 cm Liegefläche bieten. Achte auf einen stabilen Schaumstoffkern und rutschfeste Füße. Der Bezug sollte abnehmbar und waschbar sein.

**Sofa-Auflagen:** Eine günstigere Alternative sind Sofa-Auflagen, die per Klettverschluss am eigenen Sofa befestigt werden. So hat deine Katze ihren eigenen markierten Bereich – ohne eigenes Möbelstück.`,
    },
    faqs: [
      { q: "Warum ein Katzensofa statt normales Katzenbett?", a: "Katzensofas bieten eine erhöhte Sitzposition, die Katzen lieben, und passen optisch besser ins Wohnzimmer. Ideal für Katzen, die gerne auf dem Sofa sitzen, aber ein eigenes Revier haben sollen." },
      { q: "Welche Größe sollte ein Katzensofa haben?", a: "Mindestens 55×45 cm Liegefläche für eine durchschnittliche Hauskatze (4–5 kg). Für Maine Coon oder andere große Rassen lieber 65×50 cm und mehr wählen." },
      { q: "Ist Cord ein gutes Material für Katzensofas?", a: "Ja! Cord ist robuster als normaler Stoff, kratzfest, und sieht deutlich hochwertiger aus. Achte auf abnehmbaren Cord-Bezug für die Waschmaschine." },
      { q: "Kann ich das Katzensofa auch draußen aufstellen?", a: "Die meisten Katzensofas sind für den Innenbereich konzipiert. Für Außenbereiche gibt es spezielle wetterfeste Modelle, aber die meisten Cord- und Schaumstoff-Modelle sollten drinnen bleiben." },
    ],
    produktKategorien: ["Sofa"],
  },
  {
    slug: "haengematten-katzen",
    route: "/haengematten-katzen",
    name: "Hängematten",
    nameLong: "Katzenhängematten & Heizkörperbetten",
    tagline: "Schwebend entspannen – nah an der Wärme",
    description: "Hängematten für Katzen – am Heizkörper, am Fenster oder freistehend. Die ultimative Kombination aus Wärme, Höhe und Gemütlichkeit.",
    image: catHammock,
    heroColor: "from-teal-500/80 to-cyan-600/80",
    filterTypen: ["Heizkörper-Hängematte", "Doppel-Hängematte", "Heizungs-Liege", "Budget-Hängematte"],
    seoText: {
      intro: "Katzenhängematten sind schlichter Genuss: warm, erhöht, schwebend.",
      h2: "Katzenhängematten: Typen, Montage und die besten Plätze",
      body: `Katzenhängematten kombinieren gleich mehrere Katzen-Lieblinge: erhöhte Positionen, Wärme (besonders am Heizkörper), und das sanfte Schaukeln, das an das Leben auf Bäumen erinnert.

**Heizkörper-Hängematten:** Die beliebteste Variante. Ein Metallgestell mit Haken klippt an den Heizkörper, eine Liegefläche hängt davor. Katzen liegen buchstäblich in der warmen Luft. Achte auf: Heizkörperbreite (Standard: 9–12 cm), Tragkraft (mindestens 10 kg), einfache Montage ohne Werkzeug.

**Freistehende Hängematten:** Benötigen ein Gestell (Bäume, Halterungen). Besonders beliebt für Zimmer ohne passende Heizkörper oder als Ergänzung zum Kratzbaum.

**Doppel-Hängematten:** Zwei-Ebenen-Modelle sparen Platz und ermöglichen es, dass zwei Katzen gleichzeitig ihren Lieblingsplatz haben.`,
    },
    faqs: [
      { q: "Passen Heizkörper-Hängematten an jeden Heizkörper?", a: "Nein. Prüfe vor dem Kauf die Breite und Tiefe deines Heizkörpers. Standard-Heizkörper (Rippenheizkörper) passen zu den meisten Modellen. Flachheizkörper und Design-Heizkörper benötigen spezielle Halterungen." },
      { q: "Wie viel Gewicht halten Katzenhängematten?", a: "Standard-Modelle tragen 6–10 kg – ausreichend für die meisten Hauskatzen. Für Maine Coon oder andere schwere Rassen über 7 kg auf verstärkte Modelle mit höherer Tragkraft achten." },
      { q: "Ist es sicher, die Hängematte am Heizkörper zu befestigen?", a: "Ja, wenn du die Haken korrekt anbringst. Die Haken dürfen den Heizkörper nicht verbiegen. Überprüfe regelmäßig den festen Sitz der Halterung, besonders wenn deine Katze sehr aktiv ist." },
      { q: "Meine Katze nutzt die Hängematte nicht – was kann ich tun?", a: "Führe deine Katze sanft zur Hängematte und lasse sie von allein erkunden. Lege eine vertraute Decke hinein. Manche Katzen brauchen 2–4 Wochen bis sie die Hängematte annehmen." },
    ],
    produktKategorien: ["Haengematte"],
  },
  {
    slug: "kratzbetten",
    route: "/kratzbetten",
    name: "Kratzbetten",
    nameLong: "Kratzbetten & Kratz-Schlaf-Kombis",
    tagline: "Kratzen und Schlafen in einem",
    description: "Kratzbetten aus Wellpappe oder Sisal kombinieren Schlafplatz und Kratzgelegenheit. Günstig, nachhaltig, von Katzen geliebt.",
    image: catDesign,
    heroColor: "from-amber-600/80 to-yellow-700/80",
    filterTypen: ["Kratzbett", "Tunnel", "Sushi-Bett"],
    seoText: {
      intro: "Kratzbetten sind smarter als sie aussehen: Zwei Katzen-Grundbedürfnisse in einem Produkt.",
      h2: "Kratzbetten kaufen: Wellpappe, Sisal und Kombi-Modelle im Vergleich",
      body: `Katzen kratzen nicht aus Bosheit – es ist ein angeborener Instinkt, der Klauen schärft, Territorium markiert und dehnt. Kratzbetten aus Wellpappe oder Sisal erfüllen diesen Bedarf, während die Katze gleichzeitig einen Lieblingsplatz bekommt.

**Wellpappe-Kratzbetten:** Günstig (ab 10 Euro), von fast allen Katzen sofort akzeptiert, umweltfreundlich (Recycling möglich). Nachteile: Kartonspäne verteilen sich im Raum, Haltbarkeit begrenzt (3–6 Monate bei starker Nutzung).

**Sisal-Kratzbetten:** Langlebiger, weniger Schmutz, robuster. Teurer als Wellpappe, aber nachhaltiger in der Langzeitnutzung.

**Kombi-Modelle:** Tunnel + Kratzbett, oder Kratzbett + Höhle – perfekt für Katzen, die beides wollen. Das Catit Pirates Modell ist ein Kultprodukt.

**Tipp:** Wellpappe-Kratzbetten können often gewendet werden – beide Seiten nutzbar für doppelte Lebensdauer.`,
    },
    faqs: [
      { q: "Was ist besser: Wellpappe oder Sisal Kratzbett?", a: "Wellpappe ist günstiger, wird sofort angenommen, macht aber mehr Krümel. Sisal ist langlebiger, robuster und sauberer. Für Erstbesitzer empfehlen wir Wellpappe zum Testen, danach Upgrade auf Sisal." },
      { q: "Wie lange hält ein Kratzbett aus Wellpappe?", a: "Bei moderater Nutzung 3–6 Monate. Viele Modelle können gewendet werden (Doppelte Lebensdauer). Wenn die Oberfläche stark zerfasert ist oder nur noch Reste da sind, Zeit für ein neues." },
      { q: "Muss ich Katzenminze auf das Kratzbett streuen?", a: "Nicht unbedingt, aber es hilft, die Katze initial anzulocken. Streue etwas Katzenminze auf die Oberfläche. Die meisten Katzen beginnen danach schnell zu kratzen." },
      { q: "Kann ich ein Kratzbett aus Wellpappe kompostieren?", a: "Ja! Reine Wellpappe ohne Kleber oder Farbe kann kompostiert werden. Kleine Mengen Kartonspäne auch. Das macht Wellpappe-Kratzbetten zu einer der umweltfreundlichsten Optionen." },
    ],
    produktKategorien: ["Spezial"],
  },
  {
    slug: "katzenbett-zubehoer",
    route: "/katzenbett-zubehoer",
    name: "Zubehör",
    nameLong: "Katzenbett-Zubehör",
    tagline: "Decken, Kissen, Wärmeplatten & mehr",
    description: "Das passende Zubehör für das perfekte Katzenbett: Kuscheldecken, Ersatzkissen, Wärmeplatten und Pflegeprodukte für mehr Komfort.",
    image: heroCat,
    heroColor: "from-rose-500/80 to-pink-600/80",
    filterTypen: ["Kuscheldecke", "Wärmeplatte"],
    seoText: {
      intro: "Das richtige Zubehör macht aus einem guten Katzenbett einen echten Lieblingsplatz.",
      h2: "Katzenbett-Zubehör: Was wirklich nützlich ist und was du brauchst",
      body: `Ein Katzenbett allein ist manchmal nicht genug – das richtige Zubehör macht den Unterschied zwischen "wird ignoriert" und "Lieblingsplatz".

**Kuscheldecken:** Eine extra Decke im oder unter dem Bett erhöht den Komfort erheblich. Fleece-Decken halten warm, sind maschinenwaschbar und preisgünstig. Tipp: Lege eine oft getragene Fleece-Decke ins Bett – dein Geruch beruhigt deine Katze.

**Wärmeplatten:** Die Snugglesafe Wärmeplatte wird in der Mikrowelle erwärmt und gibt danach 8–10 Stunden Wärme ab – ganz ohne Strom. Ideal für Katzenwelpen, Senioren-Katzen und nach Operationen. Auch als Ersatz für elektrisch beheizte Betten geeignet.

**Ersatzkissen und Bezüge:** Einige Betten-Hersteller bieten Ersatzkissen an. Das verlängert die Lebensdauer des Bettes erheblich, ohne das komplette Bett ersetzen zu müssen.

**Katzenminze:** Als Spray oder getrocknet hilft Katzenminze dabei, neue Schlafplätze attraktiver zu machen.`,
    },
    faqs: [
      { q: "Was ist die Snugglesafe Wärmeplatte?", a: "Eine Kunststoffplatte, die in der Mikrowelle erhitzt wird und anschließend 8–10 Stunden Wärme abgibt. Kein Strom nötig. Ideal für Katzenwelpen, kranke Katzen oder als mobile Wärmequelle." },
      { q: "Welche Decke ist am besten für Katzenbetten?", a: "Fleece-Decken sind ideal: weich, warm, günstig, maschinenwaschbar. Für anspruchsvollere Katzen: Kuscheldecken mit Sherpa-Innenseite. Achte auf schadstoffgeprüfte Materialien (OEKO-TEX)." },
      { q: "Wie oft sollte ich Katzenbett-Zubehör waschen?", a: "Decken und Kissen alle 1–2 Wochen bei 30 Grad waschen. Bei Allergien oder mehreren Katzen öfter. Wärmeplatten regelmäßig mit feuchtem Tuch abwischen." },
      { q: "Kann ich Katzenminze als Spray kaufen?", a: "Ja, Katzenminze-Spray ist praktischer als die getrocknete Version: Gleichmäßig auftragen, kein Staub, kontrollierbare Dosierung. Wirkt aber nicht auf alle Katzen – ca. 30% reagieren nicht auf Katzenminze." },
    ],
    produktKategorien: ["Zubehoer"],
  },
  {
    slug: "katzenbetten",
    route: "/katzenbetten",
    name: "Alle Katzenbetten",
    nameLong: "Alle Katzenbetten im Überblick",
    tagline: "100+ kuratierte Katzenbetten",
    description: "Unser komplettes, handverlesenes Sortiment: Über 100 Katzenbetten aus allen Kategorien – von günstig bis Premium, für jede Katze und jeden Stil.",
    image: heroCat,
    heroColor: "from-primary/80 to-primary-dark/80",
    filterTypen: [],
    seoText: {
      intro: "Willkommen beim größten unabhängigen Katzenbett-Vergleich im deutschsprachigen Raum.",
      h2: "Das perfekte Katzenbett finden – unser kompletter Vergleich 2025",
      body: `Bei katzenbett.de findest du über 100 handverlesene Katzenbetten aus allen Kategorien – von günstigem Plüsch für 13 Euro bis zum handgefertigten Designerstück für 189 Euro. Alle Produkte wurden nach Bewertungen, Materialqualität und Langlebigkeit ausgewählt.

**Kategorien im Überblick:**
- **Katzenhöhlen & Iglus**: Für Katzen, die Geborgenheit suchen
- **Donut-Betten**: Die meistverkaufte Kategorie, ideal für Kugelschläfer
- **Orthopädische Betten**: Memory Foam für Senioren und Katzen mit Gelenkproblemen
- **Fensterliegen**: Für Vögelkucker und Sonnenanbeter
- **Beheizte Betten**: Wärme für kalte Nächte und alte Gelenke
- **Design & Premium**: Wenn das Katzenbett ein Möbelstück sein soll
- **Katzensofas**: Das eigene kleine Sofa für den Vierbeiner
- **Hängematten**: Am Heizkörper oder Fenster – schwebend gemütlich

**Unser Tipp für Neukäufer:** Beginne mit einem Donut-Bett von Bedsure oder Pecute – beide haben tausende Bewertungen, sind waschbar und werden von fast allen Katzen angenommen.`,
    },
    faqs: [
      { q: "Welches Katzenbett ist das beste 2025?", a: "Das beste Katzenbett hängt von deiner Katze ab. Für die meisten Katzen: Bedsure Donut (Bestseller, günstig, waschbar). Für ältere Katzen: FEANDREA Memory Foam. Für Design-Liebhaber: LucyBalu DINGHY." },
      { q: "Wie viel sollte ein Katzenbett kosten?", a: "Gute Katzenbetten gibt es ab 15 Euro (Trixie Minou). Empfehlenswert sind Modelle im Bereich 20–45 Euro – hier stimmt oft das Verhältnis aus Qualität, Komfort und Waschbarkeit. Über 50 Euro beginnt der Premium-Bereich." },
      { q: "Welches Katzenbett ist besonders einfach zu waschen?", a: "Alle Bedsure-Modelle und Pecute-Donuts sind maschinenwaschbar bei 30 Grad. Modelle mit herausnehmbarem Kissen (wie FEANDREA oder FurHaven) sind am praktischsten – nur den Bezug waschen." },
      { q: "Gibt es Katzenbetten für große Katzen?", a: "Ja! Für Maine Coon, Ragdoll oder andere große Rassen empfehlen wir Betten ab 60 cm Durchmesser oder 65×50 cm Liegefläche. KOOLTAIL XL-Donut (65 cm) und JEMIDI XXL (70 cm) sind gute Optionen." },
      { q: "Sind teure Katzenbetten wirklich besser?", a: "Oft ja – in Bezug auf Material, Haltbarkeit und Nachhaltigkeit. Aber: Viele Katzen schlafen genauso gerne auf günstigen Modellen. Wichtiger als der Preis ist die Platzierung und ob der Betttyp zum Schlafstil deiner Katze passt." },
    ],
    produktKategorien: [], // all products
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categoryConfigs.find((c) => c.slug === slug);
}
