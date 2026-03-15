import { useState, useMemo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, ChevronUp, X, ArrowRight, Grid2X2, List } from "lucide-react";
import { ProductCard, StarRating } from "@/components/ProductCard";
import { products, Product } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import NotFound from "@/pages/NotFound";
import { SEO } from "@/components/SEO";

// ── Filter types ──────────────────────────────────────────────────────────────
type SortKey = "empfohlen" | "preis-asc" | "preis-desc" | "bewertung" | "beliebtheit";

interface Filters {
  preis: [number, number];
  materialien: string[];
  groessen: string[];
  waschbar: boolean | null;
}

const DEFAULT_FILTERS: Filters = {
  preis: [0, 250],
  materialien: [],
  groessen: [],
  waschbar: null,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function getUnique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function getMaterialOptions(ps: Product[]): string[] {
  const all = ps.flatMap((p) => p.material.split("/").map((m) => m.trim()));
  return getUnique(all).sort();
}

function getGroesseOptions(ps: Product[]): string[] {
  return getUnique(ps.map((p) => {
    const dim = parseInt(p.groesse);
    if (isNaN(dim)) return "Sonstige";
    if (dim <= 45) return "Klein (≤45 cm)";
    if (dim <= 55) return "Mittel (46–55 cm)";
    return "Groß (≥56 cm)";
  })).filter(Boolean);
}

function matchesGroesse(p: Product, selected: string[]): boolean {
  if (selected.length === 0) return true;
  const dim = parseInt(p.groesse);
  if (isNaN(dim)) return selected.includes("Sonstige");
  if (dim <= 45) return selected.includes("Klein (≤45 cm)");
  if (dim <= 55) return selected.includes("Mittel (46–55 cm)");
  return selected.includes("Groß (≥56 cm)");
}

function sortProducts(ps: Product[], key: SortKey): Product[] {
  const copy = [...ps];
  switch (key) {
    case "preis-asc":   return copy.sort((a, b) => a.preis - b.preis);
    case "preis-desc":  return copy.sort((a, b) => b.preis - a.preis);
    case "bewertung":   return copy.sort((a, b) => b.bewertung - a.bewertung);
    case "beliebtheit": return copy.sort((a, b) => b.anzahlBewertungen - a.anzahlBewertungen);
    default:            return copy.sort((a, b) => a.rang - b.rang);
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4">
      <button
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-foreground"
        onClick={() => setOpen((o) => !o)}
      >
        {title}
        {open ? <ChevronUp size={15} className="text-muted-foreground" /> : <ChevronDown size={15} className="text-muted-foreground" />}
      </button>
      {open && <div className="mt-1">{children}</div>}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 bg-muted/20" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 id="faq-heading" className="text-heading-2 text-foreground mb-10 text-center">
          Häufige Fragen
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                {open === i
                  ? <ChevronUp size={16} className="text-primary shrink-0" />
                  : <ChevronDown size={16} className="text-muted-foreground shrink-0" />}
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CategoryPage() {
  const params = useParams<{ category?: string }>();

  // Derive slug from route param OR from pathname
  const config = useMemo(() => {
    if (params.category) return getCategoryBySlug(params.category);
    // Fixed routes: pathname = "/katzenhoehlen" → slug = "katzenhoehlen"
    const slug = window.location.pathname.replace(/^\//, "");
    return getCategoryBySlug(slug);
  }, [params.category]);

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>("empfohlen");
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  // Pool of products for this category (all hooks must be before any early return)
  const pool = useMemo(() => {
    if (!config) return [];
    if (config.produktKategorien.length === 0) return products;
    return products.filter((p) => config.produktKategorien.includes(p.kategorie));
  }, [config]);

  const materialOptions = useMemo(() => getMaterialOptions(pool), [pool]);
  const groesseOptions = useMemo(() => getGroesseOptions(pool), [pool]);

  const filtered = useMemo(() => {
    let result = pool.filter((p) => {
      if (p.preis < filters.preis[0] || p.preis > filters.preis[1]) return false;
      if (
        filters.materialien.length > 0 &&
        !filters.materialien.some((m) => p.material.toLowerCase().includes(m.toLowerCase()))
      ) return false;
      if (!matchesGroesse(p, filters.groessen)) return false;
      if (filters.waschbar === true && !p.waschbar.toLowerCase().startsWith("ja")) return false;
      return true;
    });
    return sortProducts(result, sort);
  }, [pool, filters, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(0, page * PER_PAGE);

  const activeFilterCount =
    (filters.materialien.length > 0 ? 1 : 0) +
    (filters.groessen.length > 0 ? 1 : 0) +
    (filters.waschbar !== null ? 1 : 0) +
    (filters.preis[0] > 0 || filters.preis[1] < 250 ? 1 : 0);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const toggleMaterial = useCallback((m: string) => {
    setFilters((f) => ({
      ...f,
      materialien: f.materialien.includes(m)
        ? f.materialien.filter((x) => x !== m)
        : [...f.materialien, m],
    }));
    setPage(1);
  }, []);

  const toggleGroesse = useCallback((g: string) => {
    setFilters((f) => ({
      ...f,
      groessen: f.groessen.includes(g)
        ? f.groessen.filter((x) => x !== g)
        : [...f.groessen, g],
    }));
    setPage(1);
  }, []);

  if (!config) return <NotFound />;

  const badgeMap: Record<number, "bestseller" | "neu" | "tipp"> = {
    0: "bestseller", 1: "bestseller", 4: "tipp", 7: "bestseller",
  };

  // SEO structured content
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.nameLong,
    description: config.description,
    url: `https://katzenbett.de${config.route}`,
  };

  return (
    <>
      <SEO
        title={`${config.nameLong} kaufen 2025 – Top ${pool.length} Empfehlungen`}
        description={`${config.description} Jetzt die besten ${config.nameLong} vergleichen – gefiltert nach Preis, Größe und Material.`}
        canonical={`https://katzenbett.de${config.route}`}
        type="website"
      />
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-16 overflow-hidden"
        aria-label={`Kategorie ${config.nameLong}`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={config.image}
            alt={`${config.nameLong} - Kategoriebild`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, hsl(42 100% 99% / 0.97) 0%, hsl(42 100% 99% / 0.80) 50%, hsl(42 100% 99% / 0.40) 100%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Startseite</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{config.name}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 text-sm font-medium text-foreground mb-5">
              🐱 {pool.length} Katzenbetten
            </div>
            <h1
              className="text-foreground mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4.5vw, 48px)", lineHeight: 1.2 }}
            >
              {config.nameLong}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-xl">
              {config.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-caveat text-xl text-primary">{config.tagline} ✨</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR + PRODUCT GRID ─────────────────────────────────────── */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          {/* Top toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                  filterOpen || activeFilterCount > 0
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                <SlidersHorizontal size={15} />
                Filter
                {activeFilterCount > 0 && (
                  <span className="bg-primary-foreground text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                  Filter zurücksetzen
                </button>
              )}

              <span className="text-sm text-muted-foreground">
                {filtered.length} Ergebnisse
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortKey); setPage(1); }}
                className="text-sm border border-border rounded-full px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
              >
                <option value="empfohlen">Empfohlen</option>
                <option value="beliebtheit">Beliebtheit</option>
                <option value="bewertung">Beste Bewertung</option>
                <option value="preis-asc">Preis aufsteigend</option>
                <option value="preis-desc">Preis absteigend</option>
              </select>

              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-border rounded-full overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Grid-Ansicht"
                >
                  <Grid2X2 size={16} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Listen-Ansicht"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* ── SIDEBAR FILTER ──────────────────────────────────────────── */}
            {filterOpen && (
              <aside className="hidden lg:block w-64 shrink-0" aria-label="Filteroptionen">
                <div className="bg-card rounded-2xl border border-border p-5 sticky top-24 space-y-1">
                  <h2 className="text-sm font-bold text-foreground mb-4">Filter</h2>

                  {/* Price range */}
                  <FilterSection title="Preis">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{filters.preis[0]} €</span>
                        <span>{filters.preis[1] >= 250 ? "250+ €" : `${filters.preis[1]} €`}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={250}
                        step={5}
                        value={filters.preis[1]}
                        onChange={(e) => {
                          setFilters((f) => ({ ...f, preis: [f.preis[0], Number(e.target.value)] }));
                          setPage(1);
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {[
                          { label: "Bis 20 €", max: 20 },
                          { label: "Bis 40 €", max: 40 },
                          { label: "Bis 80 €", max: 80 },
                        ].map((p) => (
                          <button
                            key={p.label}
                            onClick={() => { setFilters((f) => ({ ...f, preis: [0, p.max] })); setPage(1); }}
                            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                              filters.preis[1] === p.max && filters.preis[0] === 0
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-primary"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </FilterSection>

                  {/* Size */}
                  <FilterSection title="Größe">
                    <div className="flex flex-wrap gap-1.5">
                      {groesseOptions.map((g) => (
                        <Chip
                          key={g}
                          label={g}
                          active={filters.groessen.includes(g)}
                          onClick={() => toggleGroesse(g)}
                        />
                      ))}
                    </div>
                  </FilterSection>

                  {/* Material */}
                  <FilterSection title="Material" defaultOpen={false}>
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                      {materialOptions.map((m) => (
                        <label key={m} className="flex items-center gap-2 text-sm cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.materialien.includes(m)}
                            onChange={() => toggleMaterial(m)}
                            className="rounded accent-primary"
                          />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{m}</span>
                        </label>
                      ))}
                    </div>
                  </FilterSection>

                  {/* Washable */}
                  <FilterSection title="Waschbar" defaultOpen={false}>
                    <div className="flex gap-2">
                      <Chip
                        label="Alle"
                        active={filters.waschbar === null}
                        onClick={() => { setFilters((f) => ({ ...f, waschbar: null })); setPage(1); }}
                      />
                      <Chip
                        label="Waschbar"
                        active={filters.waschbar === true}
                        onClick={() => { setFilters((f) => ({ ...f, waschbar: true })); setPage(1); }}
                      />
                    </div>
                  </FilterSection>
                </div>
              </aside>
            )}

            {/* ── MOBILE FILTER DRAWER ────────────────────────────────────── */}
            {filterOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
                <div className="relative ml-auto w-80 max-w-full bg-card h-full overflow-y-auto shadow-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base font-bold text-foreground">Filter</h2>
                    <button onClick={() => setFilterOpen(false)} className="p-2 rounded-full hover:bg-muted transition-colors">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    {/* Price */}
                    <FilterSection title="Preis">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{filters.preis[0]} €</span>
                          <span>{filters.preis[1] >= 250 ? "250+ €" : `${filters.preis[1]} €`}</span>
                        </div>
                        <input
                          type="range" min={0} max={250} step={5} value={filters.preis[1]}
                          onChange={(e) => { setFilters((f) => ({ ...f, preis: [f.preis[0], Number(e.target.value)] })); setPage(1); }}
                          className="w-full accent-primary cursor-pointer"
                        />
                      </div>
                    </FilterSection>

                    <FilterSection title="Größe">
                      <div className="flex flex-wrap gap-1.5">
                        {groesseOptions.map((g) => (
                          <Chip key={g} label={g} active={filters.groessen.includes(g)} onClick={() => toggleGroesse(g)} />
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Material" defaultOpen={false}>
                      <div className="flex flex-col gap-2">
                        {materialOptions.map((m) => (
                          <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="checkbox" checked={filters.materialien.includes(m)} onChange={() => toggleMaterial(m)} className="rounded accent-primary" />
                            <span className="text-muted-foreground">{m}</span>
                          </label>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Waschbar" defaultOpen={false}>
                      <div className="flex gap-2">
                        <Chip label="Alle" active={filters.waschbar === null} onClick={() => { setFilters((f) => ({ ...f, waschbar: null })); setPage(1); }} />
                        <Chip label="Waschbar" active={filters.waschbar === true} onClick={() => { setFilters((f) => ({ ...f, waschbar: true })); setPage(1); }} />
                      </div>
                    </FilterSection>
                  </div>

                  <div className="mt-6 space-y-2">
                    {activeFilterCount > 0 && (
                      <button onClick={resetFilters} className="w-full py-3 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Filter zurücksetzen
                      </button>
                    )}
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="w-full py-3 rounded-full text-sm font-semibold text-primary-foreground transition-all"
                      style={{ background: "hsl(var(--primary))" }}
                    >
                      {filtered.length} Ergebnisse anzeigen
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── PRODUCT GRID ────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-4">😿</p>
                  <p className="text-lg font-semibold text-foreground mb-2">Keine Ergebnisse</p>
                  <p className="text-muted-foreground mb-6">Probiere weniger strenge Filter.</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    Filter zurücksetzen
                  </button>
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((product, i) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      badge={badgeMap[i] ?? null}
                    />
                  ))}
                </div>
              ) : (
                // List view
                <div className="space-y-3">
                  {paginated.map((product, i) => (
                    <Link
                      key={product.slug}
                      to={`/katzenbett/${product.slug}`}
                      className="product-card flex gap-4 p-4 group"
                    >
                      <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden shrink-0 flex items-center justify-center text-3xl">
                        {product.typ.includes("Donut") ? "🍩" :
                         product.typ.includes("Höhle") || product.typ.includes("Iglu") ? "🏠" :
                         product.typ.includes("Fenster") ? "🪟" :
                         product.typ.includes("Sofa") ? "🛋️" :
                         product.typ.includes("Ortho") || product.typ.includes("Memory") ? "💙" :
                         product.typ.includes("Beheizt") || product.typ.includes("USB") ? "🔥" :
                         product.typ.includes("Hänge") ? "🪢" : "😺"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-0.5">{product.marke}</p>
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1 leading-snug">{product.produktname}</h3>
                        <StarRating rating={product.bewertung} count={product.anzahlBewertungen} />
                        {product.besonderheiten && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.besonderheiten}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-foreground">{product.preis.toFixed(2).replace(".", ",")} €</p>
                        <p className="text-xs text-muted-foreground">bei Amazon</p>
                        <div
                          className="mt-2 px-4 py-2 rounded-full text-xs font-semibold text-primary-foreground"
                          style={{ background: "hsl(var(--primary))" }}
                        >
                          Angebot →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination / Load more */}
              {page < totalPages && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Weitere {Math.min(PER_PAGE, filtered.length - page * PER_PAGE)} Katzenbetten laden
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">
                    {paginated.length} von {filtered.length} angezeigt
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO TEXT ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/20" aria-labelledby="seo-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-muted-foreground text-lg mb-4 leading-relaxed">{config.seoText.intro}</p>
          <h2 id="seo-heading" className="text-heading-2 text-foreground mb-6">
            {config.seoText.h2}
          </h2>
          <div className="prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-line space-y-4">
            {config.seoText.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-base">{para}</p>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/katzenbetten"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
              style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-cta)" }}
            >
              Alle Katzenbetten ansehen
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FaqSection faqs={config.faqs} />
    </>
  );
}
