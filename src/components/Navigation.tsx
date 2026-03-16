import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown, Home, Circle, Heart, Sun, Flame, Palette, Scissors, Plus, Waves, Star } from "lucide-react";
import { Logo } from "@/components/Logo";
import { searchProducts } from "@/data/products";

const categories = [
  { name: "Katzenhöhlen", slug: "/katzenhoehlen", icon: Home, desc: "Gemütliche Rückzugsorte" },
  { name: "Donut-Betten", slug: "/donut-katzenbetten", icon: Circle, desc: "Flauschige Rundbetten" },
  { name: "Orthopädische Betten", slug: "/orthopaedische-katzenbetten", icon: Heart, desc: "Gelenkschonend & sanft" },
  { name: "Fensterliegen", slug: "/fensterliegen-katzen", icon: Sun, desc: "Mit Aussicht & Sonne" },
  { name: "Beheizte Betten", slug: "/beheizte-katzenbetten", icon: Flame, desc: "Wohlige Wärme" },
  { name: "Design & Premium", slug: "/design-katzenbetten", icon: Palette, desc: "Echt schöne Möbelstücke" },
  { name: "Katzensofas", slug: "/katzensofas", icon: Star, desc: "Eigenes kleines Sofa" },
  { name: "Hängematten", slug: "/haengematten-katzen", icon: Waves, desc: "Schwebend entspannen" },
  { name: "Kratzbetten", slug: "/kratzbetten", icon: Scissors, desc: "Kratzen und schlafen" },
  { name: "Zubehör", slug: "/katzenbett-zubehoer", icon: Plus, desc: "Decken, Kissen & mehr" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setSearchResults(searchProducts(searchQuery).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navBg = !isHome || scrolled
    ? "bg-white/95 backdrop-blur-md shadow-md"
    : "bg-transparent";

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>

      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" aria-label="katzenbett.de - Startseite">
          <Logo variant={!isHome || scrolled ? "dark" : "dark"} showClaim={false} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Mega-Dropdown */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <button
              className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              aria-expanded={megaOpen}
            >
              Katzenbetten
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>

            {megaOpen && (
              <div
                className="mega-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] p-6 grid grid-cols-2 gap-1 z-50"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={cat.slug}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <cat.icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.desc}</p>
                    </div>
                  </Link>
                ))}
                <div className="col-span-2 mt-2 pt-3 border-t border-border">
                  <Link
                    to="/katzenbetten"
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    🐾 Alle Katzenbetten ansehen
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/ratgeber" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Ratgeber
          </Link>
          <Link to="/groessenberater" className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
            📏 Größenberater
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
              aria-label="Suche"
            >
              <Search size={18} className="text-muted-foreground" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card rounded-2xl shadow-2xl border border-border p-3 z-50">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Donut-Bett, Katzenhöhle, Filz..."
                  className="w-full px-4 py-2.5 rounded-full bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {searchResults.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {searchResults.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/${p.slug}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{p.produktname}</p>
                          <p className="text-xs text-muted-foreground">{p.marke}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary">{p.preis.toFixed(2).replace(".", ",")} €</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            to="/katzenbetten"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-cta"
            style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-cta)" }}
          >
            🐾 Alle Katzenbetten
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-xl max-h-screen overflow-y-auto">
          <div className="p-4">
            {/* Mobile search */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Katzenbett suchen..."
              className="w-full px-4 py-3 rounded-full bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-4"
            />

            {searchResults.length > 0 && (
              <div className="mb-4 space-y-1">
                {searchResults.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/${p.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <p className="text-sm font-medium line-clamp-1">{p.produktname}</p>
                    <span className="text-sm font-semibold text-primary">{p.preis.toFixed(2).replace(".", ",")} €</span>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 px-1">Kategorien</p>
            <div className="grid grid-cols-1 gap-1 mb-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={cat.slug}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <cat.icon size={16} className="text-primary" />
                  <span className="text-sm font-medium">{cat.name}</span>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 border-t border-border pt-4">
              <Link to="/ratgeber" className="px-4 py-2.5 text-sm font-medium text-center hover:bg-accent/50 rounded-xl transition-colors">Ratgeber</Link>
              <Link to="/groessenberater" className="px-4 py-2.5 text-sm font-medium text-center hover:bg-accent/50 rounded-xl transition-colors">📏 Größenberater</Link>
              <Link to="/ueber-uns" className="px-4 py-2.5 text-sm font-medium text-center hover:bg-accent/50 rounded-xl transition-colors">Über uns</Link>
              <Link
                to="/katzenbetten"
                className="w-full py-3 rounded-full text-sm font-semibold text-primary-foreground text-center transition-all"
                style={{ background: "hsl(var(--primary))" }}
              >
                🐾 Alle Katzenbetten
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
