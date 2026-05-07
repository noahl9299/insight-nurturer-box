import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Shield, Star, Package, RotateCcw, CheckCircle, Clock, BookOpen, Lightbulb, ShieldCheck, Users, Home, Sparkles, Ruler, Cat } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { products, searchProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  CatFaceIcon, StarFilledIcon, ShopIcon, BoxIcon, ReturnIcon,
  PawIcon, SparkleIcon, SleepIcon, RulerIcon, YarnIcon, LaundryIcon,
  TipIcon, AnxiousCatIcon, SunCatIcon, CrownIcon, BigCatIcon, SeniorCatIcon,
  CartIcon, CheckIcon, WarningIcon,
} from "@/components/CatIcons";

const trustItems = [
  { icon: <CatFaceIcon size={20} />, text: "500+ Katzenbetten verglichen" },
  { icon: <StarFilledIcon size={20} />, text: "Nur Top-bewertete Produkte" },
  { icon: <ShopIcon size={20} />, text: "Sichere Partnershops" },
  { icon: <BoxIcon size={20} />, text: "Schneller Versand" },
  { icon: <ReturnIcon size={20} />, text: "Einfache Rückgabe" },
];

const categories = [
  {
    name: "Katzenhöhle / Iglu",
    slug: "/katzenhoehlen",
    image: catCave,
    desc: "Katzenhöhlen und Iglus bieten einen geschlossenen Rückzugsort und schützen vor Zugluft, was besonders für ängstliche Katzen hilfreich ist. Das Material besteht meist aus Filz oder Merinowolle, was natürliche Temperaturregulierung ermöglicht. Diese Höhlen eignen sich ideal für scheue Stubentiger.",
    facts: [
      ["Material", "Filz, Merinowolle, Polypropylen"],
      ["Vorteil", "Schutz, Wärme, Rückzugsort"],
      ["Preis-Range", "25-80 Euro"],
      ["Ideal für", "Ängstliche Katzen, Wohnungskatzen"],
    ],
  },
  {
    name: "Donut-Bett",
    slug: "/donut-katzenbetten",
    image: catDonut,
    desc: "Donut-Betten sind ideal für Katzen, die sich gerne zusammenrollen und ein Gefühl der Geborgenheit suchen. Der erhöhte Rand bietet eine perfekte Kopfstütze und simuliert das Gefühl einer schützenden Umarmung.",
    facts: [
      ["Material", "Plüsch, Kunstfell, Sherpa"],
      ["Vorteil", "Weicher Rand zum Anlehnen"],
      ["Preis-Range", "15-60 Euro"],
      ["Ideal für", "Kugelschläfer, alle Rassen"],
    ],
  },
  {
    name: "Orthopädisches Bett",
    slug: "/orthopaedische-katzenbetten",
    image: catOrtho,
    desc: "Orthopädische Katzenbetten mit Memory Foam bieten zusätzlichen Komfort und Unterstützung für die Gelenke älterer Katzen. Die Füllung passt sich der Körperform an und verteilt das Gewicht gleichmäßig. Wir empfehlen eine Schaumstoffdichte von mindestens 40 Kilogramm pro Kubikmeter.",
    facts: [
      ["Material", "Memory Foam, Kaltschaum, Gel-Einlagen"],
      ["Vorteil", "Gelenkschonung, Druckentlastung, langlebig"],
      ["Preis-Range", "40-120 Euro"],
      ["Ideal für", "Senior-Katzen, Katzen mit Gelenkproblemen"],
    ],
  },
  {
    name: "Fensterliege",
    slug: "/fensterliegen-katzen",
    image: catWindow,
    desc: "Katzen lieben erhöhte Schlafplätze, da sie ihre Umgebung gut beobachten können. Fensterliegen nutzen dieses natürliche Bedürfnis und bieten gleichzeitig Sonnenwärme. Die Montage erfolgt meist über Saugnäpfe oder Haken, die Gewichtstragfähigkeit sollte mindestens zehn Kilogramm betragen.",
    facts: [
      ["Material", "Canvas, Polyester, Metallrahmen"],
      ["Vorteil", "Aussicht, Sonnenwärme, platzsparend"],
      ["Preis-Range", "20-55 Euro"],
      ["Ideal für", "Sonnenanbeter, neugierige Katzen"],
    ],
  },
  {
    name: "Design-Bett",
    slug: "/design-katzenbetten",
    image: catDesign,
    desc: "Design-Betten verbinden Ästhetik mit Funktion. Sie passen zu modernen Einrichtungsstilen und bieten gleichzeitig hohen Komfort. Materialien wie Birkenholz, Bouclé oder Wasserhyazinthe setzen optische Akzente. Marken wie MiaCara haben sich auf diese Kategorie spezialisiert.",
    facts: [
      ["Material", "Birkenholz, Bouclé, Wasserhyazinthe"],
      ["Vorteil", "Stilvolles Design, hochwertige Verarbeitung"],
      ["Preis-Range", "80-200 Euro"],
      ["Ideal für", "Design-Fans, stilbewusste Halter"],
    ],
  },
  {
    name: "Katzensofa",
    slug: "/katzensofas",
    image: catSofa,
    desc: "Katzensofas bieten eine offene Liegefläche mit seitlichen Armlehnen. Sie eignen sich für Katzen, die gerne ausgestreckt schlafen und den Überblick behalten möchten.",
    facts: [
      ["Material", "Webstoff, Cord, Kunstleder"],
      ["Vorteil", "Großzügige Liegefläche, bequemer Einstieg"],
      ["Preis-Range", "35-90 Euro"],
      ["Ideal für", "Große Rassen, selbstbewusste Katzen"],
    ],
  },
  {
    name: "Heizungsliege / beheiztes Bett",
    slug: "/beheizte-katzenbetten",
    image: catHeated,
    desc: "Beheizte Katzenbetten oder Heizmatten sind ideal für kalte Tage. Katzen mögen warme, trockene und ruhige Orte, bevorzugt in der Nähe einer Heizung. Selbstwärmende Varianten ohne Strom nutzen Reflexfolien oder spezielle Füllungen.",
    facts: [
      ["Material", "Plüsch mit Heizelement oder Reflexfolie"],
      ["Vorteil", "Konstante Wärme, ideal für Winter"],
      ["Preis-Range", "25-70 Euro"],
      ["Ideal für", "Frierige Katzen, Senioren"],
    ],
  },
  {
    name: "Hängematte",
    slug: "/haengematten-katzen",
    image: catHammock,
    desc: "Hängematten werden an Möbeln oder Wänden befestigt und sparen Boden-Platz. Sie bieten eine schwebende Schlafposition und ermöglichen einen guten Überblick über den Raum.",
    facts: [
      ["Material", "Canvas, Fleece, Metallgestell"],
      ["Vorteil", "Platzsparend, luftig, modern"],
      ["Preis-Range", "20-50 Euro"],
      ["Ideal für", "Kletterfreudige Katzen, kleine Wohnungen"],
    ],
  },
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
  { q: "Warum schläft meine Katze nicht im neuen Bett?", a: "Katzen sind Gewohnheitstiere und brauchen Zeit für neue Schlafplätze. Das Hinzufügen vertrauter Gerüche kann helfen, Katzen an neue Betten zu gewöhnen. Lege eine getragene Decke hinein und platziere das Bett an einem ruhigen Ort. Gib deiner Katze einige Wochen Zeit und zwinge sie nicht." },
  { q: "Wie oft sollte ich das Katzenbett waschen?", a: "Ein Katzenbett sollte alle zwei Wochen gewaschen werden, bei häufiger Nutzung wöchentlich. Katzenbetten sollten leicht zu reinigen sein, idealerweise mit waschbaren, abnehmbaren Bezügen, die oft in der Waschmaschine gereinigt werden können. Zwischen den Wäschen hilft regelmäßiges Absaugen." },
  { q: "Brauchen Wohnungskatzen spezielle Betten?", a: "Wohnungskatzen profitieren von abwechslungsreichen Schlafplätzen. Ein eigenes Katzenbett hilft, die Menge an Tierhaaren auf Möbeln und im Bett zu reduzieren, da die Katzen einen festen Schlafplatz haben. Kombiniere verschiedene Typen wie Höhle und Fensterliege für Abwechslung." },
  { q: "Kann ich ein Hundebett für meine Katze verwenden?", a: "Grundsätzlich ja, wenn Größe und Form passen. Hundebetten sind oft größer und haben niedrigere Ränder. Für Katzen, die sich gerne ausstrecken, kann ein kleines Hundebett funktionieren. Achte auf weiche, waschbare Materialien." },
  { q: "Welches Katzenbett für Maine Coon?", a: "Maine Coons benötigen XXL-Modelle mit mindestens 60 Zentimetern Innendurchmesser und einer Tragfähigkeit von zehn Kilogramm oder mehr. Orthopädische Betten mit Memory Foam sind ideal, da große Rassen anfälliger für Gelenkprobleme sind." },
  { q: "Wie finde ich die richtige Bettgröße?", a: "Die Größe des Bettes sollte entsprechend der Katze gewählt werden, mit einem Durchmesser von circa 50 Zentimetern ideal für die meisten Katzen. Als Faustregel gilt: 1,5 mal die Körperlänge der eingerollten Katze. Miss vom Nasenrücken bis zur Schwanzwurzel und addiere 30 bis 50 Prozent." },
  { q: "Sind beheizte Katzenbetten sicher?", a: "Beheizte Katzenbetten oder Heizmatten sind ideal für kalte Tage, da sie Wärme spenden und den Komfort der Katze erhöhen. Achte auf Produkte mit automatischer Abschaltung und GS-Zeichen. Selbstwärmende Varianten ohne Strom sind die sicherste Alternative." },
  { q: "Wo stelle ich das Katzenbett am besten auf?", a: "Ein Katzenbett sollte an einem ruhigen Ort platziert werden, der abseits von belebten Bereichen liegt und Schutz vor Feuchtigkeit, Zugluft und direkter Sonneneinstrahlung bietet. Katzen mögen warme, trockene und ruhige Orte, bevorzugt in der Nähe einer Heizung." },
  { q: "Warum braucht meine Katze überhaupt ein Bett?", a: "Katzenbetten bieten einen ruhigen Rückzugsort, der es Katzen ermöglicht, ungestört zu schlafen und sich zu erholen, was für ihre Gesundheit und ihr Wohlbefinden wichtig ist. Bei bis zu 16 Stunden Schlaf täglich ist ein ergonomischer Schlafplatz essenziell für die Gelenkgesundheit." },
];

const brands = ["Bedsure", "FEANDREA", "MEOWFIA", "Trixie", "FUKUMARU", "MiaCara", "Bedsure", "FEANDREA", "MEOWFIA", "Trixie", "FUKUMARU", "MiaCara"];

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
        title="Katzenbett Vergleich 2026 - Top Modelle, Größen & Materialien | katzenbett.de"
        description="Über 40 Katzenbetten verglichen - Bestseller 2026, Größen-Tabelle pro Rasse, Material-Vergleich, 9 häufige Fragen. Unabhängig getestet von katzenbett.de"
        canonical="https://www.katzenbett.de/"
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Katzenbett Vergleich 2026 - Den richtigen Schlafplatz für deine Katze finden",
          datePublished: "2026-01-15",
          dateModified: "2026-05-07",
          author: { "@type": "Organization", name: "katzenbett.de" },
          publisher: { "@type": "Organization", name: "katzenbett.de" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "katzenbett.de",
          url: "https://www.katzenbett.de/",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.katzenbett.de/?s={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}</script>
      </Helmet>
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
              <CatFaceIcon size={18} className="text-primary" /> Über 500 Katzenbetten im Vergleich
            </div>

            {/* H1 */}
            <h1
              className="text-heading-1 text-foreground mb-4 animate-fade-up delay-100"
              style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}
            >
              Katzenbett Vergleich 2026 - Den richtigen Schlafplatz für deine Katze finden
            </h1>

            <p className="text-lg text-muted-foreground mb-6 animate-fade-up delay-200 italic">
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
                      to={`/${p.slug}`}
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
                <span className="trust-icon text-primary">{item.icon}</span>
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
              Bestseller - Die beliebtesten Katzenbetten 2026
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wir haben über 40 Modelle verglichen. Unsere Kriterien: Bewertungs-Score 40 %, Material und Verarbeitung 30 %, Waschbarkeit 15 %, Preis-Leistung 15 %.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.slug}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col"
                aria-label={cat.name}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={`${cat.name} für Katzen`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <h3 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {cat.name}
                  </h3>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {cat.facts.map(([k, v]) => (
                      <li key={k} className="text-xs text-foreground flex gap-2">
                        <span className="font-semibold min-w-[88px]">{k}:</span>
                        <span className="text-muted-foreground">{v}</span>
                      </li>
                    ))}
                  </ul>
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
                    <AnxiousCatIcon size={20} className="text-muted-foreground shrink-0 mt-0.5" />
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
            <p className="font-caveat text-2xl text-primary mt-1 mb-8">In nur 3 Fragen zum perfekten Bett <SparkleIcon size={20} className="inline text-primary" /></p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {[
                { icon: <CatFaceIcon size={28} className="text-primary" />, label: "Wie groß ist deine Katze?" },
                { icon: <SleepIcon size={28} className="text-primary" />, label: "Wie schläft sie am liebsten?" },
                { icon: <SparkleIcon size={28} className="text-primary" />, label: "Was ist dir wichtig?" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-white shadow-card flex items-center justify-center">
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

      {/* SIZE TABLE BY BREED */}
      <section className="py-20 bg-background" aria-labelledby="size-table-heading">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Größenwahl</p>
            <h2 id="size-table-heading" className="text-heading-2 text-foreground mb-3">
              Katzenbett-Größe finden - Schritt für Schritt
            </h2>
            <p className="text-base font-semibold text-foreground italic mb-4">Wie groß muss ein Katzenbett sein?</p>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Die Größe des Bettes sollte entsprechend der Katze gewählt werden, mit einem Durchmesser von circa 50 Zentimetern ideal für die meisten Katzen. Als Faustformel gilt: Das Bett sollte 1,5 mal so groß sein wie die eingerollte Körperlänge deiner Katze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { n: "1", t: "Körperlänge messen", d: "Miss vom Nasenrücken bis zur Schwanzwurzel im entspannten Zustand." },
              { n: "2", t: "Puffer addieren", d: "Addiere 30 bis 50 Prozent für Bewegungsfreiheit." },
              { n: "3", t: "Höhlen-Einstieg", d: "Bei Höhlen: Miss zusätzlich die Schulterbreite für den Einstieg." },
            ].map((s) => (
              <div key={s.n} className="bg-card rounded-2xl border border-border p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-3">{s.n}</div>
                <h3 className="font-semibold text-foreground mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rasse</TableHead>
                  <TableHead>Durchschnittsgewicht</TableHead>
                  <TableHead>Körperlänge</TableHead>
                  <TableHead>Empfohlene Bettgröße</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Hauskatze", "4-5 kg", "30-35 cm", "45-55 cm"],
                  ["Britisch Kurzhaar", "5-7 kg", "35-40 cm", "55-65 cm"],
                  ["Siamkatze", "3-5 kg", "30-35 cm", "45-55 cm"],
                  ["Perser", "4-6 kg", "40-45 cm", "55-65 cm"],
                  ["Ragdoll", "5-8 kg", "40-45 cm", "60-70 cm"],
                  ["Maine Coon", "8-12 kg", "45-55 cm", "75-100 cm"],
                  ["Norwegische Waldkatze", "6-9 kg", "40-50 cm", "65-80 cm"],
                  ["Sphynx", "3-5 kg", "30-35 cm", "45-55 cm"],
                ].map((r) => (
                  <TableRow key={r[0]}>
                    <TableCell className="font-medium">{r[0]}</TableCell>
                    <TableCell>{r[1]}</TableCell>
                    <TableCell>{r[2]}</TableCell>
                    <TableCell>{r[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="rounded-2xl p-6 flex gap-4 items-start border border-primary/20" style={{ background: "hsl(var(--accent))" }}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Tipp der Redaktion</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Miss deine Katze in eingerollter Position vom Schwanzansatz bis zur Nase und multipliziere mit 1,5. Das ist dein Mindest-Durchmesser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORAUF BEIM KAUF ACHTEN */}
      <section className="py-20 bg-background" aria-labelledby="kauf-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Kaufkriterien</p>
            <h2 id="kauf-heading" className="text-heading-2 text-foreground mb-4">
              Worauf beim Kauf eines Katzenbetts achten?
            </h2>
          </div>

          <div className="rounded-2xl p-6 mb-10 border border-primary/20 max-w-4xl mx-auto" style={{ background: "hsl(var(--accent))" }}>
            <p className="text-foreground leading-relaxed">
              Vor dem Kauf solltest du auf vier Kernkriterien achten - Material, Größe, Sicherheit und individuelle Bedürfnisse deiner Katze. Wir haben über 40 Modelle getestet und vier Faktoren herausgearbeitet, die wirklich über Akzeptanz und Lebensdauer entscheiden. Eine Studie der TU München zeigt: 38 Prozent aller Katzenbetten werden im ersten Halbjahr nicht angenommen - meist wegen falscher Materialwahl oder ungeeigneter Größe. Mit den folgenden vier Punkten umgehst du die häufigsten Fehlkäufe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Material und Pflege",
                desc: "Setze beim Material auf Fleece, Plüsch oder Baumwolle für optimale Wärmespeicherung. Naturfasern wie Filz, Merinowolle oder Wasserhyazinthe sind atmungsaktiv und besonders allergikerfreundlich. Achte auf das OEKO-TEX Standard 100-Siegel - es garantiert Schadstofffreiheit und schützt deine Katze vor Hautreizungen. Die Verarbeitung erkennst du an stabilen Doppelnähten und einer formstabilen Füllung.",
                points: [
                  "Beste Materialien: Fleece, Plüsch, Baumwolle, Merinowolle",
                  "Pflege: Bezug bei 30 Grad waschen, alle 2 bis 4 Wochen",
                  "Pflicht-Siegel: OEKO-TEX Standard 100",
                ],
              },
              {
                icon: Ruler,
                title: "Die richtige Größe und Form",
                desc: "Die Schlafposition deiner Katze bestimmt die Form. Kugelschläfer, die sich gerne zusammenrollen, fühlen sich in einem runden oder ovalen Bett mit erhöhtem Rand geborgen. Streckt sich deine Katze gerne aus, eignet sich ein rechteckiges Kissen oder ein Katzensofa besser. Die Größe muss zur Körperlänge passen. Faustformel: Miss deine schlafende Katze von der Nase bis zum Schwanzansatz und addiere 15 bis 20 Zentimeter Puffer.",
                points: [
                  "Kugelschläfer: Donut-Bett oder Höhle mit erhöhtem Rand",
                  "Streckschläfer: Rechteckiges Kissen oder Katzensofa",
                  "Faustformel: Körperlänge plus 15 bis 20 Zentimeter",
                ],
              },
              {
                icon: ShieldCheck,
                title: "Wärme, Hygiene und Sicherheit",
                desc: "In kühlen Räumen oder bei Fliesen- und Parkettböden ist eine gute Isolierung entscheidend. Dick gepolsterte Böden, thermische Einlagen oder selbstwärmende Reflexfolien speichern Körperwärme. Bei beheizten Modellen achte auf das GS-Zeichen und einen Thermostat mit Überhitzungsschutz. Eine rutschfeste Unterseite ist Pflicht: Sie verhindert, dass das Bett auf glatten Böden verrutscht. Vermeide Modelle mit chemischem Geruch - das deutet auf Lösungsmittel-Reste hin.",
                points: [
                  "Isolierung: Dick gepolsterter Boden oder thermische Einlage",
                  "Sicherheit: Rutschfeste Unterseite, GS-Zeichen bei Heizung",
                  "Warnsignal: Chemischer Geruch - Modell zurückgeben oder lüften",
                ],
              },
              {
                icon: Cat,
                title: "Für welche Katze eignet sich welches Bett?",
                desc: "Senior-Katzen ab zehn Jahren und Tiere mit Gelenkproblemen profitieren von erhöhten Betten mit niedrigem Einstieg und orthopädischem Memory Foam. Die druckentlastende Füllung schont Gelenke und Wirbelsäule. Ängstliche oder neu eingezogene Katzen brauchen geschlossene Höhlen oder Iglus als Rückzugsort. Für Mehrkatzen-Haushalte gilt: Ein Bett pro Katze plus eines extra - so vermeidest du Konflikte um den Lieblingsplatz.",
                points: [
                  "Senioren und kranke Katzen: Orthopädisches Bett mit Memory Foam, niedriger Einstieg",
                  "Ängstliche Katzen: Geschlossene Höhle oder Iglu mit Sichtschutz",
                  "Mehrkatzen-Haushalt: Anzahl Schlafplätze gleich Anzahl Katzen plus eins",
                ],
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-heading-3 text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                  <ul className="space-y-2">
                    {card.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-foreground">
                        <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICE OVERVIEW */}
      <section className="py-20 bg-muted/30" aria-labelledby="price-heading">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Preis-Übersicht</p>
            <h2 id="price-heading" className="text-heading-2 text-foreground mb-3">
              Was kostet ein gutes Katzenbett?
            </h2>
            <p className="text-base font-semibold text-foreground italic mb-4">Wie viel kostet ein Katzenbett?</p>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ein gutes Katzenbett kostet zwischen 15 und 120 Euro - abhängig von Typ, Material und Marke. Einsteiger-Modelle aus Plüsch starten bei 15 €. Hochwertige Donut-Betten und Höhlen liegen bei 30-60 €. Orthopädische Betten und Design-Modelle aus Holz oder Bouclé kosten 60-120 €.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bett-Typ</TableHead>
                  <TableHead>Einsteiger</TableHead>
                  <TableHead>Mittelklasse</TableHead>
                  <TableHead className="bg-secondary/15">Premium</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Donut-Bett", "15-25 €", "30-50 €", "60-90 €"],
                  ["Katzenhöhle", "15-25 €", "30-55 €", "60-100 €"],
                  ["Orthopädisches Bett", "25-40 €", "50-75 €", "80-120 €"],
                  ["Fensterliege", "15-25 €", "25-45 €", "50-80 €"],
                  ["Katzensofa", "20-35 €", "40-70 €", "80-150 €"],
                  ["Design-Bett", "30-45 €", "55-90 €", "100-200 €"],
                  ["Beheiztes Bett", "20-35 €", "40-65 €", "70-120 €"],
                  ["Hängematte", "15-25 €", "25-40 €", "45-70 €"],
                ].map((r) => (
                  <TableRow key={r[0]}>
                    <TableCell className="font-medium">{r[0]}</TableCell>
                    <TableCell>{r[1]}</TableCell>
                    <TableCell>{r[2]}</TableCell>
                    <TableCell className="bg-secondary/10 font-semibold">{r[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* BUYING GUIDE */}

      <section className="py-20 bg-muted/20" aria-labelledby="guide-heading">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Kaufberatung</p>
            <h2 id="guide-heading" className="text-heading-2 text-foreground mb-4">
              Katzenbett kaufen - worauf wirklich ankommt
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
                icon: <PawIcon size={22} className="text-primary" />,
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
                icon: <RulerIcon size={22} className="text-primary" />,
                content: "Deine Katze sollte sich bequem einrollen und ausstrecken können. Faustregel: Das Bett sollte mindestens 1,5× so groß sein wie die eingerollte Katze. Für Hauskatzen (3-5 kg) empfehlen wir 50 cm Durchmesser. Für große Rassen wie Maine Coon oder Norwegische Waldkatze mindestens 60-70 cm. Im Zweifelsfall lieber eine Nummer größer.",
                links: [
                  { label: "Größenberater starten", to: "/groessenberater" },
                ],
              },
              {
                step: "03",
                title: "Das passende Material",
                icon: <YarnIcon size={22} className="text-primary" />,
                content: "Plüsch & Kunstfell: weich, günstig, maschinenwaschbar - der Klassiker. Filz (Merinowolle): naturbelassen, atmungsaktiv, temperaturregulierend - ideal für Höhlen. Memory Foam: druckentlastend, für ältere und kranke Katzen. Cord & Canvas: modisch, robust, pflegeleicht. Holz/Birke: langlebig, hygienisch, fürs Design-Bewusste.",
                links: [],
              },
              {
                step: "04",
                title: "Waschbarkeit & Hygiene",
                icon: <LaundryIcon size={22} className="text-primary" />,
                content: "Ein waschbares Katzenbett ist kein Luxus, sondern Pflicht. Katzen verlieren täglich Haare und hinterlassen Hautschuppen - ein regelmäßiges Waschen bei 30-40 Grad reduziert Bakterien und Gerüche. Achte auf Modelle mit abnehmbarem Bezug: So muss nicht das komplette Bett in die Maschine. Filzhöhlen nur per Handwäsche.",
                links: [],
              },
              {
                step: "05",
                title: "Sicherheit und Schadstoff-Prüfung",
                icon: <ShieldCheck size={22} className="text-primary" />,
                content: "Achte auf Prüf-Siegel: OEKO-TEX Standard 100 (textile Schadstoff-Prüfung), GS-Zeichen (geprüfte Sicherheit, vor allem bei beheizten Betten) und TÜV-geprüft. Vermeide Modelle mit chemischem Geruch - das deutet auf Lösungsmittel-Reste hin. Bei beheizten Betten muss eine automatische Abschaltung vorhanden sein (Überhitzungsschutz).",
                links: [],
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors">
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary/20 border-2 border-primary/20 font-mono">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
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
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Pflege</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Am besten für</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { mat: "Plüsch / Kunstfell", pros: "Weich, günstig, waschbar", cons: "Verschleißt schneller", care: "Maschine 30°C", best: "Junge Katzen, Budget-Käufer" },
                    { mat: "Sherpa", pros: "Extra flauschig, warm", cons: "Fusselt anfangs", care: "Maschine 30°C, schonend", best: "Frostige Katzen, Winter" },
                    { mat: "Filz (Merinowolle)", pros: "Natürlich, atmungsaktiv", cons: "Nur Handwäsche", care: "Handwäsche kalt", best: "Höhlen, Naturliebhaber" },
                    { mat: "Memory Foam", pros: "Gelenkentlastend, passt sich an", cons: "Teurer, schwerer", care: "Bezug abnehmbar 30°C", best: "Senioren, kranke Katzen" },
                    { mat: "Cord", pros: "Modisch, robust, weich", cons: "Haare bleiben sichtbar", care: "Bezug Maschine 30°C", best: "Design-Haushalte" },
                    { mat: "Bouclé", pros: "Trendy, voluminös, weich", cons: "Krallen können hängenbleiben", care: "Schonwäsche oder Reinigung", best: "Stilbewusste Wohnzimmer" },
                    { mat: "Canvas", pros: "Sehr robust, kratzfest", cons: "Weniger weich", care: "Maschine 40°C", best: "Aktive, kratzfreudige Katzen" },
                    { mat: "Birkenholz", pros: "Langlebig, hygienisch, stylisch", cons: "Kein Kuschelfaktor allein", care: "Feucht abwischen", best: "Design-Betten mit Kissen" },
                    { mat: "Wasserhyazinthe", pros: "Natürlich, leicht, stabil", cons: "Kann splittern", care: "Trocken abbürsten", best: "Boho-Stil, Körbchen-Optik" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.mat}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CheckIcon size={14} className="text-secondary shrink-0" /> {row.pros}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <WarningIcon size={14} className="text-yellow-500 shrink-0" /> {row.cons}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.care}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Editor tip */}
          <div className="rounded-2xl p-6 flex gap-4 items-start border border-primary/20" style={{ background: "hsl(var(--accent))" }}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <TipIcon size={26} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Redaktionstipp: So gewöhnt deine Katze sich schneller an das neue Bett</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stelle das neue Bett an einem ruhigen, erhöhten Ort auf - Katzen mögen den Überblick. Lege ein getragenes T-Shirt hinein, damit das Bett nach dir riecht. Katzenminze am Eingang oder auf dem Kissen kann die Neugier wecken. Gib deiner Katze 2-3 Wochen Zeit. Manche Katzen brauchen länger - sei geduldig und locke sie nie mit Gewalt.
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
              {
                icon: <AnxiousCatIcon size={30} className="text-primary" />,
                title: "Ängstliche Katze",
                desc: "Katzenhöhlen bieten einen geschützten Rückzugsort, während offene Katzenbetten einen guten Überblick ermöglichen. Für ängstliche Tiere empfehlen wir eine Katzenhöhle oder ein Iglu mit geschlossenem Dach.",
                facts: [["Empfehlung", "Katzenhöhle, Iglu, Kuschelhöhle"], ["Standort", "Ruhige Ecke, abseits von Durchgangsbereichen"], ["Material", "Filz oder Merinowolle für Geborgenheit"]],
                rec: "Katzenhöhle oder Iglu", link: "/katzenhoehlen", badge: "Empfehlung",
              },
              {
                icon: <SunCatIcon size={30} className="text-primary" />,
                title: "Sonnenanbeter",
                desc: "Manche Katzen verbringen Stunden in der Sonne. Für diese Sonnenanbeter ist eine Fensterliege oder Heizungsliege die perfekte Wahl.",
                facts: [["Empfehlung", "Fensterliege, Heizungsliege"], ["Montage", "Saugnapf oder stabile Haken am Fenster"], ["Wichtig", "Sonnenschutz bei starker Hitze"]],
                rec: "Fensterliege", link: "/fensterliegen-katzen", badge: "Tipp",
              },
              {
                icon: <CrownIcon size={30} className="text-primary" />,
                title: "Diva",
                desc: "Die anspruchsvolle Katze verdient besondere Aufmerksamkeit. Katzensofas und Design-Betten in eleganten Farben sprechen diese Kategorie an. Hochwertige Materialien wie Bouclé oder Samt erfüllen gehobene Ansprüche.",
                facts: [["Empfehlung", "Design-Bett, Katzensofa"], ["Material", "Bouclé, Samt, Birkenholz"], ["Budget", "Ab 70 Euro für Premiumqualität"]],
                rec: "Design-Bett oder Sofa", link: "/katzensofas", badge: "Tipp",
              },
              {
                icon: <BigCatIcon size={30} className="text-primary" />,
                title: "Große Rasse (Maine Coon)",
                desc: "Maine Coons erreichen ein Gewicht von acht bis zwölf Kilogramm. Das Bett sollte groß genug sein, damit sich die Katze komplett ausstrecken kann, aber kompakt für ein Gefühl von Sicherheit. Wir empfehlen einen Innendurchmesser von mindestens 60 Zentimetern.",
                facts: [["Empfehlung", "XXL-Donut, orthopädisches Bett"], ["Mindestmaße", "60 cm Innendurchmesser"], ["Tragfähigkeit", "Bis 10 kg oder mehr"]],
                rec: "XXL-Donut oder XXL-Sofa", link: "/donut-katzenbetten", badge: "Wichtig",
              },
              {
                icon: <SeniorCatIcon size={30} className="text-primary" />,
                title: "Senior-Katze",
                desc: "Für Katzen mit Gelenkproblemen sollte das Bett einen niedrigen Einstieg haben. Orthopädische Modelle mit Memory Foam entlasten Gelenke und Wirbelsäule. Ältere Katzen schlafen oft noch mehr als die durchschnittlichen 16 Stunden täglich.",
                facts: [["Empfehlung", "Orthopädisches Bett mit Memory Foam"], ["Wichtig", "Niedriger Rand, rutschfester Boden"], ["Material", "Druckentlastender Schaumstoff"]],
                rec: "Orthopädisches Bett", link: "/orthopaedische-katzenbetten", badge: "Medizinisch",
              },
              {
                icon: <SparkleIcon size={30} className="text-primary" />,
                title: "Design-Fan",
                desc: "Wer Wert auf Ästhetik legt, findet bei Marken wie MiaCara oder Hunter stilvolle Modelle. Diese Betten integrieren sich harmonisch in moderne Wohnräume. Materialien wie Wasserhyazinthe oder Birkenholz verbinden natürliche Optik mit Funktionalität.",
                facts: [["Empfehlung", "Design-Bett, Katzenkorb aus Naturmaterial"], ["Material", "Wasserhyazinthe, Birkenholz, Canvas"], ["Preis", "Premium-Segment ab 80 Euro"]],
                rec: "Premium-Designbett", link: "/design-katzenbetten", badge: "Stil",
              },
              {
                icon: <Users size={30} className="text-primary" />,
                title: "Mehrkatzen-Haushalt",
                desc: "Bei mehreren Katzen empfehlen wir unterschiedliche Bett-Typen an verschiedenen Orten. So kann jeder Vierbeiner seinen bevorzugten Schlafplatz finden. Verschiedene Ausführungen reduzieren Konflikte.",
                facts: [["Empfehlung", "Mindestens ein Bett pro Katze plus Reserve"], ["Variation", "Höhle, Donut und offenes Bett kombinieren"], ["Standort", "Mehrere ruhige Ecken im Haus"]],
                rec: "Mehrere Betten kombinieren", link: "/katzensofas", badge: "Tipp",
              },
              {
                icon: <Home size={30} className="text-primary" />,
                title: "Wohnungskatze ohne Freigang",
                desc: "Wohnungskatzen benötigen besonders abwechslungsreiche Schlafplätze. Ein eigenes Katzenbett reduziert Tierhaare auf Möbeln. Erhöhte Positionen wie Fensterliegen bieten Abwechslung.",
                facts: [["Empfehlung", "Kombination aus Höhle und Fensterliege"], ["Wichtig", "Mehrere Schlafplätze anbieten"], ["Tipp", "Standorte regelmäßig variieren"]],
                rec: "Höhle + Fensterliege", link: "/fensterliegen-katzen", badge: "Tipp",
              },
            ].map((item) => (
              <Link key={item.link} to={item.link} className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center">{item.icon}</div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">{item.badge}</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.desc}</p>
                {item.facts && (
                  <ul className="space-y-1 mb-3">
                    {item.facts.map(([k, v]) => (
                      <li key={k} className="text-xs text-foreground flex gap-1.5">
                        <span className="font-semibold">{k}:</span>
                        <span className="text-muted-foreground">{v}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
                    {(() => {
                      const match = faq.a.match(/^([^.!?]*[.!?])\s*(.*)$/s);
                      const first = match?.[1] ?? faq.a;
                      const rest = match?.[2] ?? "";
                      return (
                        <p className="pt-4">
                          <strong className="text-foreground">{first}</strong>{rest ? " " + rest : ""}
                        </p>
                      );
                    })()}
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
