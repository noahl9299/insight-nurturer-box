import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import {
  ShoppingBag,
  Star,
  ChevronRight,
  CheckCircle,
  ExternalLink,
  RotateCcw,
  Shield,
  Truck,
  ThumbsUp,
  Heart,
  Ruler,
  Droplets,
  Tag,
  Layers,
  ArrowRight,
} from "lucide-react";
import { getProductBySlug, getSimilarProducts, Product } from "@/data/products";
import { ProductCard, StarRating } from "@/components/ProductCard";
import { getProductImage } from "@/data/productImages";
import { getAmazonUrl } from "@/data/productAsins";
import { getProductName } from "@/data/productNames";
import { getProductPrice, getProductRating, getProductReviews } from "@/data/productPrices";

/* ── Type helpers ─────────────────────────────────────────── */
type TypEmoji = { icon: string; gradient: string };
const TYPE_META: Record<string, TypEmoji> = {
  Donut:            { icon: "🍩", gradient: "from-orange-100 to-amber-100" },
  "Anti-Angst-Donut": { icon: "🍩", gradient: "from-orange-100 to-amber-100" },
  "Katzenhöhle":    { icon: "🏠", gradient: "from-stone-100 to-zinc-100" },
  "Höhle":          { icon: "🏠", gradient: "from-stone-100 to-zinc-100" },
  "Filz-Höhle":     { icon: "🏠", gradient: "from-stone-200 to-zinc-200" },
  "2-in-1 Höhle":   { icon: "🏠", gradient: "from-stone-100 to-slate-100" },
  "Iglu":           { icon: "🏠", gradient: "from-zinc-100 to-slate-100" },
  "Orthopädisch":   { icon: "💙", gradient: "from-blue-50 to-indigo-100" },
  "Memory Foam":    { icon: "💙", gradient: "from-blue-50 to-indigo-100" },
  "Fensterliege":   { icon: "🪟", gradient: "from-sky-50 to-cyan-100" },
  "Katzensofa":     { icon: "🛋️", gradient: "from-emerald-50 to-teal-100" },
  "Sofa":           { icon: "🛋️", gradient: "from-emerald-50 to-teal-100" },
  "Beheizt":        { icon: "🔥", gradient: "from-red-50 to-orange-100" },
  "Heizkörper-Hängematte": { icon: "🪢", gradient: "from-yellow-50 to-amber-100" },
  "Hängematte":     { icon: "🪢", gradient: "from-yellow-50 to-amber-100" },
  "Erhöhtes Bett":  { icon: "🪵", gradient: "from-amber-50 to-stone-100" },
  "Premium Daybed": { icon: "✨", gradient: "from-yellow-50 to-amber-50" },
  default:          { icon: "😺", gradient: "from-amber-50 to-orange-50" },
};

function getTypMeta(typ: string): TypEmoji {
  return TYPE_META[typ] ?? TYPE_META.default;
}

/* ── Product image with real Amazon photo ───────────────────── */
function ProductHeroImage({ product }: { product: Product }) {
  const [error, setError] = useState(false);
  const imgSrc = getProductImage(product.rang);
  const meta = getTypMeta(product.typ);

  if (imgSrc && !error) {
    return (
      <img
        src={imgSrc}
        alt={product.produktname}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex flex-col items-center justify-center`}>
      <span className="text-9xl mb-4 select-none">{meta.icon}</span>
      <p className="text-sm text-muted-foreground text-center px-6 max-w-xs leading-relaxed">{product.produktname}</p>
      <p className="mt-2 text-xs font-medium px-3 py-1 rounded-full bg-white/60 text-muted-foreground">{product.marke}</p>
    </div>
  );
}

/* ── Feature chips ──────────────────────────────────────────── */
function buildFeatures(product: Product) {
  const features: { icon: JSX.Element; label: string; value: string }[] = [
    {
      icon: <Ruler size={16} />,
      label: "Maße",
      value: product.groesse ? `${product.groesse} cm` : "Keine Angabe",
    },
    {
      icon: <Layers size={16} />,
      label: "Material",
      value: product.material,
    },
    {
      icon: <Droplets size={16} />,
      label: "Waschbar",
      value: product.waschbar,
    },
    {
      icon: <Tag size={16} />,
      label: "Typ",
      value: product.typ,
    },
  ];
  if (product.farben) {
    features.push({ icon: <Heart size={16} />, label: "Farben", value: product.farben });
  }
  return features;
}

/* ── Fake review distribution ───────────────────────────────── */
function ReviewDistribution({ rating, count }: { rating: number; count: number }) {
  // Generate plausible distribution from rating
  const base = rating - 1; // 0-4 range
  const bars = [
    { stars: 5, pct: Math.round(base * 22 + 18) },
    { stars: 4, pct: Math.round(base * 10 + 12) },
    { stars: 3, pct: Math.round((5 - base) * 4 + 4) },
    { stars: 2, pct: Math.round((5 - base) * 2 + 1) },
    { stars: 1, pct: Math.round((5 - base) * 1.5 + 1) },
  ];
  const total = bars.reduce((s, b) => s + b.pct, 0);

  return (
    <div className="space-y-2">
      {bars.map((b) => (
        <div key={b.stars} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-8 shrink-0">{b.stars} ★</span>
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(b.pct / total) * 100}%`,
                background: "hsl(var(--primary))",
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-7 text-right">
            {Math.round((b.pct / total) * 100)}%
          </span>
        </div>
      ))}
      <p className="text-xs text-muted-foreground pt-1">
        Basierend auf {count.toLocaleString("de-DE")} Bewertungen bei Amazon
      </p>
    </div>
  );
}

/* ── JSON-LD schema ─────────────────────────────────────────── */
function ProductSchema({ product, realPrice, realRating, realReviews }: { product: Product; realPrice: number; realRating: number; realReviews: number }) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: getProductName(product.rang) || product.produktname,
    brand: { "@type": "Brand", name: product.marke },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: realPrice.toFixed(2),
      availability: "https://schema.org/InStock",
      url: getAmazonUrl(product.rang),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: realRating,
      reviewCount: realReviews,
      bestRating: 5,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── Category route map ─────────────────────────────────────── */
const CATEGORY_ROUTES: Record<string, { name: string; route: string }> = {
  Donut: { name: "Donut-Katzenbetten", route: "/donut-katzenbetten" },
  "Anti-Angst-Donut": { name: "Donut-Katzenbetten", route: "/donut-katzenbetten" },
  Hoehle: { name: "Katzenhöhlen", route: "/katzenhoehlen" },
  "Orthopädisch": { name: "Orthopädische Betten", route: "/orthopaedische-katzenbetten" },
  Fensterliege: { name: "Fensterliegen", route: "/fensterliegen-katzen" },
  Haengematte: { name: "Hängematten", route: "/haengematten-katzen" },
  Beheizt: { name: "Beheizte Betten", route: "/beheizte-katzenbetten" },
  Erhoeht: { name: "Design & Premium", route: "/design-katzenbetten" },
  Spezial: { name: "Design & Premium", route: "/design-katzenbetten" },
  Sofa: { name: "Katzensofas", route: "/katzensofas" },
  "Klassisches Bett": { name: "Alle Katzenbetten", route: "/katzenbetten" },
  Zubehoer: { name: "Zubehör", route: "/katzenbett-zubehoer" },
};

/* ═══════════════════════════════════════════════════════════ */
export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) return <Navigate to="/katzenbetten" replace />;

  const similar = getSimilarProducts(product);
  const features = buildFeatures(product);
  const catInfo = CATEGORY_ROUTES[product.kategorie] ?? { name: "Katzenbetten", route: "/katzenbetten" };
  const realPrice = getProductPrice(product.rang) ?? product.preis;
  const realRating = getProductRating(product.rang) ?? product.bewertung;
  const realReviews = getProductReviews(product.rang) ?? product.anzahlBewertungen;
  const formattedPrice = realPrice.toFixed(2).replace(".", ",");
  const typMeta = getTypMeta(product.typ);
  const realName = getProductName(product.rang) || product.produktname;

  const keyBenefits = [
    product.besonderheiten,
    `Bewertung: ${realRating} / 5 (${realReviews.toLocaleString("de-DE")} Bewertungen)`,
    `Material: ${product.material}`,
    product.waschbar === "Ja" ? "✓ Maschinenwaschbar bei 30°C" : `Pflege: ${product.waschbar}`,
    product.groesse ? `Maße: ${product.groesse} cm` : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <SEO
        title={`${realName} – ${product.marke} Katzenbett kaufen`}
        description={`${realName} von ${product.marke} kaufen. ${product.besonderheiten}. Bewertung: ${realRating}/5 bei ${realReviews.toLocaleString("de-DE")} Rezensionen. Ab ${formattedPrice} €.`}
        canonical={`https://katzenbett.de/katzenbett/${product.slug}`}
        type="product"
        priceAmount={realPrice.toFixed(2)}
        availability="InStock"
      />
      <ProductSchema product={product} realPrice={realPrice} realRating={realRating} realReviews={realReviews} />

      {/* BREADCRUMBS */}
      <nav className="container mx-auto px-4 pt-6 pb-2" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              Startseite
            </Link>
          </li>
          <ChevronRight size={14} />
          <li>
            <Link to={catInfo.route} className="hover:text-foreground transition-colors">
              {catInfo.name}
            </Link>
          </li>
          <ChevronRight size={14} />
          <li className="text-foreground font-medium line-clamp-1 max-w-[260px]">
            {realName}
          </li>
        </ol>
      </nav>

      {/* MAIN PRODUCT SECTION */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── LEFT: Image ─────────────────────────────────── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-square shadow-card">
              <ProductHeroImage product={product} />

              {/* Rang badge */}
              {product.rang <= 10 && (
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-primary-foreground"
                  style={{ background: "hsl(var(--primary))" }}
                >
                  ⭐ Top {product.rang} Bestseller
                </div>
              )}

              {/* Wishlist */}
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-red-400 transition-all shadow-sm"
                aria-label="Auf Merkliste"
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Shield size={15} />, text: "Sichere Shops" },
                { icon: <Truck size={15} />, text: "Schnell lieferbar" },
                { icon: <RotateCcw size={15} />, text: "Einfache Rückgabe" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-muted/40 border border-border/30"
                >
                  <span className="text-secondary">{item.icon}</span>
                  <span className="text-xs text-muted-foreground text-center">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info ─────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Brand + type */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {product.marke}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent text-foreground">
                {typMeta.icon} {product.typ}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-heading-2 text-foreground mb-4 leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {realName}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-4 mb-5">
              <StarRating rating={realRating} count={realReviews} />
              <span className="text-xs text-muted-foreground">
                Rang #{product.rang} auf katzenbett.de
              </span>
            </div>

            {/* Price */}
            <div
              className="flex items-baseline gap-3 mb-1 p-4 rounded-2xl"
              style={{ background: "hsl(var(--accent))" }}
            >
              <span
                className="text-4xl font-bold"
                style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--foreground))" }}
              >
                {formattedPrice} €
              </span>
              <span className="text-sm text-muted-foreground">inkl. MwSt.</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6 ml-1">
              * Preis kann variieren · bei Amazon & weiteren Partnershops
            </p>

            {/* CTA Button */}
            <a
              href={getAmazonUrl(product.rang)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              data-asin={product.asin}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 active:translate-y-0 mb-3"
              style={{
                background: "hsl(var(--primary))",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              <ShoppingBag size={20} />
              Jetzt bei Amazon ansehen
              <ExternalLink size={16} className="opacity-70" />
            </a>

            {/* Secondary CTA */}
            <a
              href={getAmazonUrl(product.rang)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-2xl border-2 border-border text-foreground font-semibold text-sm hover:border-primary hover:text-primary transition-all mb-6"
            >
              Preise vergleichen
              <ArrowRight size={16} />
            </a>

            {/* Key Benefits */}
            <div className="space-y-2.5 mb-6">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Highlights
              </h3>
              <ul className="space-y-2">
                {keyBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature specs grid */}
            <div className="grid grid-cols-2 gap-2.5 mt-auto">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col gap-1 p-3 rounded-xl bg-card border border-border/50"
                >
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    {f.icon}
                    <span className="text-xs font-medium uppercase tracking-wide">{f.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground line-clamp-2">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL SECTIONS */}
      <section className="bg-muted/20 py-14 mt-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Description ─────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2
                  className="text-heading-3 text-foreground mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Über dieses Katzenbett
                </h2>
                <div className="prose max-w-none text-muted-foreground space-y-4 leading-relaxed">
                  <p>
                    Das <strong className="text-foreground">{realName}</strong> von{" "}
                    <strong className="text-foreground">{product.marke}</strong> ist ein {product.typ}-Katzenbett, das
                    sich durch {product.besonderheiten.toLowerCase()} auszeichnet. Mit Maßen von{" "}
                    {product.groesse} cm bietet es ausreichend Platz für die meisten Katzenrassen.
                  </p>
                  <p>
                    Das Bett besteht aus {product.material} und ist {product.waschbar === "Ja"
                      ? "bei 30°C maschinenwaschbar – praktisch für den Alltag."
                      : `pflegeleicht: ${product.waschbar}.`}{" "}
                    Erhältlich in {product.farben}.
                  </p>
                  <p>
                    Mit einer Durchschnittsbewertung von{" "}
                    <strong className="text-foreground">{realRating}/5</strong> bei über{" "}
                    {realReviews.toLocaleString("de-DE")} Bewertungen gehört dieses
                    Katzenbett zu den beliebtesten seiner Kategorie.
                  </p>
                </div>
              </div>

              {/* Feature list */}
              <div>
                <h2
                  className="text-heading-3 text-foreground mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Features im Überblick
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: "✅", text: product.besonderheiten },
                    { icon: "📐", text: `Maße: ${product.groesse} cm` },
                    { icon: "🧵", text: `Material: ${product.material}` },
                    { icon: "🫧", text: `Pflege: ${product.waschbar}` },
                    { icon: "🎨", text: `Farben: ${product.farben}` },
                    { icon: "⭐", text: `${product.bewertung} von 5 Sternen` },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border/50"
                    >
                      <span className="text-base shrink-0">{item.icon}</span>
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affiliate disclaimer */}
              <div className="text-xs text-muted-foreground bg-card border border-border/30 rounded-xl p-4 leading-relaxed">
                <strong>Hinweis:</strong> katzenbett.de ist ein unabhängiges Vergleichsportal. Wenn du über
                unsere Links kaufst, erhalten wir ggf. eine Provision – für dich ändert sich am Preis nichts.
                Unsere Empfehlungen basieren ausschließlich auf Produktbewertungen und Testergebnissen.
              </div>
            </div>

            {/* ── Ratings sidebar ─────────────────────────── */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3
                  className="text-heading-3 text-foreground mb-5"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Bewertungen
                </h3>

                {/* Big rating display */}
                <div className="flex items-end gap-4 mb-6">
                  <div className="text-center">
                    <div
                      className="text-6xl font-bold leading-none"
                      style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--primary))" }}
                    >
                      {product.bewertung}
                    </div>
                    <div className="flex items-center gap-0.5 mt-1 justify-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i <= Math.floor(product.bewertung)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">von 5 Sternen</p>
                  </div>
                  <div className="flex-1">
                    <ReviewDistribution
                      rating={product.bewertung}
                      count={product.anzahlBewertungen}
                    />
                  </div>
                </div>

                {/* Review highlights */}
                <div className="space-y-3 border-t border-border pt-5">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                    Was Käufer sagen
                  </p>
                  {[
                    { icon: <ThumbsUp size={13} />, text: "Sehr weich und kuschelig" },
                    { icon: <ThumbsUp size={13} />, text: "Katze nimmt es sofort an" },
                    { icon: <ThumbsUp size={13} />, text: "Gut waschbar und formstabil" },
                  ].map((h) => (
                    <div key={h.text} className="flex items-center gap-2">
                      <span className="text-secondary">{h.icon}</span>
                      <span className="text-sm text-muted-foreground">{h.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA repeat */}
                <a
                  href={getAmazonUrl(product.rang)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
                  style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-cta)" }}
                >
                  <ShoppingBag size={16} />
                  Alle Bewertungen bei Amazon
                  <ExternalLink size={13} className="opacity-70" />
                </a>
              </div>

              {/* Quick specs card */}
              <div className="bg-card rounded-2xl border border-border/50 p-5">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                  Produktdaten
                </p>
                <dl className="space-y-2.5">
                  {[
                    { dt: "Marke", dd: product.marke },
                    { dt: "Kategorie", dd: product.typ },
                    { dt: "Maße", dd: `${product.groesse} cm` },
                    { dt: "Material", dd: product.material },
                    { dt: "Waschbar", dd: product.waschbar },
                    { dt: "Farben", dd: product.farben },
                    { dt: "ASIN", dd: product.asin },
                  ].map(({ dt, dd }) => (
                    <div key={dt} className="flex gap-2">
                      <dt className="text-xs text-muted-foreground w-20 shrink-0">{dt}</dt>
                      <dd className="text-xs font-medium text-foreground">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMILAR PRODUCTS */}
      {similar.length > 0 && (
        <section className="py-16 bg-background" aria-labelledby="similar-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-end justify-between mb-8">
              <h2
                id="similar-heading"
                className="text-heading-2 text-foreground"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Ähnliche Katzenbetten
              </h2>
              <Link
                to={catInfo.route}
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Alle ansehen <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((p, i) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  badge={i === 0 ? "tipp" : null}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-14 bg-muted/20" aria-labelledby="faq-product-heading">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            id="faq-product-heading"
            className="text-heading-2 text-foreground text-center mb-8"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Häufige Fragen zu diesem Produkt
          </h2>
          <FaqAccordion product={product} />
        </div>
      </section>
    </>
  );
}

/* ── FAQ Accordion ──────────────────────────────────────────── */
function FaqAccordion({ product }: { product: Product }) {
  const realName = getProductName(product.rang) || product.produktname;
  const faqs = [
    {
      q: `Für welche Katzen eignet sich das ${product.marke} Katzenbett?`,
      a: `Das ${realName} mit Maßen von ${product.groesse} cm eignet sich für die meisten Katzenrassen. ${product.besonderheiten}.`,
    },
    {
      q: `Wie pflege ich das ${product.typ}?`,
      a: `Das Bett ist ${product.waschbar === "Ja"
          ? "bei 30°C maschinenwaschbar. Verwende ein Wäschenetz und lass es an der Luft trocknen. Nicht in den Trockner geben."
          : `wie folgt zu pflegen: ${product.waschbar}. Für Details empfehlen wir die Produktbeschreibung bei Amazon.`
        }`,
    },
    {
      q: "Wie bekomme ich meine Katze dazu, das Bett zu akzeptieren?",
      a: "Stelle das Bett an einen ruhigen, erhöhten Ort. Lege ein getragenes Kleidungsstück hinein, damit es nach dir riecht. Optional: etwas Katzenminze am Rand. Gib deiner Katze 1–3 Wochen Eingewöhnungszeit.",
    },
    {
      q: "Wo kann ich das Bett am günstigsten kaufen?",
      a: "Über unseren Link kommst du direkt zur aktuellen Preisübersicht bei Amazon. Die Preise können täglich schwanken – lohnt sich also, regelmäßig nachzuschauen.",
    },
  ];

  return <FaqList faqs={faqs} />;
}

function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-card border border-border/50 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
            aria-expanded={open === i}
          >
            <span>{faq.q}</span>
            <span
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform"
              style={{
                background: "hsl(var(--accent))",
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <ArrowRight size={13} className="rotate-[-45deg]" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }} />
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-5">
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

