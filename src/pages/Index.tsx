import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Shield, Star, Package, RotateCcw, CheckCircle, Clock, BookOpen } from "lucide-react";
import { products, searchProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { guides } from "@/data/guides";
import heroCat from "@/assets/hero-cat.jpg";
import catCave from "@/assets/cat-cave.jpg";
import catDonut from "@/assets/cat-donut.jpg";
import catOrtho from "@/assets/cat-ortho.jpg";
import catWindow from "@/assets/cat-window.jpg";
import catDesign from "@/assets/cat-design.jpg";
import catSofa from "@/assets/cat-sofa.jpg";
import catHeated from "@/assets/cat-heated.jpg";
import catHammock from "@/assets/cat-hammock.jpg";

const trustItems = [
  { icon: "🐱", text: "500+ Katzenbetten verglichen" },
  { icon: "⭐", text: "Nur Top-bewertete Produkte" },
  { icon: "🏪", text: "Sichere Partnershops" },
  { icon: "📦", text: "Schneller Versand" },
  { icon: "↩️", text: "Einfache Rückgabe" },
];

const categories = [
  { name: "Katzenhöhlen & Iglus", slug: "/katzenhoehlen", image: catCave, count: "16 Betten" },
  { name: "Donut-Betten", slug: "/donut-katzenbetten", image: catDonut, count: "12 Betten" },
  { name: "Orthopädische Betten", slug: "/orthopaedische-katzenbetten", image: catOrtho, count: "5 Betten" },
  { name: "Fensterliegen", slug: "/fensterliegen-katzen", image: catWindow, count: "3 Betten" },
  { name: "Design & Premium", slug: "/design-katzenbetten", image: catDesign, count: "10 Betten" },
  { name: "Katzensofas", slug: "/katzensofas", image: catSofa, count: "6 Betten" },
  { name: "Beheizte Betten", slug: "/beheizte-katzenbetten", image: catHeated, count: "6 Betten" },
  { name: "Hängematten", slug: "/haengematten-katzen", image: catHammock, count: "4 Betten" },
  { name: "Alle Katzenbetten", slug: "/katzenbetten", image: heroCat, count: "100+ Betten" },
];

const problems = [
  "Deine Katze schläft überall - nur nicht in ihrem Bett?",
  "Das letzte Katzenbett war nach 3 Wochen platt?",
  "Du findest kein Bett, das zur Einrichtung passt?",
  "Du bist unsicher, welche Größe die richtige ist?",
];

const solutions = [
  "Wir vergleichen über 500 Katzenbetten - ehrlich und unabhängig",
  "Nur Produkte mit Top-Bewertungen kommen in unsere Auswahl",
  "Design-Betten, die auch DIR gefallen",
  "Unser Größenberater findet die perfekte Passform",
];

const faqs = [
  { q: "Welches Katzenbett ist das beste?", a: "Das beste Katzenbett gibt es nicht pauschal - es hängt von deiner Katze ab. Für ängstliche Katzen empfehlen wir Donut-Betten oder Höhlen, für Senioren orthopädische Modelle mit Memory Foam. Schaue dir unsere Kategorien an und nutze den Größenberater." },
  { q: "Wie groß sollte ein Katzenbett sein?", a: "Deine Katze sollte sich bequem einrollen und ausstrecken können. Als Faustregel: Das Bett sollte mindestens 1,5x so groß sein wie deine eingerollte Katze. Bei 4-5 kg empfehlen wir 50 cm Durchmesser, bei großen Rassen wie Maine Coon mindestens 60-70 cm." },
  { q: "Warum nimmt meine Katze das Bett nicht an?", a: "Katzen sind Gewohnheitstiere. Stelle das Bett an einen ruhigen, erhöhten Ort, lege ein getragenes T-Shirt hinein und verwende Katzenminze. Gib deiner Katze 2-3 Wochen Zeit. Manchmal hilft ein Betttyp-Wechsel: Manche Katzen mögen lieber offene Betten, andere Höhlen." },
  { q: "Kann ich ein Katzenbett in der Waschmaschine waschen?", a: "Die meisten modernen Katzenbetten sind bei 30 Grad waschbar. Filzbetten solltest du nur per Hand waschen. Achte beim Kauf auf das Waschbarkeitslabel. Tipp: Wasch das Bett mit einem Wäschenetz und lass es an der Luft trocknen - so bleibt es flauschig." },
  { q: "Welches Katzenbett für alte Katzen mit Gelenkproblemen?", a: "Für Senioren-Katzen empfehlen wir orthopädische Katzenbetten mit Memory Foam. Diese passen sich dem Körper an und entlasten Gelenke und Wirbelsäule. Wichtig: niedriger Einstieg und ein beheizbares Modell für Katzen, die besonders frieren." },
  { q: "Sind beheizte Katzenbetten sicher?", a: "Ja, wenn sie für Haustiere zugelassen sind und das GS-Zeichen tragen. Achte auf eine automatische Abschaltung und einen thermostatgesteuerten Betrieb. Unsere empfohlenen Modelle sind TÜV-geprüft. Lass das Kabel nie unter dem Bett verlaufen." },
];

const brands = ["Bedsure", "Trixie", "FEANDREA", "LucyBalu", "MiaCara", "Navaris", "FUKUMARU", "Catit", "Dehner", "HUNTER", "West Paw", "Amazon Basics", "PAWZ Road", "Bedsure", "Trixie", "FEANDREA", "LucyBalu", "MiaCara"];

export default function Index() {
  const bestsellers = [...products].sort((a, b) => a.rang - b.rang).slice(0, 8);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setSearchResults(searchProducts(searchQuery).slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const badgeMap: Record<number, "bestseller" | "neu" | "tipp"> = {
    0: "bestseller", 2: "bestseller", 5: "tipp", 8: "bestseller",
  };

  return (
    <>
      <SEO
        title="Die besten Katzenbetten im Vergleich 2025 | katzenbett.de"
        description="Über 500 Katzenbetten verglichen und bewertet. Finde das perfekte Katzenbett für deine Katze – nach Größe, Material & Typ. Ehrlich, unabhängig, aktuell."
        canonical="https://katzenbett.de/"
        type="website"
      />
      {/* HERO */}
      <section
        className="relative min-h-[88vh] flex items-center overflow-hidden pt-24"
        aria-label="Startseite Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroCat}
            alt="Gemütliches Wohnzimmer mit Katze in stylischem Katzenbett"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, hsl(42 100% 99% / 0.97) 0%, hsl(42 100% 99% / 0.75) 55%, hsl(42 100% 99% / 0.20) 100%)" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 text-sm font-medium text-foreground mb-6 animate-fade-up">
              🐱 Über 500 Katzenbetten im Vergleich
            </div>

            {/* H1 */}
            <h1
              className="text-heading-1 text-foreground mb-4 animate-fade-up delay-100"
              style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
            >
              Das perfekte Katzenbett für deinen Liebling
            </h1>

            <p className="text-xl text-muted-foreground mb-8 animate-fade-up delay-200 leading-relaxed">
              Finde den Schlafplatz, den deine Katze wirklich liebt. Verglichen, getestet, ehrlich empfohlen.
            </p>

            {/* Search */}
            <div className="relative max-w-lg animate-fade-up delay-300" ref={searchRef}>
              <div className="flex items-center bg-card rounded-full shadow-lg px-5 py-3.5 gap-3 border border-border/50">
                <Search size={20} className="text-muted-foreground shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Was sucht deine Katze? z.B. Donut-Bett, Höhle..."
                  className="flex-1 bg-transparent text-base focus:outline-none text-foreground placeholder:text-muted-foreground"
                  aria-label="Katzenbetten suchen"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-20">
                  {searchResults.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/katzenbett/${p.slug}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-accent/50 transition-colors border-b border-border/30 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{p.produktname}</p>
                        <p className="text-xs text-muted-foreground">{p.marke} - {p.typ}</p>
                      </div>
                      <span className="text-sm font-bold text-primary ml-3 shrink-0">{p.preis.toFixed(2).replace(".", ",")} €</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Quick links */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {[
                  { label: "Bestseller", to: "/katzenbetten" },
                  { label: "Katzenhöhlen", to: "/katzenhoehlen" },
                  { label: "Donut-Betten", to: "/donut-katzenbetten" },
                  
                  { label: "📏 Größenberater", to: "/groessenberater" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-xs px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap items-center gap-5 mt-8 animate-fade-up delay-400">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle size={15} className="text-secondary" />
                Unabhängig verglichen
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Star size={15} className="text-yellow-400 fill-current" />
                Top-bewertete Produkte
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield size={15} className="text-secondary" />
                Sicherer Kauf
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-card border-y border-accent/60 py-5" aria-label="Vertrauensmerkmale">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-around gap-4 md:gap-0">
            {trustItems.map((item) => (
              <div key={item.text} className="trust-item flex items-center gap-2.5">
                <span className="trust-icon text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLER */}
      <section className="py-20 bg-background" aria-labelledby="bestseller-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="bestseller-heading" className="text-heading-2 text-foreground mb-3">
              Bestseller - Das lieben Katzen (und ihre Menschen)
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Die beliebtesten Katzenbetten, basierend auf Bewertungen und Verkäufen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestsellers.slice(0, 8).map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                badge={badgeMap[i] ?? null}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/katzenbetten"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Alle Bestseller ansehen
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND SLIDER */}
      <section className="py-10 bg-card border-y border-border overflow-hidden" aria-label="Vertrauenswürdige Marken">
        <div className="container mx-auto px-4 mb-5">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vertrauenswürdige Marken</p>
        </div>
        <div className="relative">
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-sm font-semibold text-muted-foreground/60 hover:text-primary transition-colors cursor-default shrink-0">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="py-20 bg-muted/30" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="text-heading-2 text-foreground mb-3">
              Finde das perfekte Bett nach Typ
            </h2>
            <p className="text-muted-foreground text-lg">Jede Katze ist anders. Welcher Typ passt zu deiner?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.slug}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] group block"
                aria-label={cat.name}
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} für Katzen`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif" }}>{cat.name}</h3>
                  <p className="text-sm text-white/75">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM-SOLUTION */}
      <section className="py-20 bg-background" aria-labelledby="problem-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="problem-heading" className="text-heading-2 text-foreground">
              Deine Katze verdient den besten Schlafplatz
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Problem */}
            <div className="bg-muted/40 rounded-3xl p-8">
              <h3 className="text-heading-3 text-foreground mb-5">Kennst du das?</h3>
              <ul className="space-y-4">
                {problems.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">😿</span>
                    <p className="text-muted-foreground">{p}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="rounded-3xl p-8 border-2 border-primary/20" style={{ background: "linear-gradient(135deg, hsl(42 100% 99%) 0%, hsl(28 76% 92%) 100%)" }}>
              <h3 className="text-heading-3 text-foreground mb-5">Dafür gibt es katzenbett.de</h3>
              <ul className="space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary mt-0.5 shrink-0" />
                    <p className="text-foreground">{s}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/katzenbetten"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
                style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-cta)" }}
              >
                Jetzt stöbern
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SIZE GUIDE TEASER */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="rounded-3xl p-10 md:p-14 text-center max-w-4xl mx-auto"
            style={{ background: "hsl(var(--accent))" }}
          >
            <h2 className="text-heading-2 text-foreground mb-2">
              Welches Katzenbett passt zu deiner Katze?
            </h2>
            <p className="font-caveat text-2xl text-primary mt-1 mb-8">In nur 3 Fragen zum perfekten Bett ✨</p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {[
                { icon: "🐱", label: "Wie groß ist deine Katze?" },
                { icon: "💤", label: "Wie schläft sie am liebsten?" },
                { icon: "✨", label: "Was ist dir wichtig?" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-white shadow-card flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">{step.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/katzenbetten"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
              style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-cta)" }}
            >
              Größenberater starten
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* BUYING GUIDE */}
      <section className="py-20 bg-muted/20" aria-labelledby="guide-heading">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Kaufberatung</p>
            <h2 id="guide-heading" className="text-heading-2 text-foreground mb-4">
              Katzenbett kaufen – worauf wirklich ankommt
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unsere Redaktion hat über 500 Katzenbetten analysiert. Hier sind die wichtigsten Entscheidungskriterien.
            </p>
          </div>

          {/* Step-by-step guide */}
          <div className="space-y-8 mb-14">
            {[
              {
                step: "01",
                title: "Den richtigen Typ finden",
                icon: "🐾",
                content: "Der wichtigste Schritt: Welcher Schlafstil hat deine Katze? Kugelschläfer lieben Donut-Betten mit erhöhtem Rand. Ängstliche oder scheue Katzen brauchen eine Katzenhöhle mit rundum Schutz. Neugierige Sonnenanbeter freuen sich über eine Fensterliege. Ältere Katzen mit Gelenkproblemen brauchen orthopädischen Memory Foam.",
                links: [
                  { label: "Katzenhöhlen", to: "/katzenhoehlen" },
                  { label: "Donut-Betten", to: "/donut-katzenbetten" },
                  { label: "Orthopädisch", to: "/orthopaedische-katzenbetten" },
                ],
              },
              {
                step: "02",
                title: "Die richtige Größe wählen",
                icon: "📐",
                content: "Deine Katze sollte sich bequem einrollen und ausstrecken können. Faustregel: Das Bett sollte mindestens 1,5× so groß sein wie die eingerollte Katze. Für Hauskatzen (3–5 kg) empfehlen wir 50 cm Durchmesser. Für große Rassen wie Maine Coon oder Norwegische Waldkatze mindestens 60–70 cm. Im Zweifelsfall lieber eine Nummer größer.",
                links: [
                  { label: "📏 Größenberater starten", to: "/groessenberater" },
                ],
              },
              {
                step: "03",
                title: "Das passende Material",
                icon: "🧶",
                content: "Plüsch & Kunstfell: weich, günstig, maschinenwaschbar – der Klassiker. Filz (Merinowolle): naturbelassen, atmungsaktiv, temperaturregulierend – ideal für Höhlen. Memory Foam: druckentlastend, für ältere und kranke Katzen. Cord & Canvas: modisch, robust, pflegeleicht. Holz/Birke: langlebig, hygienisch, fürs Design-Bewusste.",
                links: [],
              },
              {
                step: "04",
                title: "Waschbarkeit & Hygiene",
                icon: "🧺",
                content: "Ein waschbares Katzenbett ist kein Luxus, sondern Pflicht. Katzen verlieren täglich Haare und hinterlassen Hautschuppen – ein regelmäßiges Waschen bei 30–40 Grad reduziert Bakterien und Gerüche. Achte auf Modelle mit abnehmbarem Bezug: So muss nicht das komplette Bett in die Maschine. Filzhöhlen nur per Handwäsche.",
                links: [],
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors">
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary/20 border-2 border-primary/20 font-mono">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.content}</p>
                  {item.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.links.map((l) => (
                        <Link key={l.to} to={l.to} className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Material comparison table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-border bg-muted/40">
              <h3 className="font-bold text-foreground">Materialvergleich auf einen Blick</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Material</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Vorteile</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Nachteile</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Am besten für</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { mat: "Plüsch / Kunstfell", pros: "Weich, günstig, waschbar", cons: "Verschleißt schneller", best: "Junge Katzen, Budget-Käufer" },
                    { mat: "Filz (Merinowolle)", pros: "Natürlich, atmungsaktiv", cons: "Nur Handwäsche", best: "Höhlen, Naturliebhaber" },
                    { mat: "Memory Foam", pros: "Gelenkentlastend, passt sich an", cons: "Teurer, schwerer", best: "Senioren, kranke Katzen" },
                    { mat: "Cord / Canvas", pros: "Modisch, robust, pflegeleicht", cons: "Weniger weich", best: "Design-Haushalte" },
                    { mat: "Holz / Birkenholz", pros: "Langlebig, hygienisch, stylisch", cons: "Kein Kuschelfaktor allein", best: "Design-Betten mit Kissen" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.mat}</td>
                      <td className="px-4 py-3 text-muted-foreground">✅ {row.pros}</td>
                      <td className="px-4 py-3 text-muted-foreground">⚠️ {row.cons}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Editor tip */}
          <div className="rounded-2xl p-6 flex gap-4 items-start border border-primary/20" style={{ background: "hsl(var(--accent))" }}>
            <div className="text-3xl shrink-0">💡</div>
            <div>
              <p className="font-semibold text-foreground mb-1">Redaktionstipp: So gewöhnt deine Katze sich schneller an das neue Bett</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stelle das neue Bett an einem ruhigen, erhöhten Ort auf – Katzen mögen den Überblick. Lege ein getragenes T-Shirt hinein, damit das Bett nach dir riecht. Katzenminze am Eingang oder auf dem Kissen kann die Neugier wecken. Gib deiner Katze 2–3 Wochen Zeit. Manche Katzen brauchen länger – sei geduldig und locke sie nie mit Gewalt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BETTEN NACH KATZENPERSÖNLICHKEIT */}
      <section className="py-20 bg-background" aria-labelledby="personality-heading">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Entscheidungshilfe</p>
            <h2 id="personality-heading" className="text-heading-2 text-foreground mb-4">
              Welches Katzenbett passt zu welcher Katze?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Jede Katze ist anders. Diese Übersicht hilft dir, den richtigen Typ zu finden.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "😰", title: "Die ängstliche Katze", desc: "Neue Katze, Freigänger, scheues Tier – braucht Geborgenheit.", rec: "Katzenhöhle oder tiefer Donut-Rand", link: "/katzenhoehlen", badge: "Empfehlung" },
              { emoji: "🌞", title: "Der Sonnenanbeter", desc: "Liegt immer am Fenster, beobachtet alles, liebt Wärme.", rec: "Fensterliege oder beheiztes Bett", link: "/fensterliegen-katzen", badge: "Tipp" },
              { emoji: "👑", title: "Die Diva", desc: "Hält dein Sofa für ihr Eigentum und lässt das alle wissen.", rec: "Katzensofa direkt daneben", link: "/katzensofas", badge: "Tipp" },
              { emoji: "🦁", title: "Die große Rasse", desc: "Maine Coon, Ragdoll, Norwegische Waldkatze – braucht Platz.", rec: "XL-Donut (60–70 cm) oder XXL-Sofa", link: "/donut-katzenbetten", badge: "Wichtig" },
              { emoji: "🧓", title: "Die Senioren-Katze", desc: "Ab 10 Jahren: Gelenke, Arthritis, schlechte Durchblutung.", rec: "Orthopädischer Memory Foam + beheizt", link: "/orthopaedische-katzenbetten", badge: "Medizinisch" },
              { emoji: "✨", title: "Der Design-Fan", desc: "Du liebst schönes Wohnen und willst kein hässliches Bett.", rec: "Premium-Holzbett oder Cord-Sofa", link: "/design-katzenbetten", badge: "Stil" },
            ].map((item) => (
              <Link key={item.link} to={item.link} className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">{item.badge}</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-primary">→ {item.rec}</p>
                  <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {(() => {
        const latestGuides = [...guides]
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, 3);
        return (
          <section className="py-20 bg-muted/30" aria-labelledby="blog-heading">
            <div className="container mx-auto px-4">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Ratgeber & Tipps</p>
                  <h2 id="blog-heading" className="text-heading-2 text-foreground">Aktuelle Artikel</h2>
                </div>
                <Link
                  to="/ratgeber"
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Alle Ratgeber <ArrowRight size={15} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/ratgeber/${guide.slug}`}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-[16/9] bg-accent/40 flex items-center justify-center overflow-hidden">
                      {guide.heroImage && guide.heroImage !== "/placeholder.svg" ? (
                        <img src={guide.heroImage} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <span className="text-5xl">📖</span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{guide.category}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} /> {guide.readingTime} Min.
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{guide.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                        <BookOpen size={13} /> Artikel lesen
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center sm:hidden">
                <Link to="/ratgeber" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  Alle Ratgeber ansehen <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* FAQ */}
      <section className="py-20 bg-background" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="faq-heading" className="text-heading-2 text-foreground mb-10 text-center">
            Häufige Fragen rund ums Katzenbett
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/30 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                  <span
                    className="text-primary shrink-0 transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "none" }}
                  >
                    ▾
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
