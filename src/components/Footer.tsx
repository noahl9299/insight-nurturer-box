import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/Logo";

const footerCategories = [
  { name: "Katzenhöhlen", slug: "/katzenhoehlen" },
  { name: "Donut-Betten", slug: "/donut-katzenbetten" },
  { name: "Orthopädische Betten", slug: "/orthopaedische-katzenbetten" },
  { name: "Fensterliegen", slug: "/fensterliegen-katzen" },
  { name: "Design & Premium", slug: "/design-katzenbetten" },
  { name: "Katzensofas", slug: "/katzensofas" },
  { name: "Beheizte Betten", slug: "/beheizte-katzenbetten" },
  { name: "Alle Katzenbetten", slug: "/katzenbetten" },
];

const footerRatgeber = [
  { name: "Welches Katzenbett?", slug: "/ratgeber/katzenbett-test" },
  { name: "Größen-Guide", slug: "/ratgeber/katzenbett-groesse" },
  { name: "Reinigungstipps", slug: "/ratgeber/katzenbett-waschen" },
  { name: "Für Senior-Katzen", slug: "/ratgeber/katzenbett-senioren" },
  { name: "Wie viel schlafen Katzen?", slug: "/ratgeber/katzen-schlafverhalten" },
  { name: "Katzenbett selber machen", slug: "/ratgeber/katzenbett-selber-machen" },
];

const partners = ["Amazon"];

export function Footer() {
  return (
    <footer className="bg-gradient-footer text-gray-300">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo variant="light" showClaim={true} />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              katzenbett.de - dein unabhängiges Vergleichsportal für Katzenbetten. Wir helfen dir, den perfekten Schlafplatz für deine Katze zu finden.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="katzenbett.de auf Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="katzenbett.de auf Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="katzenbett.de auf TikTok"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.85 4.85 0 01-1.07-.09z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Kategorien</p>
            <ul className="space-y-2">
              {footerCategories.map((item) => (
                <li key={item.slug}>
                  <Link to={item.slug} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ratgeber */}
          <div>
            <p className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Ratgeber</p>
            <ul className="space-y-2">
              {footerRatgeber.map((item) => (
                <li key={item.slug}>
                  <Link to={item.slug} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About + Partners */}
          <div>
            <p className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Über uns</p>
            <ul className="space-y-2 mb-6">
              <li><Link to="/ueber-uns" className="text-sm text-gray-400 hover:text-white transition-colors">Über katzenbett.de</Link></li>
              <li><Link to="/impressum" className="text-sm text-gray-400 hover:text-white transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="text-sm text-gray-400 hover:text-white transition-colors">Datenschutz</Link></li>
            </ul>

            <p className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Unsere Partner</p>
            <ul className="space-y-1.5">
              {partners.map((p) => (
                <li key={p}>
                  <span className="text-sm text-gray-400">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>© 2026 katzenbett.de</span>
            <Link to="/impressum" className="hover:text-gray-300 transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-gray-300 transition-colors">Datenschutz</Link>
          </div>
          <p className="text-xs text-gray-500 text-center md:text-right max-w-md">
            Affiliate-Hinweis: Als Amazon-Partner und Affiliate anderer Shops verdienen wir an qualifizierten Verkäufen. Für dich ändert sich der Preis nicht.
          </p>
        </div>
      </div>
    </footer>
  );
}
