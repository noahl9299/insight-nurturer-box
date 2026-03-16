import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Clock, Calendar, User, ArrowRight, ChevronRight, Star, BookOpen, Tag, List } from "lucide-react";
import { getGuideBySlug, getRelatedGuides } from "@/data/guides";
import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function GuideArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;
  const [activeSection, setActiveSection] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(true);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (!guide) return;
      let current = "";
      for (const section of guide.sections) {
        const el = sectionRefs.current[section.id];
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 120) current = section.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [guide]);

  if (!guide) return <Navigate to="/ratgeber" replace />;

  const relatedGuides = getRelatedGuides(guide);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Person",
      name: guide.author,
      jobTitle: guide.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "katzenbett.de",
      url: "https://katzenbett.de",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://katzenbett.de/ratgeber/${guide.slug}`,
    },
    keywords: guide.tags.join(", "),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonical={`https://katzenbett.de/ratgeber/${guide.slug}`}
        type="article"
        datePublished={guide.publishedAt}
        dateModified={guide.updatedAt}
        author={guide.author}
      />
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero Image */}
      {guide.heroImage && guide.heroImage !== "/placeholder.svg" ? (
        <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden pt-16">
          <img
            src={guide.heroImage}
            alt={guide.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}

      {/* Hero */}
      <section className={`bg-gradient-to-b from-accent/60 to-background ${guide.heroImage && guide.heroImage !== "/placeholder.svg" ? "pt-8" : "pt-28"} pb-10 px-4`}>
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Startseite</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/ratgeber">Ratgeber</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{guide.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            {guide.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-5">
            {guide.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            {guide.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              <strong className="text-foreground">{guide.author}</strong>
              <span className="hidden sm:inline">· {guide.authorRole}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Aktualisiert: {new Date(guide.updatedAt).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {guide.readingTime} Min. Lesezeit
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {guide.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="container mx-auto max-w-4xl px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">

          {/* Article body */}
          <article className="min-w-0">

            {/* TOC mobile */}
            <div className="lg:hidden mb-8 bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <List size={16} className="text-primary" /> Inhaltsverzeichnis
                </span>
                <ChevronRight size={16} className={`text-muted-foreground transition-transform ${tocOpen ? "rotate-90" : ""}`} />
              </button>
              {tocOpen && (
                <nav className="px-5 pb-4 border-t border-border">
                  <ol className="space-y-2 mt-3">
                    {guide.sections.map((section, i) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <span className="w-5 h-5 rounded-full bg-muted text-xs flex items-center justify-center font-medium shrink-0">{i + 1}</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                    {guide.faq.length > 0 && (
                      <li>
                        <a href="#faq" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <span className="w-5 h-5 rounded-full bg-muted text-xs flex items-center justify-center font-medium shrink-0">❓</span>
                          Häufige Fragen
                        </a>
                      </li>
                    )}
                  </ol>
                </nav>
              )}
            </div>

            {/* Sections */}
            {guide.sections.map((section, idx) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el; }}
                className="mb-10 scroll-mt-24"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-foreground leading-snug">
                    {section.title}
                  </h2>
                </div>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground [&_strong]:text-foreground [&_a]:text-primary [&_li]:mb-1 [&_ul]:my-3 [&_ol]:my-3 [&_p]:mb-3 [&_table]:my-4 [&_th]:font-semibold [&_th]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}

            {/* FAQ */}
            {guide.faq.length > 0 && (
              <div id="faq" className="scroll-mt-24 mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm">❓</div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">Häufige Fragen</h2>
                </div>
                <Accordion type="single" collapsible className="space-y-2">
                  {guide.faq.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="bg-card border border-border rounded-xl px-4 overflow-hidden"
                    >
                      <AccordionTrigger className="text-left font-semibold text-sm py-4 hover:no-underline hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Related guides */}
            {relatedGuides.length > 0 && (
              <div className="border-t border-border pt-8 mt-8">
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" /> Weitere Ratgeber
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedGuides.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/ratgeber/${related.slug}`}
                      className="group flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-xl">
                        {related.category === "Kaufratgeber" ? "🛒" : "🧵"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {related.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock size={10} /> {related.readingTime} Min.
                          <ArrowRight size={10} className="ml-1" />
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky sidebar: TOC + Rating Box */}
          <aside className="hidden lg:block space-y-5 sticky top-24">

            {/* TOC */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <List size={16} className="text-primary" />
                <span className="font-semibold text-sm">Inhaltsverzeichnis</span>
              </div>
              <nav className="px-5 py-4">
                <ol className="space-y-1.5">
                  {guide.sections.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`flex items-center gap-2 text-sm py-1 rounded-lg px-2 transition-all ${
                          activeSection === section.id
                            ? "text-primary font-medium bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center shrink-0 font-medium ${
                          activeSection === section.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          {i + 1}
                        </span>
                        <span className="line-clamp-2 text-xs leading-snug">{section.title}</span>
                      </a>
                    </li>
                  ))}
                  {guide.faq.length > 0 && (
                    <li>
                      <a
                        href="#faq"
                        className={`flex items-center gap-2 text-sm py-1 rounded-lg px-2 transition-all ${
                          activeSection === "faq"
                            ? "text-primary font-medium bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-muted text-xs flex items-center justify-center shrink-0">❓</span>
                        <span className="text-xs">Häufige Fragen</span>
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            </div>

            {/* Rating Box */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Star size={16} className="text-primary fill-primary" />
                <span className="font-semibold text-sm">Artikel-Bewertung</span>
              </div>
              <div className="px-5 py-5">
                {/* Overall score */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center">
                    <span className="text-xl font-display font-bold text-primary">{guide.overallRating}</span>
                    <span className="text-xs text-muted-foreground">/10</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Gesamtbewertung</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.round(guide.overallRating / 2) ? "text-primary fill-primary" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Score bars */}
                <div className="space-y-3">
                  {guide.ratings.map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="font-semibold text-foreground">{r.score}/10</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${r.score * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Verfasst von</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {guide.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{guide.author}</p>
                      <p className="text-xs text-muted-foreground">{guide.authorRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/katzenbetten"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
              style={{ background: "hsl(var(--primary))" }}
            >
              🐾 Katzenbetten entdecken
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
