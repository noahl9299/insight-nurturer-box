import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, Tag, ArrowRight, BookOpen, Star } from "lucide-react";
import { guides } from "@/data/guides";
import { SEO } from "@/components/SEO";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const categories = ["Alle", "Kaufratgeber", "Materialien", "Pflege & Reinigung", "Tipps & Tricks"];

const categoryColors: Record<string, string> = {
  Kaufratgeber: "bg-primary/10 text-primary",
  Materialien: "bg-secondary/30 text-secondary-foreground",
  "Pflege & Reinigung": "bg-accent text-accent-foreground",
  "Tipps & Tricks": "bg-muted text-muted-foreground",
};

export default function GuidesOverviewPage() {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered =
    activeCategory === "Alle"
      ? guides
      : guides.filter((g) => g.category === activeCategory);

  const featuredGuide = guides[0];
  const restGuides = filtered.filter((g) => g.slug !== featuredGuide.slug);

  return (
    <>
      <SEO
        title="Ratgeber – Expertenwissen rund um Katzenbetten 2025"
        description="Unsere Katzenbett-Ratgeber helfen dir beim Kauf: Größenratgeber, Materialvergleich, Kaufcheckliste und mehr – von Tierverhaltensexpertinnen verfasst."
        canonical="https://katzenbett.de/ratgeber"
        type="website"
      />
      {/* JSON-LD: CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Ratgeber – katzenbett.de",
            description:
              "Expertenwissen rund um Katzenbetten: Größenratgeber, Materialvergleich, Kaufcheckliste und mehr.",
            url: "https://katzenbett.de/ratgeber",
            publisher: {
              "@type": "Organization",
              name: "katzenbett.de",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-accent via-background to-background pt-28 pb-14 px-4">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Startseite</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Ratgeber</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen size={20} className="text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Expertenratgeber
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
            Ratgeber für Katzenbetten
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Fundiertes Expertenwissen rund um Katzenbetten – von der Größenwahl bis zum Materialvergleich. Finde das perfekte Bett für deine Katze.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-6 mt-8">
            {[
              { label: "Artikel", value: `${guides.length}` },
              { label: "Ø Lesedauer", value: `${Math.round(guides.reduce((s, g) => s + g.readingTime, 0) / guides.length)} Min.` },
              { label: "Experten", value: "2" },
              { label: "Aktuell", value: "2025" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-primary">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guide */}
      {activeCategory === "Alle" && (
        <section className="container mx-auto max-w-5xl px-4 -mt-0 pt-10 pb-6">
          <Link
            to={`/ratgeber/${featuredGuide.slug}`}
            className="group block rounded-2xl overflow-hidden bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-56 md:h-auto overflow-hidden">
                <img
                  src={featuredGuide.heroImage}
                  alt={featuredGuide.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[featuredGuide.category] ?? "bg-muted text-muted-foreground"}`}>
                    {featuredGuide.category}
                  </span>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredGuide.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {featuredGuide.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> {featuredGuide.readingTime} Min.
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star size={13} className="text-primary fill-primary" /> {featuredGuide.overallRating}/10
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Lesen <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Category Filter */}
      <section className="container mx-auto max-w-5xl px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {cat}
              {cat === "Alle" && (
                <span className="ml-1.5 text-xs opacity-70">({guides.length})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      <section className="container mx-auto max-w-5xl px-4 pb-16">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <p className="text-lg">Noch keine Artikel in dieser Kategorie.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {(activeCategory === "Alle" ? restGuides : filtered).map((guide) => (
              <Link
                key={guide.slug}
                to={`/ratgeber/${guide.slug}`}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Card image area */}
                <div className="h-40 bg-gradient-to-br from-accent via-background to-primary/10 flex items-center justify-center relative">
                  <div className="text-5xl">
                    {guide.category === "Kaufratgeber" ? "🛒" : guide.category === "Materialien" ? "🧵" : "📖"}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[guide.category] ?? "bg-muted text-muted-foreground"}`}>
                      {guide.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star size={11} className="text-primary fill-primary" />
                    <span className="text-xs font-semibold">{guide.overallRating}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {guide.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {guide.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {guide.readingTime} Min.
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {new Date(guide.updatedAt).toLocaleDateString("de-DE", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-semibold text-primary group-hover:gap-1.5 transition-all">
                      Lesen <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* SEO text */}
      <section className="bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Expertenwissen rund um Katzenbetten
          </h2>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            <p>
              Unsere Ratgeber werden von Tierverhaltensexpertinnen und erfahrenen Produkttestern verfasst. Jeder Artikel basiert auf fundierter Recherche, eigenen Tests und dem Feedback unserer Lesergemeinschaft.
            </p>
            <p>
              Ob du zum ersten Mal ein Katzenbett kaufst oder schon viele Erfahrungen gesammelt hast – hier findest du praxisnahe Antworten auf die häufigsten Fragen: Welche Größe braucht meine Katze? Welches Material ist das beste? Wie gewöhne ich meine Katze an ein neues Bett?
            </p>
            <p>
              Alle Empfehlungen in unseren Ratgebern sind unabhängig – wir erhalten keine Zahlungen von Herstellern für positive Erwähnungen. Bei einem Kauf über unsere Links erhalten wir eine Provision, die uns hilft, diesen Service kostenlos anzubieten.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
