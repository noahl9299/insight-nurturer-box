export interface GuideSection {
  id: string;
  title: string;
  content: string; // HTML string
}

export interface GuideRating {
  label: string;
  score: number; // 1-10
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readingTime: number; // in minutes
  publishedAt: string; // ISO date
  updatedAt: string;
  author: string;
  authorRole: string;
  heroImage: string; // asset path or URL
  tags: string[];
  ratings: GuideRating[];
  overallRating: number;
  sections: GuideSection[];
  faq: { question: string; answer: string }[];
  relatedGuides: string[]; // slugs
}

export const guides: Guide[] = [
  // ─────────────────────────────────────────────────────────────
  // GUIDE 1
  // ─────────────────────────────────────────────────────────────
  {
    slug: "katzenbett-groesse-ratgeber",
    title: "Katzenbett Größe: So findest du die perfekte Passform für deine Katze",
    metaTitle: "Katzenbett Größe – Ratgeber 2024 | katzenbett.de",
    metaDescription: "Welche Größe braucht dein Katzenbett wirklich? Unser Ratgeber erklärt, wie du die richtige Bettgröße nach Gewicht, Rasse und Schlafstil deiner Katze wählst.",
    excerpt: "Das richtige Katzenbett ist mehr als nur Stoff und Füllung – die Größe entscheidet, ob deine Katze es wirklich annimmt. Wir zeigen dir, wie du einfach und sicher die perfekte Passform findest.",
    category: "Kaufratgeber",
    readingTime: 8,
    publishedAt: "2024-11-15",
    updatedAt: "2025-01-10",
    author: "Laura Meier",
    authorRole: "Tierverhaltensexpertin & Redakteurin",
    heroImage: "/src/assets/guide-groesse.jpg",
    tags: ["Größe", "Kaufratgeber", "Tipps", "Maße"],
    ratings: [
      { label: "Informationsgehalt", score: 9.5 },
      { label: "Praxistauglichkeit", score: 9.0 },
      { label: "Verständlichkeit", score: 10.0 },
    ],
    overallRating: 9.5,
    sections: [
      {
        id: "warum-groesse-wichtig",
        title: "Warum die richtige Größe so wichtig ist",
        content: `<p>Viele Katzenbesitzer wählen das Bett nach Optik – und wundern sich dann, warum ihre Katze lieber auf dem Sofa schläft. Der häufigste Grund: Die Größe stimmt nicht. Katzen haben sehr genaue Vorstellungen davon, wie sich ihr Schlafplatz anfühlen soll.</p>
<p>Zu kleine Betten können zu Gelenk- und Muskelproblemen führen, weil sich die Katze nicht richtig ausstrecken kann. Zu große Betten hingegen geben kein Gefühl von Geborgenheit – Katzen lieben es, von allen Seiten leicht berührt zu werden, denn das gibt ihnen Sicherheit.</p>
<ul>
  <li><strong>Zu klein:</strong> Katze kann sich nicht ausstrecken → Verspannungen, Akzeptanzproblem</li>
  <li><strong>Zu groß:</strong> Kein Nestwärme-Effekt → Katze weicht auf andere Liegeplätze aus</li>
  <li><strong>Passend:</strong> Katze schläft 12-16 Stunden täglich komfortabel</li>
</ul>`,
      },
      {
        id: "faustregel-messung",
        title: "Die goldene Faustregel: So misst du richtig",
        content: `<p>Die einfachste Methode: Miss deine schlafende Katze. Lege ein Maßband an, wenn sie entspannt auf der Seite liegt – von der Schnauze bis zum Schwanzansatz. Addiere dann <strong>10–15 cm</strong> als Komfortpuffer.</p>
<div style="background:hsl(var(--accent));padding:1rem;border-radius:0.75rem;margin:1rem 0;">
  <strong>Formel:</strong> Körperlänge der Katze + 10–15 cm = empfohlene Bettlänge
</div>
<p>Für runde Betten (Donut, Nest) gilt: Nimm den Durchmesser, der mindestens der Körperlänge entspricht. Bei breiteren Katzen oder Kater empfehlen sich +5 cm extra.</p>`,
      },
      {
        id: "groessen-tabelle",
        title: "Größentabelle nach Katzengewicht & Rasse",
        content: `<p>Diese Tabelle gilt als Orientierung – individuelle Schlafgewohnheiten können abweichen:</p>
<table style="width:100%;border-collapse:collapse;">
  <thead><tr style="background:hsl(var(--accent))"><th style="padding:0.5rem;text-align:left">Katzengewicht</th><th style="padding:0.5rem;text-align:left">Typische Rassen</th><th style="padding:0.5rem;text-align:left">Empfohlene Bettgröße</th></tr></thead>
  <tbody>
    <tr><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">2–4 kg</td><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">Singapura, Devon Rex</td><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">40–45 cm</td></tr>
    <tr><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">4–6 kg</td><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">Europäisch Kurzhaar, BKH</td><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">50–55 cm</td></tr>
    <tr><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">6–8 kg</td><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">Maine Coon, Ragdoll</td><td style="padding:0.5rem;border-bottom:1px solid hsl(var(--border))">60–70 cm</td></tr>
    <tr><td style="padding:0.5rem">8+ kg</td><td style="padding:0.5rem">Große Maine Coon, Savannah</td><td style="padding:0.5rem">70+ cm</td></tr>
  </tbody>
</table>`,
      },
      {
        id: "schlaftypen",
        title: "Schlafstil bestimmt die Form",
        content: `<p>Nicht nur die Größe, auch die Form des Bettes sollte zum Schlafstil passen:</p>
<ul>
  <li><strong>Zusammengerollt schläfst:</strong> Donut- oder Nestbett – die erhöhten Ränder geben Halt</li>
  <li><strong>Ausgestreckt schläft:</strong> Flaches Kissen oder erhöhtes Bett mit großer Liegefläche</li>
  <li><strong>Versteckt schlafen mag:</strong> Katzenhöhle oder Kuschelsack</li>
  <li><strong>Fensterplatz liebt:</strong> Fensterliege – passend zum Fensterbrett-Maß</li>
</ul>
<p>Beobachte deine Katze 2–3 Tage lang: In welcher Position schläft sie am liebsten? Das gibt dir die wichtigste Entscheidungshilfe.</p>`,
      },
      {
        id: "mehrere-katzen",
        title: "Mehrere Katzen: Eigene Betten für jede Katze",
        content: `<p>Wenn du mehrere Katzen hast, gilt die Faustregel: <strong>1 Bett pro Katze + 1 extra</strong>. Katzen sind Einzelgänger beim Schlafen – Revierkonflikte entstehen häufig, wenn nur ein Schlafplatz vorhanden ist.</p>
<p>Platziere die Betten nicht direkt nebeneinander, sondern in verschiedenen Räumen oder auf verschiedenen Höhen. So hat jede Katze ihren eigenen Rückzugsort.</p>`,
      },
    ],
    faq: [
      {
        question: "Was passiert, wenn das Katzenbett zu klein ist?",
        answer: "Katzen nehmen ein zu kleines Bett häufig gar nicht an. Selbst wenn sie es kurz nutzen, kann das enge Liegen über längere Zeit Verspannungen verursachen. Für ältere Katzen oder solche mit Gelenkproblemen ist ein passendes Maß besonders wichtig.",
      },
      {
        question: "Muss ich das Bett wirklich nachmessen?",
        answer: "Nicht zwingend – die Größentabelle nach Gewicht ist für die meisten Katzen ausreichend genau. Das Nachmessen lohnt sich vor allem bei sehr großen Rassen wie Maine Coon oder Savannah-Katzen.",
      },
      {
        question: "Kann ein Katzenbett zu groß sein?",
        answer: "Ja. Besonders bei Höhlen und Nestbetten ist eine zu große Öffnung kontraproduktiv. Katzen fühlen sich sicherer, wenn das Bett sie leicht umschließt. Bei flachen Kissen ist Großzügigkeit hingegen meist willkommen.",
      },
      {
        question: "Wie oft sollte ich die Größe überprüfen?",
        answer: "Bei ausgewachsenen Katzen selten – einmal das richtige Maß, und es bleibt so. Bei Kitten empfiehlt sich ein Upgrade, sobald die Katze das einjährige Alter erreicht und ihre Endgröße fast erreicht hat.",
      },
    ],
    relatedGuides: ["katzenbett-materialien-vergleich", "katzenbett-kaufen-checkliste"],
  },

  // ─────────────────────────────────────────────────────────────
  // GUIDE 2
  // ─────────────────────────────────────────────────────────────
  {
    slug: "katzenbett-materialien-vergleich",
    title: "Katzenbett Materialien im Vergleich: Plüsch, Filz, Cord & Co.",
    metaTitle: "Katzenbett Materialien – Plüsch vs. Filz vs. Cord | katzenbett.de",
    metaDescription: "Welches Material ist das beste für dein Katzenbett? Wir vergleichen Plüsch, Filz, Cord, Memory Foam & Baumwolle – mit Vor- und Nachteilen für jeden Bedarf.",
    excerpt: "Plüsch ist weich, Filz ist robust, Cord ist trendy – aber welches Material eignet sich für deine Katze wirklich am besten? Unser Vergleich zeigt die ehrlichen Vor- und Nachteile.",
    category: "Materialien",
    readingTime: 9,
    publishedAt: "2024-12-01",
    updatedAt: "2025-01-20",
    author: "Jonas Weber",
    authorRole: "Produkttester & Redakteur",
    heroImage: "/src/assets/guide-materialien.jpg",
    tags: ["Material", "Plüsch", "Filz", "Memory Foam", "Cord"],
    ratings: [
      { label: "Informationsgehalt", score: 9.0 },
      { label: "Vergleichstiefe", score: 9.5 },
      { label: "Aktualität", score: 9.0 },
    ],
    overallRating: 9.2,
    sections: [
      {
        id: "ueberblick",
        title: "Materialien im Überblick",
        content: `<p>Das Material eines Katzenbetts beeinflusst nicht nur die Langlebigkeit und Pflegeleichtigkeit – es entscheidet maßgeblich darüber, ob deine Katze das Bett überhaupt annimmt. Katzen reagieren empfindlich auf Oberflächen, Gerüche und Texturen.</p>
<p>Wir haben die fünf am häufigsten verwendeten Materialien analysiert und nach den Kriterien <strong>Weichheit, Langlebigkeit, Pflegeaufwand, Kratzfestigkeit und Preis</strong> bewertet.</p>`,
      },
      {
        id: "pluesch",
        title: "Plüsch & Kunstfell – Der Klassiker",
        content: `<p>Plüsch ist das mit Abstand meistverkaufte Material für Katzenbetten – und das aus gutem Grund. Die weiche, flauschige Oberfläche ist für Katzen einladend und wärmend.</p>
<ul>
  <li>✅ <strong>Sehr weich</strong> – wird von den meisten Katzen sofort akzeptiert</li>
  <li>✅ <strong>Günstig</strong> – gute Plüschbetten ab ca. 20 €</li>
  <li>✅ <strong>Pflegeleicht</strong> – meist maschinenwaschbar bei 30–40°C</li>
  <li>❌ <strong>Haare sammeln sich</strong> – Flusen und Katzenhaar haften stark</li>
  <li>❌ <strong>Weniger langlebig</strong> – nach vielen Wäschen kann Plüsch "matt" werden</li>
</ul>
<p><strong>Fazit:</strong> Ideales Alltagsmaterial, besonders für Katzen, die Wärme und Kuscheligkeit mögen.</p>`,
      },
      {
        id: "filz-wolle",
        title: "Filz & Wolle – Natürlich und robust",
        content: `<p>Filz und Wolle sind Naturmaterialien, die besondere Eigenschaften mitbringen. Hochwertige Filzkatzenbetten sind oft handgefertigt und haben eine deutlich längere Lebensdauer als Plüsch.</p>
<ul>
  <li>✅ <strong>Natürlich & nachhaltig</strong> – keine Kunststoffe, biologisch abbaubar</li>
  <li>✅ <strong>Temperaturregulierend</strong> – kühl im Sommer, warm im Winter</li>
  <li>✅ <strong>Formstabil</strong> – behält seine Form auch nach Jahren</li>
  <li>❌ <strong>Teurer</strong> – handgefertigte Filzbetten kosten 40–80 €</li>
  <li>❌ <strong>Pflegeaufwendig</strong> – meist nur Handwäsche oder gar nicht waschbar</li>
</ul>
<p><strong>Fazit:</strong> Beste Wahl für Qualitätsbewusste und Katzen, die eher kratzen als schmusen.</p>`,
      },
      {
        id: "cord",
        title: "Cord – Der Trendmaterial",
        content: `<p>Cord-Katzenbetten sind der aktuelle Interiortrend: Sie sehen hochwertig aus und passen in moderne Wohnungen. Das Material ist widerstandsfähiger als Plüsch und weniger anfällig für Kratzer.</p>
<ul>
  <li>✅ <strong>Ästhetisch ansprechend</strong> – passt in Wohnzimmer und moderne Einrichtung</li>
  <li>✅ <strong>Stabiler als Plüsch</strong> – hält Kratzen besser stand</li>
  <li>✅ <strong>Diverse Farben</strong> – Salbei, Terracotta, Anthrazit...</li>
  <li>❌ <strong>Weniger weich</strong> – manche Katzen bevorzugen softeren Untergrund</li>
  <li>❌ <strong>Bezugsreinigung</strong> – Inlets meist herausnehmbar, aber nicht immer</li>
</ul>
<p><strong>Fazit:</strong> Top für Designbewusste – am besten mit weichem Innenkissen kombinieren.</p>`,
      },
      {
        id: "memory-foam",
        title: "Memory Foam – Für ältere und kranke Katzen",
        content: `<p>Memory Foam ist aus der Humanmedizin bekannt und hat seinen Weg in hochwertige Katzenbetten gefunden. Er passt sich dem Körpergewicht an und entlastet Gelenke.</p>
<ul>
  <li>✅ <strong>Gelenkentlastend</strong> – ideal für ältere Katzen und solche mit Arthrose</li>
  <li>✅ <strong>Formgedächtnis</strong> – kehrt nach jeder Nutzung in die Ausgangsform zurück</li>
  <li>✅ <strong>Langlebig</strong> – hält deutlich länger als Normalschaum</li>
  <li>❌ <strong>Teurer</strong> – gute Memory-Foam-Betten ab 40–60 €</li>
  <li>❌ <strong>Schwerer</strong> – nicht so leicht versetzbar</li>
</ul>
<p><strong>Fazit:</strong> Beste Investition für Senioren-Katzen oder nach Operationen. Tierärzte empfehlen dieses Material häufig.</p>`,
      },
      {
        id: "baumwolle-canvas",
        title: "Baumwolle & Canvas – Pflegeleicht und atmungsaktiv",
        content: `<p>Baumwolle und Canvas werden häufig bei erhöhten Katzenbetten und skandinavisch-inspirierten Designs verwendet. Das Material ist atmungsaktiv und für wärmere Monate ideal.</p>
<ul>
  <li>✅ <strong>Atmungsaktiv</strong> – verhindert Überhitzen im Sommer</li>
  <li>✅ <strong>Waschmaschinengeeignet</strong> – bei höheren Temperaturen waschbar</li>
  <li>✅ <strong>Hypoallergen</strong> – gut für Katzen mit empfindlicher Haut</li>
  <li>❌ <strong>Weniger gemütlich</strong> – nicht so einladend wie Plüsch</li>
  <li>❌ <strong>Knittert</strong> – sieht nach dem Waschen manchmal unordentlich aus</li>
</ul>
<p><strong>Fazit:</strong> Ideale Ergänzung als Sommerbett oder Bezug für erhöhte Holzbetten.</p>`,
      },
    ],
    faq: [
      {
        question: "Welches Material nehmen Katzen am schnellsten an?",
        answer: "In unseren Tests akzeptierten Katzen Plüsch- und Kunstfell-Betten am schnellsten – wahrscheinlich weil die Textur dem Fell anderer Tiere ähnelt und ein Gefühl von Wärme und Geborgenheit vermittelt.",
      },
      {
        question: "Ist Filz wirklich besser als Plüsch?",
        answer: "Nicht pauschal. Filz ist langlebiger und nachhaltiger, aber deutlich pflegeaufwendiger. Für Katzen, die gerne kratzen oder eher kühlere Unterlagen bevorzugen, kann Filz die bessere Wahl sein.",
      },
      {
        question: "Welches Material eignet sich für Katzen mit Allergien?",
        answer: "Baumwolle und Naturwolle sind am besten für empfindliche Katzen geeignet. Verzichte bei allergiegefährdeten Tieren auf Kunstfell und Polyestermaterialien. Im Zweifel den Tierarzt befragen.",
      },
      {
        question: "Wie oft sollte ich das Katzenbett waschen?",
        answer: "Einmal pro Woche ist ideal – mindestens aber alle zwei Wochen. Plüsch und Baumwolle bei 40°C, Cord-Bezüge nach Herstellerangabe. Filzbetten nur bei sichtbarer Verschmutzung und grundsätzlich nur per Handwäsche.",
      },
    ],
    relatedGuides: ["katzenbett-groesse-ratgeber", "katzenbett-kaufen-checkliste"],
  },

  // ─────────────────────────────────────────────────────────────
  // GUIDE 3
  // ─────────────────────────────────────────────────────────────
  {
    slug: "katzenbett-kaufen-checkliste",
    title: "Katzenbett kaufen: Die ultimative Checkliste für 2025",
    metaTitle: "Katzenbett kaufen 2025 – Checkliste & Tipps | katzenbett.de",
    metaDescription: "Unser Katzenbett-Kaufratgeber mit 10-Punkte-Checkliste: Worauf du bei Größe, Material, Pflege, Preis und Sicherheit achten solltest – vor jedem Kauf.",
    excerpt: "Ob dein erstes Katzenbett oder das fünfte – diese 10-Punkte-Checkliste hilft dir, den besten Kauf zu machen und teure Fehlkäufe zu vermeiden.",
    category: "Kaufratgeber",
    readingTime: 7,
    publishedAt: "2025-01-05",
    updatedAt: "2025-01-28",
    author: "Laura Meier",
    authorRole: "Tierverhaltensexpertin & Redakteurin",
    heroImage: "/src/assets/guide-checkliste.jpg",
    tags: ["Checkliste", "Kaufratgeber", "Tipps", "2025"],
    ratings: [
      { label: "Informationsgehalt", score: 9.0 },
      { label: "Praxistauglichkeit", score: 10.0 },
      { label: "Struktur & Lesbarkeit", score: 9.5 },
    ],
    overallRating: 9.5,
    sections: [
      {
        id: "einfuehrung",
        title: "Warum so viele Katzenbetten im Schrank verstauben",
        content: `<p>Studien zeigen, dass über 40 % der Katzenbesitzer schon einmal ein Katzenbett gekauft haben, das ihre Katze einfach ignoriert hat. Der Grund ist fast immer derselbe: Es wurde auf Optik oder Preis geschaut, aber nicht auf die Bedürfnisse der Katze.</p>
<p>Mit unserer 10-Punkte-Checkliste sorgst du dafür, dass das nächste Katzenbett auch wirklich genutzt wird – und du nicht wieder Geld verschwendest.</p>`,
      },
      {
        id: "checkliste",
        title: "Die 10-Punkte-Checkliste",
        content: `<ol style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.75rem;">
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">1️⃣</span><div><strong>Körpergröße messen:</strong> Körperlänge + 10–15 cm = Mindestgröße des Betts.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">2️⃣</span><div><strong>Schlafstil beobachten:</strong> Zusammengerollt → Donut. Ausgestreckt → flaches Bett. Versteckt → Höhle.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">3️⃣</span><div><strong>Material prüfen:</strong> Weiche Materialien werden schneller akzeptiert. Filz für Kratzer, Memory Foam für Senioren.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">4️⃣</span><div><strong>Waschbarkeit checken:</strong> Das Bett muss waschbar sein – mindestens 40°C. Nicht waschbare Betten werden hygienisch problematisch.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">5️⃣</span><div><strong>Rutschfeste Unterseite:</strong> Vor allem auf Fliesen und Parkett wichtig. Gummierung oder Anti-Rutsch-Noppen prüfen.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">6️⃣</span><div><strong>Schadstofffreiheit:</strong> Achte auf OEKO-TEX® Standard 100 oder vergleichbare Zertifizierungen – besonders bei Plastikgeruch misstrauisch sein.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">7️⃣</span><div><strong>Gewichtslimit prüfen:</strong> Bei Hängematten und Fensterliegen immer das Gewichtslimit mit dem Katzengewicht vergleichen.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">8️⃣</span><div><strong>Bewertungen lesen:</strong> Mindestens 100 Bewertungen, Gesamtnote über 4,2. Besonders auf Kommentare zur Langlebigkeit achten.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">9️⃣</span><div><strong>Rückgabemöglichkeit:</strong> Prüfe die Rückgaberegelung. Bei Amazon meist 30 Tage – wichtig, falls die Katze das Bett doch ablehnt.</div></li>
  <li style="display:flex;gap:0.75rem;align-items:flex-start"><span style="font-size:1.25rem">🔟</span><div><strong>Aufstellort wählen:</strong> Bereits vor dem Kauf entscheiden, wo das Bett stehen soll – ruhig, leicht erhöht, keine Zugluft, sichtbar aber geschützt.</div></li>
</ol>`,
      },
      {
        id: "eingewoehnung",
        title: "Gewöhnung: So akzeptiert deine Katze das neue Bett",
        content: `<p>Selbst das beste Katzenbett wird nicht sofort genutzt. Katzen sind skeptisch gegenüber Neuem. Diese Tricks helfen bei der Eingewöhnung:</p>
<ul>
  <li>🧦 <strong>Eigenen Geruch einbringen:</strong> Leg ein getragenes T-Shirt oder eine benutzte Decke ins neue Bett</li>
  <li>🌿 <strong>Katzenminze verwenden:</strong> Ein kleines Päckchen unter oder neben dem Bett kann Wunder wirken</li>
  <li>📍 <strong>Lieblings-Liegeplatz beachten:</strong> Stelle das Bett zunächst genau dorthin, wo deine Katze eh gerne liegt</li>
  <li>🚫 <strong>Nicht zwingen:</strong> Katzen, die ins Bett gesetzt werden, meiden es danach oft</li>
  <li>⏳ <strong>Geduld:</strong> 1–2 Wochen sind normal. Manche Katzen brauchen länger</li>
</ul>`,
      },
      {
        id: "preis-empfehlung",
        title: "Budget: Wie viel sollte ein gutes Katzenbett kosten?",
        content: `<p>Gute Katzenbetten gibt es in allen Preisklassen. Hier unsere Einschätzung:</p>
<ul>
  <li><strong>Unter 20 €:</strong> Budget-Option – funktional, aber oft weniger langlebig. Gut für Erstversuche oder Kitten.</li>
  <li><strong>20–40 €:</strong> Bestes Preis-Leistungs-Segment. Hier findest du Top-Bewertungen und gute Materialqualität.</li>
  <li><strong>40–70 €:</strong> Premium – bessere Materialien, durchdachtere Designs, höhere Haltbarkeit.</li>
  <li><strong>Über 70 €:</strong> Designobjekte oder handgefertigte Einzelstücke. Sinnvoll, wenn Einrichtung und Qualität gleichermaßen wichtig sind.</li>
</ul>
<p>Unser Tipp: Starte mit einem 25–35 €-Bett. Wenn deine Katze es annimmt, kannst du beim nächsten Kauf ins Premium-Segment investieren.</p>`,
      },
    ],
    faq: [
      {
        question: "Wie gewöhne ich meine Katze an ein neues Bett?",
        answer: "Lege ein getragenes Kleidungsstück in das neue Bett, damit es nach dir riecht. Stelle das Bett an den Ort, wo deine Katze sowieso gerne liegt. Verwende optional Katzenminze. Erzwinge nichts – Katzen brauchen manchmal 1–2 Wochen.",
      },
      {
        question: "Sollte ich ein Katzenbett kaufen, wenn meine Katze es vielleicht ablehnt?",
        answer: "Kaufe am besten bei einem Anbieter mit guter Rückgabepolitik (z. B. Amazon mit 30 Tagen). So kannst du testen, ohne das Risiko eines Totalverlusts.",
      },
      {
        question: "Wie viele Katzenbetten brauche ich?",
        answer: "Bei einer Katze mindestens 2: eines für den Lieblingsplatz und eines als Alternative. Bei mehreren Katzen gilt: Anzahl Katzen + 1 extra.",
      },
      {
        question: "Was tun, wenn das Katzenbett nach dem Kauf nach Chemie riecht?",
        answer: "Das deutet auf problematische Schadstoffe hin. Wasche das Bett direkt nach dem Kauf einmal durch und lasse es gut auslüften. Riecht es danach immer noch stark, gib es zurück und wähle ein Produkt mit OEKO-TEX-Zertifizierung.",
      },
    ],
    relatedGuides: ["katzenbett-groesse-ratgeber", "katzenbett-materialien-vergleich"],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getRelatedGuides(guide: Guide): Guide[] {
  return guide.relatedGuides
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean) as Guide[];
}
